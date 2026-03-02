"use client";
import { useEffect, useRef, useState } from "react";
import { experiences } from "@/lib/data";

export default function Experience() {
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
      id="experience"
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
        right: "-150px",
        bottom: "10%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{
            fontSize: "0.85rem", fontWeight: 600, color: "#10b981",
            textTransform: "uppercase", letterSpacing: "0.15em",
            fontFamily: "var(--font-fira-code), monospace",
          }}>// career path</span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800, marginTop: "0.5rem", color: "#e2e8f0",
          }}>
            Experience &{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Education</span>
          </h2>
          <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "2px", margin: "1rem auto 0" }} />
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Timeline Line */}
          <div style={{
            position: "absolute",
            left: "28px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(180deg, #7c3aed, #06b6d4, transparent)",
            borderRadius: "2px",
          }} />

          {experiences.map((exp, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1.5rem",
                marginBottom: "2.5rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              {/* Timeline Dot */}
              <div style={{ flexShrink: 0, paddingTop: "1.25rem" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: exp.type === "work"
                    ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
                    : "linear-gradient(135deg, #10b981, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  border: "3px solid #0a0a0f",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                  boxShadow: exp.type === "work" ? "0 0 20px rgba(124,58,237,0.4)" : "0 0 20px rgba(16,185,129,0.4)",
                }}>
                  {exp.type === "work" ? "💼" : "🎓"}
                </div>
              </div>

              {/* Card */}
              <div style={{
                flex: 1,
                background: "linear-gradient(135deg, rgba(124,58,237,0.07), rgba(6,182,212,0.04))",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "1.25rem",
                padding: "1.5rem",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.4)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.2)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.2rem" }}>
                      {exp.role}
                    </h3>
                    <div style={{ fontSize: "0.9rem", color: "#a78bfa", fontWeight: 600 }}>
                      {exp.company}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.25)",
                      borderRadius: "2rem",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.8rem",
                      color: "#7c3aed",
                      fontWeight: 600,
                      fontFamily: "var(--font-fira-code), monospace",
                    }}>{exp.period}</div>
                    <div style={{ fontSize: "0.8rem", color: "#475569", marginTop: "0.3rem" }}>📍 {exp.location}</div>
                  </div>
                </div>

                <ul style={{ marginTop: "0.75rem", paddingLeft: "0" }}>
                  {exp.description.map((d, j) => (
                    <li key={j} style={{
                      fontSize: "0.9rem",
                      color: "#64748b",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      marginBottom: "0.4rem",
                      listStyle: "none",
                    }}>
                      <span style={{ color: "#7c3aed", marginTop: "2px", flexShrink: 0 }}>▸</span>
                      {d}
                    </li>
                  ))}
                </ul>

                {exp.tech && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem" }}>
                    {exp.tech.map((t, j) => (
                      <span key={j} style={{
                        background: "rgba(6,182,212,0.1)",
                        border: "1px solid rgba(6,182,212,0.2)",
                        borderRadius: "0.4rem",
                        padding: "0.2rem 0.65rem",
                        fontSize: "0.75rem",
                        color: "#67e8f9",
                        fontFamily: "var(--font-fira-code), monospace",
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
