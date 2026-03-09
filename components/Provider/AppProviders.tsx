"use client";

import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

/**
 * AppProviders — single root combiner for all client-side providers.
 * Stack order (outermost → innermost):
 *   ThemeProvider → AuthProvider → children → Toaster → Analytics
 *
 * Import this in app/layout.tsx and wrap children with it.
 *
 * NOTE: next-intl is handled server-side via i18n/request.ts + middleware.ts;
 * translation hooks work automatically without a client wrapper.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                {children}

                {/* Toast notifications — call toast() anywhere in the app */}
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: "rgba(15, 15, 25, 0.95)",
                            border: "1px solid rgba(124, 58, 237, 0.3)",
                            color: "#e2e8f0",
                            backdropFilter: "blur(12px)",
                            borderRadius: "12px",
                            fontFamily: "var(--font-inter)",
                        },
                        classNames: {
                            toast: "sonner-toast-custom",
                        },
                    }}
                    richColors
                />

                {/* Vercel Analytics — automatic page-view tracking on Vercel */}
                <Analytics />
            </AuthProvider>
        </ThemeProvider>
    );
}
