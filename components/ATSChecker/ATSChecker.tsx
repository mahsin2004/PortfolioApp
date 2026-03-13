"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { ATSResult } from "@/app/api/ats-check/route";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getScoreColor(score: number) {
  if (score >= 85) return { main: "#00d084", glow: "rgba(0,208,132,0.35)", text: "#00d084" };
  if (score >= 70) return { main: "#36c5f0", glow: "rgba(54,197,240,0.35)", text: "#36c5f0" };
  if (score >= 55) return { main: "#f0b429", glow: "rgba(240,180,41,0.35)", text: "#f0b429" };
  if (score >= 40) return { main: "#ff7043", glow: "rgba(255,112,67,0.35)", text: "#ff7043" };
  return { main: "#ff4757", glow: "rgba(255,71,87,0.35)", text: "#ff4757" };
}

function getGradeLetter(score: number) {
  if (score >= 90) return { grade: "A+", label: "Outstanding" };
  if (score >= 80) return { grade: "A",  label: "Excellent" };
  if (score >= 70) return { grade: "B+", label: "Very Good" };
  if (score >= 60) return { grade: "B",  label: "Good" };
  if (score >= 50) return { grade: "C",  label: "Average" };
  if (score >= 35) return { grade: "D",  label: "Below Avg" };
  return { grade: "F", label: "Poor" };
}

// ─── Score Ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const [anim, setAnim] = useState(0);
  const R = 58, C = 2 * Math.PI * R;
  const col = getScoreColor(score);
  const { grade, label } = getGradeLetter(score);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const run = (now: number) => {
      const t = Math.min((now - start) / 1200, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setAnim(Math.round(ease * score));
      if (t < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{ position: "relative", width: 148, height: 148 }}>
        <svg width={148} height={148} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={74} cy={74} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={10} />
          <circle
            cx={74} cy={74} r={R} fill="none"
            stroke={col.main} strokeWidth={10}
            strokeDasharray={C}
            strokeDashoffset={C - (anim / 100) * C}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.03s linear", filter: `drop-shadow(0 0 8px ${col.main})` }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px"
        }}>
          <span style={{ fontSize: "2.1rem", fontWeight: 800, color: col.main, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {anim}
          </span>
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
            /100
          </span>
        </div>
      </div>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: `${col.main}18`, border: `1px solid ${col.main}40`,
        borderRadius: "100px", padding: "6px 16px",
      }}>
        <span style={{ fontSize: "1.1rem", fontWeight: 900, color: col.main }}>{grade}</span>
        <span style={{ width: "1px", height: "14px", background: `${col.main}40` }} />
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: col.main }}>{label}</span>
      </div>
    </div>
  );
}

