import { useEffect, useRef, useState } from "react";

/**
 * Sets isInView true when the element enters the viewport (once).
 */
export function useInView() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      // threshold 0 = any pixel visible (reliable for tall sections where <8% can
      // still be on-screen). Negative rootMargin made the bottom band of the
      // viewport never count, so sections could stay opacity:0 forever.
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}
