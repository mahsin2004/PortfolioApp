"use client";
import { useState, useRef, useEffect } from "react";
import { personalInfo } from "@/lib/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1.1rem",
    background: "rgba(124,58,237,0.06)",
    border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: "0.75rem",
    color: "#e2e8f0",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  };

  const socialLinks = [
    { href: personalInfo.github, icon: "🐙", label: "GitHub", color: "#7c3aed" },
    { href: personalInfo.linkedin, icon: "💼", label: "LinkedIn", color: "#0077b5" },
    { href: personalInfo.twitter, icon: "🐦", label: "Twitter", color: "#1da1f2" },
    { href: `mailto:${personalInfo.email}`, icon: "📧", label: "Email", color: "#ea4335" },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "6rem 1.5rem",
        background: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG decoration */}
      <div style={{
        position: "absolute",
        right: "-200px",
        top: "20%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            fontSize: "0.85rem", fontWeight: 600, color: "#10b981",
            textTransform: "uppercase", letterSpacing: "0.15em",
            fontFamily: "var(--font-fira-code), monospace",
          }}>// get in touch</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: "0.5rem", color: "#e2e8f0" }}>
            Let&apos;s{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Work Together</span>
          </h2>
          <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "2px", margin: "1rem auto 0" }} />
          <p style={{ color: "#64748b", marginTop: "1rem" }}>
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "3rem",
          alignItems: "start",
        }}>
          {/* Left: Info */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-30px)",
            transition: "all 0.7s ease",
          }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
              Contact Information
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.7, marginBottom: "2rem", fontSize: "0.95rem" }}>
              I&apos;m currently available for freelance work and full-time positions. If you have a project that needs creative development, I&apos;d love to be part of it.
            </p>

            {[
              { icon: "📍", label: "Location", val: personalInfo.location },
              { icon: "📧", label: "Email", val: personalInfo.email },
              { icon: "📱", label: "Phone", val: personalInfo.phone },
              { icon: "✅", label: "Status", val: personalInfo.availability },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                padding: "0.85rem",
                background: "rgba(124,58,237,0.05)",
                border: "1px solid rgba(124,58,237,0.12)",
                borderRadius: "0.75rem",
                marginBottom: "0.75rem",
              }}>
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                  <div style={{ fontSize: "0.9rem", color: "#c4b5fd", fontWeight: 500 }}>{item.val}</div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    borderRadius: "0.75rem",
                    padding: "0.6rem 1rem",
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
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
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

          {/* Right: Form */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(30px)",
            transition: "all 0.7s ease 0.15s",
          }}>
            <form onSubmit={handleSubmit} style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.07), rgba(6,182,212,0.04))",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "1.25rem",
              padding: "2rem",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "0.4rem", display: "block" }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#7c3aed";
                      (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "rgba(124,58,237,0.2)";
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "0.4rem", display: "block" }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#7c3aed";
                      (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "rgba(124,58,237,0.2)";
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "0.4rem", display: "block" }}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Project Inquiry / Collaboration"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "#7c3aed";
                    (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "rgba(124,58,237,0.2)";
                    (e.target as HTMLInputElement).style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "0.4rem", display: "block" }}>Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                  onFocus={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = "#7c3aed";
                    (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = "rgba(124,58,237,0.2)";
                    (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  background: status === "sent"
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  border: "none",
                  borderRadius: "0.75rem",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (status !== "sending") {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 30px rgba(124,58,237,0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                {status === "idle" && "🚀 Send Message"}
                {status === "sending" && "⏳ Sending..."}
                {status === "sent" && "✅ Message Sent!"}
                {status === "error" && "❌ Try Again"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
