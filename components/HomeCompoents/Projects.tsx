"use client";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/data";

const filters = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI / ML" },
  { id: "oss", label: "Open Source" },
];

function ProjectCard({ project, visible, index }: { project: Project; visible: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(135deg, rgba(15,15,26,0.9), rgba(30,27,75,0.4))",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.5)" : "rgba(124,58,237,0.15)"}`,
        borderRadius: "1.25rem",
        overflow: "hidden",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-8px)" : visible ? "translateY(0)" : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        boxShadow: hovered ? "0 20px 60px rgba(124,58,237,0.2)" : "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Project Header */}
      <div style={{
        padding: "2rem 1.75rem 1.5rem",
        background: project.gradient,
        position: "relative",
        overflow: "hidden",
        minHeight: "130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
        }} />
        <div style={{
          position: "relative",
          zIndex: 1,
          fontSize: "2.5rem",
          lineHeight: 1,
        }}>{project.emoji}</div>
        {project.featured && (
          <div style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "2rem",
            padding: "0.2rem 0.65rem",
            fontSize: "0.7rem",
            color: "white",
            fontWeight: 600,
            zIndex: 1,
          }}>★ Featured</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.6, marginBottom: "1rem", flex: 1 }}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "0.4rem",
              padding: "0.2rem 0.6rem",
              fontSize: "0.72rem",
              color: "#a78bfa",
              fontFamily: "var(--font-fira-code), monospace",
            }}>{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span style={{
              fontSize: "0.72rem", color: "#475569",
              display: "flex", alignItems: "center",
            }}>+{project.tech.length - 4} more</span>
          )}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "0.55rem",
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.25)",
                borderRadius: "0.6rem",
                color: "#a78bfa",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.2)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.1)"}
            >🐙 GitHub</a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "0.55rem",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                border: "none",
                borderRadius: "0.6rem",
                color: "white",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
              onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
            >🔗 Live Demo</a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
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

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        padding: "6rem 1.5rem",
        background: "linear-gradient(180deg, #0d0d1a 0%, #0a0a0f 100%)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            fontSize: "0.85rem", fontWeight: 600, color: "#f59e0b",
            textTransform: "uppercase", letterSpacing: "0.15em",
            fontFamily: "var(--font-fira-code), monospace",
          }}>// my portfolio</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: "0.5rem", color: "#e2e8f0" }}>
            Featured{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Projects</span>
          </h2>
          <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "2px", margin: "1rem auto 0" }} />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
          {filters.map((f) => {
            const isActive = f.id === activeFilter;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  background: isActive ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(15,15,26,0.8)",
                  border: `1px solid ${isActive ? "transparent" : "rgba(124,58,237,0.25)"}`,
                  borderRadius: "2rem",
                  padding: "0.55rem 1.3rem",
                  cursor: "pointer",
                  color: isActive ? "white" : "#64748b",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.875rem",
                  transition: "all 0.25s ease",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} visible={visible} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href="https://github.com/alexdev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "transparent",
              border: "1px solid rgba(124,58,237,0.4)",
              borderRadius: "2rem",
              padding: "0.75rem 2rem",
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            🐙 View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
