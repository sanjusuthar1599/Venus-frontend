export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  dark = false,
  className = "",
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = dark ? "text-white" : "text-venus-text";
  const descColor = dark ? "text-white/65" : "text-venus-grey";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {label ? <p className="venus-label">{label}</p> : null}
      <h2
        className={`venus-title mt-3 text-[1.75rem] sm:text-[2rem] lg:text-[2.35rem] ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`venus-desc mt-4 ${descColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
