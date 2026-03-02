"use client";
import { useEffect, useState } from "react";
import { personalInfo } from "@/lib/data";

const roles = personalInfo.roles;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const target = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        paddingTop: "70px",
      }}
    >
      {/* Animated background orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
              width: `${200 + i * 60}px`,
              height: `${200 + i * 60}px`,
              left: `${[10, 70, 30, 80, 5, 60][i]}%`,
              top: `${[10, 60, 80, 20, 50, 40][i]}%`,
              transform: "translate(-50%, -50%)",
              animation: `float ${5 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="container-portfolio"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "2rem 1.5rem",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.35)",
            borderRadius: "2rem",
            padding: "0.4rem 1.2rem",
            fontSize: "0.85rem",
            color: "#a78bfa",
            fontWeight: 500,
            marginBottom: "2rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <span style={{ fontSize: "0.9rem" }}>👋</span>
          Welcome to my portfolio
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.1s",
          }}
        >
          Hi, I&apos;m{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {personalInfo.name}
          </span>
        </h1>

        {/* Typewriter Role */}
        <div
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
            fontWeight: 600,
            marginBottom: "1.5rem",
            color: "#e2e8f0",
            minHeight: "2.5rem",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease 0.2s",
          }}
        >
          I&apos;m a{" "}
          <span
            style={{
              color: "#06b6d4",
              fontFamily: "var(--font-fira-code), monospace",
            }}
          >
            {displayed}
          </span>
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.4em",
              background: "#06b6d4",
              marginLeft: "2px",
              verticalAlign: "middle",
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            color: "#94a3b8",
            maxWidth: "620px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.3s",
          }}
        >
          {personalInfo.bio}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "4rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.4s",
          }}
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              border: "none",
              cursor: "pointer",
              padding: "0.85rem 2.25rem",
              borderRadius: "2rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "white",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 15px 40px rgba(124,58,237,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            🚀 View My Work
          </button>
          <a
            href={personalInfo.cvUrl}
            download
            style={{
              background: "transparent",
              border: "1px solid rgba(124,58,237,0.5)",
              cursor: "pointer",
              padding: "0.85rem 2.25rem",
              borderRadius: "2rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#a78bfa",
              textDecoration: "none",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#7c3aed";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124,58,237,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            📄 Download CV
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1rem",
            maxWidth: "600px",
            margin: "0 auto",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease 0.5s",
          }}
        >
          {personalInfo.stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "1rem",
                padding: "1rem 0.75rem",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.5)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(124,58,237,0.12)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.2)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(124,58,237,0.08)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "#475569",
            fontSize: "0.8rem",
          }}
        >
          <span>Scroll down</span>
          <div
            style={{
              width: "24px",
              height: "40px",
              border: "2px solid rgba(124,58,237,0.4)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "4px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "8px",
                background: "#7c3aed",
                borderRadius: "2px",
                animation: "bounce-subtle 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-30px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(16,185,129,0.5); }
          50% { box-shadow: 0 0 15px rgba(16,185,129,0.9); }
        }
      `}</style>
    </section>
  );
}
