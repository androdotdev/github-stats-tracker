import ContributionChart from "@/components/ContributionChart";
import StatsCard from "@/components/StatsCard";
import {auth} from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth.api.getSession({
    headers: await headers()
    })
    if(!session){
        redirect("/")
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.session.userId
        },
    })
    const stats = await prisma.dailyStats.findMany({
        where:{
            userId: session.session.userId
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
        <>
        <h1 className="text-3xl font-bold text-white mb-4">Welcome, {user?.name || user?.email}</h1>
        <p className="text-lg text-gray-300">Here are your GitHub stats:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4">
            <StatsCard title="Total Commits" value={stats.reduce((acc,stat)=> acc+stat.commits, 0).toString()} />
            <StatsCard title="Total Pull Requests" value={stats.reduce((acc,stat)=> acc+stat.pullRequests, 0).toString()} />
            <StatsCard title="Total Issues" value={stats.reduce((acc,stat)=> acc+stat.issues, 0).toString()} />
            <StatsCard title="Total PRs Merged" value={stats.reduce((acc,stat)=> acc+stat.prs_merged, 0).toString()} />
            <StatsCard title="Total Reviews" value={stats.reduce((acc,stat)=> acc+stat.reviews, 0).toString()} />
        </div>

        <div>
            <ContributionChart data={stats.map(stat => ({
                date: stat.date.toISOString().split("T")[0],
                commits: stat.commits,  
                pullRequests: stat.pullRequests,
                issues: stat.issues,
                prs_merged: stat.prs_merged,
                reviews: stat.reviews
            }))} />
        </div>

        </>
    )

}