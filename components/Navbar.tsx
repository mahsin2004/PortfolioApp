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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Update active section from IntersectionObserver
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(10, 10, 15, 0.9)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(124, 58, 237, 0.2)"
          : "none",
        padding: "0 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1rem",
              color: "white",
            }}
          >
            {personalInfo.shortName[0]}
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {personalInfo.shortName}Dev
          </span>
        </button>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  // background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#a78bfa" : "#94a3b8",
                  background: isActive ? "rgba(124,58,237,0.12)" : "transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLButtonElement).style.color = "#c4b5fd";
                    (e.target as HTMLButtonElement).style.background = "rgba(124,58,237,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLButtonElement).style.color = "#94a3b8";
                    (e.target as HTMLButtonElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              marginLeft: "0.5rem",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 1.25rem",
              borderRadius: "2rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "white",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.opacity = "0.85";
              (e.target as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.opacity = "1";
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "1px solid rgba(124,58,237,0.4)",
            borderRadius: "8px",
            padding: "0.4rem 0.6rem",
            cursor: "pointer",
            color: "#a78bfa",
            fontSize: "1.2rem",
            lineHeight: 1,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: "70px",
            left: 0,
            right: 0,
            background: "rgba(10, 10, 15, 0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(124,58,237,0.2)",
            padding: "1rem 1.5rem 1.5rem",
            animation: "slideDown 0.3s ease forwards",
          }}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontWeight: activeSection === link.href.replace("#", "") ? 600 : 400,
                color: activeSection === link.href.replace("#", "") ? "#a78bfa" : "#94a3b8",
                marginBottom: "0.25rem",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              marginTop: "0.5rem",
              width: "100%",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              border: "none",
              cursor: "pointer",
              padding: "0.75rem",
              borderRadius: "2rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "white",
            }}
          >
            Hire Me
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
