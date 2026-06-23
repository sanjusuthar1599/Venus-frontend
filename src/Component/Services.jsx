import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import PageHero from "./PageHero.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";
import CtaBanner from "./ui/CtaBanner.jsx";
import Reveal from "./Reveal.jsx";
import { serviceDetails } from "../config/content.js";
import { submitInquiry } from "../lib/submitInquiry.js";

const accentGoldDark = "text-venus-tan-dark";

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

const Services = () => {
  const location = useLocation();
  const [activeService, setActiveService] = useState(0);
  const [selectedBhk, setSelectedBhk] = useState("2BHK");
  const [selectedRooms, setSelectedRooms] = useState(["Living room", "Kitchen"]);
  const [budget, setBudget] = useState("premium");
  const [timeline, setTimeline] = useState("planned");
  const [plannerName, setPlannerName] = useState("");
  const [plannerEmail, setPlannerEmail] = useState("");
  const [plannerPhone, setPlannerPhone] = useState("");
  const [plannerSubmitting, setPlannerSubmitting] = useState(false);

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

  async function sendPlannerBrief() {
    if (!selectedRooms.length) {
      toast.error("Please select at least one room.");
      return;
    }
    if (!plannerName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!plannerEmail.trim() && !plannerPhone.trim()) {
      toast.error("Please add your email or phone number.");
      return;
    }

    setPlannerSubmitting(true);
    try {
      const finishLabel =
        budgetOptions.find((item) => item.value === budget)?.label || budget;
      const result = await submitInquiry({
        form_type: "project_planner",
        name: plannerName.trim(),
        email: plannerEmail.trim(),
        phone: plannerPhone.trim(),
        message: `Project planner brief for ${selectedBhk} — ${selectedRooms.join(", ")}`,
        meta: {
          bhk: selectedBhk,
          rooms: selectedRooms,
          finish_level: finishLabel,
          timeline: plannerResult.timelineLabel,
          recommended_package: plannerResult.packageName,
          finish_direction: plannerResult.budgetNote,
        },
      });
      toast.success(result.message || "Brief sent successfully");
      setPlannerName("");
      setPlannerEmail("");
      setPlannerPhone("");
    } catch (err) {
      toast.error(err.message || "Could not send brief");
    } finally {
      setPlannerSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-venus-cream text-venus-text">
      <PageHero
        title="Our Interior Design Services"
        breadcrumbLabel="Services"
        imageSrc="/service.jpg"
        size="tall"
      />

      <section className="venus-section bg-white">
        <div className="venus-container">
          <Reveal>
            <SectionHeading
              label="What We Offer"
              title="Elevated Interior Design Solutions"
              description="Select a service to explore how we shape residential, commercial, and modular spaces."
            />
          </Reveal>

          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <Reveal variant="left">
              <ul className="space-y-1 border-y border-black/5 py-2">
                {serviceDetails.map((service, index) => {
                  const active = activeService === index;
                  return (
                    <li key={service.title}>
                      <button
                        type="button"
                        onClick={() => setActiveService(index)}
                        className={`w-full border-l-2 py-4 pl-5 text-left transition ${
                          active
                            ? "border-venus-gold bg-venus-cream/60"
                            : "border-transparent hover:border-venus-gold/30"
                        }`}
                      >
                        <span
                          className={`venus-title block text-[1.1rem] sm:text-[1.2rem] ${
                            active ? "text-venus-gold" : "text-venus-text"
                          }`}
                        >
                          {service.title}
                        </span>
                        {active ? (
                          <p className="venus-desc mt-2 text-venus-grey">{service.desc}</p>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal variant="right" delay={80}>
              <div className="overflow-hidden rounded-sm shadow-lg">
                <img
                  key={serviceDetails[activeService].image}
                  src={serviceDetails[activeService].image}
                  alt={serviceDetails[activeService].title}
                  className="aspect-[4/3] w-full object-cover transition duration-500"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="venus-section border-t border-black/5">
        <div className="venus-container">
        <Reveal className="text-center">
          <SectionHeading
            label="Our Services"
            title="Complete Design & Build Solutions"
            description="Venus brings interior design, execution, and fit-out under one roof — from modular kitchens and wardrobes to offices, structural coordination, and turnkey delivery."
          />
        </Reveal>

        <div className="mt-14">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {serviceGrid.map(({ title, src, tag, body }, i) => (
              <li key={title}>
                <Reveal delay={i * 55} variant={i % 3 === 1 ? "scale" : "up"}>
                  <article className="venus-card group h-full overflow-hidden rounded-sm transition hover:-translate-y-0.5">
                  <div className="relative aspect-[4/3] overflow-hidden bg-venus-beige">
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-75" />
                    <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-venus-text backdrop-blur-sm">
                      {tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3
                      className={`text-sm font-semibold uppercase leading-tight tracking-[0.12em] ${accentGoldDark}`}
                    >
                      {title}
                    </h3>
                    <p className="venus-desc mt-3 text-venus-grey">
                      {body}
                    </p>
                  </div>
                </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20">
          <Reveal className="text-center">
            <SectionHeading
              label="How We Engage"
              title="Choose A Design Path That Matches Your Stage"
            />
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packages.map((item, index) => (
              <Reveal key={item.name} delay={index * 80} variant="up">
                <article className="venus-card flex h-full flex-col rounded-sm p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="venus-label !text-venus-grey">{item.duration}</p>
                      <h3 className="venus-title mt-2 text-[1.15rem]">{item.name}</h3>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-venus-gold/25 bg-venus-cream text-sm font-semibold text-venus-gold">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="venus-desc mt-4 text-venus-grey">{item.bestFor}</p>
                  <ul className="mt-6 space-y-3">
                    {item.includes.map((feature) => (
                      <li key={feature} className="flex gap-3 venus-desc text-venus-text">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-venus-gold" />
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
          className="mt-20 scroll-mt-32 overflow-hidden rounded-sm border border-black/10 bg-venus-dark text-white shadow-xl lg:scroll-mt-36"
          variant="scale"
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden p-7 sm:p-9 lg:p-10">
              <div
                className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-venus-gold/15 blur-3xl"
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
                              ? "bg-venus-gold text-white shadow-lg shadow-venus-gold/25"
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
                              ? "bg-venus-gold text-white shadow-lg shadow-venus-gold/25"
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
                      className="mt-3 h-12 w-full rounded-sm border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white outline-none transition focus:border-venus-gold/60"
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
                      className="mt-3 h-12 w-full rounded-sm border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white outline-none transition focus:border-venus-gold/60"
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

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={plannerName}
                  onChange={(e) => setPlannerName(e.target.value)}
                  placeholder="Your name"
                  className="h-12 rounded-full border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-venus-gold/60"
                />
                <input
                  type="email"
                  value={plannerEmail}
                  onChange={(e) => setPlannerEmail(e.target.value)}
                  placeholder="Email"
                  className="h-12 rounded-full border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-venus-gold/60"
                />
                <input
                  type="tel"
                  value={plannerPhone}
                  onChange={(e) => setPlannerPhone(e.target.value)}
                  placeholder="Phone"
                  className="h-12 rounded-full border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-venus-gold/60 sm:col-span-2"
                />
              </div>

              <button
                type="button"
                onClick={sendPlannerBrief}
                disabled={plannerSubmitting}
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-neutral-950 transition hover:bg-neutral-100 disabled:opacity-60"
              >
                {plannerSubmitting ? "Sending…" : "Send this brief"}
              </button>
            </div>
          </div>
        </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Have A Project In Mind?"
        description="We will reply with a short call outline and what to prepare for our first conversation."
        buttonText="Book a Consultation"
        imageSrc="/MODULAR_KITCHEN.avif"
      />
    </div>
  );
};

export default Services;
