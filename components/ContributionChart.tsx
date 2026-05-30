"use client"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function ContributionChart({ data }: { data: any[] }) {
    return (

        <ResponsiveContainer width="100%" height={300}>

             <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="commits" fill="#3fb950" isAnimationActive={true}  />
                <Bar dataKey="pullRequests" fill="#58a6ff" isAnimationActive={true}  />
                <Bar dataKey="issues" fill="#f78166" isAnimationActive={true}  />
                <Bar dataKey="prs_merged" fill="#a371f7" isAnimationActive={true}  />
                <Bar dataKey="reviews" fill="#ffa657" isAnimationActive={true}  />
            </BarChart>
        </ResponsiveContainer>

    )
}