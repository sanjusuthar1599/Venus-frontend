import { createElement } from "react";
import {
  HomeModernIcon,
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import Reveal from "./Reveal.jsx";
import { useSpotlight } from "../hooks/useSpotlight.js";
import HeroMouseLayer from "./ui/HeroMouseLayer.jsx";

const ABOUT_MISSION =
  "At Venus Interiors, we believe that every space has the potential to be extraordinary. Our mission is to create beautiful, functional and timeless interiors that enhance everyday living.";

const aboutStats = [
  { value: "10+", label: "Years Experience", icon: HomeModernIcon },
  { value: "500+", label: "Projects Done", icon: ClipboardDocumentListIcon },
  { value: "100%", label: "Client Satisfaction", icon: CheckBadgeIcon },
];

export default function AboutHero() {
  const heroRef = useSpotlight();

  return (
    <section ref={heroRef} className="about-hero hero-mouse-shell">
      <img
        src="/aboutpage.png"
        alt=""
        className="about-hero__bg"
        loading="eager"
      />
      <div className="about-hero__overlay" aria-hidden />
      <HeroMouseLayer containerRef={heroRef} particleCount={42} />

      <div className="venus-container about-hero__content">
        <Reveal variant="left">
          <p className=" text-[#b59461]">About Us</p>
          <h1 className="about-hero__title font-serif">
            Designing Spaces With
            <br />
            Purpose And Passion
          </h1>
          <p className="about-hero__desc">{ABOUT_MISSION}</p>

          <ul className="about-hero__stats">
            {aboutStats.map(({ value, label, icon }) => (
              <li key={label} className="about-hero__stat">
                <span className="about-hero__stat-icon" aria-hidden>
                  {createElement(icon, { className: "h-[18px] w-[18px] stroke-[1.35]" })}
                </span>
                <span className="about-hero__stat-value">{value}</span>
                <span className="about-hero__stat-label">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
