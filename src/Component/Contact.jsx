import { createElement, useState } from "react";
import { toast } from "react-toastify";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import PageHero from "./PageHero.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { business } from "../config/business.js";
import { submitInquiry } from "../lib/submitInquiry.js";

const MAP_EMBED_QUERY =
  "Shop+no.+04,+Ajay+Deep+chs.,+Plot+no.+19,+Sec.+19,+Kharghar,+Near+Rama+Bai+Garden,+Kalyan+West,+Navi+Mumbai+410210";
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_EMBED_QUERY}&hl=en&z=15&output=embed`;
const MAP_OPEN_URL =
  "https://www.google.com/maps/search/?api=1&query=Shop+no.+04,+Ajay+Deep+chs.,+Near+Rama+Bai+Garden,+Kalyan+West,+Navi+Mumbai+410210";

const projectTypes = [
  { value: "", label: "Type of Project" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "modular", label: "Modular Kitchen / Wardrobe" },
  { value: "renovation", label: "Renovation" },
  { value: "consultation", label: "Design Consultation" },
  { value: "other", label: "Other" },
];

const inputClass =
  "mt-2 w-full rounded-sm border border-black/10 bg-white px-4 py-3 text-sm text-venus-text outline-none transition placeholder:text-venus-grey/60 focus:border-venus-gold/50 focus:ring-1 focus:ring-venus-gold/20";

const labelClass = "venus-label !tracking-[0.2em] !text-venus-text/70";

const Contact = () => {
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const project = String(data.get("projectType") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", text: "Please fill in your name, email, and message." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "pending", text: "Sending your message…" });

    try {
      const result = await submitInquiry({
        form_type: "contact",
        name,
        email,
        phone,
        project_type: project,
        message,
      });
      setStatus({
        type: "success",
        text: result.message || "Thank you! We received your message and will reply soon.",
      });
      form.reset();
      toast.success("Message sent successfully");
    } catch (err) {
      setStatus({
        type: "error",
        text: err.message || "Could not send your message. Please try again.",
      });
      toast.error(err.message || "Could not send message");
    } finally {
      setSubmitting(false);
    }
  };

  const contactItems = [
    {
      Icon: MapPinIcon,
      lines: [business.address.line1, business.address.line2],
    },
    {
      Icon: PhoneIcon,
      lines: [business.phone],
      href: business.phoneHref,
    },
    {
      Icon: EnvelopeIcon,
      lines: [business.email],
      href: business.emailHref,
    },
    {
      Icon: GlobeAltIcon,
      lines: [business.hours || "Open until 8:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen bg-venus-cream text-venus-text">
      <PageHero
        title="Let's Create Your Dream Space Together"
        subtitle="Share your vision with us. Visit our studio, call, or send a message — we're here to help."
        breadcrumbLabel="Contact"
        imageSrc="/conterbg.avif"
        size="tall"
      />

      <section className="venus-section">
        <div className="venus-container">
          <Reveal>
            <SectionHeading
              align="center"
              label="Reach Us"
              title="We'd Love To Hear From You"
              description="Call, email, or visit our studio near Rama Bai Garden, Kalyan West."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {contactItems.map(({ Icon, lines, href }, i) => (
              <Reveal key={lines[0]} delay={i * 60} variant="up">
                <article className="contact-info-card h-full">
                  <span className="contact-info-card__icon">
                    {createElement(Icon, { className: "h-5 w-5", "aria-hidden": true })}
                  </span>
                  <div className="contact-info-card__body venus-desc text-venus-grey">
                    {href ? (
                      <a href={href} className="hover:text-venus-gold">
                        {lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </a>
                    ) : (
                      lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={business.phoneHref} className="venus-btn-primary !rounded-full">
              Call {business.phone}
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="venus-btn-outline !rounded-full"
            >
              WhatsApp Us
            </a>
            <div className="flex gap-3">
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-venus-text transition hover:border-venus-gold hover:text-venus-gold"
              >
                <FaFacebookF className="h-3.5 w-3.5" />
              </a>
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-venus-text transition hover:border-venus-gold hover:text-venus-gold"
              >
                <FaInstagram className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="venus-section bg-white">
        <div className="venus-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <Reveal variant="left">
              <div className="overflow-hidden rounded-sm border border-black/5 shadow-sm">
                <div className="border-b border-black/5 bg-venus-cream px-5 py-4">
                  <p className="venus-label">Find Us</p>
                  <p className="venus-desc mt-2 text-venus-grey">
                    {business.address.line1}, {business.address.area}
                  </p>
                </div>
                <div className="relative aspect-[4/3] w-full bg-venus-beige lg:min-h-[380px]">
                  <iframe
                    title="Venus Interior on Google Maps"
                    src={MAP_EMBED_SRC}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className="border-t border-black/5 px-5 py-3">
                  <a
                    href={MAP_OPEN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold uppercase tracking-[0.16em] text-venus-gold transition hover:text-venus-tan-dark"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={80}>
              <div className="venus-card rounded-sm p-6 sm:p-8">
                <SectionHeading
                  align="left"
                  label="Get In Touch"
                  title="Send Us A Message"
                  description="Tell us about your project and our team will get back to you shortly."
                />

                <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name <span className="text-venus-gold">*</span>
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
                        Email <span className="text-venus-gold">*</span>
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
                      Type of Project
                    </label>
                    <select
                      id="contact-project"
                      name="projectType"
                      className={`${inputClass} cursor-pointer`}
                    >
                      {projectTypes.map((opt) => (
                        <option key={opt.value || "empty"} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass}>
                      Message <span className="text-venus-gold">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      className={`${inputClass} min-h-[120px] resize-y`}
                      placeholder="Describe your space, goals, and any inspiration."
                    />
                  </div>

                  {status ? (
                    <p
                      role="status"
                      className={`text-sm ${
                        status.type === "error"
                          ? "text-red-600"
                          : status.type === "success"
                            ? "text-emerald-700"
                          : status.type === "pending"
                            ? "text-venus-gold"
                            : "text-venus-grey"
                      }`}
                    >
                      {status.text}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="venus-btn-primary w-full sm:w-auto disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
