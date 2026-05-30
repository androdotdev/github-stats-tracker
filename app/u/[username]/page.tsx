import StatsCard from '@/components/StatsCard';
import { prisma } from '@/lib/db';

export default async function publicProfile({ params }: { params: { username: string } }){


    const { username } = await params;

    const user = await prisma.user.findFirst({
        where:{
            username:username as string
        }
    });

    if(!user){
        return <div className='text-white text-2xl'>User not found</div>
    }

    const stats = await prisma.dailyStats.findMany({
        where:{
            userId: user.id
        },
        select:{
            date: true,
            commits: true,
            pullRequests: true,
            issues: true,
            prs_merged: true,
            reviews: true,
        }
    })

    return (
        <div className='p-8'>
            <h1 className='text-3xl font-bold text-white mb-4'>{user.name || user.email}</h1>
            <p className='text-lg text-gray-300'>GitHub Username: {user.username}</p>
            <p className='text-lg text-gray-300'>Email: {user.email}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4'>
                <StatsCard title="Total Commits" value={stats.reduce((acc,stat)=> acc+stat.commits, 0).toString()} />
                <StatsCard title="Total Pull Requests" value={stats.reduce((acc,stat)=> acc+stat.pullRequests, 0).toString()} />
                <StatsCard title="Total Issues" value={stats.reduce((acc,stat)=> acc+stat.issues, 0).toString()} />
                <StatsCard title="Total PRs Merged" value={stats.reduce((acc,stat)=> acc+stat.prs_merged, 0).toString()} />
                <StatsCard title="Total Reviews" value={stats.reduce((acc,stat)=> acc+stat.reviews, 0).toString()} />
            </div>
        </div>
    )


}

