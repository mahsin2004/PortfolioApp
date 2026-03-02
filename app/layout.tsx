import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Alex Dev – Full-Stack Developer Portfolio",
  description:
    "Full-Stack Developer specializing in React, Next.js, Node.js, Cloud Architecture, and Mobile Development. Explore my projects, skills, and achievements.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Alex Dev" }],
  creator: "Alex Dev",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexdev.portfolio",
    title: "Alex Dev – Full-Stack Developer Portfolio",
    description:
      "Full-Stack Developer specializing in React, Next.js, Node.js, Cloud Architecture, and Mobile Development.",
    siteName: "Alex Dev Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Dev – Full-Stack Developer Portfolio",
    description:
      "Full-Stack Developer specializing in React, Next.js, Node.js, Cloud Architecture, and Mobile Development.",
    creator: "@alexdev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
