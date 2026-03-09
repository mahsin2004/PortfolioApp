"use client";
import { useEffect, useRef, useState } from "react";
import { achievements } from "@/lib/data";

const typeColors: Record<string, string> = {
  certification: "#06b6d4",
  award: "#f59e0b",
  community: "#10b981",
};

const typeLabels: Record<string, string> = {
  certification: "Certification",
  award: "Award",
  community: "Community",
};

export default function Achievements() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      ref={ref}
      style={{
        padding: "6rem 1.5rem",
        background: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        left: "50%",
        top: "20%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            fontSize: "0.85rem", fontWeight: 600, color: "#f59e0b",
            textTransform: "uppercase", letterSpacing: "0.15em",
            fontFamily: "var(--font-fira-code), monospace",
          }}>// recognition</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: "0.5rem", color: "#e2e8f0" }}>
            Achievements &{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Certifications</span>
          </h2>
          <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "2px", margin: "1rem auto 0" }} />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
          {achievements.map((ach, i) => {
            const color = typeColors[ach.type];
            return (
              <div
                key={i}
                style={{
                  background: `linear-gradient(135deg, rgba(15,15,26,0.95), rgba(30,27,75,0.3))`,
                  border: `1px solid ${color}33`,
                  borderRadius: "1.25rem",
                  padding: "1.75rem",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                  transition: `all 0.55s ease ${i * 0.1}s`,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${color}66`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.01)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${color}22`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${color}33`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Glow accent */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "80px",
                  height: "80px",
                  borderRadius: "0 1.25rem 0 80px",
                  background: `${color}15`,
                }} />

                {/* Type label */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  background: `${color}18`,
                  border: `1px solid ${color}33`,
                  borderRadius: "2rem",
                  padding: "0.2rem 0.7rem",
                  fontSize: "0.72rem",
                  color: color,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                }}>
                  {typeLabels[ach.type]}
                </div>

                {/* Icon */}
                <div style={{
                  fontSize: "2.5rem",
                  marginBottom: "1rem",
                  filter: `drop-shadow(0 0 10px ${color}66)`,
                  lineHeight: 1,
                }}>{ach.icon}</div>

                {/* Title */}
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#e2e8f0",
                  marginBottom: "0.35rem",
                  lineHeight: 1.3,
                }}>{ach.title}</h3>

                {/* Issuer & Date */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.8rem", color: color, fontWeight: 500 }}>{ach.issuer}</span>
                  <span style={{
                    fontSize: "0.75rem",
                    color: "#475569",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "0.4rem",
                    padding: "0.15rem 0.5rem",
                    fontFamily: "var(--font-fira-code), monospace",
                  }}>{ach.date}</span>
                </div>

                {/* Description */}
                <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6 }}>{ach.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
