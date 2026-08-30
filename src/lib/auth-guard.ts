import { getServerSession, type Session } from "next-auth";
import { env } from "./env";
import { allowedEmails, authOptions } from "./auth";

export async function requireAuth() {
    if (env.AUTH_DISABLED) {
        return {
            user: { email: allowedEmails[0], name: "Local dev" },
            expires: "",
        } satisfies Session;
    }

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email || !allowedEmails.includes(email)) {
        throw new Error('Unauthorized');
    }

    return session;
}