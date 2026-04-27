import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  PaintBrushIcon,
  Square3Stack3DIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useInView } from "../../hooks/useInView.js";

const highlights = [
  {
    title: "Palette & light",
    body: "We balance natural light, finishes, and color so rooms feel calm by day and warm at night.",
    icon: PaintBrushIcon,
  },
  {
    title: "Plans you can build",
    body: "Clear layouts, joinery, and specifications your contractors can price and execute without guesswork.",
    icon: Square3Stack3DIcon,
  },
  {
    title: "Lived-in comfort",
    body: "Every choice is checked against real routines — storage, flow, and how your home actually feels to use.",
    icon: HeartIcon,
  },
];

const stats = [
  { value: "12+", label: "Years shaping spaces" },
  { value: "200+", label: "Projects delivered" },
  { value: "18", label: "Countries & cities" },
  { value: "100%", label: "Detail-led process" },
];

const showcaseTiles = [
  {
    title: "Kitchens & joinery",
    subtitle: "Modular systems, stone, and lighting planned as one composition.",
    href: "/services",
    image: "/MODULAR_KITCHEN.avif",
    span: "hero",
  },
  {
    title: "Wardrobes & storage",
    subtitle: "Floor-to-ceiling clarity — every shelf earns its place.",
    href: "/services",
    image: "/WARDROBES.avif",
    span: "side",
  },
  {
    title: "Workplaces",
    subtitle: "Conference suites and cabins that read calm and capable.",
    href: "/portfolio",
    image: "/CONFERENC_ROOMS.avif",
    span: "side",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discover",
    body: "Site visit, measurements, and a shared visual direction so we hear you in images.",
    icon: MagnifyingGlassIcon,
  },
  {
    step: "02",
    title: "Design",
    body: "Layouts, materials, and joinery details priced before anything is ordered.",
    icon: PencilSquareIcon,
  },
  {
    step: "03",
    title: "Build",
    body: "Coordination on site — timelines, vendors, and snagging until execution matches the plan.",
    icon: WrenchScrewdriverIcon,
  },
  {
    step: "04",
    title: "Handover",
    body: "Styling, walkthrough, and support so the first week in the space feels effortless.",
    icon: SparklesIcon,
  },
];

function staggerStyle(index) {
  return {
    transitionDelay: `${60 + index * 75}ms`,
  };
}

