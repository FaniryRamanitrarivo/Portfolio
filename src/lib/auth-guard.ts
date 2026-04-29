import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const allowedEmails = [
    "faniryram0@gmail.com", 
    // "faniriniaina.ram@smartone.ai"
];

export async function requireAuth() {
    const session = await getServerSession(authOptions);

    if(!session || !allowedEmails.includes(session.user?.email!)) {
        throw new Error('Unauthorized');
    }

    return session;
}