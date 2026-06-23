import { createElement, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  BuildingOffice2Icon,
  CheckIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
  PaintBrushIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Armchair, Building2, LayoutGrid, Lamp } from "lucide-react";
import { business } from "../../config/business.js";
import BudgetProjectsSection from "../ui/BudgetProjectsSection.jsx";
import GoogleReviewsSlider from "../ui/GoogleReviewsSlider.jsx";
import HeroScene3D from "../ui/HeroScene3D.jsx";
import { useSpotlight } from "../../hooks/useSpotlight.js";

import "swiper/css";
import "swiper/css/navigation";

const HERO_VIDEO = "/hero_section.mp4";
const HERO_POSTER = "/herosection.png";
const WHY_CHOOSE_IMG = "/chooesimage.png";

const services = [
  {
    title: "Residential Design",
    desc: "Beautiful homes tailored to your lifestyle.",
    icon: Armchair,
  },
  {
    title: "Commercial Design",
    desc: "Functional spaces that inspire productivity and growth.",
    icon: Building2,
  },
  {
    title: "Modular & Custom",
    desc: "Smart, stylish and space-saving solutions for every need.",
    icon: LayoutGrid,
  },
  {
    title: "Styling & Decor",
    desc: "Finishing touches that bring your space to life.",
    icon: Lamp,
  },
];

const portfolioProjects = [
  {
    title: "Luxury Villa",
    tag: "Modern Design",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Penthouse Interior",
    tag: "Contemporary Style",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Corporate Office",
    tag: "Minimal & Functional",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Elegant Apartment",
    tag: "Warm & Cozy",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1686056040370-b5e5c06c4273?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Retail Space",
    tag: "Modern & Welcoming",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Modular Kitchen",
    tag: "Smart & Functional",
    category: "modular",
    image: "/MODULAR_KITCHEN.avif",
  },
  {
    title: "Master Bedroom",
    tag: "Calm & Restful",
    category: "residential",
    image: "/Bedroom.avif",
  },
  {
    title: "Executive Cabin",
    tag: "Premium Workspace",
    category: "commercial",
    image: "/EXECUTIVE_CABINS.jpg",
  },
  {
    title: "Custom Wardrobe",
    tag: "Organized Living",
    category: "modular",
    image: "/WARDROBES.avif",
  },
  {
    title: "Living Room",
    tag: "Family Comfort",
    category: "residential",
    image: "/Living-room.avif",
  },
];

const processSteps = [
  {
    title: "Consultation",
    desc: "We listen to your vision, lifestyle, and budget to understand your needs.",
    icon: UserGroupIcon,
  },
  {
    title: "Concept & Design",
    desc: "Mood boards, 3D renders, and material selections brought to life.",
    icon: PaintBrushIcon,
  },
  {
    title: "Planning & Execution",
    desc: "Detailed planning, vendor coordination, and on-site supervision.",
    icon: WrenchScrewdriverIcon,
  },
  {
    title: "Handover",
    desc: "Final styling, walkthrough, and support for a seamless move-in.",
    icon: SparklesIcon,
  },
];

const features = [
  "Personalized Designs",
  "Quality That Lasts",
  "On-time Delivery",
  "Transparent Communication",
];

const portfolioFilters = ["All", "Residential", "Commercial", "Modular"];

const filterMap = {
  All: null,
  Residential: "residential",
  Commercial: "commercial",
  Modular: "modular",
};

