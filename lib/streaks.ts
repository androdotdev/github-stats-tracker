import { prisma } from "./db";

export async function getUserStreaks(userId: string) {
    const stats = await prisma.dailyStats.findMany({
        where: { 
            userId,
        },
        orderBy: { date: "desc" }
    });
    
    let currentStreak = 0;
    let longestStreak = 0;
    let currentDate = new Date().toISOString().split('T')[0]

    for (const stat of stats) {
        if (stat.commits > 0 || stat.pullRequests > 0 || stat.issues > 0) {
            if (currentDate === stat.date.toISOString().split('T')[0]) {
                const prev = new Date(currentDate)
                prev.setDate(prev.getDate() - 1)
                currentDate = prev.toISOString().split('T')[0]
                currentStreak++;
                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak;
                }
            } else {
                currentStreak = 0;
                break;
            }
        }
    }

    return { currentStreak, longestStreak };
}