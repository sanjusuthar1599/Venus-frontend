import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

export function useTilt3D({ max = 14, scale = 1.04, disabled = false } = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || disabled) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    let raf = 0;

    const reset = () => {
      el.style.transform = "";
      el.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
    };

    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -max;
        const rotateY = ((x - cx) / cx) * max;

        el.style.transition = "transform 0.1s ease-out";
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
      el.style.transform = "";
    };
  }, [max, scale, reduced, disabled]);

  return ref;
}
