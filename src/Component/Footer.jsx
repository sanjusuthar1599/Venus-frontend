import { createElement } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { business } from "../config/business.js";

const quickLinks = [
  { label: "Home", to: "/", end: true },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/portfolio" },
  { label: "Process", to: "/process" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const serviceLinks = business.services.slice(0, 4).map((label) => ({
  label,
  to: "/services",
}));

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: business.social.facebook },
  { icon: FaInstagram, label: "Instagram", href: business.social.instagram },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/" },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-venus-dark text-white/60">
      <div className="venus-container py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/venuslogo.png"
                alt="Venus Interiors"
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              {business.description} Based in {business.address.area}.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-venus-gold hover:text-venus-gold"
                >
                  {createElement(icon, { className: "h-3.5 w-3.5" })}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="venus-label !text-white/90">Quick Links</h3>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className="text-sm text-white/50 transition hover:text-venus-gold"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="venus-label !text-white/90">Services</h3>
            <ul className="mt-5 space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/50 transition hover:text-venus-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="venus-label !text-white/90">Contact Us</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/50">
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-venus-gold" aria-hidden />
                <span>
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-venus-gold" aria-hidden />
                <a href={business.phoneHref} className="hover:text-venus-gold">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeIcon className="h-4 w-4 shrink-0 text-venus-gold" aria-hidden />
                <a href={business.emailHref} className="hover:text-venus-gold">
                  {business.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <GlobeAltIcon className="h-4 w-4 shrink-0 text-venus-gold" aria-hidden />
                <span>www.venusinteriors.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="venus-container flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/40 sm:flex-row">
          <p>© {year} Venus Interiors. All rights reserved.</p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-venus-gold">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-venus-gold">
              Terms &amp; Conditions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
