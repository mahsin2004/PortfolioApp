import { handlers } from "@/auth";

/**
 * NextAuth catch-all route handler.
 * Responses to /api/auth/* requests:
 *   GET  /api/auth/providers — list configured providers
 *   GET  /api/auth/session   — return current session (null if not signed in)
 *   POST /api/auth/signin    — initiate sign-in flow
 *   POST /api/auth/signout   — sign out
 *
 * No configuration needed here — all config is in auth.ts at root.
 */
export const { GET, POST } = handlers;
