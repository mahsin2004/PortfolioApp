"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { personalInfo } from "@/lib/data";
import { toast } from "sonner";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const navLinks = [
  { href: "#home", label: "Home", labelBn: "হোম", icon: "⌂" },
  { href: "#about", label: "About", labelBn: "পরিচিতি", icon: "◎" },
  { href: "#skills", label: "Skills", labelBn: "দক্ষতা", icon: "◈" },
  { href: "#experience", label: "Experience", labelBn: "অভিজ্ঞতা", icon: "◷" },
  { href: "#projects", label: "Projects", labelBn: "প্রজেক্ট", icon: "⬡" },
  { href: "#achievements", label: "Achievements", labelBn: "অর্জন", icon: "◆" },
  { href: "#contact", label: "Contact", labelBn: "যোগাযোগ", icon: "◉" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

// ── Sun icon ──────────────────────────────────────────────────────
function SunIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  );
}

// ── Moon icon ─────────────────────────────────────────────────────
function MoonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// ── Theme Dropper ─────────────────────────────────────────────────
function ThemeDropper() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  if (!mounted) {
    return <div style={{ width: 38, height: 38 }} />;
  }

  const isDark = resolvedTheme === "dark";

  const select = (value: string) => {
    setTheme(value);
    setOpen(false);
    toast.success(`${value === "dark" ? "🌙 Dark" : value === "light" ? "☀️ Light" : "💻 System"} theme applied`);
  };

  const options = [
    { value: "dark", label: "Dark", icon: <MoonIcon size={14} /> },
    { value: "light", label: "Light", icon: <SunIcon size={14} /> },
    {
      value: "system", label: "System", icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Toggle button */}
      <button
        id="theme-dropper-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle theme"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          background: open
            ? "rgba(124,58,237,0.2)"
            : "rgba(255,255,255,0.04)",
          border: `1px solid ${open ? "rgba(124,58,237,0.6)" : "rgba(148,163,184,0.15)"}`,
          borderRadius: "10px",
          padding: "0 10px",
          height: "34px",
          cursor: "pointer",
          color: isDark ? "#a78bfa" : "#f59e0b",
          transition: "all 0.2s ease",
          fontSize: "0.76rem",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        {isDark ? <MoonIcon size={14} /> : <SunIcon size={14} />}
        <span style={{ color: "rgba(226,232,240,0.7)" }}>
          {isDark ? "Dark" : "Light"}
        </span>
        {/* Chevron */}
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="rgba(100,116,139,0.8)" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "rgba(10,10,20,0.97)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: "12px",
            padding: "6px",
            minWidth: "130px",
            zIndex: 2000,
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)",
            animation: "dropperIn 0.15s ease",
          }}
        >
          <style>{`
            @keyframes dropperIn {
              from { opacity: 0; transform: translateY(-6px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0)   scale(1); }
            }
          `}</style>
          {options.map((opt) => {
            const isActive = theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => select(opt.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  background: isActive ? "rgba(124,58,237,0.18)" : "transparent",
                  border: "none",
                  borderRadius: "8px",
                  padding: "7px 10px",
                  cursor: "pointer",
                  color: isActive ? "#c4b5fd" : "#64748b",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLButtonElement).style.color = isActive ? "#c4b5fd" : "#e2e8f0";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = isActive ? "rgba(124,58,237,0.18)" : "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = isActive ? "#c4b5fd" : "#64748b";
                }}
              >
                <span style={{ opacity: 0.8 }}>{opt.icon}</span>
                {opt.label}
                {isActive && (
                  <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#06b6d4)", display: "inline-block" }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Language Switcher ─────────────────────────────────────────────
function LangSwitcher({ locale, onSwitch }: { locale: "en" | "bn"; onSwitch: (l: "en" | "bn") => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(148,163,184,0.15)",
        borderRadius: "10px",
        padding: "3px",
        height: "34px",
        gap: "2px",
      }}
    >
      {(["en", "bn"] as const).map((l) => (
        <button
          key={l}
          onClick={() => onSwitch(l)}
          style={{
            background: locale === l ? "rgba(124,58,237,0.25)" : "transparent",
            border: locale === l ? "1px solid rgba(124,58,237,0.4)" : "1px solid transparent",
            borderRadius: "7px",
            padding: "0 8px",
            height: "26px",
            cursor: "pointer",
            color: locale === l ? "#c4b5fd" : "#64748b",
            fontSize: locale === l ? "0.73rem" : "0.75rem",
            fontWeight: locale === l ? 600 : 400,
            transition: "all 0.18s ease",
            lineHeight: 1,
          }}
        >
          {l === "en" ? "EN" : "বাং"}
        </button>
      ))}
    </div>
  );
}

// ── Auth Buttons (Sign In + Sign Up when logged out) ─────────────
function AuthButtons() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexShrink: 0 }}>
      <button
        onClick={() => signIn()}
        style={{
          background: "transparent",
          border: "1px solid rgba(148,163,184,0.25)",
          borderRadius: "9px",
          padding: "0 14px",
          height: "34px",
          cursor: "pointer",
          color: "#94a3b8",
          fontSize: "0.82rem",
          fontWeight: 500,
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(148,163,184,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(148,163,184,0.25)";
        }}
      >
        Sign In
      </button>
      <Link
        href="/auth/signup"
        style={{
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
          border: "none",
          borderRadius: "9px",
          padding: "0 14px",
          height: "34px",
          cursor: "pointer",
          color: "#fff",
          fontSize: "0.82rem",
          fontWeight: 600,
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
          textDecoration: "none",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        }}
      >
        Sign Up
      </Link>
    </div>
  );
}

