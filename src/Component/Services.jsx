import { Link } from "react-router-dom";
import PageHero from "./PageHero.jsx";
import Reveal from "./Reveal.jsx";

const accentCyan = "text-[#0ea5e9]";
const accentCyanDark = "text-[#0284c7]";

/** Replace `src` with `/services/your-file.jpg` in `public/services/` when ready */
const serviceGrid = [
  {
    title: "Modular kitchen",
    src: "MODULAR_KITCHEN.avif",
  },
  {
    title: "Wardrobes",
    src: "WARDROBES.avif",
  },
  {
    title: "Executive cabins",
    src: "/public/EXECUTIVE_CABINS.jpg",
  },
  {
    title: "Conference rooms",
    src: "/public/CONFERENC_ROOMS.avif",
  },
  {
    title: "Structural works",
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=800&fit=crop&q=80",
  },
  {
    title: "Turnkey projects",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=800&fit=crop&q=80",
  },
  {
    title: "Furniture",
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&q=80",
  },
  {
    title: "Fitouts",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=800&fit=crop&q=80",
  },
];

function TaglineRule({ flip }) {
  return (
    <span
      className={`inline-block h-px w-10 bg-gradient-to-r from-transparent via-sky-500 to-sky-500 sm:w-14 ${flip ? "rotate-180" : ""}`}
      aria-hidden
    />
  );
}

const Services = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-700">
      <PageHero
        title="Services"
        breadcrumbLabel="Services"
        imageSrc="/service.avif"
        imageGrayscale={false}
        size="tall"
      />

      <section className="border-t border-neutral-100 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <Reveal className="mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <TaglineRule />
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f27f26] sm:text-sm">
              Our services
            </p>
            <TaglineRule flip />
          </div>

          <h2 className="mx-auto mt-8 max-w-4xl text-2xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
            Are you ready to experience{" "}
            <span className={accentCyan}>the transformation?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-500 sm:text-base">
            Venus brings interior design, execution, and fit-out under one roof — from
            modular kitchens and wardrobes to offices, structural coordination, and
            turnkey delivery. We align materials, timelines, and craft so your space
            feels finished, not rushed.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-7xl sm:mt-16 lg:mt-20">
          <ul className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4 md:gap-8 lg:gap-10">
            {serviceGrid.map(({ title, src }, i) => (
              <li key={title}>
                <Reveal delay={i * 55} variant={i % 3 === 1 ? "scale" : "up"}>
                  <figure className="group text-center">
                  <div className="site-hover-lift relative aspect-square overflow-hidden rounded-lg bg-neutral-100 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.15)] ring-1 ring-neutral-200/80 transition duration-500 group-hover:shadow-[0_20px_50px_-15px_rgba(14,165,233,0.2)] group-hover:ring-sky-200">
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <figcaption
                    className={`mt-4 text-[11px] font-bold uppercase leading-tight tracking-[0.12em] sm:text-xs ${accentCyanDark}`}
                  >
                    {title}
                  </figcaption>
                </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mx-auto mt-20 max-w-3xl sm:mt-24" variant="scale" delay={80}>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 px-8 py-12 text-center sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f27f26]">
            Next step
          </p>
          <h3 className="mt-3 text-xl font-semibold text-neutral-900 sm:text-2xl">
            Tell us about your space
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">
            We will reply with a short call outline and what to prepare for our first
            conversation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@venusinterior.com"
              className="inline-flex rounded-full bg-gradient-to-r from-[#f27f26] to-amber-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-[#f27f26]/25 transition hover:brightness-110"
            >
              Request consultation
            </a>
            <Link
              to="/portfolio"
              className="inline-flex rounded-full border-2 border-sky-500 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-sky-600 transition hover:bg-sky-50"
            >
              View portfolio
            </Link>
          </div>
        </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Services;
