import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Protected routes — add any path that requires authentication.
 * The home page (/) is intentionally excluded (public).
 */
const PROTECTED_PREFIXES = ["/technology"];

export default auth((req) => {
    const { pathname } = req.nextUrl;

    const isProtected = PROTECTED_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
    );

    if (isProtected && !req.auth) {
        // Redirect unauthenticated users to the sign-in page,
        // preserving the original URL as the callbackUrl.
        const signInUrl = new URL("/auth/signin", req.url);
        signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
});

export const config = {
    // Match all routes except Next.js internals and static files
    matcher: ["/((?!_next|api/auth|favicon.ico|icons|manifest.json).*)"],
};
