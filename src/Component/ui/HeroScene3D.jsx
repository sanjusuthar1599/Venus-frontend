import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

function createParticles(count, width, height) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
  }));
}

function pointerFromEvent(container, e) {
  const rect = container.getBoundingClientRect();
  let clientX;
  let clientY;

  if ("touches" in e && e.touches[0]) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ("clientX" in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  } else {
    return null;
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
    active: true,
  };
}

/**
 * Interactive particle network — works on desktop (mouse) and mobile (touch).
 */
export default function HeroScene3D({ containerRef, particleCount = 56, className = "" }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const onPointer = (e) => {
      const point = pointerFromEvent(container, e);
      if (point) mouseRef.current = point;
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", onPointer);
    container.addEventListener("touchstart", onPointer, { passive: true });
    container.addEventListener("touchmove", onPointer, { passive: true });
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("touchend", onLeave, { passive: true });
    container.addEventListener("touchcancel", onLeave, { passive: true });

    return () => {
      container.removeEventListener("mousemove", onPointer);
      container.removeEventListener("touchstart", onPointer);
      container.removeEventListener("touchmove", onPointer);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("touchend", onLeave);
      container.removeEventListener("touchcancel", onLeave);
    };
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const count = reduced
      ? Math.min(28, particleCount)
      : coarse
        ? Math.min(38, particleCount)
        : particleCount;

    let particles = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let ambientPhase = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(count, width, height);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      let pointer = mouseRef.current;

      if (!pointer.active && coarse) {
        ambientPhase += 0.012;
        pointer = {
          x: width * (0.62 + Math.sin(ambientPhase) * 0.12),
          y: height * (0.36 + Math.cos(ambientPhase * 0.85) * 0.1),
          active: true,
        };
      }

      if (pointer.active) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          coarse ? 110 : 140
        );
        glow.addColorStop(0, "rgba(242, 127, 38, 0.16)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (const p of particles) {
        if (pointer.active && !reduced) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          const reach = coarse ? 160 : 200;
          if (dist < reach && dist > 0) {
            const pull = (1 - dist / reach) * (coarse ? 0.045 : 0.06);
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(181, 148, 97, 0.75)";
        ctx.fill();
      }

      const linkDist = coarse ? 100 : 120;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(242, 127, 38, ${0.2 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      if (pointer.active && !reduced) {
        const lineReach = coarse ? 130 : 160;
        for (const p of particles) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < lineReach) {
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(181, 148, 97, ${0.28 * (1 - dist / lineReach)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [particleCount, reduced, containerRef]);

  return (
    <div className={`hero-scene-3d ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="hero-scene-3d__canvas" />
      <div className="hero-scene-3d__shapes">
        <div className="hero-3d-shape home-hero-orb" />
        <div className="hero-3d-shape home-hero-orb home-hero-orb--2" />
        <div className="hero-3d-shape home-hero-orb home-hero-orb--3" />
        <div className="hero-3d-shape hero-3d-shape--ring" />
      </div>
    </div>
  );
}