// ─── Category Row ─────────────────────────────────────────────────────────────
function CategoryRow({ cat, delay }: { cat: ATSResult["categories"][0]; delay: number }) {
  const [w, setW] = useState(0);
  const [open, setOpen] = useState(false);
  const col = getScoreColor(cat.score);

  useEffect(() => {
    const t = setTimeout(() => setW(cat.score), delay);
    return () => clearTimeout(t);
  }, [cat.score, delay]);

  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <span style={{ fontSize: "1.1rem", width: "24px", textAlign: "center", flexShrink: 0 }}>{cat.icon}</span>
        <span style={{ flex: 1, fontSize: "0.875rem", fontWeight: 600, color: "#e8eaf0" }}>{cat.label}</span>
        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: col.main, minWidth: "38px", textAlign: "right" }}>
          {cat.score}%
        </span>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        >
          <path d="M3 5l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{
        height: "5px", background: "rgba(255,255,255,0.06)",
        borderRadius: "100px", overflow: "hidden", marginLeft: "36px",
      }}>
        <div style={{
          height: "100%", borderRadius: "100px",
          width: `${w}%`, background: col.main,
          boxShadow: `0 0 10px ${col.glow}`,
          transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
      {open && cat.details.length > 0 && (
        <div style={{
          marginLeft: "36px", marginTop: "10px",
          display: "flex", flexDirection: "column", gap: "6px",
          paddingBottom: "4px",
        }}>
          {cat.details.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <span style={{ color: col.main, fontSize: "0.7rem", marginTop: "3px", flexShrink: 0 }}>●</span>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{d}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────
function UploadZone({ file, onFile, onClear, stretch }: { file: File | null; onFile: (f: File) => void; onClear: () => void; stretch?: boolean }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const ACCEPT = ".pdf,.doc,.docx,.txt,.rtf";

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0]; if (f) onFile(f);
  }, [onFile]);

  if (file) {
    const ext = file.name.split(".").pop()?.toUpperCase() ?? "FILE";
    const extCol: Record<string, string> = { PDF: "#ff4757", DOCX: "#36c5f0", DOC: "#36c5f0", TXT: "#00d084", RTF: "#f0b429" };
    const c = extCol[ext] ?? "#a78bfa";
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: "14px",
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "14px", padding: "14px 16px",
        ...(stretch ? { flex: 1, alignItems: "flex-start" } : {}),
      }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "10px",
          background: `${c}18`, border: `1px solid ${c}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.65rem", fontWeight: 800, color: c, flexShrink: 0, letterSpacing: "0.05em"
        }}>{ext}</div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#e8eaf0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {file.name}
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>
            {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
        <button onClick={onClear} style={{
          background: "rgba(255,71,87,0.12)", border: "1px solid rgba(255,71,87,0.25)",
          color: "#ff6b78", borderRadius: "8px", padding: "6px 12px",
          fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
        }}>Remove</button>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      style={{
        border: `2px dashed ${drag ? "rgba(99,102,241,0.8)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "14px", padding: "36px 20px", textAlign: "center", cursor: "pointer",
        background: drag ? "rgba(99,102,241,0.06)" : "transparent",
        transition: "all 0.2s",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        ...(stretch ? { flex: 1, minHeight: "260px" } : {}),
      }}
    >
      <input ref={inputRef} type="file" accept={ACCEPT} style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      <div style={{
        width: "52px", height: "52px", borderRadius: "14px",
        background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "14px", fontSize: "1.4rem",
      }}>📄</div>
      <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#e8eaf0", marginBottom: "6px" }}>
        {drag ? "Release to upload" : "Drop your resume here"}
      </p>
      <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
        or <span style={{ color: "#818cf8", cursor: "pointer" }}>click to browse</span>
        {" · "}PDF, DOCX, TXT, RTF
      </p>
    </div>
  );
}

