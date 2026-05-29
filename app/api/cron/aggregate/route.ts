    import type { NextRequest } from 'next/server';
    import { prisma } from '@/lib/db';

    const aggregateStats = async () => {
        // Placeholder for the actual aggregation logic

        const events = await prisma.githubEvents.findMany({
            where:{
                processed: false
            },
            select:{
                userId: true,
                eventType: true,
                payload: true,
                processed: true,
                receivedAt: true
            }
        })

  

        for (const event of events) {
            
            if(event.eventType === "push"){
                await prisma.dailyStats.upsert({
                     where:{
                        userId_date:{
                            userId: event.userId,
                            date: new Date(event.receivedAt.toISOString().split('T')[0])

                        }
                    },
                    update:{
                        commits: {
                            increment: event.payload.commits?.length || 0
                        }
                    },
                    create:{
                        userId: event.userId,
                        date: new Date(event.receivedAt.toISOString().split('T')[0]),
                        commits: event.payload.commits?.length || 0,
                        pullRequests: 0,
                        prs_merged: 0,
                        issues: 0,
                        reviews: 0
                    }
                })
            }
            if(event.eventType === "pull_request" && event.payload.action === "opened"){
                await prisma.dailyStats.upsert({
                    where:{
                        userId_date:{
                            userId: event.userId,
                            date: new Date(event.receivedAt.toISOString().split('T')[0])
                        }
                    },
                    update:{
                        pullRequests: {
                            increment: 1
                        }
                    },
                    create:{
                        userId: event.userId,
                        date: new Date(event.receivedAt.toISOString().split('T')[0]),
                        commits: 0,
                        pullRequests: 1,
                        prs_merged: 0,
                        issues: 0,
                        reviews: 0
                    }
                })
            }
            if(event.eventType === "pull_request" && event.payload.action === "closed" && event.payload.pull_request.merged){
                await prisma.dailyStats.upsert({
                    where:{
                        userId_date:{
                            userId: event.userId,
                            date: new Date(event.receivedAt.toISOString().split('T')[0])
                        }
                    },
                    update:{
                        prs_merged: {
                            increment: 1
                        }
                    },
                    create:{
                        userId: event.userId,
                        date: new Date(event.receivedAt.toISOString().split('T')[0]),
                        commits: 0,
                        pullRequests: 0,
                        prs_merged: 1,
                        issues: 0,
                        reviews: 0
                    }
                })
            }
            if(event.eventType === "pull_request_review"){
                await prisma.dailyStats.upsert({
                    where:{
                        userId_date:{
                            userId: event.userId,
                            date: new Date(event.receivedAt.toISOString().split('T')[0])

                        }
                    },
                    update:{
                        reviews: {
                            increment: 1
                        }
                    },
                    create:{
                        userId: event.userId,
                        date: new Date(event.receivedAt.toISOString().split('T')[0]),
                        commits: 0,
                        pullRequests: 0,
                        reviews: 1,
                        issues: 0,
                        prs_merged: 0
                    }
                })
            }

            if(event.eventType === "issues"){
                await prisma.dailyStats.upsert({
                    where:{
                        userId_date:{
                            userId: event.userId,
                            date: new Date(event.receivedAt.toISOString().split('T')[0])

                        }   
                    },
                    update:{
                        issues: {
                            increment: 1
                        }
                    },
                    create:{
                        userId: event.userId,
                        date: new Date(event.receivedAt.toISOString().split('T')[0]),
                        commits: 0,
                        pullRequests: 0,
                        reviews: 0,
                        issues: 1,
                        prs_merged: 0
                    }



            })
        }
            
        }

        await prisma.githubEvents.updateMany({
            where: { processed: false },
            data: { processed: true }
        })
    
    }
    
    export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
        return new Response('Unauthorized', {
        status: 401,
        });
    }

        await aggregateStats();

    
    return Response.json({ success: true });
    }