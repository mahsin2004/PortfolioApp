/**
 * error.tsx — Next.js App Router Special File (React Error Boundary)
 *
 * Automatically wraps page segments in a React Error Boundary.
 * Must be a CLIENT COMPONENT ("use client") because error boundaries
 * require React lifecycle methods (componentDidCatch).
 *
 * Props:
 *  - error: the Error object thrown (includes error.digest for server errors)
 *  - reset: a function to retry rendering the segment
 *
 * HOW TO INTEGRATE IN THE FUTURE:
 *  1. Connect to an error tracking service (e.g., Sentry):
 *       useEffect(() => { Sentry.captureException(error); }, [error]);
 *  2. Add retry logic with exponential back-off.
 *  3. Show user-friendly error messages based on error.digest or error.name.
 *
 * Hierarchy position: layout → template → error → loading → page
 */

"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // TODO (future): Send error to monitoring service e.g. Sentry
        // Sentry.captureException(error);
        console.error("[GlobalError boundary]", error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0a0a0f] text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-violet-500 mb-2">Oops!</h1>
                <h2 className="text-2xl font-semibold text-white/90 mb-4">
                    Something went wrong
                </h2>
                <p className="text-white/60 max-w-md mx-auto mb-2">
                    An unexpected error occurred. Please try again or refresh the page.
                </p>
                {error.digest && (
                    <p className="text-xs text-white/30 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
            <button
                onClick={reset}
                className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 transition-colors font-medium"
            >
                Try Again
            </button>
        </div>
    );
}
