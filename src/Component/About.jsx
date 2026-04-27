import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  SparklesIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import PageHero from "./PageHero.jsx";
import Reveal from "./Reveal.jsx";

const values = [
  {
    title: "Clarity first",
    body: "We translate briefs into legible plans — so decisions are visual, not abstract.",
    icon: SparklesIcon,
  },
  {
    title: "Collaboration",
    body: "Architects, builders, and craftspeople stay aligned through shared drawings and milestones.",
    icon: UserGroupIcon,
  },
  {
    title: "Context",
    body: "Climate, culture, and the view outside the window inform how we shape the room inside.",
    icon: GlobeAltIcon,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-700">
      <PageHero
        title="About Us"
        breadcrumbLabel="About Us"
        imageSrc="/about.png"
        imageGrayscale
        size="tall"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20">
        <Reveal className="mx-auto max-w-3xl text-center" variant="scale">
        <div>
          <span
            className="mx-auto mb-5 block h-1 w-14 rounded-full bg-gradient-to-r from-[#f27f26] to-amber-400"
            aria-hidden
          />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f27f26]">
            Our story
          </p>
          <h2 className="mt-3 text-2xl font-semibold uppercase tracking-wide text-neutral-900 sm:text-3xl">
            Interior design with intention
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Venus Interior began as a small studio obsessed with proportion and
            light. Today we partner with homeowners and brands across regions —
            always with the same promise: spaces that feel composed, personal,
            and built to last.
          </p>
        </div>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="flex justify-center" variant="left" delay={60}>
        <div>
      
      {/* Wrapper */}
      <div className="relative w-full max-w-[380px]">

        {/* Main Image */}
        <img
          src="https://apexa-html-demo.vercel.app/assets/img/images/h2_about_img.jpg"
          alt="Apexa"
          className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover object-left rounded-2xl shadow-lg"
        />

        {/* Experience Box */}
        <div className="absolute left-0 bottom-0 flex items-center">

          {/* SVG Shape */}
          <div className="text-blue-900">
            <svg
              viewBox="0 0 82 295"
              className="w-[80px] h-[160px]"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M70.7685 260.479C77.6405 257.127 82 250.15 82 242.503L82 44.8205C82 36.5032 76.8524 29.054 69.0724 26.1128L0 0L0 295L70.7685 260.479Z" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="absolute left-2 bottom-6 text-white">
            <h4 className="text-2xl font-bold leading-none">25</h4>
            <p className="text-xs leading-tight">
              Years Of <br /> Experiences
            </p>
          </div>

        </div>

      </div>
    </div>
        </Reveal>
          <Reveal className="order-2 lg:order-1" variant="right" delay={100}>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 sm:text-xl">
              How we work
            </h3>
            <ul className="mt-6 space-y-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
              <li className="flex gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f27f26]" />
                <span>
                  <strong className="text-neutral-900">Discover</strong> — site
                  visits, measurements, and a shared Pinterest or mood direction
                  so we hear you in images, not only words.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>
                  <strong className="text-neutral-900">Design</strong> —
                  concepts, material boards, and refined layouts with realistic
                  visuals before anything is ordered.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                <span>
                  <strong className="text-neutral-900">Deliver</strong> — site
                  coordination, snagging, and styling so handover day feels
                  complete.
                </span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex rounded-full bg-gradient-to-r from-[#f27f26] to-amber-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-[#f27f26]/20 transition hover:brightness-110"
              >
                View services
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-neutral-800 transition hover:border-[#f27f26]/50 hover:text-[#f27f26]"
              >
                Portfolio
              </Link>
            </div>
          </div>
          </Reveal>
        </div>  

        <div className="mt-20">
          <Reveal className="text-center">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-neutral-900 sm:text-xl">
            What guides us
          </h3>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {values.map(({ title, body, icon }, i) => (
              <Reveal key={title} delay={i * 90} variant="up">
              <article
                className="site-hover-lift h-full rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm transition hover:border-[#f27f26]/25 hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f27f26]/15 bg-[#f27f26]/8 text-[#f27f26]">
                  {createElement(icon, {
                    className: "h-7 w-7",
                    "aria-hidden": true,
                  })}
                </div>
                <h4 className="mt-5 font-semibold text-neutral-900">{title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {body}
                </p>
              </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-20" variant="scale" delay={50}>
        <div className="overflow-hidden rounded-2xl border border-neutral-900/10 bg-neutral-950 px-8 py-12 text-center sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Let&apos;s talk
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
            Tell us about your brief
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-neutral-400">
            Whether you are renovating, building new, or refreshing a single
            floor, we will match you with the right scope and timeline.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@venusinterior.com"
              className="inline-flex rounded-full bg-gradient-to-r from-[#f27f26] to-amber-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
            >
              Email the studio
            </a>
            <Link
              to="/"
              className="inline-flex rounded-full border border-white/25 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-amber-400/50 hover:text-amber-400"
            >
              Back to home
            </Link>
          </div>
        </div>
        </Reveal>
      </div>
    </div>
  );
};

export default About;
