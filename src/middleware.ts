import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Middleware pour Next.js 16 (anciennement proxy.ts)
 * Protège les routes /admin/* en vérifiant l'authentification
 * Updated pour Next.js 16 - remplace le système withAuth de next-auth
 */
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Les routes protégées
  const protectedRoutes = ["/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    // Redirection vers la page de connexion
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
