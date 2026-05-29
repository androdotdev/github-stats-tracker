import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "https://landmine-decree-ditto.ngrok-free.dev/"
})
export const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "github"
    })
}
// export const { signIn, signUp, useSession } = createAuthClient()