import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { business } from "../config/business.js";

const navigation = [
  { name: "Home", to: "/", end: true },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Projects", to: "/portfolio" },
  { name: "Process", to: "/process" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

const ACTIVE_THRESHOLD = 60;

/** Dark hero at top → white nav links */
const DARK_HERO_PATHS = new Set([
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/process",
  "/blog",
  "/contact",
]);

function NavLinkItem({ item, onNavigate, mobile = false }) {
  const desktopClass = "home-nav-link relative px-2 py-2 lg:px-2.5 xl:px-3";
  const mobileClass =
    "block rounded-lg px-4 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-venus-text transition hover:bg-venus-beige";

  const base = mobile ? mobileClass : desktopClass;

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `${base}${isActive ? (mobile ? " bg-venus-beige text-venus-gold" : " home-nav-link--active") : ""}`
      }
    >
      {item.name}
    </NavLink>
  );
}

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const solidBar = scrolled || mobileOpen;
  const navOverDark =
    DARK_HERO_PATHS.has(location.pathname) && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= ACTIVE_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`venus-navbar fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          navOverDark ? "nav-over-dark" : ""
        } ${
          solidBar
            ? "venus-navbar--solid border-b border-black/[0.05] bg-venus-cream/95 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="venus-container">
          <div className="flex h-[68px] items-center gap-2 sm:h-[72px] lg:h-[76px]">
            <Link to="/" className="venus-navbar__brand flex shrink-0 items-center gap-2 sm:gap-2.5">
              <img
                src="/venuslogo.png"
                alt="Venus Interiors"
                className="h-12 w-auto object-contain sm:h-16"
              />
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              <div className="flex flex-wrap items-center justify-center gap-0">
                {navigation.map((item) => (
                  <NavLinkItem key={item.name} item={item} />
                ))}
              </div>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              <a
                href={business.phoneHref}
                className="venus-nav-call hidden md:inline-flex"
                aria-label={`Call ${business.phone}`}
                title={business.phone}
              >
                <span className="venus-nav-call__ring" aria-hidden />
                <PhoneIcon className="venus-nav-call__icon h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden />
              </a>
              <Link
                to="/contact"
                className="venus-btn-primary !min-h-[38px] !rounded-full !px-4 !py-2 !text-[9px] sm:!min-h-[40px] sm:!px-5 sm:!text-[10px] hidden md:inline-flex"
              >
                Book Consultation
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="home-nav-toggle flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-venus-text backdrop-blur-sm lg:hidden sm:h-10 sm:w-10"
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
              >
                <span className={`home-nav-toggle-icon ${mobileOpen ? "is-open" : ""}`}>
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`home-mobile-drawer fixed inset-0 z-[60] lg:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[min(300px,88vw)] flex-col bg-venus-cream shadow-[-8px_0_40px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
            <span className="font-serif text-sm uppercase tracking-[0.18em] text-venus-text">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-lg text-venus-text"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
            {navigation.map((item, index) => (
              <div
                key={item.name}
                className="home-mobile-nav-item"
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <NavLinkItem item={item} mobile onNavigate={() => setMobileOpen(false)} />
              </div>
            ))}
          </div>
          <div className="border-t border-black/5 p-4 space-y-3">
            <a
              href={business.phoneHref}
              className="venus-nav-call venus-nav-call--mobile flex min-h-[44px] w-full"
              aria-label={`Call ${business.phone}`}
            >
              <span className="venus-nav-call__ring" aria-hidden />
              <PhoneIcon className="venus-nav-call__icon h-5 w-5" aria-hidden />
              <span>Call {business.phone}</span>
            </a>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="venus-btn-primary flex min-h-[44px] w-full !rounded-full"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
