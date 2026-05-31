import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma/client";
import { prisma } from "./db";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET as string,
    database: prismaAdapter(prisma, {
        provider: "postgresql",  
    }),
    trustedOrigins: [process.env.AUTH_URL as string],
    socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  },
  hooks:{
    after: createAuthMiddleware(async (ctx)=> {
        if(ctx.context.newSession?.user.id){
            const account = await prisma.account.findFirst({
                where:{
                    userId: ctx.context.newSession.user.id
                }
            })
            const accessToken = account?.accessToken

            const response = await fetch("https://api.github.com/user", {
                headers: {
                    Authorization: `token ${accessToken}`
                }
            })
            const responseData = await response.json()
            await prisma.user.update({
                where: {
                    id: ctx.context.newSession.user.id
                },
                data: {
                    access_token: accessToken,
                    username: responseData.login,
                    avatarUrl: responseData.avatar_url,
                    bio: responseData.bio,
                    githubId: responseData.id.toString()
                } 
            })
        }
    })
  }
});