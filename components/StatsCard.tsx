import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function StatsCard({ title, value }: { title: string; value: string }) {
    return (
        <Card className="w-full bg-gray-800 text-white">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{value}</p>
            </CardContent>
        </Card>
    );
}