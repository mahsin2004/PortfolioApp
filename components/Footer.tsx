"use client";
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

export default function Footer() {
  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{
      background: "#06060f",
      borderTop: "1px solid rgba(124,58,237,0.15)",
      padding: "3rem 1.5rem 2rem",
      position: "relative",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          marginBottom: "2.5rem",
        }}>
          {/* Brand */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "white",
              }}>{personalInfo.shortName[0]}</div>
              <span style={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>{personalInfo.shortName}Dev</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.6 }}>
              Building digital experiences that matter. Available for projects worldwide.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
              Navigation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#475569",
                    fontSize: "0.875rem",
                    textAlign: "left",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#a78bfa"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#475569"}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { icon: "📧", val: personalInfo.email },
                { icon: "📱", val: personalInfo.phone },
                { icon: "📍", val: personalInfo.location },
              ].map((item, i) => (
                <div key={i} style={{ fontSize: "0.875rem", color: "#475569", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span>{item.icon}</span>
                  <span>{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
              Connect
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: personalInfo.github, label: "🐙 GitHub" },
                { href: personalInfo.linkedin, label: "💼 LinkedIn" },
                { href: personalInfo.twitter, label: "🐦 Twitter" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#475569",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#a78bfa"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#475569"}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(124,58,237,0.12)", marginBottom: "1.5rem" }} />

        {/* Bottom Row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{ fontSize: "0.8rem", color: "#334155" }}>
            © {new Date().getFullYear()} {personalInfo.name}. Made with ❤️ & Next.js
          </p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span style={{
              fontSize: "0.75rem",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: "2rem",
              padding: "0.2rem 0.75rem",
              color: "#10b981",
              fontWeight: 500,
            }}>
              ✦ PWA Enabled
            </span>
            <button
              onClick={scrollToTop}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                color: "white",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              title="Back to top"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 20px rgba(124,58,237,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
