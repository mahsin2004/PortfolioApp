import { useState, useEffect } from "react";

const bio = "I'm a full-stack engineer obsessed with crafting elegant, high-performance digital experiences. With 7+ years across fintech, SaaS, and developer tooling, I turn complex problems into intuitive products that users actually love.";

const passions = "When I'm not coding, I contribute to open-source projects, mentor junior developers, write technical articles, and explore new emerging technologies. I believe in writing clean, maintainable code and building products that make a real difference.";

export default function BioText() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .bio-wrapper {
          max-width: 680px;
          width: 100%;
        }

        .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 1.8rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .eyebrow.show { opacity: 1; transform: translateY(0); }
        .eyebrow::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #c9a84c44, transparent);
        }

        .divider-top {
          width: 2.5rem;
          height: 3px;
          background: linear-gradient(90deg, #c9a84c, #e8c97a);
          margin-bottom: 2.2rem;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: opacity 0.5s ease 0.2s, transform 0.6s ease 0.2s;
          border-radius: 2px;
        }
        .divider-top.show { opacity: 1; transform: scaleX(1); }

        .bio-primary {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.3rem, 2.5vw, 1.55rem);
          font-weight: 400;
          line-height: 1.75;
          color: #e8e4dc;
          margin-bottom: 0;
          letter-spacing: 0.01em;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
          position: relative;
        }
        .bio-primary.show { opacity: 1; transform: translateY(0); }

        .bio-primary .highlight {
          color: #c9a84c;
          font-style: italic;
        }

        .separator {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
          opacity: 0;
          transition: opacity 0.5s ease 0.6s;
        }
        .separator.show { opacity: 1; }
        .separator-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c9a84c;
        }
        .separator-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #2a2a35, #3a3a48, #2a2a35);
        }

        .bio-secondary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.975rem;
          font-weight: 300;
          line-height: 1.9;
          color: #7a8091;
          letter-spacing: 0.02em;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s;
        }
        .bio-secondary.show { opacity: 1; transform: translateY(0); }

        .bio-secondary .tag {
          display: inline-block;
          background: #141420;
          border: 1px solid #2a2a3a;
          color: #a8b0c0;
          font-size: 0.78rem;
          font-weight: 500;
          padding: 0.15em 0.6em;
          border-radius: 3px;
          margin: 0 0.1em;
          letter-spacing: 0.05em;
          transition: border-color 0.2s, color 0.2s;
          cursor: default;
        }
        .bio-secondary .tag:hover {
          border-color: #c9a84c55;
          color: #c9a84c;
        }

        .corner-accent {
          position: absolute;
          top: -8px;
          left: -12px;
          width: 20px;
          height: 20px;
          border-top: 2px solid #c9a84c55;
          border-left: 2px solid #c9a84c55;
          opacity: 0;
          transition: opacity 0.5s ease 0.4s;
        }
        .bio-primary.show .corner-accent { opacity: 1; }

        .footnote {
          margin-top: 2.2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #1e1e28;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.5s ease 1s;
        }
        .footnote.show { opacity: 1; }
        .footnote-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a84c;
          animation: pulse 2.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .footnote-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: #3a3e50;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
        }
      `}</style>

      <div className="bio-wrapper">

        <div className={`eyebrow ${visible ? "show" : ""}`}>
          About me
        </div>

        <div className={`divider-top ${visible ? "show" : ""}`} />

        <p className={`bio-primary ${visible ? "show" : ""}`}>
          <span className="corner-accent" />
          {bio.split(/(elegant|high-performance|7\+ years|fintech|SaaS)/).map((part, i) =>
            ["elegant", "high-performance", "7+ years", "fintech", "SaaS"].includes(part)
              ? <span key={i} className="highlight">{part}</span>
              : part
          )}
        </p>

        <div className={`separator ${visible ? "show" : ""}`}>
          <div className="separator-dot" />
          <div className="separator-line" />
          <div className="separator-dot" />
        </div>

        <p className={`bio-secondary ${visible ? "show" : ""}`}>
          When I'm not coding, I contribute to{" "}
          <span className="tag">open-source</span>{" "}
          projects, mentor junior developers, write technical articles, and explore
          new emerging technologies. I believe in writing{" "}
          <span className="tag">clean code</span>{" "}
          and building products that make a real difference.
        </p>

        <div className={`footnote ${visible ? "show" : ""}`}>
          <div className="footnote-dot" />
          <span className="footnote-text">Available for select opportunities</span>
        </div>

      </div>
    </div>
  );
}