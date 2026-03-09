/**
 * loading.tsx — Next.js App Router Special File (React Suspense Boundary)
 *
 * Automatically shown while a page segment is loading (streaming SSR).
 * Next.js wraps the page in <Suspense fallback={<Loading />}> automatically.
 *
 * This means:
 *  - The layout stays visible with instant shell rendering
 *  - The loading UI is shown while data is being fetched on the server
 *  - Once data is ready, the page replaces the loading UI
 *
 * Best practices:
 *  - Use skeleton screens that match the shape of the real content
 *  - Keep this component lightweight (no heavy imports)
 *  - Match the visual weight of the page to avoid layout shift
 *
 * HOW TO INTEGRATE IN THE FUTURE:
 *  1. Replace skeleton divs with your actual section shapes.
 *  2. Add animated shimmer CSS via `@keyframes shimmer` in globals.css.
 *  3. Use <Suspense> boundaries in individual route segments for granular loading states.
 *
 * Hierarchy position: layout → template → error → loading → page
 */

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-8 px-4">
            {/* Animated pulse skeleton — replace with real section skeletons */}
            <div className="w-full max-w-4xl space-y-6 animate-pulse">
                {/* Hero skeleton */}
                <div className="h-16 bg-white/5 rounded-2xl w-3/4 mx-auto" />
                <div className="h-6 bg-white/5 rounded-lg w-1/2 mx-auto" />
                <div className="flex gap-4 justify-center">
                    <div className="h-10 w-32 bg-violet-500/20 rounded-lg" />
                    <div className="h-10 w-32 bg-white/5 rounded-lg" />
                </div>

                {/* Section skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 bg-white/5 rounded-xl" />
                    ))}
                </div>
            </div>

            {/* Spinner */}
            {/* <div className="flex items-center gap-3 text-white/40 text-sm">
                <span className="inline-block h-4 w-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                Loading…
            </div> */}
        </div>
    );
}
