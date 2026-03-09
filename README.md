# 🚀 M Engineer — Portfolio Website

> **Full-Stack Developer Portfolio** built with [Next.js 15 App Router](https://nextjs.org/docs/app), TypeScript, and Tailwind CSS. Showcasing projects, skills, achievements, and real-world engineering experience.

---

## 📁 Project Structure

```
my-portfolio/
├── app/                          ← Next.js App Router root
│   ├── layout.tsx                ← Root layout (persistent shell)
│   ├── template.tsx              ← Re-mounted per navigation (animations/analytics)
│   ├── error.tsx                 ← React Error Boundary (runtime errors)
│   ├── loading.tsx               ← React Suspense boundary (streaming SSR)
│   ├── not-found.tsx             ← 404 boundary (notFound() calls)
│   ├── page.tsx                  ← Homepage (/)
│   ├── globals.css               ← Global styles & design tokens
│   ├── favicon.ico
│   └── technology/               ← /technology route segment
├── components/                   ← Reusable UI components
│   ├── Layout/
│   │   └── RootLayoutWraps.tsx   ← Navbar + Footer shell
│   └── HomeCompoents/            ← Homepage sections
├── lib/                          ← Utility functions
├── public/                       ← Static assets & PWA icons
└── next.config.ts
```

---

## 🏗️ Next.js App Router — Special File Hierarchy

Next.js App Router **automatically composes** these special files in the following order for every route segment:

```
layout.tsx
  └── template.tsx
        └── error.tsx          ← React Error Boundary
              └── loading.tsx  ← React Suspense Boundary
                    └── not-found.tsx
                          └── page.tsx  (or nested layout)
```

### 📄 File Reference

| File | Re-renders on Nav? | Purpose |
|---|---|---|
| `layout.tsx` | ❌ No (preserved) | Persistent shell — Navbar, fonts, metadata, providers |
| `template.tsx` | ✅ Yes (re-mounted) | Page-enter animations, per-nav analytics |
| `error.tsx` | ✅ Yes | Catches runtime errors; shows retry UI |
| `loading.tsx` | ✅ Yes | Shown via Suspense while page data loads (streaming) |
| `not-found.tsx` | ✅ Yes | Renders when `notFound()` is called or route is missing |
| `page.tsx` | ✅ Yes | The actual route content |

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18.17
- npm / yarn / pnpm / bun

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🔮 Future Integration Guide

This section documents **how to extend each special file** when adding new features.

---

### 1. `layout.tsx` — Providers & Global Wrappers

**When to edit:** Adding a new global provider (theme, auth, analytics SDK, toast notifications).

```tsx
// app/layout.tsx — add new providers here
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <RootLayoutWraps>{children}</RootLayoutWraps>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Future integrations:**
- 🎨 **Dark/Light theme toggle** → Add `next-themes` ThemeProvider
- 🔐 **Authentication** → Wrap with `SessionProvider` (NextAuth) or `ClerkProvider`
- 📊 **Analytics** → Add `<Analytics />` from `@vercel/analytics`
- 🍞 **Toast/Snackbar** → Add `<Toaster />` from `sonner` or `react-hot-toast`
- 🌐 **i18n** → Wrap with `NextIntlClientProvider`

---

### 2. `template.tsx` — Page Transition Animations

**When to edit:** Adding page-level enter/exit animations or per-navigation side effects.

```tsx
// app/template.tsx — Framer Motion page transitions
"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function RootTemplate({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
```

**Future integrations:**
- ✨ **Page transitions** → `framer-motion` `AnimatePresence`
- 📈 **Page-view analytics** → Fire `posthog.capture("pageview")` or `gtag("event")` on mount
- 🎯 **Scroll reset** → `useEffect(() => window.scrollTo(0, 0), [])` per navigation
- 🔔 **Route-level notifications** → Check unread messages/alerts per page

---

### 3. `error.tsx` — Error Monitoring

**When to edit:** Connecting to a crash reporting service or customising the error UI.

```tsx
// app/error.tsx — Sentry integration example
"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

**Setup steps for Sentry:**
```bash
npx @sentry/wizard@latest -i nextjs
```

**Future integrations:**
- 🐛 **Sentry** → `@sentry/nextjs` — automatic error capture with stack traces
- 📧 **Email alerts** → Trigger Resend/SendGrid email on critical errors
- 🔄 **Auto-retry** → Implement exponential back-off before showing the error UI
- 📝 **Error catalogue** → Group errors by `error.digest` for server-side errors

---

### 4. `loading.tsx` — Skeleton Screens & Streaming

**When to edit:** Improving perceived performance by matching skeletons to real content shape.

```tsx
// app/loading.tsx — match skeleton to real Hero section dimensions
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-white/5 rounded-xl" /> {/* Hero skeleton */}
      <div className="h-40 bg-white/5 rounded-xl mt-4" /> {/* About skeleton */}
    </div>
  );
}
```

**Future integrations:**
- 💀 **Granular skeletons** → Create `loading.tsx` per route segment (e.g., `app/blog/loading.tsx`)
- ⚡ **Streaming** → Use `<Suspense>` within page components for partial loading
- 📦 **`react-loading-skeleton`** → Drop-in skeleton components matching your design system
- 🎬 **Lottie animation** → Replace spinner with a Lottie animation (`lottie-react`)

**Per-segment loading example:**
```
app/
├── loading.tsx          ← Root loading (all routes)
├── blog/
│   ├── loading.tsx      ← Blog-specific loading state
│   └── page.tsx
└── projects/
    ├── loading.tsx      ← Projects-specific loading state
    └── page.tsx
```

---

### 5. `not-found.tsx` — 404 Pages

**When to edit:** Customising the 404 experience or triggering it programmatically.

```tsx
// Trigger inside any Server Component
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) notFound(); // ← renders not-found.tsx
  return <ProjectDetail project={project} />;
}
```

**Future integrations:**
- 🔍 **Smart search** → Show a search bar using `cmdk` or Algolia to help users find content
- 📌 **Suggested pages** → Fetch popular/related routes dynamically and display them
- 🎨 **Custom illustration** → Add an SVG or Lottie animation for the 404 state
- 📊 **404 analytics** → Track `window.location.href` to identify broken links

---

## 🧩 Adding New Route Segments

To add a new top-level page (e.g., `/blog`):

```bash
# Create the route segment
mkdir app/blog

# Create the page file
touch app/blog/page.tsx

# Optionally add segment-level special files
touch app/blog/loading.tsx    # Blog-specific skeleton
touch app/blog/error.tsx      # Blog-specific error boundary
touch app/blog/layout.tsx     # Blog-specific persistent layout
```

Each nested segment **inherits** the parent's `layout.tsx` but can **override** `error.tsx`, `loading.tsx`, and `not-found.tsx`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Fonts | Inter, Fira Code (next/font) |
| Icons | Lucide React |
| PWA | Web App Manifest + Service Worker |
| Deployment | Vercel (recommended) |

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
EXPOSE 3000
CMD ["node", "server.js"]
```

Add `output: "standalone"` to `next.config.ts` for Docker builds.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 👤 Author

**Md Mahsin Mia** — Full-Stack Developer  
- Portfolio: [mdmahsinmia.portfolio](https://mdmahsinmia.portfolio)  
- Twitter: [@mahsin2004](https://twitter.com/mahsin2004)  
- GitHub: [@mahsin2004](https://github.com/mahsin2004)

---

*Built with ❤️ using Next.js App Router — © 2025 Md Mahsin Mia*
