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
                <Bar dataKey="commits" fill="#8884d8" isAnimationActive={true}  />
                <Bar dataKey="pullRequests" fill="#82ca9d" isAnimationActive={true}  />
                <Bar dataKey="issues" fill="#ffc658" isAnimationActive={true}  />
                <Bar dataKey="prs_merged" fill="#ff7300" isAnimationActive={true}  />
                <Bar dataKey="reviews" fill="#0088fe" isAnimationActive={true}  />
            </BarChart>
        </ResponsiveContainer>

    )
}