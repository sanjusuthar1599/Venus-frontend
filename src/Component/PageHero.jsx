import { Link } from "react-router-dom";

const sizeClasses = {
  short: "min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]",
  tall: "min-h-[320px] sm:min-h-[400px] lg:min-h-[460px]",
};

export default function PageHero({
  title,
  breadcrumbLabel,
  subtitle,
  imageSrc,
  videoSrc,
  size = "short",
  imageGrayscale = false,
  align = "center",
}) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  const media = videoSrc ? (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={videoSrc}
      autoPlay
      loop
      muted
      playsInline
    />
  ) : imageSrc ? (
    <img
      src={imageSrc}
      alt=""
      className={`absolute inset-0 h-full w-full object-cover ${imageGrayscale ? "grayscale-[20%]" : ""}`}
    />
  ) : (
    <div className="absolute inset-0 bg-venus-dark" aria-hidden />
  );

  return (
    <section className="relative w-full bg-venus-dark">
      <div className={`relative w-full overflow-hidden ${sizeClasses[size] ?? sizeClasses.short}`}>
        {media}
        <div className="absolute inset-0 page-hero__overlay" aria-hidden />

        <div
          className={`venus-container relative z-10 flex h-full min-h-[inherit] flex-col justify-center pb-12 pt-[100px] sm:pb-14 sm:pt-[108px] ${alignClass}`}
        >
          <h1 className="font-serif text-[2rem] font-medium leading-tight text-white sm:text-[2.5rem] lg:text-[2.85rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
              {subtitle}
            </p>
          ) : null}
          <p className="mt-4 text-[13px] text-white/70">
            <Link to="/" className="transition hover:text-venus-gold">
              Home
            </Link>
            <span className="mx-2 text-white/40">~</span>
            <span className="font-medium text-venus-gold">{breadcrumbLabel}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
