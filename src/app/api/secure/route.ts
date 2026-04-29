import { requireAuth } from "@/src/lib/auth-guard";

export async function GET() {
    try {
        const session = await requireAuth();

        return Response.json({
            message: "API sécurisée",
            user: session.user,
        })
    } catch {
        return new Response("Unauthorized", { status: 401 });
    }
}