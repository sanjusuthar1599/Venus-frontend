import { Link } from "react-router-dom";

const sizeClasses = {
  short:
    "h-[220px] sm:h-[260px] md:h-[600px]",
  tall: "h-[300px] sm:h-[360px] md:h-[600px]",
};

/**
 * @param {{
 *   title: string;
 *   breadcrumbLabel: string;
 *   imageSrc?: string;
 *   videoSrc?: string;
 *   size?: 'short' | 'tall';
 *   imageGrayscale?: boolean;
 *   overlayClassName?: string;
 * }} props
 */
const PageHero = ({
  title,
  breadcrumbLabel,
  imageSrc,
  videoSrc,
  size = "short",
  imageGrayscale = true,
  overlayClassName,
}) => {
  const media = videoSrc ? (
    <>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
    </>
  ) : imageSrc ? (
    <>
      <img
        src={imageSrc}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${
          imageGrayscale ? "grayscale" : ""
        }`}
      />
      {overlayClassName ? (
        <div className={overlayClassName} aria-hidden />
      ) : null}
    </>
  ) : (
    <div className="absolute inset-0 bg-neutral-950" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#f27f26]/25 via-neutral-950 to-sky-600/15" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#f27f26]/10 blur-3xl" />
    </div>
  );

  return (
    <section className="relative w-full">
      <div
        className={`relative w-full overflow-hidden ${sizeClasses[size] ?? sizeClasses.short}`}
      >
        {media}

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-24 text-center sm:pt-28 md:pt-[50px]">
          <h1 className="site-hero-anim-title text-3xl font-bold uppercase tracking-[0.2em] text-white drop-shadow-sm sm:text-4xl md:text-[2.5rem]">
            {title}
          </h1>
          <p className="site-hero-anim-crumb mt-3 text-sm font-medium text-white sm:text-base">
            <Link to="/" className="text-white transition hover:text-white/90">
              Home
            </Link>
            <span className="mx-2 text-white">~</span>
            <span className="font-semibold text-amber-400">{breadcrumbLabel}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
