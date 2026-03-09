'use client'

import { useEffect, useState } from "react";

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY >= window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{`
        @keyframes btt-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(99,102,241,0.55); }
          70%  { box-shadow: 0 0 0 12px rgba(99,102,241,0); }
          100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        }
        @keyframes btt-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }

        .btt-btn {
          position: fixed;
          /* sits directly above the chatbot toggle (bottom: 2rem + 50px height + 0.75rem gap) */
          bottom: 5.75rem;
          right: 2rem;
          z-index: 99;

          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
          color: #fff;
          font-size: 1.3rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);

          /* hidden state */
          opacity: 0;
          pointer-events: none;
          transform: translateY(12px) scale(0.85);
          transition: opacity 0.35s ease, transform 0.35s ease, filter 0.2s;
        }

        .btt-btn.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0) scale(1);
          animation: btt-pulse 2.4s ease-out infinite, btt-float 3.5s ease-in-out infinite;
        }

        .btt-btn:hover {
          filter: brightness(1.12);
          animation-play-state: paused;
        }

        @media (max-width: 420px) {
          .btt-btn { right: 1rem; bottom: 5rem; }
        }
      `}</style>

      <button
        className={`btt-btn${visible ? " visible" : ""}`}
        onClick={scrollToTop}
        title="Back to top"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </>
  );
};

export default FloatingButton;