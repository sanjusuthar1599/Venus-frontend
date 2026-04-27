import { useInView } from "../hooks/useInView.js";

const variantClass = {
  up: "site-reveal--up",
  left: "site-reveal--left",
  right: "site-reveal--right",
  scale: "site-reveal--scale",
};

/**
 * Scroll-triggered fade/slide/scale. Respects prefers-reduced-motion via CSS.
 * @param {{ children: import('react').ReactNode; className?: string; delay?: number; variant?: 'up' | 'left' | 'right' | 'scale' }} props
 */
const Reveal = ({ children, className = "", delay = 0, variant = "up", ...rest }) => {
  const [ref, visible] = useInView();
  const v = variantClass[variant] ?? variantClass.up;

  return (
    <div
      ref={ref}
      className={`${v} ${visible ? "site-reveal-visible" : "site-reveal-hidden"} ${className}`}
      style={{ "--site-reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Reveal;
