"use client";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const goto = (i: number) => {
    setActive(i);
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  return (
    <section
      ref={ref}
      style={{
        padding: "6rem 1.5rem",
        background: "linear-gradient(180deg, #0a0a0f 0%, #0d0d1a 100%)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            fontSize: "0.85rem", fontWeight: 600, color: "#ec4899",
            textTransform: "uppercase", letterSpacing: "0.15em",
            fontFamily: "var(--font-fira-code), monospace",
          }}>// testimonials</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: "0.5rem", color: "#e2e8f0" }}>
            What People{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Say</span>
          </h2>
          <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "2px", margin: "1rem auto 0" }} />
        </div>

        {/* Testimonial Card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05))",
          border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: "1.5rem",
          padding: "2.5rem",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.6s ease",
          position: "relative",
        }}>
          {/* Quote mark */}
          <div style={{
            position: "absolute",
            top: "1.5rem",
            left: "2rem",
            fontSize: "5rem",
            lineHeight: 1,
            color: "rgba(124,58,237,0.15)",
            fontFamily: "serif",
            fontWeight: 900,
          }}>&ldquo;</div>

          {/* Avatar */}
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "white",
            margin: "0 auto 1.5rem",
            border: "3px solid rgba(124,58,237,0.4)",
            boxShadow: "0 0 30px rgba(124,58,237,0.3)",
          }}>
            {testimonials[active].avatar}
          </div>

          {/* Stars */}
          <div style={{ marginBottom: "1.25rem", fontSize: "1.1rem" }}>
            {"★★★★★".split("").map((s, i) => (
              <span key={i} style={{ color: "#f59e0b" }}>{s}</span>
            ))}
          </div>

          {/* Text */}
          <p style={{
            fontSize: "1.05rem",
            color: "#94a3b8",
            lineHeight: 1.8,
            fontStyle: "italic",
            marginBottom: "1.75rem",
            position: "relative",
            zIndex: 1,
          }}>
            &ldquo;{testimonials[active].text}&rdquo;
          </p>

          {/* Name + Role */}
          <div>
            <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: "1rem" }}>
              {testimonials[active].name}
            </div>
            <div style={{ fontSize: "0.85rem", color: "#7c3aed", marginTop: "0.2rem" }}>
              {testimonials[active].role} — {testimonials[active].company}
            </div>
          </div>
        </div>

        {/* Dot Navigation */}
        <div style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "center",
          marginTop: "1.75rem",
        }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              style={{
                width: i === active ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === active ? "linear-gradient(90deg, #7c3aed, #06b6d4)" : "rgba(124,58,237,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.25rem" }}>
          {["◀", "▶"].map((arrow, i) => (
            <button
              key={i}
              onClick={() => goto(i === 0
                ? (active - 1 + testimonials.length) % testimonials.length
                : (active + 1) % testimonials.length
              )}
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.3)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                color: "#a78bfa",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(124,58,237,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(124,58,237,0.1)";
              }}
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
