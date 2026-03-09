/**
 * template.tsx — Next.js App Router Special File
 *
 * Unlike layout.tsx, a template is RE-MOUNTED on every navigation.
 * This means:
 *  - State is NOT preserved between routes
 *  - Effects are re-run on every visit (great for page-enter animations)
 *
 * Use cases:
 *  - Page-transition animations
 *  - Features that depend on useEffect firing per-navigation
 *  - Analytics page-view tracking that requires re-instantiation
 *
 * HOW TO INTEGRATE IN THE FUTURE:
 *  1. Add <AnimatePresence> (Framer Motion) here for route transitions.
 *  2. Fire analytics events (e.g., Google Analytics, PostHog) on mount.
 *  3. Reset scroll position or focus management per navigation.
 *
 * Hierarchy position: layout → template → error → loading → page
 */

export default function RootTemplate({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Future: wrap with <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="template-root">
            {children}
        </div>
    );
}