// ─── Keyword Chip ─────────────────────────────────────────────────────────────
function Chip({ label, type }: { label: string; type: "matched" | "missing" }) {
  const c = type === "matched"
    ? { bg: "rgba(0,208,132,0.1)", border: "rgba(0,208,132,0.25)", text: "#00d084" }
    : { bg: "rgba(255,71,87,0.1)", border: "rgba(255,71,87,0.25)", text: "#ff6b78" };
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: "100px", padding: "4px 12px",
      fontSize: "0.78rem", fontWeight: 600, color: c.text,
    }}>{label}</span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ATSChecker() {
  const [mode, setMode] = useState<"upload" | "paste">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const canAnalyze = !loading && (mode === "upload" ? !!file : pasteText.trim().length > 50);

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const fd = new FormData();
      if (mode === "upload" && file) fd.append("file", file);
      else fd.append("text", pasteText);
      if (jobDesc.trim()) fd.append("jobDescription", jobDesc);

      const res = await fetch("/api/ats-check", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed.");
      setResult(data.result);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null); setPasteText(""); setJobDesc(""); setResult(null); setError(null);
  };

  // const scoreCol = result ? getScoreColor(result.overall) : getScoreColor(0);

  return (
    <section id="ats-checker" style={{
      minHeight: "100vh",
      background: "#0d0f14",
      paddingTop: "120px",
      paddingBottom: "80px",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>

      {/* Subtle grid bg */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(rgba(99,102,241,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      {/* Glow orbs */}
      <div style={{
        position: "fixed", top: "-200px", left: "-200px", width: "600px", height: "600px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "-200px", right: "-200px", width: "500px", height: "500px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(0,208,132,0.08) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        maxWidth: "960px", margin: "0 auto", padding: "0 24px",
        position: "relative", zIndex: 1,
        opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
        transition: "all 0.5s ease",
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00d084", boxShadow: "0 0 6px #00d084", display: "inline-block" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#a5b4fc", letterSpacing: "0.05em" }}>
              AI-Powered · Free · Instant
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800,
            color: "#f1f3f9", lineHeight: 1.15, marginBottom: "14px",
            letterSpacing: "-0.02em",
          }}>
            ATS Resume Checker
          </h1>
          <p style={{
            fontSize: "1rem", color: "rgba(255,255,255,0.4)",
            maxWidth: "480px", margin: "0 auto", lineHeight: 1.7,
          }}>
            Instantly analyze your resume against ATS systems.
            Get your score, keyword gaps, and personalized recommendations.
          </p>
        </div>

        {/* ── Input Card ── */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px", padding: "clamp(20px,4vw,32px)",
          marginBottom: "24px",
          backdropFilter: "blur(12px)",
        }}>

          {/* Mode tabs */}
          <div style={{
            display: "flex", background: "rgba(255,255,255,0.04)",
            borderRadius: "12px", padding: "4px", marginBottom: "28px",
          }}>
            {(["upload", "paste"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "10px",
                borderRadius: "9px", fontWeight: 600, fontSize: "0.875rem",
                cursor: "pointer", border: "none", transition: "all 0.2s",
                background: mode === m ? "rgba(99,102,241,0.9)" : "transparent",
                color: mode === m ? "#fff" : "rgba(255,255,255,0.4)",
                boxShadow: mode === m ? "0 2px 12px rgba(99,102,241,0.3)" : "none",
              }}>
                {m === "upload" ? "📁  Upload File" : "✏️  Paste Text"}
              </button>
            ))}
          </div>

          {/* Two-col layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            alignItems: "stretch",
          }}>
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Your Resume
              </label>
              {mode === "upload" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <UploadZone file={file} onFile={setFile} onClear={() => setFile(null)} stretch />
                </div>
              ) : (
                <>
                  <textarea
                    value={pasteText}
                    onChange={e => setPasteText(e.target.value)}
                    placeholder="Paste your resume text here…&#10;&#10;Include: Contact · Summary · Skills · Experience · Education"
                    rows={10}
                    style={{
                      width: "100%", boxSizing: "border-box",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px", padding: "14px 16px",
                      color: "#e8eaf0", fontSize: "0.84rem",
                      lineHeight: 1.7, resize: "vertical", outline: "none",
                      fontFamily: "inherit", transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                  {pasteText.trim() && (
                    <p style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.25)", textAlign: "right" }}>
                      {pasteText.trim().split(/\s+/).filter(Boolean).length} words
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Job Description <span style={{ fontWeight: 400, textTransform: "none", fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}>— optional</span>
              </label>
              <textarea
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
                placeholder="Paste the job posting here for a targeted analysis…&#10;&#10;This helps AI identify exact keyword gaps and score your match against the role."
                rows={10}
                style={{
                  flex: 1,
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px", padding: "14px 16px",
                  color: "#e8eaf0", fontSize: "0.84rem",
                  lineHeight: 1.7, resize: "vertical", outline: "none",
                  fontFamily: "inherit", transition: "border-color 0.2s",
                  minHeight: "260px",
                }}
                onFocus={e => e.currentTarget.style.borderColor = "rgba(0,208,132,0.4)"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
          </div>

          {/* CTA row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: canAnalyze
                  ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                  : "rgba(255,255,255,0.06)",
                border: "none", cursor: canAnalyze ? "pointer" : "not-allowed",
                padding: "12px 28px", borderRadius: "12px",
                fontSize: "0.925rem", fontWeight: 700,
                color: canAnalyze ? "#fff" : "rgba(255,255,255,0.2)",
                boxShadow: canAnalyze ? "0 4px 20px rgba(99,102,241,0.4)" : "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (!canAnalyze) return; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(99,102,241,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ""; (e.currentTarget as HTMLButtonElement).style.boxShadow = canAnalyze ? "0 4px 20px rgba(99,102,241,0.4)" : "none"; }}
            >
              {loading ? (
                <><span style={{ display: "inline-block", animation: "ats-spin 1s linear infinite" }}>⚙️</span> Analyzing…</>
              ) : (
                <><span>🔍</span> Analyze Resume</>
              )}
            </button>

            {(result || error) && (
              <button onClick={handleReset} style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.4)",
                padding: "12px 20px", borderRadius: "12px",
                fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,71,87,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "#ff6b78"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
              >
                ↺ Reset
              </button>
            )}

            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", marginLeft: "auto" }}>
              🔒 Never stored · Processed securely
            </p>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div style={{
            background: "rgba(255,71,87,0.06)", border: "1px solid rgba(255,71,87,0.2)",
            borderRadius: "14px", padding: "16px 20px",
            display: "flex", gap: "12px", marginBottom: "20px", alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>⚠️</span>
            <div>
              <p style={{ color: "#ff6b78", fontWeight: 700, fontSize: "0.875rem", marginBottom: "4px" }}>Analysis Failed</p>
              <p style={{ color: "rgba(255,107,120,0.7)", fontSize: "0.82rem", lineHeight: 1.6 }}>{error}</p>
              {(error.includes("OPENROUTER") || error.includes("API")) && (
                <p style={{ marginTop: "8px", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                  Get a free key at{" "}
                  <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer"
                    style={{ color: "#818cf8", textDecoration: "underline" }}>openrouter.ai</a>
                  {" "}and add <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: "4px", fontSize: "0.78rem" }}>OPENROUTER_API_KEY</code> to your <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: "4px", fontSize: "0.78rem" }}>.env.local</code>
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px", padding: "48px 24px", textAlign: "center",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "18px",
              background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.8rem", margin: "0 auto 20px",
              animation: "ats-bounce 1.4s ease-in-out infinite",
            }}>🤖</div>
            <p style={{ color: "#e8eaf0", fontWeight: 700, fontSize: "1.05rem", marginBottom: "8px" }}>
              Analyzing your resume…
            </p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.84rem", marginBottom: "32px" }}>
              Checking keywords, structure, formatting & ATS compatibility
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "380px", margin: "0 auto" }}>
              {[
                ["📄", "Reading resume content"],
                ["🎯", "Matching keywords"],
                ["📊", "Scoring sections"],
                ["💡", "Generating recommendations"],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>{icon}</span>
                  <div style={{
                    flex: 1, height: "4px", background: "rgba(255,255,255,0.05)",
                    borderRadius: "100px", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", width: "100%",
                      background: "linear-gradient(90deg, transparent, #6366f1, transparent)",
                      borderRadius: "100px",
                      animation: `ats-shimmer 1.6s ${i * 0.2}s ease-in-out infinite`,
                    }} />
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", minWidth: "165px", textAlign: "left" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {result && !loading && (
          <div ref={resultRef} style={{ animation: "ats-up 0.5s ease forwards" }}>

            {/* Top row: Score + Breakdown */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px", marginBottom: "16px",
            }}>

              {/* Score card */}
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px", padding: "32px 24px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
                backdropFilter: "blur(12px)",
              }}>
                <ScoreRing score={result.overall} />
                <div style={{
                  width: "100%", background: "rgba(255,255,255,0.04)",
                  borderRadius: "12px", padding: "14px 16px",
                }}>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, textAlign: "center" }}>
                    {result.summary}
                  </p>
                </div>
              </div>

              {/* Breakdown card */}
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px", padding: "24px",
                backdropFilter: "blur(12px)",
              }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
                  Score Breakdown <span style={{ fontWeight: 400, textTransform: "none", fontSize: "0.7rem" }}>· tap to expand</span>
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {result.categories.map((cat, i) => (
                    <CategoryRow key={cat.label} cat={cat} delay={i * 100} />
                  ))}
                </div>
              </div>
            </div>

            {/* Keywords row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px", marginBottom: "16px",
            }}>
              {/* Matched */}
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px", padding: "24px",
                backdropFilter: "blur(12px)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "1rem" }}>✅</span>
                  <p style={{ fontWeight: 700, color: "#e8eaf0", fontSize: "0.9rem" }}>
                    Matched Keywords
                  </p>
                  <span style={{
                    marginLeft: "auto", background: "rgba(0,208,132,0.12)",
                    border: "1px solid rgba(0,208,132,0.25)", borderRadius: "100px",
                    padding: "2px 10px", fontSize: "0.75rem", fontWeight: 700, color: "#00d084",
                  }}>{result.matchedKeywords.length}</span>
                </div>
                {result.matchedKeywords.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {result.matchedKeywords.map(kw => <Chip key={kw} label={kw} type="matched" />)}
                  </div>
                ) : (
                  <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.25)" }}>No matched keywords detected.</p>
                )}
              </div>

              {/* Missing */}
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px", padding: "24px",
                backdropFilter: "blur(12px)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "1rem" }}>🎯</span>
                  <p style={{ fontWeight: 700, color: "#e8eaf0", fontSize: "0.9rem" }}>
                    Missing Keywords
                  </p>
                  <span style={{
                    marginLeft: "auto", background: "rgba(255,71,87,0.12)",
                    border: "1px solid rgba(255,71,87,0.25)", borderRadius: "100px",
                    padding: "2px 10px", fontSize: "0.75rem", fontWeight: 700, color: "#ff6b78",
                  }}>{result.missingKeywords.length}</span>
                </div>
                {result.missingKeywords.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {result.missingKeywords.map(kw => <Chip key={kw} label={kw} type="missing" />)}
                  </div>
                ) : (
                  <p style={{ fontSize: "0.84rem", color: "#00d084" }}>🎉 Great coverage! No obvious gaps found.</p>
                )}
              </div>
            </div>

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px", padding: "24px",
                backdropFilter: "blur(12px)",
              }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
                  AI Recommendations
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {result.suggestions.map((s, i) => {
                    const cfg = {
                      error:   { bg: "rgba(255,71,87,0.06)",   border: "rgba(255,71,87,0.18)",   dot: "#ff4757", text: "rgba(255,200,200,0.85)" },
                      warning: { bg: "rgba(240,180,41,0.06)",  border: "rgba(240,180,41,0.18)",  dot: "#f0b429", text: "rgba(255,237,180,0.85)" },
                      success: { bg: "rgba(0,208,132,0.06)",   border: "rgba(0,208,132,0.18)",   dot: "#00d084", text: "rgba(180,255,220,0.85)" },
                    }[s.type];
                    return (
                      <div key={i} style={{
                        background: cfg.bg, border: `1px solid ${cfg.border}`,
                        borderRadius: "12px", padding: "12px 16px",
                        display: "flex", alignItems: "flex-start", gap: "10px",
                      }}>
                        <span style={{
                          width: "6px", height: "6px", borderRadius: "50%",
                          background: cfg.dot, flexShrink: 0, marginTop: "6px",
                          boxShadow: `0 0 6px ${cfg.dot}`,
                        }} />
                        <span style={{ fontSize: "0.84rem", color: cfg.text, lineHeight: 1.65 }}>{s.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Empty state ── */}
        {!result && !loading && !error && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", opacity: 0.5 }}>
              {[
                { icon: "📊", label: "Detailed Score" },
                { icon: "🎯", label: "Keyword Gap Analysis" },
                { icon: "💡", label: "AI Recommendations" },
                { icon: "⚡", label: "Instant Results" },
              ].map(item => (
                <div key={item.label} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px", padding: "20px 24px",
                }}>
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ats-spin    { to { transform: rotate(360deg); } }
        @keyframes ats-bounce  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes ats-shimmer { 0% { transform: translateX(-200%); } 100% { transform: translateX(200%); } }
        @keyframes ats-up      { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: none; } }
      `}</style>
    </section>
  );
}