"use client";
import { useEffect, useRef, useState } from "react";
import { skillCategories, type SkillCategory } from "@/lib/data";

function SkillBar({ name, level, color, visible }: { name: string; level: number; color: string; visible: boolean }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "0.9rem", color: "#cbd5e1", fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: "0.85rem", color: "#64748b", fontFamily: "var(--font-fira-code), monospace" }}>{level}%</span>
      </div>
      <div style={{
        position: "relative",
        height: "8px",
        background: "rgba(124,58,237,0.1)",
        borderRadius: "4px",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          width: visible ? `${level}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1)`,
          borderRadius: "4px",
          boxShadow: `0 0 10px ${color}66`,
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Reset visible on tab change to re-animate
  const handleTabChange = (id: string) => {
    setVisible(false);
    setActiveTab(id);
    setTimeout(() => setVisible(true), 50);
  };

  const activeCategory = skillCategories.find((c) => c.id === activeTab) as SkillCategory;

  const techStack = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL",
    "MongoDB", "Redis", "Docker", "AWS", "Figma", "Git", "GraphQL", "Tailwind",
  ];

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "6rem 1.5rem",
        background: "linear-gradient(180deg, #0a0a0f 0%, #0d0d1a 100%)",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute",
        left: "-100px",
        top: "30%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#7c3aed",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontFamily: "var(--font-fira-code), monospace",
          }}>// my skills</span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            marginTop: "0.5rem",
            color: "#e2e8f0",
          }}>
            Technical{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Expertise</span>
          </h2>
          <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "2px", margin: "1rem auto 0" }} />
          <p style={{ color: "#64748b", marginTop: "1rem", fontSize: "1rem" }}>
            Proficient across multiple technology stacks and disciplines
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "3rem",
        }}>
          {skillCategories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                style={{
                  background: isActive ? `${cat.color}22` : "rgba(15,15,26,0.5)",
                  border: `1px solid ${isActive ? cat.color : "rgba(124,58,237,0.2)"}`,
                  borderRadius: "2rem",
                  padding: "0.6rem 1.4rem",
                  cursor: "pointer",
                  color: isActive ? cat.color : "#64748b",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.9rem",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: isActive ? `0 0 20px ${cat.color}33` : "none",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          alignItems: "start",
        }}>
          {/* Skill Bars Panel */}
          <div style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.07), rgba(6,182,212,0.04))",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: "1.25rem",
            padding: "2rem",
          }}>
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: activeCategory.color,
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <span style={{ fontSize: "1.3rem" }}>
                {activeTab === "frontend" && "🖥️"}
                {activeTab === "backend" && "⚙️"}
                {activeTab === "cloud" && "☁️"}
                {activeTab === "mobile" && "📱"}
                {activeTab === "design" && "🎨"}
              </span>
              {activeCategory.label} Skills
            </h3>
            {activeCategory.skills.map((s, i) => (
              <SkillBar
                key={s.name}
                name={s.name}
                level={s.level}
                color={activeCategory.color}
                visible={visible}
              />
            ))}
          </div>

          {/* Proficiency Chart Panel */}
          <div style={{
            background: "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(124,58,237,0.04))",
            border: "1px solid rgba(6,182,212,0.2)",
            borderRadius: "1.25rem",
            padding: "2rem",
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#06b6d4", marginBottom: "1.5rem" }}>
              📊 Proficiency Overview
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {activeCategory.skills.map((skill, i) => {
                const size = 80;
                const radius = 30;
                const circumference = 2 * Math.PI * radius;
                const progress = (skill.level / 100) * circumference;
                return (
                  <div key={i} style={{
                    textAlign: "center",
                    padding: "1rem 0.5rem",
                    borderRadius: "0.75rem",
                    background: "rgba(124,58,237,0.05)",
                    border: "1px solid rgba(124,58,237,0.1)",
                  }}>
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
                      <circle
                        cx={size / 2} cy={size / 2} r={radius}
                        fill="none"
                        stroke="rgba(124,58,237,0.15)"
                        strokeWidth="6"
                      />
                      <circle
                        cx={size / 2} cy={size / 2} r={radius}
                        fill="none"
                        stroke={activeCategory.color}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={visible ? circumference - progress : circumference}
                        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
                      />
                    </svg>
                    <div style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: activeCategory.color,
                      marginTop: "-58px",
                      lineHeight: `${size}px`,
                    }}>
                      {skill.level}%
                    </div>
                    <div style={{
                      marginTop: "8px",
                      fontSize: "0.72rem",
                      color: "#64748b",
                      fontWeight: 500,
                      lineClamp: 2,
                    }}>
                      {skill.name.split(" ")[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div style={{ marginTop: "3.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1rem", color: "#475569", marginBottom: "1.25rem", fontWeight: 600 }}>
            Technologies I work with
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
            {techStack.map((tech, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "0.5rem",
                  padding: "0.4rem 1rem",
                  fontSize: "0.85rem",
                  color: "#a78bfa",
                  fontFamily: "var(--font-fira-code), monospace",
                  transition: "all 0.2s ease",
                  cursor: "default",
                  animationDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.background = "rgba(124,58,237,0.18)";
                  (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(124,58,237,0.5)";
                  (e.currentTarget as HTMLSpanElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.background = "rgba(124,58,237,0.08)";
                  (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(124,58,237,0.2)";
                  (e.currentTarget as HTMLSpanElement).style.transform = "translateY(0)";
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
