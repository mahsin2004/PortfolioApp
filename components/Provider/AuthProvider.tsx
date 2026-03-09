"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

/**
 * AuthProvider — wraps NextAuth SessionProvider.
 * Pass `session` from a Server Component layout for SSR session hydration.
 *
 * Usage (in layout.tsx or AppProviders):
 *   <AuthProvider session={session}>...</AuthProvider>
 *
 * Future:
 *  - Add session to layout by calling `auth()` from next-auth (server-side)
 *  - Use `useSession()` anywhere inside to get the current user
 */
export function AuthProvider({
    children,
    session,
}: {
    children: React.ReactNode;
    session?: Session | null;
}) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
