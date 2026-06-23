import { useTilt3D } from "../../hooks/useTilt3D.js";

export default function TiltCard({
  children,
  className = "",
  intensity = 14,
  scale = 1.04,
  shine = true,
  disabled = false,
  ...rest
}) {
  const ref = useTilt3D({ max: intensity, scale, disabled });

  return (
    <div
      ref={ref}
      className={`tilt-3d-card ${shine ? "tilt-3d-card--shine" : ""} ${className}`}
      {...rest}
    >
      {shine ? <span className="tilt-3d-card__shine" aria-hidden /> : null}
      {children}
    </div>
  );
}
