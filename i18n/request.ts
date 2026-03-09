import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

/**
 * next-intl server-side configuration.
 * Reads locale from a cookie (`NEXT_LOCALE`) set by the language switcher.
 * Falls back to "en" if no cookie is present.
 *
 * Cookie-based (no URL prefix) — keeps all URLs clean (e.g. / stays /).
 */
export default getRequestConfig(async () => {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "en";

    // Validate locale is supported
    const supportedLocales = ["en", "bn"];
    const safeLocale = supportedLocales.includes(locale) ? locale : "en";

    const messages = (await import(`../messages/${safeLocale}.json`)).default;

    return {
        locale: safeLocale,
        messages,
    };
});
