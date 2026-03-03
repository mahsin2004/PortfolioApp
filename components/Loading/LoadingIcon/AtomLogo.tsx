import { useEffect, useRef, useState } from "react";

interface AtomLogoProps {
  size?: number;
  speed?: number;
}

export default function AtomLogo({
  size = 160,
  speed = 0.018,
}: AtomLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const W = size;
    const H = size;
    const cx = W / 2;
    const cy = H / 2;

    const NUCLEUS_R = 14;
    const ORBIT_A = size * 0.35;
    const ORBIT_B = size * 0.11;
    const ELECTRON_R = 7;

    const orbits: { angle: number; phase: number }[] = [
      { angle: 0, phase: 0 },
      { angle: Math.PI / 3, phase: (2 * Math.PI) / 3 },
      { angle: (2 * Math.PI) / 3, phase: (4 * Math.PI) / 3 },
    ];

    const getPos = (a: number, p: number, time: number) => {
      const theta = time + p;
      const lx = Math.cos(theta) * ORBIT_A;
      const ly = Math.sin(theta) * ORBIT_B;

      return {
        x: cx + lx * Math.cos(a) - ly * Math.sin(a),
        y: cy + lx * Math.sin(a) + ly * Math.cos(a),
      };
    };

    const drawFrame = () => {
      // Clear the canvas for transparency
      ctx.clearRect(0, 0, W, H);

      // Apply a global rotation for the whole atom for extra "wow" factor
      const globalRot = t * 0.2;
      
      // Draw Orbits
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(96,239,255,0.3)";
      ctx.shadowColor = "#60efff";
      
      orbits.forEach(({ angle }) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle + globalRot);
        ctx.beginPath();
        ctx.ellipse(0, 0, ORBIT_A, ORBIT_B, 0, 0, Math.PI * 2);
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      });

      // Draw Nucleus
      const pulse = 1 + 0.05 * Math.sin(t * 3);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulse, pulse);

      const nGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, NUCLEUS_R + 15);
      nGlow.addColorStop(0, "rgba(96,239,255,0.4)");
      nGlow.addColorStop(1, "rgba(96,239,255,0)");
      ctx.fillStyle = nGlow;
      ctx.beginPath();
      ctx.arc(0, 0, NUCLEUS_R + 15, 0, Math.PI * 2);
      ctx.fill();

      const nBody = ctx.createRadialGradient(-3, -3, 2, 0, 0, NUCLEUS_R);
      nBody.addColorStop(0, "#fff");
      nBody.addColorStop(0.4, "#60efff");
      nBody.addColorStop(1, "#005f7f");
      ctx.fillStyle = nBody;
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(0, 0, NUCLEUS_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Electrons
      orbits.forEach(({ angle, phase }) => {
        const { x, y } = getPos(angle + globalRot, phase, t);
        
        ctx.save();
        // Outer glow
        const eGlow = ctx.createRadialGradient(x, y, 0, x, y, ELECTRON_R + 10);
        eGlow.addColorStop(0, "rgba(96,239,255,0.5)");
        eGlow.addColorStop(1, "rgba(96,239,255,0)");
        ctx.fillStyle = eGlow;
        ctx.beginPath();
        ctx.arc(x, y, ELECTRON_R + 10, 0, Math.PI * 2);
        ctx.fill();

        // Core
        const eCore = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, ELECTRON_R);
        eCore.addColorStop(0, "#fff");
        eCore.addColorStop(0.5, "#60efff");
        eCore.addColorStop(1, "#005f7f");
        ctx.fillStyle = eCore;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(x, y, ELECTRON_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      t += speed;
    };

    // Draw first frame immediately
    drawFrame();

    const loop = () => {
      drawFrame();
      setLoading(false);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [size, speed]);

  return (
    <div
      className="atom-logo-container"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {loading && (
        <div className="atom-skeleton">
          <div className="skeleton-nucleus" />
          <div className="skeleton-orbit skeleton-orbit-1" />
          <div className="skeleton-orbit skeleton-orbit-2" />
          <div className="skeleton-orbit skeleton-orbit-3" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{ 
          display: "block", 
          borderRadius: "50%",
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out"
        }}
      />
    </div>
  );
}