const Home = () => {
  const navigate = useNavigate();
  const heroVideoRef = useRef(null);
  const heroSectionRef = useSpotlight();
  const [portfolioFilter, setPortfolioFilter] = useState("All");

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.muted = true;
    const play = () => {
      video.play().catch(() => {});
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, []);

  const filteredProjects = portfolioProjects.filter((p) => {
    const key = filterMap[portfolioFilter];
    return !key || p.category === key;
  });

  const feature = [
    "Personalized Designs",
    "Quality That Lasts",
    "On-Time Delivery",
    "Transparent Communication",
  ];

  return (
    <div className="w-full overflow-x-hidden bg-venus-cream">
      {/* Hero */}
      <section
        ref={heroSectionRef}
        className="home-hero-shell relative w-full overflow-hidden bg-venus-dark"
      >
        <div className="home-hero-media" aria-hidden>
          <div className="home-hero-video-wrap">
            <video
              ref={heroVideoRef}
              className="home-hero-video"
              autoPlay
              loop
              muted
              playsInline
              poster={HERO_POSTER}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="hero-dark-overlay absolute inset-0 z-[1]" aria-hidden />
        <div className="home-hero-vignette absolute inset-0 z-[1]" aria-hidden />
        <HeroScene3D containerRef={heroSectionRef} />
        <div className="home-hero-spotlight" aria-hidden />

        <div className="venus-container relative z-10 flex min-h-[inherit] flex-col justify-center pb-14 pt-[92px] sm:pb-16 sm:pt-[100px] lg:pb-20 lg:pt-[108px]">
          <div className="w-full max-w-[560px]">
            <p className="home-hero-eyebrow text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b59461] sm:text-[11px]">
              {business.tagline}
              <span className="home-hero-accent" aria-hidden />
            </p>
            <h1 className="home-hero-title font-serif mt-4 text-[2.15rem] font-medium leading-[1.08] text-white sm:mt-5 sm:text-[2.65rem] md:text-[3rem] lg:text-[3.35rem] lg:leading-[1.05]">
              {business.headline}
            </h1>
            <p className="home-hero-desc mt-5 max-w-[440px] text-[14px] leading-[1.68] text-white/72 sm:mt-6 sm:text-[15px]">
              {business.description}
            </p>

            <div className="home-hero-actions mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                to="/portfolio"
                className="home-btn-primary inline-flex min-h-[46px] w-full items-center justify-center rounded-[10px] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] sm:min-h-[48px] sm:w-auto sm:min-w-[170px] sm:px-8 sm:text-[11px]"
              >
                Explore Projects
              </Link>
              <Link
                to="/services"
                className="home-btn-outline inline-flex min-h-[46px] w-full items-center justify-center rounded-[10px] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] sm:min-h-[48px] sm:w-auto sm:min-w-[150px] sm:px-8 sm:text-[11px]"
              >
                Our Services
              </Link>
            </div>

            <div className="home-hero-stats mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3 lg:gap-x-10">
              {[
                { icon: BuildingOffice2Icon, text: business.stats[0].label },
                { icon: ClipboardDocumentListIcon, text: business.stats[1].label },
                { icon: CheckBadgeIcon, text: business.stats[2].label },
              ].map(({ icon, text }, index) => (
                <div key={text} className="home-hero-stat flex items-center gap-3" style={{ "--stat-i": index }}>
                  <span className="home-stat-icon flex h-6 w-6 shrink-0 items-center justify-center">
                    {createElement(icon, {
                      className: "h-[22px] w-[22px] stroke-[1.35]",
                      "aria-hidden": true,
                    })}
                  </span>
                  <span className="home-stat-label">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="home-services-section py-14 sm:py-16 lg:py-20">
        <div className="venus-container">
          <div className="home-services-header mx-auto max-w-2xl text-center">
            <p className="font-bold text-[14px] uppercase tracking-[0.16em] text-[#b59461] sm:text-[15px]">What We Do</p>
            <h2 className="font-serif mt-3 text-[1.85rem] font-bold leading-tight text-venus-black sm:text-[2.15rem] lg:text-[2.35rem]">
              Elevated Interior Design Solutions
            </h2>
            <p className="home-services-desc mt-4 text-[14px] leading-relaxed text-venus-grey sm:text-[15px]">
              From concept to completion, we design beautiful spaces that reflect your
              style and elevate everyday living.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
            {services.map(({ title, desc, icon: Icon }) => (
              <article key={title} className="home-services-card">
                <span className="home-services-icon-wrap" aria-hidden>
                  {createElement(Icon, {
                    className: "home-services-icon",
                    strokeWidth: 1.35,
                  })}
                </span>
                <h3 className="home-services-card-title">{title}</h3>
                <p className="home-services-card-desc">{desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center lg:mt-12">
            <Link to="/services" className="home-services-cta">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="home-portfolio-section py-14 sm:py-16 lg:py-20">
        <div className="venus-container text-center">
          <span className="home-portfolio-section__line" aria-hidden />
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-venus-gold sm:text-[11px]">
            Our Projects
          </p>
          <h2 className="font-serif mt-3 text-[1.65rem] font-medium text-venus-text sm:text-[1.9rem] lg:text-[2.1rem]">
            Spaces We&apos;re Proud Of
          </h2>

          <div className="mt-5 flex flex-wrap items-center justify-center sm:mt-6">
            {portfolioFilters.map((filter, index) => (
              <span key={filter} className="flex items-center">
                {index > 0 && (
                  <span className="mx-3 text-[11px] text-venus-grey/35 sm:mx-4" aria-hidden>
                    |
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setPortfolioFilter(filter)}
                  className={`home-portfolio-filter text-[10px] font-medium uppercase tracking-[0.18em] transition sm:text-[11px] ${
                    portfolioFilter === filter ? "home-portfolio-filter--active" : ""
                  }`}
                >
                  {filter}
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="venus-container mt-8 overflow-hidden lg:mt-10">
          <div className="home-portfolio-slider relative overflow-hidden">
            <Swiper
              key={portfolioFilter}
              modules={[Autoplay, Navigation]}
              className="home-portfolio-swiper"
              watchSlidesProgress
              speed={750}
              loop={filteredProjects.length > 3}
              centeredSlides
              spaceBetween={14}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: ".home-portfolio-prev",
                nextEl: ".home-portfolio-next",
              }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16, centeredSlides: true },
                640: { slidesPerView: 1.12, spaceBetween: 14, centeredSlides: true },
                1024: { slidesPerView: 2.15, spaceBetween: 16, centeredSlides: true },
                1280: { slidesPerView: 3.15, spaceBetween: 18, centeredSlides: true },
              }}
            >
              {filteredProjects.map((project) => (
                <SwiperSlide key={project.title} className="home-portfolio-slide-wrap">
                  <Link
                    to="/portfolio"
                    className="home-portfolio-card home-portfolio-slide group relative mx-auto block aspect-[3/4] w-full max-w-[384px] overflow-hidden rounded-[16px]"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="home-portfolio-card-meta absolute bottom-0 left-0 z-10 w-full p-3 sm:p-3.5">
                      <p className="home-portfolio-card-title text-[13px] font-semibold leading-tight text-white sm:text-[14px]">
                        {project.title}
                      </p>
                      <p className="home-portfolio-card-tag mt-0.5 text-[10px] text-white/70 sm:text-[11px]">
                        {project.tag}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className="home-portfolio-prev"
              aria-label="Previous project"
            >
              ‹
            </button>
            <button
              type="button"
              className="home-portfolio-next"
              aria-label="Next project"
            >
              ›
            </button>
          </div>

          <div className="mt-4 flex justify-center sm:mt-5">
            <Link
              to="/portfolio"
              className="inline-flex min-h-[46px] items-center justify-center rounded-[4px] bg-venus-gold px-9 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-venus-tan-dark sm:text-[11px]"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="venus-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-medium text-venus-black sm:text-4xl">
              From Vision To Reality
            </h2>
            <p className="mt-4 text-sm text-venus-black/60 sm:text-[15px]">
              A seamless journey from the first idea to your dream space.
            </p>
          </div>

          <div className="relative mt-14 lg:mt-20">
            <div
              className="home-process-line absolute left-[12%] right-[12%] top-8 hidden h-px lg:block"
              aria-hidden
            />
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {processSteps.map(({ title, desc, icon }) => (
                <li key={title} className="relative flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-venus-tan/40 bg-white text-venus-tan shadow-sm">
                    {createElement(icon, { className: "h-7 w-7 stroke-[1.2]", "aria-hidden": true })}
                  </span>
                  <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.06em] text-venus-black">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-venus-black/55">
                    {desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Features & Testimonial */}
      <section className="overflow-x-clip bg-black">
        <div className="grid items-stretch lg:grid-cols-12">
          <div className="home-why-image-wrap lg:col-span-5">
            <img
              src={WHY_CHOOSE_IMG}
              alt="Luxury interior reading nook with armchair"
              loading="lazy"
            />
          </div>

          <div className="home-why-content flex flex-col justify-center bg-black px-5 py-6 sm:px-6 lg:col-span-4 lg:py-7 lg:pl-6 lg:pr-4 xl:pl-8 xl:pr-5">
            <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-venus-gold">
              Why Choose Us
            </span>

            <h2 className="font-serif text-[1.6rem] font-medium leading-[1.18] text-white sm:text-[1.85rem] lg:text-[2rem]">
              Design That Reflects
              <br />
              Who You Are
            </h2>

            <ul className="mt-5 space-y-3.5 sm:mt-6">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] border border-venus-gold/75">
                    <CheckIcon className="h-3 w-3 text-venus-gold" strokeWidth={2.2} aria-hidden />
                  </span>
                  <span className="text-[13px] text-gray-300 sm:text-[14px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="home-why-testimonial flex items-center justify-start bg-black px-5 py-6 sm:px-6 lg:col-span-3 lg:py-7 lg:pl-2 lg:pr-6 xl:pr-8">
            <GoogleReviewsSlider />
          </div>
        </div>
      </section>

      <BudgetProjectsSection onProjectClick={() => navigate("/contact")} />

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-venus-tan">
        <div className="venus-container flex flex-col items-center gap-8 py-14 lg:flex-row lg:justify-between lg:py-16">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">
              Ready To Design Your Dream Space?
            </h2>
            <p className="mt-3 text-sm text-white/85">
              Let&apos;s create something beautiful together.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
              Book a free consultation
            </p>
            <p className="text-xs text-white/75">Get expert advice</p>
            <Link
              to="/contact"
              className="home-btn-dark mt-3 inline-flex min-h-[46px] items-center justify-center rounded-sm px-8 py-3 text-[10px] font-semibold uppercase tracking-[0.18em]"
            >
              Book a Consultation
            </Link>
          </div>

          <div className="relative hidden h-48 w-56 shrink-0 lg:block xl:h-56 xl:w-64">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
              alt="Modern grey armchair"
              className="absolute -bottom-8 right-0 h-auto w-full max-w-none object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
