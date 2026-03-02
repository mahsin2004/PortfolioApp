"use client";
import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/lib/data";

function CounterCard({ value, label }: { value: string; label: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.06))",
        border: "1px solid rgba(124,58,237,0.25)",
        borderRadius: "1rem",
        padding: "1.5rem",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}
    >
      <div style={{
        fontSize: "2.25rem",
        fontWeight: 900,
        background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>{value}</div>
      <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem" }}>{label}</div>
    </div>
  );
}

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "6rem 1.5rem",
        background: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute",
        right: "-200px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#06b6d4",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontFamily: "var(--font-fira-code), monospace",
          }}>// about me</span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            marginTop: "0.5rem",
            color: "#e2e8f0",
          }}>
            Who{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Am I?</span>
          </h2>
          <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "2px", margin: "1rem auto 0" }} />
        </div>

        {/* Content Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}>
          {/* Avatar Side */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.8s ease",
          }}>
            <div style={{ position: "relative" }}>
              {/* Rotating ring */}
              <div style={{
                position: "absolute",
                inset: "-12px",
                borderRadius: "50%",
                border: "2px dashed rgba(124,58,237,0.4)",
                animation: "spin-slow 12s linear infinite",
              }} />
              {/* Glow */}
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
                animation: "pulse-glow 3s ease-in-out infinite",
              }} />
              {/* Avatar */}
              <div style={{
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "6rem",
                position: "relative",
                border: "4px solid rgba(124,58,237,0.4)",
              }}>
                👨‍💻
              </div>
              {/* Status badge */}
              <div style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                background: "rgba(10,10,15,0.9)",
                border: "1px solid rgba(16,185,129,0.4)",
                borderRadius: "2rem",
                padding: "0.35rem 0.8rem",
                fontSize: "0.75rem",
                color: "#10b981",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                {personalInfo.availability}
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.8s ease 0.2s",
          }}>
            <p style={{
              fontSize: "1.1rem",
              color: "#94a3b8",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}>
              {personalInfo.bio}
            </p>
            <p style={{
              fontSize: "1rem",
              color: "#64748b",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}>
              When I&apos;m not coding, I contribute to open-source projects, mentor junior developers, write technical articles, and explore new emerging technologies. I believe in writing clean, maintainable code and building products that make a real difference.
            </p>

            {/* Info Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
              {[
                { label: "Location", value: personalInfo.location, icon: "📍" },
                { label: "Email", value: personalInfo.email, icon: "📧" },
                { label: "Phone", value: personalInfo.phone, icon: "📱" },
                { label: "Status", value: personalInfo.availability, icon: "✅" },
              ].map((item, i) => (
                <div key={i} style={{
                  background: "rgba(124,58,237,0.06)",
                  border: "1px solid rgba(124,58,237,0.15)",
                  borderRadius: "0.75rem",
                  padding: "0.75rem",
                }}>
                  <span style={{ fontSize: "0.75rem", color: "#475569", display: "block", marginBottom: "0.2rem" }}>
                    {item.icon} {item.label}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#c4b5fd", fontWeight: 500 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { href: personalInfo.github, icon: "🐙", label: "GitHub" },
                { href: personalInfo.linkedin, icon: "💼", label: "LinkedIn" },
                { href: personalInfo.twitter, icon: "🐦", label: "Twitter" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    borderRadius: "0.75rem",
                    padding: "0.6rem 1.1rem",
                    textDecoration: "none",
                    color: "#a78bfa",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          marginTop: "4rem",
        }}>
          {personalInfo.stats.map((s, i) => (
            <CounterCard key={i} value={s.value} label={s.label} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.3); }
          50% { box-shadow: 0 0 60px rgba(124,58,237,0.6); }
        }
      `}</style>
    </section>
  );
}
