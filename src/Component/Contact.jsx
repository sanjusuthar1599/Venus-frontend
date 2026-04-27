import { createElement, useState } from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import PageHero from "./PageHero.jsx";
import Reveal from "./Reveal.jsx";

const MAP_EMBED_QUERY =
  "Shop+no.+04,+Ajay+Deep+chs.,+Plot+no.+19,+Sec.+19,+Kharghar,+Navi+mumbai,+Kalyan+West+410210";
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_EMBED_QUERY}&hl=en&z=15&output=embed`;
const MAP_OPEN_URL =
  "https://www.google.com/maps/search/?api=1&query=Shop+no.+04,+Ajay+Deep+chs.,+Plot+no.+19,+Sec.+19,+Kharghar,+Navi+mumbai,+Kalyan+West+410210";

const contactInfo = [
  {
    label: "Studio",
    lines: [
      "Shop no. 04, Ajay Deep chs. Plot no. 19, Sec. 19, Kharghar, Navi mumbai, Kalyan West 410210",
      "Nr. Gurunanak School, Vishnu Nagar",
      "Kalyan, Maharashtra 421301",
    ],
    Icon: MapPinIcon,
    accent: "bg-[#f27f26]/10 text-[#f27f26] border-[#f27f26]/20",
  },
  {
    label: "Phone",
    lines: ["+91 96534 67488"], 
    href: "tel:+919653467488",
    Icon: PhoneIcon,
    accent: "bg-amber-400/10 text-amber-600 border-amber-400/25",
  },
  {
    label: "Email",
    lines: ["hello@venusinterior.com"],
    href: "mailto:hello@venusinterior.com",
    Icon: EnvelopeIcon,
    accent: "bg-sky-500/10 text-sky-600 border-sky-500/25",
  },
];

const projectTypes = [
  { value: "", label: "Project type" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "renovation", label: "Renovation" },
  { value: "consultation", label: "Design consultation only" },
  { value: "other", label: "Other" },
];

const inputClass =
  "mt-1.5 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-[#f27f26]/50 focus:ring-2 focus:ring-[#f27f26]/20";

const labelClass = "text-xs font-semibold uppercase tracking-wider text-neutral-600";

const Contact = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const project = String(data.get("projectType") || "").trim();
    const timeline = String(data.get("timeline") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", text: "Please fill in your name, email, and message." });
      return;
    }

    const subject = `Consultation request — ${name}${project ? ` (${project})` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      project ? `Project type: ${project}` : null,
      timeline ? `Timeline / budget notes: ${timeline}` : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    setStatus({ type: "pending", text: "Opening your email app…" });
    window.location.href = `mailto:hello@venusinterior.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setStatus({
        type: "info",
        text: "If nothing opened, email us directly at hello@venusinterior.com",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-700">
        <PageHero
        title="Contact Us"
        breadcrumbLabel="Contact Us"
        imageSrc="/public/contect_us.webp"
        imageGrayscale={false}
        size="tall"
      />

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
        <div>
          <span
            className="mx-auto mb-5 block h-1 w-14 rounded-full bg-gradient-to-r from-[#f27f26] to-amber-400"
            aria-hidden
          />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f27f26]">
            Consultation
          </p>
          <h2 className="mt-3 text-2xl font-semibold uppercase tracking-wide text-neutral-900 sm:text-3xl">
            Let&apos;s plan your space
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Share a few details and we will follow up with next steps. Prefer to talk?
            Call or visit — we are happy to help.
          </p>
        </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {contactInfo.map(({ label, lines, href, Icon, accent }, i) => (
            <Reveal key={label} delay={i * 70} variant={i === 1 ? "scale" : "up"}>
            <article
              className="site-hover-lift flex gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${accent}`}
              >
                {createElement(Icon, {
                  className: "h-5 w-5",
                  "aria-hidden": true,
                })}
              </span>
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block text-sm font-medium text-neutral-900 underline-offset-2 transition hover:text-[#f27f26]"
                  >
                    {lines[0]}
                  </a>
                ) : (
                  lines.map((line) => (
                    <p key={line} className="mt-1 text-sm leading-snug text-neutral-700">
                      {line}
                    </p>
                  ))
                )}
              </div>
            </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4 sm:mt-5" variant="right" delay={40}>
        <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-600">
            <ClockIcon className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Hours
            </p>
            <p className="mt-1 text-sm text-neutral-700">
              Mon–Sat · 10:00 AM – 8:00 PM
            </p>
            <p className="text-xs text-neutral-500">Sunday by appointment</p>
          </div>
        </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <Reveal className="order-2 lg:order-1" variant="left" delay={80}>
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md">
            <div className="border-b border-neutral-100 bg-neutral-50 px-5 py-4 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f27f26]">
                Find us
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                Shop no. 04, Ajay Deep chs. Plot no. 19, Sec. 19, Kharghar, Navi mumbai, Kalyan West 410210 — tap enlarge to open in Google Maps.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full bg-neutral-200 lg:aspect-auto lg:min-h-[420px]">
              <iframe
                title="Venus Interior on Google Maps"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="border-t border-neutral-100 px-5 py-3 sm:px-6">
              <a
                href={MAP_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#f27f26] transition hover:text-amber-600"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" variant="right" delay={100}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-md sm:p-8">
              <h3 className="text-lg font-semibold text-neutral-900">
                Request a consultation
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Tell us about your project. Submitting opens your email with this
                message ready to send.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Full name <span className="text-[#f27f26]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email <span className="text-[#f27f26]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="+91 …"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-project" className={labelClass}>
                    Project type
                  </label>
                  <select
                    id="contact-project"
                    name="projectType"
                    className={`${inputClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    }}
                  >
                    {projectTypes.map((opt) => (
                      <option key={opt.value || "empty"} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-timeline" className={labelClass}>
                    Timeline or budget (optional)
                  </label>
                  <input
                    id="contact-timeline"
                    name="timeline"
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Move-in by December, mid-range budget"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message <span className="text-[#f27f26]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    className={`${inputClass} resize-y min-h-[120px]`}
                    placeholder="Describe your space, goals, and any inspiration links."
                  />
                </div>

                {status ? (
                  <p
                    role="status"
                    className={`text-sm ${
                      status.type === "error"
                        ? "text-red-600"
                        : status.type === "pending"
                          ? "text-amber-700"
                          : "text-neutral-600"
                    }`}
                  >
                    {status.text}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-[#f27f26] to-amber-500 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#f27f26]/20 transition hover:brightness-110 sm:w-auto sm:px-10"
                >
                  Send request
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
