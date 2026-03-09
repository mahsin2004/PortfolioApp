/**
 * not-found.tsx — Next.js App Router Special File (React Error Boundary for 404)
 *
 * Rendered when `notFound()` is called from a server component or when a
 * route genuinely does not exist (Next.js automatically renders this for
 * unmatched URLs inside this segment).
 *
 * Key differences from error.tsx:
 *  - This is for expected "not found" cases (404), not runtime errors
 *  - Does NOT receive an `error` prop — it is a clean render
 *  - Can be placed in any route segment for scoped 404 pages
 *
 * HOW TO INTEGRATE IN THE FUTURE:
 *  1. Personalise with your own illustration or Lottie animation.
 *  2. Add a search bar to help users find relevant content.
 *  3. Show popular/suggested pages dynamically via a Server Component parent.
 *  4. Track 404s in analytics: useEffect(() => { analytics.track('404', { url }) }, [])
 *
 * Hierarchy position: layout → template → error → loading → not-found → page
 */

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#0a0a0f] text-white px-4">
            {/* 404 Graphic */}
            <div className="relative text-center select-none">
                <span className="text-[10rem] font-black text-white/5 leading-none">
                    404
                </span>
                <p className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-violet-400">
                    Page Not Found
                </p>
            </div>

            {/* Message */}
            <div className="text-center max-w-md">
                <p className="text-white/60 text-lg mb-1">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <p className="text-white/30 text-sm">
                    Double-check the URL or head back to the homepage.
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
                <Link
                    href="/"
                    className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 transition-colors font-medium"
                >
                    ← Back to Home
                </Link>
                <Link
                    href="/#contact"
                    className="px-6 py-3 rounded-lg border border-white/10 hover:border-violet-500/50 transition-colors font-medium text-white/70"
                >
                    Contact Me
                </Link>
            </div>
        </div>
    );
}
