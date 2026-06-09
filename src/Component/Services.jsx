import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageHero from "./PageHero.jsx";
import Reveal from "./Reveal.jsx";

const accentCyan = "text-[#0ea5e9]";
const accentCyanDark = "text-[#0284c7]";

const serviceGrid = [
  {
    title: "Modular kitchen",
    src: "/MODULAR_KITCHEN.avif",
    tag: "Storage + workflow",
    body: "Ergonomic layouts, finishes, hardware, lighting, and appliance planning.",
  },
  {
    title: "Wardrobes",
    src: "/WARDROBES.avif",
    tag: "Daily organisation",
    body: "Sliding, hinged, walk-in, and loft storage designed around real routines.",
  },
  {
    title: "Executive cabins",
    src: "/EXECUTIVE_CABINS.jpg",
    tag: "Leadership spaces",
    body: "Statement cabins with calm lighting, acoustic comfort, and premium finishes.",
  },
  {
    title: "Conference rooms",
    src: "/CONFERENC_ROOMS.avif",
    tag: "Meet + present",
    body: "Tables, AV walls, lighting scenes, and materials for focused collaboration.",
  },
  {
    title: "Structural works",
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=800&fit=crop&q=80",
    tag: "Site readiness",
    body: "Civil coordination, partitions, false ceiling, electrical and plumbing alignment.",
  },
  {
    title: "Turnkey projects",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=800&fit=crop&q=80",
    tag: "End-to-end",
    body: "Design, procurement, vendor coordination, site supervision, and final styling.",
  },
  {
    title: "Furniture",
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&q=80",
    tag: "Custom pieces",
    body: "Sofas, beds, consoles, study desks, and loose furniture matched to the scheme.",
  },
  {
    title: "Fitouts",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=800&fit=crop&q=80",
    tag: "Commercial delivery",
    body: "Office, retail, and hospitality fitouts with practical timelines and finishes.",
  },
];

const packages = [
  {
    name: "Design Direction",
    bestFor: "Single room refresh or early planning",
    duration: "1-2 weeks",
    includes: ["Moodboard", "Layout direction", "Material references", "Shopping guide"],
  },
  {
    name: "Detailed Interiors",
    bestFor: "Home renovation or office upgrade",
    duration: "3-6 weeks",
    includes: ["2D layouts", "3D views", "Lighting plan", "Furniture and finish schedule"],
  },
  {
    name: "Turnkey Execution",
    bestFor: "Complete design and build handover",
    duration: "8-14 weeks",
    includes: ["Design package", "Vendor coordination", "Site supervision", "Final styling"],
  },
];

const roomOptions = [
  "Living room",
  "Kitchen",
  "Bedroom",
  "Children room",
  "Wardrobe",
  "Office",
  "Full home",
];

const bhkOptions = ["1BHK", "2BHK", "3BHK", "4BHK", "Other"];

const budgetOptions = [
  { value: "essential", label: "Essential", note: "Smart refresh with controlled finishes" },
  { value: "premium", label: "Premium", note: "Balanced materials and custom details" },
  { value: "luxury", label: "Luxury", note: "Bespoke finishes and complete styling" },
];

