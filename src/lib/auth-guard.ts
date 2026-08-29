import { getServerSession } from "next-auth";
import { allowedEmails, authOptions } from "./auth";

export async function requireAuth() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email || !allowedEmails.includes(email)) {
        throw new Error('Unauthorized');
    }

    return session;
}