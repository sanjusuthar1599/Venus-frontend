import { createElement } from "react";
import { NavLink } from "react-router-dom";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { FaFacebookF, FaInstagram, FaWhatsapp  } from "react-icons/fa";
import Reveal from "./Reveal.jsx";

const accent = "text-amber-400";
const accentHover =
  "transition hover:text-[#f27f26] focus-visible:outline-none focus-visible:text-[#f27f26]";

const footerNav = [
  { label: "Home", to: "/", end: true },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

const socials = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/p/Venus-Interiors-100064131730971/",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/venus_interior_kalyan/",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/919653467488",
  },  
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div
        className="h-1 w-full bg-gradient-to-r from-[#f27f26] via-amber-400 to-[#2b6cb0]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <Reveal className="lg:col-span-4" delay={0} variant="up">
          <div>
               <div className="flex items-center">
            <img src="/venus_logo.png" alt="Venus Logo" className="h-10 w-auto sm:h-36" />
          </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400">
              Interior design and spatial planning crafted around how you live.
              Warm materials, clear light, and lasting detail.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 transition hover:border-[#f27f26]/50 hover:bg-[#f27f26]/10 hover:text-amber-400"
                >
                  {createElement(icon, { className: "h-4 w-4" })}
                </a>
              ))}
            </div>
          </div>
          </Reveal>

          {/* Quick links */}
          <Reveal className="lg:col-span-3 lg:pt-1" delay={80} variant="up">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Explore
            </h3>
            <span
              className="mt-3 mb-6 block h-px w-10 bg-gradient-to-r from-[#f27f26] to-amber-400"
              aria-hidden
            />
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `text-sm font-medium uppercase tracking-wide transition ${
                          isActive
                            ? `${accent} ${accentHover}`
                            : `text-neutral-300 ${accentHover}`
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <a
                      href={item.href}
                      className={`text-sm font-medium uppercase tracking-wide text-neutral-300 ${accentHover}`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          </Reveal>

          {/* Contact */}
          <Reveal className="lg:col-span-3 lg:pt-1" delay={160} variant="up">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Contact
            </h3>
            <span
              className="mt-3 mb-6 block h-px w-10 bg-gradient-to-r from-[#f27f26] to-amber-400"
              aria-hidden
            />
            <ul className="space-y-5">
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#f27f26]/10 text-[#f27f26]">
                  <MapPinIcon className="h-5 w-5" aria-hidden />
                </span>
                <div className="text-sm leading-relaxed">
                  <p className="font-medium text-white">Location</p>
                  <p>Shop no. 04, Ajay Deep chs. Plot no. 19, Sec. 19, Kharghar, Navi mumbai, Kalyan West 410210
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-amber-400/10 text-amber-400">
                  <PhoneIcon className="h-5 w-5" aria-hidden />
                </span>
                <a
                  href="tel:+919653467488"
                  className={`text-sm font-medium text-white ${accentHover}`}
                >
                  +91 96534 67488
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-sky-500/10 text-sky-400">
                  <EnvelopeIcon className="h-5 w-5" aria-hidden />
                </span>
                <a
                  href="mailto:hello@venusinterior.com"
                  className={`text-sm font-medium text-white ${accentHover}`}
                >
                  hello@venusinterior.com
                </a>
              </li>
            </ul>
          </div>
          </Reveal>

          {/* About strip */}
          <Reveal className="lg:col-span-2 lg:pt-1" delay={220} variant="up">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Studio
            </h3>
            <span
              className="mt-3 mb-6 block h-px w-10 bg-gradient-to-r from-[#f27f26] to-amber-400"
              aria-hidden
            />
            <p className="text-sm leading-relaxed">
              From concept to completion, we align architecture with lifestyle so
              every room feels intentional.
            </p>
          </div>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-neutral-500 sm:flex-row sm:px-8">
          <p>
            © {year}{" "}
            <span className="text-neutral-400">Venus Interior</span>. All rights
            reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href="#" className={`${accentHover} hover:underline`}>
              Privacy
            </a>
            <span className="text-neutral-700" aria-hidden>
              |
            </span>
            <a href="#" className={`${accentHover} hover:underline`}>
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
