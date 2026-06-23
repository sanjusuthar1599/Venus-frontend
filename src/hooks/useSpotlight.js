import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

function setSpotPosition(el, clientX, clientY) {
  const rect = el.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--spot-x", `${x}%`);
  el.style.setProperty("--spot-y", `${y}%`);
  el.classList.add("has-spotlight");
}

export function useSpotlight() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let raf = 0;
    let touchActive = false;
    let ambientStart = Date.now();

    const onMouseMove = (e) => setSpotPosition(el, e.clientX, e.clientY);

    const onTouch = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      touchActive = true;
      setSpotPosition(el, touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
      touchActive = false;
      ambientStart = Date.now();
    };

    const runAmbient = () => {
      if (!touchActive) {
        const t = (Date.now() - ambientStart) / 1000;
        const x = 62 + Math.sin(t * 0.5) * 14;
        const y = 36 + Math.cos(t * 0.4) * 12;
        el.style.setProperty("--spot-x", `${x}%`);
        el.style.setProperty("--spot-y", `${y}%`);
        el.classList.add("has-spotlight");
      }
      raf = requestAnimationFrame(runAmbient);
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    if (coarse || reduced) {
      runAmbient();
    }

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.classList.remove("has-spotlight");
    };
  }, [reduced]);

  return ref;
}