// ── User Profile Menu (when logged in) ───────────────────────────
function UserProfileMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const user = session?.user;
  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        id="user-profile-btn"
        onClick={() => setOpen(!open)}
        aria-label="User profile"
        aria-expanded={open}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: `2px solid ${open ? "rgba(124,58,237,0.8)" : "rgba(124,58,237,0.4)"}`,
          background: user?.image ? "none" : "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: 0,
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: open ? "0 0 0 3px rgba(124,58,237,0.2)" : "none",
        }}
      >
        {user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name ?? "User"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "-0.5px" }}>{initials}</span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: 0,
            background: "rgba(10,10,20,0.97)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: "14px",
            padding: "8px",
            minWidth: "200px",
            zIndex: 2000,
            backdropFilter: "blur(20px)",
            boxShadow: "0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.1)",
            animation: "dropperIn 0.15s ease",
          }}
        >
          {/* User info */}
          <div style={{
            padding: "10px 12px 10px",
            borderBottom: "1px solid rgba(124,58,237,0.12)",
            marginBottom: "6px",
          }}>
            <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#e2e8f0", lineHeight: 1.3 }}>
              {user?.name ?? "User"}
            </p>
            {user?.email && (
              <p style={{ margin: "2px 0 0", fontSize: "0.74rem", color: "#64748b", lineHeight: 1.4 }}>
                {user.email}
              </p>
            )}
          </div>

          {/* Sign out */}
          <button
            onClick={() => { setOpen(false); signOut(); toast.success("👋 Signed out successfully"); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              background: "transparent",
              border: "none",
              borderRadius: "9px",
              padding: "8px 12px",
              cursor: "pointer",
              color: "#f87171",
              fontSize: "0.83rem",
              fontWeight: 500,
              transition: "background 0.15s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────
export default function Navbar() {
  const { data: session, status } = useSession();
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [locale, setLocale] = useState<"en" | "bn">("en");
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Read locale from cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
    if (match?.[1] === "bn") setLocale("bn");
  }, []);

  // Scroll opacity
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollOpacity(Math.min(y / 80, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const switchLocale = (l: "en" | "bn") => {
    setLocale(l);
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000`;
    toast.success(l === "bn" ? "🌐 বাংলায় পরিবর্তিত হয়েছে" : "🌐 Switched to English");
  };

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const getLabel = (link: typeof navLinks[0]) => locale === "bn" ? link.labelBn : link.label;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-root * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        /* Light mode overrides */
        .light .nav-bg {
          background: rgba(248,248,255,calc(var(--nav-opacity,0)*0.92)) !important;
          border-bottom-color: rgba(124,58,237,calc(var(--nav-opacity,0)*0.12)) !important;
        }

        .nav-bg {
          transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          background: rgba(7,7,12,calc(var(--nav-opacity,0)*0.88));
          backdrop-filter: blur(calc(var(--nav-opacity,0)*24px)) saturate(calc(100% + var(--nav-opacity,0)*80%));
          -webkit-backdrop-filter: blur(calc(var(--nav-opacity,0)*24px)) saturate(calc(100% + var(--nav-opacity,0)*80%));
          border-bottom: 1px solid rgba(124,58,237,calc(var(--nav-opacity,0)*0.15));
          box-shadow: 0 4px 32px rgba(0,0,0,calc(var(--nav-opacity,0)*0.3));
        }

        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
          .mobile-drawer-overlay { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(124,58,237,0.4); }
          50% { box-shadow: 0 0 18px rgba(124,58,237,0.7), 0 0 32px rgba(6,182,212,0.3); }
        }

        .nav-link-btn { position: relative; overflow: hidden; }
        .nav-link-btn::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 60%; height: 1.5px;
          background: linear-gradient(90deg, #7c3aed, #06b6d4);
          border-radius: 2px;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .nav-link-btn.active::after, .nav-link-btn:hover::after { transform: translateX(-50%) scaleX(1); }

        .social-pill {
          position: relative; display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 10px;
          border: 1px solid rgba(148,163,184,0.15);
          background: rgba(255,255,255,0.03);
          color: #64748b; cursor: pointer;
          transition: all 0.22s cubic-bezier(0.34,1.3,0.64,1);
          text-decoration: none;
        }
        .social-pill:hover {
          color: #fff; border-color: rgba(124,58,237,0.5);
          background: rgba(124,58,237,0.12);
          transform: translateY(-2px) scale(1.08);
          box-shadow: 0 4px 16px rgba(124,58,237,0.25);
        }
        .social-tooltip {
          position: absolute; bottom: calc(100% + 8px); left: 50%;
          transform: translateX(-50%) scale(0.85);
          background: rgba(15,15,20,0.95); border: 1px solid rgba(124,58,237,0.3);
          color: #c4b5fd; font-size: 0.7rem; font-weight: 500;
          padding: 4px 9px; border-radius: 6px; white-space: nowrap;
          pointer-events: none; opacity: 0;
          transition: all 0.18s ease; backdrop-filter: blur(8px);
        }
        .social-pill:hover .social-tooltip { opacity: 1; transform: translateX(-50%) scale(1); }

        .divider-line {
          width: 1px; height: 20px;
          background: linear-gradient(to bottom, transparent, rgba(148,163,184,0.2), transparent);
        }

        .logo-mark { animation: glow-pulse 3s ease-in-out infinite; }

        /* ── Hamburger ── */
        .hamburger {
          display: flex; flex-direction: column; justify-content: center;
          align-items: center; gap: 4.5px; width: 38px; height: 38px;
          background: none; border: 1px solid rgba(124,58,237,0.35);
          border-radius: 10px; cursor: pointer; padding: 0; flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .hamburger.open { background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.6); }
        .hamburger-bar {
          display: block; width: 18px; height: 1.5px; background: #a78bfa;
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open .bar1 { transform: translateY(6px) rotate(45deg); }
        .hamburger.open .bar2 { opacity: 0; transform: scaleX(0); }
        .hamburger.open .bar3 { transform: translateY(-6px) rotate(-45deg); }

        /* ── Mobile Drawer ── */
        .mobile-drawer-overlay {
          position: fixed; inset: 0; top: 68px; z-index: 999;
          pointer-events: none; opacity: 0; transition: opacity 0.3s ease;
        }
        .mobile-drawer-overlay.visible { pointer-events: all; opacity: 1; }
        .mobile-overlay-bg {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
        }
        .mobile-drawer {
          position: absolute; top: 0; left: 0; right: 0;
          background: rgba(8,8,16,0.98);
          border-bottom: 1px solid rgba(124,58,237,0.2);
          transform: translateY(-16px); opacity: 0;
          transition: transform 0.35s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease;
          padding: 0.5rem 1.25rem 1.5rem;
          display: flex; flex-direction: column; gap: 0;
        }
        .light .mobile-drawer { background: rgba(248,248,255,0.98); }
        .mobile-drawer-overlay.visible .mobile-drawer { transform: translateY(0); opacity: 1; }

        .mobile-nav-item {
          display: flex; align-items: center; gap: 0.85rem;
          width: 100%; background: none; border: none; border-radius: 12px;
          padding: 0.72rem 0.85rem; cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease;
          text-decoration: none; margin-bottom: 0.15rem;
          position: relative; overflow: hidden;
        }
        .mobile-nav-item::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(124,58,237,0.12), transparent);
          opacity: 0; transition: opacity 0.2s ease; border-radius: inherit;
        }
        .mobile-nav-item:hover::before, .mobile-nav-item.active::before { opacity: 1; }
        .mobile-nav-item:active { transform: scale(0.98); }

        .mobile-nav-icon {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          font-size: 0.95rem; transition: background 0.2s ease, color 0.2s ease;
        }
        .mobile-nav-item.active .mobile-nav-icon { background: rgba(124,58,237,0.2); color: #c4b5fd; }
        .mobile-nav-item:not(.active) .mobile-nav-icon { background: rgba(255,255,255,0.04); color: #475569; }

        .mobile-nav-label { font-size: 0.95rem; font-weight: 500; letter-spacing: 0.01em; flex: 1; text-align: left; }
        .mobile-nav-item.active .mobile-nav-label { color: #c4b5fd; font-weight: 600; }
        .mobile-nav-item:not(.active) .mobile-nav-label { color: #64748b; }
        .light .mobile-nav-item:not(.active) .mobile-nav-label { color: #475569; }

        .mobile-nav-active-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          box-shadow: 0 0 8px rgba(124,58,237,0.6); flex-shrink: 0;
        }
        .mobile-section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent);
          margin: 0.65rem 0;
        }
        .mobile-social-strip { display: flex; align-items: center; gap: 0.55rem; }
        .mobile-social-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 11px;
          border: 1px solid rgba(124,58,237,0.2);
          background: rgba(124,58,237,0.05); color: #64748b;
          text-decoration: none; transition: all 0.2s cubic-bezier(0.34,1.3,0.64,1); flex-shrink: 0;
        }
        .mobile-social-btn:hover { color: #c4b5fd; background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.5); transform: translateY(-2px) scale(1.05); }

        .mobile-menu-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 0.85rem 0.6rem; margin-bottom: 0.25rem;
        }
        .mobile-menu-greeting { font-size: 0.72rem; font-weight: 500; color: #334155; letter-spacing: 0.08em; text-transform: uppercase; }
        .mobile-menu-section-label {
          font-size: 0.68rem; font-weight: 600; color: #4c1d95; letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(124,58,237,0.1); padding: 3px 8px; border-radius: 20px; border: 1px solid rgba(124,58,237,0.2);
        }
        .mobile-drawer-footer { opacity: 0; animation: mobileFooterIn 0.35s ease 0.25s forwards; }
        .mobile-drawer-overlay.visible .mobile-drawer-footer { animation: mobileFooterIn 0.35s ease 0.25s forwards; }

        @keyframes mobileItemIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .mobile-drawer-overlay.visible .mobile-nav-item { animation: mobileItemIn 0.3s ease forwards; }
        .mobile-drawer-overlay.visible .mobile-nav-item:nth-child(1) { animation-delay: 0.04s; }
        .mobile-drawer-overlay.visible .mobile-nav-item:nth-child(2) { animation-delay: 0.08s; }
        .mobile-drawer-overlay.visible .mobile-nav-item:nth-child(3) { animation-delay: 0.11s; }
        .mobile-drawer-overlay.visible .mobile-nav-item:nth-child(4) { animation-delay: 0.14s; }
        .mobile-drawer-overlay.visible .mobile-nav-item:nth-child(5) { animation-delay: 0.17s; }
        .mobile-drawer-overlay.visible .mobile-nav-item:nth-child(6) { animation-delay: 0.2s; }
        .mobile-drawer-overlay.visible .mobile-nav-item:nth-child(7) { animation-delay: 0.23s; }

        @keyframes mobileFooterIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav
        className="nav-root nav-bg"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          "--nav-opacity": scrollOpacity.toFixed(3),
        } as React.CSSProperties}
      >
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "68px", gap: "1rem",
        }}>

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("#home")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}
          >
            <div
              className="logo-mark"
              style={{
                width: "38px", height: "38px",
                background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "1.05rem", color: "white",
                fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px",
              }}
            >
              M
            </div>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem",
              background: "linear-gradient(135deg, #c4b5fd 0%, #67e8f9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "-0.3px",
            }}>
              Engineer
            </span>
          </button>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden-mobile" style={{ display: "flex", gap: "0.15rem", alignItems: "center", flex: 1, justifyContent: "center" }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  className={`nav-link-btn${isActive ? " active" : ""}`}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "0.45rem 0.85rem", borderRadius: "0.5rem",
                    fontSize: "0.855rem", fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#c4b5fd" : (hoveredLink === link.href ? "#e2e8f0" : "#64748b"),
                    transition: "color 0.2s ease", letterSpacing: "0.01em",
                  }}
                >
                  {getLabel(link)}
                </button>
              );
            })}
          </div>

          {/* ── Desktop Right: Socials + Divider + Lang + Theme + Auth ── */}
          <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="social-pill"
                aria-label={s.label}
                onMouseEnter={() => setHoveredSocial(s.label)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                {s.icon}
                <span className="social-tooltip">{s.label}</span>
              </a>
            ))}

            <div className="divider-line" style={{ margin: "0 0.15rem" }} />

            {/* Language Switcher */}
            <LangSwitcher locale={locale} onSwitch={switchLocale} />

            {/* Theme Dropper */}
            <ThemeDropper />

            <div className="divider-line" style={{ margin: "0 0.15rem" }} />

            {/* Auth: Sign In/Up or Profile */}
            {status !== "loading" && (
              session ? <UserProfileMenu /> : <AuthButtons />
            )}
          </div>

          {/* ── Mobile: Right controls ── */}
          <div className="show-mobile" style={{ alignItems: "center", gap: "0.4rem" }}>
            {/* Theme dropper on mobile */}
            <ThemeDropper />
            {/* Auth on mobile: profile icon or sign-in button */}
            {status !== "loading" && (
              session ? <UserProfileMenu /> : (
                <button
                  onClick={() => signIn()}
                  style={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                    border: "none",
                    borderRadius: "9px",
                    padding: "0 12px",
                    height: "34px",
                    cursor: "pointer",
                    color: "#fff",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Sign In
                </button>
              )
            )}
            {/* Hamburger */}
            <button
              ref={hamburgerRef}
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-bar bar1" />
              <span className="hamburger-bar bar2" />
              <span className="hamburger-bar bar3" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-drawer-overlay${menuOpen ? " visible" : ""}`}>
        <div className="mobile-overlay-bg" onClick={() => setMenuOpen(false)} />
        <div className="mobile-drawer overflow-y-auto" ref={menuRef}>
          {/* Header */}
          <div className="mobile-menu-header">
            <span className="mobile-menu-greeting">Navigation</span>
            <span className="mobile-menu-section-label">Menu</span>
          </div>

          {/* Nav items */}
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                className={`mobile-nav-item${isActive ? " active" : ""}`}
                onClick={() => scrollTo(link.href)}
              >
                <span className="mobile-nav-icon">{link.icon}</span>
                <span className="mobile-nav-label">{getLabel(link)}</span>
                {isActive && <span className="mobile-nav-active-dot" />}
              </button>
            );
          })}

          {/* Footer */}
          <div className="mobile-drawer-footer">
            <div className="mobile-section-divider" />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.85rem" }}>
              <div className="mobile-social-strip">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="mobile-social-btn"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              {/* Language switcher in mobile drawer */}
              <LangSwitcher locale={locale} onSwitch={(l) => { switchLocale(l); }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}