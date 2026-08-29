"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * Only wraps the routes that actually call useSession() (currently /login,
 * via AuthButton). signIn()/signOut() elsewhere don't need this provider.
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
    return <SessionProvider>{ children }</SessionProvider>
}