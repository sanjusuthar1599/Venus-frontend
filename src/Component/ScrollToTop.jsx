import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to hash targets when present, otherwise resets to the top.
 */
const ScrollToTop = () => {
  const { hash, pathname, search } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const targetId = decodeURIComponent(hash.slice(1));
        const target = document.getElementById(targetId);
        if (!target) return;

        const headerOffset = 120;
        const top =
          target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      };

      const first = window.setTimeout(scrollToHash, 80);
      const second = window.setTimeout(scrollToHash, 350);
      return () => {
        window.clearTimeout(first);
        window.clearTimeout(second);
      };
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hash, pathname, search]);

  return null;
};

export default ScrollToTop;