const timelineOptions = [
  { value: "quick", label: "Within 30 days" },
  { value: "planned", label: "1-3 months" },
  { value: "flexible", label: "Flexible" },
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
  const location = useLocation();
  const [selectedBhk, setSelectedBhk] = useState("2BHK");
  const [selectedRooms, setSelectedRooms] = useState(["Living room", "Kitchen"]);
  const [budget, setBudget] = useState("premium");
  const [timeline, setTimeline] = useState("planned");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bhk = params.get("bhk");
    const room = params.get("room");

    if (bhk && bhkOptions.includes(bhk)) {
      setSelectedBhk(bhk);
    }
    if (room && roomOptions.includes(room)) {
      setSelectedRooms([room]);
    }
  }, [location.search]);

  const plannerResult = useMemo(() => {
    const roomCount = selectedRooms.length || 1;
    const bhkWeight =
      selectedBhk === "Other" ? 3 : Number.parseInt(selectedBhk, 10) || 2;
    const budgetMultiplier = budget === "luxury" ? 1.35 : budget === "premium" ? 1.1 : 0.85;
    const timelineLabel =
      timelineOptions.find((item) => item.value === timeline)?.label ?? "Flexible";
    const selectedBudget = budgetOptions.find((item) => item.value === budget);
    const packageName =
      selectedBhk === "4BHK" || roomCount >= 5 || selectedRooms.includes("Full home")
        ? "Turnkey Execution"
        : selectedBhk === "3BHK" || roomCount >= 3
          ? "Detailed Interiors"
          : "Design Direction";
    const consultationScore = Math.min(
      95,
      Math.round((roomCount * 14 + bhkWeight * 10 + budgetMultiplier * 28) / 5) * 5
    );

    return {
      packageName,
      timelineLabel,
      budgetNote: selectedBudget?.note,
      consultationScore,
    };
  }, [budget, selectedBhk, selectedRooms, timeline]);

  const toggleRoom = (room) => {
    setSelectedRooms((current) => {
      if (room === "Full home") return current.includes(room) ? [] : [room];

      const withoutFullHome = current.filter((item) => item !== "Full home");
      if (withoutFullHome.includes(room)) {
        return withoutFullHome.filter((item) => item !== room);
      }
      return [...withoutFullHome, room];
    });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-700">
      <PageHero
        title="Services"
        breadcrumbLabel="Services"
        imageSrc="/service.jpg"
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
          <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
            {serviceGrid.map(({ title, src, tag, body }, i) => (
              <li key={title}>
                <Reveal delay={i * 55} variant={i % 3 === 1 ? "scale" : "up"}>
                  <article className="group h-full overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-[0_16px_46px_-26px_rgba(15,23,42,0.28)] transition duration-500 hover:-translate-y-1 hover:border-[#f27f26]/25 hover:shadow-[0_24px_60px_-24px_rgba(242,127,38,0.2)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-75" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-800 backdrop-blur-sm">
                      {tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3
                      className={`text-sm font-bold uppercase leading-tight tracking-[0.12em] ${accentCyanDark}`}
                    >
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {body}
                    </p>
                  </div>
                </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-20 max-w-7xl sm:mt-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f27f26]">
              How we engage
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Choose a design path that matches your stage
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packages.map((item, index) => (
              <Reveal key={item.name} delay={index * 80} variant="up">
                <article className="flex h-full flex-col rounded-[1.75rem] border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-6 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.32)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                        {item.duration}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-neutral-950">
                        {item.name}
                      </h3>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f27f26]/10 text-sm font-bold text-[#f27f26]">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                    {item.bestFor}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {item.includes.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm text-neutral-700">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#f27f26]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal
          id="project-planner"
          className="mx-auto mt-20 max-w-7xl scroll-mt-32 overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-950 text-white shadow-[0_26px_70px_-30px_rgba(15,23,42,0.55)] sm:mt-24 lg:scroll-mt-36"
          variant="scale"
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden p-7 sm:p-9 lg:p-10">
              <div
                className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#f27f26]/20 blur-3xl"
                aria-hidden
              />
              <div
                className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">
                  Project planner
                </p>
                <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
                  Build a quick consultation brief before you call
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
                  Select BHK, rooms, finish level, and timeline. The planner suggests
                  the best starting package for your interior project.
                </p>

                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                    Select BHK
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    {bhkOptions.map((bhk) => {
                      const active = selectedBhk === bhk;
                      return (
                        <button
                          key={bhk}
                          type="button"
                          onClick={() => setSelectedBhk(bhk)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            active
                              ? "bg-gradient-to-r from-[#f27f26] to-amber-500 text-white shadow-lg shadow-[#f27f26]/25"
                              : "bg-white/10 text-white/80 hover:bg-white/15"
                          }`}
                        >
                          {bhk}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                    Rooms
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {roomOptions.map((room) => {
                      const active = selectedRooms.includes(room);
                      return (
                        <button
                          key={room}
                          type="button"
                          onClick={() => toggleRoom(room)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            active
                              ? "bg-gradient-to-r from-[#f27f26] to-amber-500 text-white shadow-lg shadow-[#f27f26]/25"
                              : "bg-white/10 text-white/80 hover:bg-white/15"
                          }`}
                        >
                          {room}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                      Finish level
                    </span>
                    <select
                      value={budget}
                      onChange={(event) => setBudget(event.target.value)}
                      className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white outline-none transition focus:border-[#f27f26]/60"
                    >
                      {budgetOptions.map((item) => (
                        <option key={item.value} value={item.value} className="text-neutral-900">
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                      Timeline
                    </span>
                    <select
                      value={timeline}
                      onChange={(event) => setTimeline(event.target.value)}
                      className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white outline-none transition focus:border-[#f27f26]/60"
                    >
                      {timelineOptions.map((item) => (
                        <option key={item.value} value={item.value} className="text-neutral-900">
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.04] p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
                Recommended start
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white">
                {plannerResult.packageName}
              </h3>
              <div className="mt-7 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Home type
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    {selectedBhk}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Selected scope
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    {selectedRooms.length
                      ? selectedRooms.join(", ")
                      : "Choose at least one room"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Timeline
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    {plannerResult.timelineLabel}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Finish direction
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    {plannerResult.budgetNote}
                  </p>
                </div>
              </div>
              
              <Link
                to="/contact"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-neutral-950 transition hover:bg-neutral-100"
              >
                Send this brief
              </Link>
            </div>
          </div>
        </Reveal>

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