const Home = () => {
  const [featuresRef, featuresVisible] = useInView();
  const [showcaseRef, showcaseVisible] = useInView();
  const [processRef, processVisible] = useInView();
  const [statsRef, statsVisible] = useInView();
  const [quoteRef, quoteVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  const featuresSectionClass = featuresVisible
    ? "home-section-visible"
    : "home-section-hidden";
  const statsSectionClass = statsVisible
    ? "home-section-visible home-stat-pop"
    : "home-section-hidden home-stat-pop";

  const showcaseSectionClass = showcaseVisible
    ? "home-section-visible"
    : "home-section-hidden";

  const processSectionClass = processVisible
    ? "home-section-visible"
    : "home-section-hidden";

  return (
    <div className="w-full overflow-x-hidden">
      {/* —— Hero —— */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <video
          className="absolute inset-0 z-0 h-full w-full scale-105 object-cover sm:scale-100"
          src="/interior-render.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div
          className="pointer-events-none absolute -left-1/4 top-1/4 z-[1] h-[min(80vw,28rem)] w-[min(80vw,28rem)] rounded-full bg-[#f27f26]/30 blur-[100px] home-hero-orb"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-1/4 bottom-0 z-[1] h-[min(90vw,32rem)] w-[min(90vw,32rem)] rounded-full bg-amber-400/25 blur-[110px] home-hero-orb--2"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[min(70vw,24rem)] w-[min(70vw,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[90px] home-hero-orb--3"
          aria-hidden
        />

        <div
          className="absolute inset-0 z-[2] bg-gradient-to-b"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,transparent_0%,rgba(0,0,0,0.45)_100%)]"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center px-5 pb-28 pt-28 text-center text-white sm:px-8 sm:pb-24 sm:pt-24 md:px-10">
          <p className="home-animate-in home-animate-in--d1 mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-300/95 sm:text-xs sm:tracking-[0.35em]">
            Venus Interior
          </p>

          <h1 className="home-animate-in home-animate-in--d2 max-w-5xl text-[1.65rem] font-bold uppercase leading-[1.12] tracking-tight sm:text-3xl md:text-4xl md:leading-[1.1] lg:text-5xl xl:text-6xl">
            <span className="bg-gradient-to-r from-[#f27f26] via-amber-400 to-[#f27f26] bg-clip-text text-transparent">
              We create amazing
            </span>
            <br />
            <span className="text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              interior designs
            </span>
          </h1>

          <div className="home-animate-in home-animate-in--d3 mt-8 flex max-w-2xl items-start gap-4 text-left text-sm leading-relaxed text-white/92 sm:mt-10 sm:text-base md:mt-12">
            <span
              className="mt-1 h-14 w-1 shrink-0 rounded-full bg-gradient-to-b from-amber-300 to-[#f27f26] shadow-[0_0_20px_rgba(251,191,36,0.4)] sm:h-16"
              aria-hidden
            />
            <p className="text-pretty">
              Venus Interior brings spaces to life with thoughtful layout, light,
              and materials. Explore our work and see how we shape environments you
              will love to live in.
            </p>
          </div>

          <div className="home-animate-in home-animate-in--d4 mt-10 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-12 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
            <Link
              to="/portfolio"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#f27f26] to-amber-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#f27f26]/30 transition duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#f27f26]/35 active:scale-[0.98]"
            >
              View our works
            </Link>
            <Link
              to="/services"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:border-white hover:bg-white hover:text-neutral-900 active:scale-[0.98]"
            >
              Our services
            </Link>
           </div>

          <a
            href="#home-features"
            aria-label="Scroll to main content"
            className="home-animate-in home-animate-in--d5 absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70 transition hover:text-white sm:bottom-10"
          >
            <span className="home-scroll-dot flex h-9 w-5 items-start justify-center rounded-full border border-white/35 bg-white/5 pt-2 backdrop-blur-sm">
              <span className="h-2 w-0.5 rounded-full bg-gradient-to-b from-amber-200 to-[#f27f26]" />
            </span>
            Explore
          </a>
        </div>
      </section>

      {/* —— Features —— */}
      <section
        id="home-features"
        className="relative border-t border-neutral-200/80 bg-gradient-to-b from-neutral-50 to-white py-16 sm:py-20 lg:py-28"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f27f26]/30 to-transparent"
          aria-hidden
        />
        <div
          ref={featuresRef}
          className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${featuresSectionClass}`}
        >
          <div
            className="home-stagger-item mx-auto max-w-2xl text-center"
            style={staggerStyle(0)}
          >
            <span
              className="mx-auto mb-5 inline-flex h-1 w-16 rounded-full bg-gradient-to-r from-[#f27f26] via-amber-400 to-[#f27f26] shadow-sm shadow-[#f27f26]/20"
              aria-hidden
            />
            <h2 className="text-2xl font-semibold uppercase tracking-[0.12em] text-neutral-900 sm:text-3xl lg:text-4xl">
              Designed around you
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-neutral-600 sm:mt-5 sm:text-base lg:text-lg">
              Residential and commercial interiors with one thread: clarity, warmth,
              and craft — from first moodboard to the last lamp switched on.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:mt-20 lg:grid-cols-3 lg:gap-10">
            {highlights.map(({ title, body, icon }, idx) => (
              <article
                key={title}
                className="home-stagger-item group relative overflow-hidden rounded-3xl border border-neutral-200/90 bg-white p-7 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.2)] transition duration-500 hover:-translate-y-2 hover:border-[#f27f26]/25 hover:shadow-[0_28px_60px_-20px_rgba(242,127,38,0.18)] sm:p-8"
                style={staggerStyle(1 + idx)}
              >
                <div
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#f27f26]/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f27f26]/20 bg-gradient-to-br from-[#f27f26]/12 to-amber-400/10 text-[#f27f26] shadow-inner transition duration-300 group-hover:scale-110 group-hover:border-[#f27f26]/35">
                  {createElement(icon, {
                    className: "h-7 w-7",
                    "aria-hidden": true,
                  })}
                </div>
                <h3 className="relative mt-6 text-lg font-semibold text-neutral-900 sm:text-xl">
                  {title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                  {body}
                </p>
              </article>
            ))}
          </div>

          <div
            className="home-stagger-item mt-12 flex justify-center sm:mt-16"
            style={staggerStyle(4)}
          >
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#f27f26] transition hover:gap-3 hover:text-amber-600"
            >
              About the studio
              <span
                className="inline-block transition group-hover:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* —— Editorial showcase (bento) —— */}
      <section className="relative border-t border-neutral-200/80 bg-white py-16 sm:py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
          aria-hidden
        />
        <div
          ref={showcaseRef}
          className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${showcaseSectionClass}`}
        >
          <div
            className="home-stagger-item mx-auto max-w-2xl text-center"
            style={staggerStyle(0)}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f27f26]/20 bg-[#f27f26]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#ea580c] sm:text-[11px]">
              Signature spaces
            </span>
            <h2 className="text-2xl font-semibold uppercase tracking-[0.12em] text-neutral-900 sm:text-3xl lg:text-4xl">
              Crafted for real life
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-neutral-600 sm:mt-5 sm:text-base lg:text-lg">
              A glimpse of the categories we live in every day — kitchens, storage, and
              workplaces built as one coherent story.
            </p>
          </div>

          <div className="mt-12 grid auto-rows-[minmax(200px,1fr)] gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
            {showcaseTiles.map((tile, idx) => {
              const isHero = tile.span === "hero";
              return (
                <Link
                  key={tile.title}
                  to={tile.href}
                  className={`home-stagger-item group relative isolate overflow-hidden rounded-3xl border border-neutral-200/90 bg-neutral-900 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_70px_-24px_rgba(242,127,38,0.28)] hover:ring-[#f27f26]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f27f26] ${
                    isHero
                      ? "min-h-[280px] lg:col-span-7 lg:row-span-2 lg:min-h-[420px]"
                      : "min-h-[220px] lg:col-span-5"
                  }`}
                  style={staggerStyle(1 + idx)}
                >
                  <img
                    src={tile.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 transition duration-500 group-hover:via-black/40"
                    aria-hidden
                  />
                  <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300/95">
                      {isHero ? "Featured" : "Explore"}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {tile.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                      {tile.subtitle}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white transition group-hover:gap-3">
                      View details
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* —— Process —— */}
      <section className="relative bg-gradient-to-b from-neutral-50 to-white py-16 sm:py-20 lg:py-28">
        <div
          ref={processRef}
          className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${processSectionClass}`}
        >
          <div
            className="home-stagger-item mx-auto max-w-2xl text-center"
            style={staggerStyle(0)}
          >
            <span
              className="mx-auto mb-5 inline-flex h-1 w-16 rounded-full bg-gradient-to-r from-sky-500 via-[#f27f26] to-amber-400 shadow-sm"
              aria-hidden
            />
            <h2 className="text-2xl font-semibold uppercase tracking-[0.12em] text-neutral-900 sm:text-3xl">
              From first visit to handover
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              A clear path so design, budget, and site work stay aligned — no loose ends.
            </p>
          </div>

          <div className="relative mt-14 lg:mt-20">
            <div
              className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent lg:block"
              aria-hidden
            />
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {processSteps.map(({ step, title, body, icon }, idx) => (
                <li
                  key={step}
                  className="home-stagger-item relative flex flex-col items-center text-center lg:items-start lg:text-left"
                  style={staggerStyle(1 + idx)}
                >
                  <div className="relative z-[1] flex flex-col items-center lg:items-start">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-[#f27f26] shadow-[0_12px_40px_-20px_rgba(15,23,42,0.15)] transition duration-300 hover:border-[#f27f26]/30 hover:shadow-[0_16px_44px_-18px_rgba(242,127,38,0.2)]">
                      {createElement(icon, {
                        className: "h-8 w-8",
                        "aria-hidden": true,
                      })}
                    </span>
                    <span className="mt-5 font-mono text-xs font-bold tabular-nums text-neutral-400">
                      {step}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-neutral-900">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div
            className="home-stagger-item mt-14 flex flex-wrap items-center justify-center gap-4 sm:mt-16"
            style={staggerStyle(5)}
          >
            <Link
              to="/contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#f27f26] to-amber-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#f27f26]/25 transition duration-300 hover:brightness-110"
            >
              Book a consultation
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-neutral-300 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-800 transition hover:border-[#f27f26]/40 hover:text-[#f27f26]"
            >
              About us
            </Link>
          </div>
        </div>
      </section>

      {/* —— Stats —— */}
      <section className="relative overflow-hidden bg-neutral-950 py-16 text-white sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(242,127,38,0.12),transparent)]"
          aria-hidden
        />
        <div
          ref={statsRef}
          className={`relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${statsSectionClass}`}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-4">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`home-stat-item text-center ${
                  i > 0 ? "lg:border-l lg:border-white/10 lg:pl-6 xl:pl-10" : ""
                }`}
              >
                <p className="text-3xl font-bold tabular-nums text-[#f27f26] sm:text-4xl lg:text-5xl">
                  {value}
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-wider text-neutral-400 sm:text-xs sm:tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* —— Quote —— */}
      <section className="border-t border-neutral-200 bg-white py-16 sm:py-20 lg:py-28">
        <div
          ref={quoteRef}
          className={`mx-auto max-w-4xl px-5 text-center transition-all duration-1000 ease-out sm:px-8 ${
            quoteVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <span
            className="font-serif text-5xl leading-none text-[#f27f26]/25 sm:text-6xl"
            aria-hidden
          >
            “
          </span>
          <blockquote className="-mt-2 text-lg font-medium leading-relaxed text-neutral-800 sm:text-xl lg:text-2xl">
            Spaces should feel honest — light where you need it, quiet where you
            rest, and detail where you linger.
          </blockquote>
          <span
            className="mt-2 inline-block font-serif text-5xl leading-none text-[#f27f26]/25 sm:text-6xl"
            aria-hidden
          >
            ”
          </span>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#f27f26] sm:text-sm">
            Venus Interior
          </p>
        </div>
      </section>

      {/* —— CTA —— */}
      <section
        ref={ctaRef}
        className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 ${
          ctaVisible ? "opacity-100" : "opacity-95"
        } transition-opacity duration-700`}
      >
        <div
          className="home-cta-shimmer absolute inset-0 bg-gradient-to-r from-[#f27f26] via-[#ea580c] to-amber-500"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-5 text-center sm:flex-row sm:gap-8 sm:px-8 sm:text-left lg:px-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-white drop-shadow-sm sm:text-3xl lg:text-4xl">
              Ready to plan your next space?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              Share your timeline and we will suggest the right design phase to start
              from.
            </p>
          </div>
          <div className="flex w-full max-w-sm shrink-0 flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-end">
            <Link
              to="/services"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-lg transition duration-300 hover:scale-[1.03] hover:bg-neutral-100 active:scale-[0.98]"
            >
              Start a project
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-white/90 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition duration-300 hover:scale-[1.03] hover:bg-white/20 active:scale-[0.98]"
            >
              See portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
