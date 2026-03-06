"use client";
import { useState, useEffect, useRef } from "react";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Fade in over first 80px of scroll
      const opacity = Math.min(y / 80, 1);
      setScrollOpacity(opacity);
      setScrolled(y > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-root * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .nav-bg {
          transition:
            background 0.4s ease,
            backdrop-filter 0.4s ease,
            -webkit-backdrop-filter 0.4s ease,
            border-color 0.4s ease,
            box-shadow 0.4s ease;
          background: rgba(7, 7, 12, calc(var(--nav-opacity, 0) * 0.88));
          backdrop-filter: blur(calc(var(--nav-opacity, 0) * 24px)) saturate(calc(100% + var(--nav-opacity, 0) * 80%));
          -webkit-backdrop-filter: blur(calc(var(--nav-opacity, 0) * 24px)) saturate(calc(100% + var(--nav-opacity, 0) * 80%));
          border-bottom: 1px solid rgba(124, 58, 237, calc(var(--nav-opacity, 0) * 0.15));
          box-shadow: 0 4px 32px rgba(0, 0, 0, calc(var(--nav-opacity, 0) * 0.3));
        }

        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(124,58,237,0.4); }
          50% { box-shadow: 0 0 18px rgba(124,58,237,0.7), 0 0 32px rgba(6,182,212,0.3); }
        }

        .nav-link-btn {
          position: relative;
          overflow: hidden;
        }
        .nav-link-btn::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 60%;
          height: 1.5px;
          background: linear-gradient(90deg, #7c3aed, #06b6d4);
          border-radius: 2px;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .nav-link-btn.active::after,
        .nav-link-btn:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        .social-pill {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1px solid rgba(148,163,184,0.15);
          background: rgba(255,255,255,0.03);
          color: #64748b;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.34,1.3,0.64,1);
          text-decoration: none;
        }
        .social-pill:hover {
          color: #fff;
          border-color: rgba(124,58,237,0.5);
          background: rgba(124,58,237,0.12);
          transform: translateY(-2px) scale(1.08);
          box-shadow: 0 4px 16px rgba(124,58,237,0.25);
        }

        .social-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) scale(0.85);
          background: rgba(15,15,20,0.95);
          border: 1px solid rgba(124,58,237,0.3);
          color: #c4b5fd;
          font-size: 0.7rem;
          font-weight: 500;
          padding: 4px 9px;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.18s ease;
          backdrop-filter: blur(8px);
        }
        .social-pill:hover .social-tooltip {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }

        .divider-line {
          width: 1px;
          height: 20px;
          background: linear-gradient(to bottom, transparent, rgba(148,163,184,0.2), transparent);
        }

        .hire-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .hire-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #9333ea, #0ea5e9);
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: inherit;
        }
        .hire-btn:hover::before { opacity: 1; }
        .hire-btn span { position: relative; z-index: 1; }

        .logo-mark {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .mobile-social-row a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(124,58,237,0.25);
          background: rgba(124,58,237,0.06);
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .mobile-social-row a:hover {
          color: #a78bfa;
          background: rgba(124,58,237,0.15);
          border-color: rgba(124,58,237,0.5);
        }
      `}</style>

      <nav
        className="nav-root nav-bg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          "--nav-opacity": scrollOpacity.toFixed(3),
        } as React.CSSProperties}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "68px",
            gap: "1rem",
          }}
        >
          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("#home")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}
          >
            <div
              className="logo-mark"
              style={{
                width: "38px",
                height: "38px",
                background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                borderRadius: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.05rem",
                color: "white",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              M
            </div>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                background: "linear-gradient(135deg, #c4b5fd 0%, #67e8f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.3px",
              }}
            >
              Engineer
            </span>
          </button>

          {/* ── Desktop Nav Links ── */}
          <div
            className="hidden-mobile"
            style={{ display: "flex", gap: "0.15rem", alignItems: "center", flex: 1, justifyContent: "center" }}
          >
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
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.45rem 0.85rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.855rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#c4b5fd" : (hoveredLink === link.href ? "#e2e8f0" : "#64748b"),
                    transition: "color 0.2s ease",
                    letterSpacing: "0.01em",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* ── Right Side: Socials + Hire Me ── */}
          <div
            className="hidden-mobile"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}
          >
            {/* Social Icons */}
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="social-pill"
                aria-label={s.label}
              >
                {s.icon}
                <span className="social-tooltip">{s.label}</span>
              </a>
            ))}

            {/* Divider */}
            <div className="divider-line" style={{ margin: "0 0.25rem" }} />

            {/* Hire Me */}
            <button
              className="hire-btn"
              onClick={() => scrollTo("#contact")}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #0891b2)",
                border: "none",
                cursor: "pointer",
                padding: "0.48rem 1.2rem",
                borderRadius: "2rem",
                fontSize: "0.855rem",
                fontWeight: 600,
                color: "white",
                letterSpacing: "0.02em",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 2px 12px rgba(124,58,237,0.35)",
                fontFamily: "'Syne', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(124,58,237,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(124,58,237,0.35)";
              }}
            >
              <span>Hire Me</span>
            </button>
          </div>

          {/* ── Mobile: Social strip + Hamburger ── */}
          <div className="show-mobile" style={{ alignItems: "center", gap: "0.5rem" }}>
            {/* Mini socials on mobile header */}
            {socialLinks.slice(0, 2).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "1px solid rgba(124,58,237,0.3)",
                  color: "#94a3b8",
                  background: "transparent",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                background: menuOpen ? "rgba(124,58,237,0.15)" : "none",
                border: "1px solid rgba(124,58,237,0.35)",
                borderRadius: "9px",
                padding: "0.4rem 0.65rem",
                cursor: "pointer",
                color: "#a78bfa",
                fontSize: "1.1rem",
                lineHeight: 1,
                transition: "all 0.2s ease",
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: "68px",
              left: 0,
              right: 0,
              background: "rgba(7, 7, 12, 0.97)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(124,58,237,0.18)",
              padding: "1rem 1.5rem 1.5rem",
              animation: "slideDown 0.25s ease forwards",
            }}
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    display: "flex",
                    width: "100%",
                    textAlign: "left",
                    background: isActive ? "rgba(124,58,237,0.1)" : "none",
                    border: "none",
                    borderLeft: isActive ? "2px solid #7c3aed" : "2px solid transparent",
                    cursor: "pointer",
                    padding: "0.7rem 1rem",
                    borderRadius: "0 0.5rem 0.5rem 0",
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#c4b5fd" : "#64748b",
                    marginBottom: "0.2rem",
                    transition: "all 0.15s ease",
                    animationDelay: `${i * 0.04}s`,
                  }}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Social links row */}
            <div className="mobile-social-row" style={{ display: "flex", gap: "0.6rem", margin: "1rem 0 0.75rem" }}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #7c3aed, #0891b2)",
                border: "none",
                cursor: "pointer",
                padding: "0.75rem",
                borderRadius: "2rem",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "white",
                boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              Hire Me
            </button>
          </div>
        )}
      </nav>
    </>
  );
}