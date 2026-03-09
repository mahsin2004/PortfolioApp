"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * ThemeProvider — wraps next-themes to manage dark/light mode.
 * `attribute="class"` adds `class="dark"` or `class="light"` to <html>.
 * `defaultTheme="dark"` starts in dark mode.
 * `enableSystem` lets it follow the OS preference if no manual choice is made.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
