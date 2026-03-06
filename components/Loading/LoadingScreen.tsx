"use client";

import { Atom } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AtomLogo from "./LoadingIcon/AtomLogo";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 2500; // Total duration in ms
    let startTime: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing (Ease Out Quad)
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const displayPct = Math.round(easedProgress * 100);

      if (barRef.current) barRef.current.style.width = `${displayPct}%`;
      if (pctRef.current) pctRef.current.textContent = `${displayPct}%`;

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 650);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, []);

  if (!visible) return null;

  return (
    <div className={`ld-screen${fadeOut ? " ld-fade-out" : ""}`}>
      <div className="ld-grid" />
      <div className="ld-orb ld-orb-1" />
      <div className="ld-orb ld-orb-2" />
      <div className="ld-orb ld-orb-3" />

      <div className="ld-body">
        {/* spinning logo */}
        <div className="ld-logo">
          {/* <div className="ld-ring ld-ring-1" />
          <div className="ld-ring ld-ring-2" />
          <div className="ld-ring ld-ring-3" /> */}
          {/* <div className="ld-icon">&lt;/&gt;</div> */}
          {/* <div className="ld-icon"><Atom /></div> */}
          {/* <div className="ld-icon"><AtomLogo /></div> */}
          <AtomLogo />
        </div>

        {/* name */}
        <h1 className="ld-name">
          <span className="ld-name-last">M</span>
          <span className="ld-name-first">M</span>
          <span className="ld-name-last">M</span>
        </h1>
        <p className="ld-tagline">Learn, Understand, Implement</p>

        {/* progress bar */}
        <div className="ld-bar-wrap">
          <div className="ld-bar" ref={barRef} />
        </div>
        <span className="ld-pct" ref={pctRef}>0%</span>

        {/* bouncing dots */}
        <div className="ld-dots">
          <span className="ld-dot ld-dot-1" />
          <span className="ld-dot ld-dot-2" />
          <span className="ld-dot ld-dot-3" />
        </div>
      </div>
    </div>
  );
}
