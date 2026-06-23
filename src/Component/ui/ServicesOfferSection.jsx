import { useState } from "react";
import {
  HomeModernIcon,
  BuildingOffice2Icon,
  Squares2X2Icon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { serviceDetails } from "../../config/content.js";

const serviceIcons = [
  HomeModernIcon,
  BuildingOffice2Icon,
  Squares2X2Icon,
  SparklesIcon,
  WrenchScrewdriverIcon,
];

export default function ServicesOfferSection() {
  const [activeService, setActiveService] = useState(0);
  const active = serviceDetails[activeService];
  const ActiveIcon = serviceIcons[activeService] ?? HomeModernIcon;

  return (
    <section className="services-offer-section venus-section">
      <div className="venus-container">
        <Reveal>
          <SectionHeading
            label="What We Offer"
            title="Elevated Interior Design Solutions"
            description="Select a service to explore how we shape residential, commercial, and modular spaces."
          />
        </Reveal>

        <div className="services-offer-shell mt-12 lg:mt-14">
          <div className="services-offer-grid">
            <Reveal variant="left" className="services-offer-nav-wrap">
              <div className="services-offer-nav">
                <p className="services-offer-nav__label">Our expertise</p>
                <ul className="services-offer-nav__list">
                  {serviceDetails.map((service, index) => {
                    const isActive = activeService === index;
                    const Icon = serviceIcons[index] ?? HomeModernIcon;
                    return (
                      <li key={service.title}>
                        <button
                          type="button"
                          onClick={() => setActiveService(index)}
                          className={`services-offer-tab ${isActive ? "services-offer-tab--active" : ""}`}
                          aria-pressed={isActive}
                        >
                          <span className="services-offer-tab__index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="services-offer-tab__icon" aria-hidden>
                            <Icon className="h-5 w-5 stroke-[1.35]" />
                          </span>
                          <span className="services-offer-tab__body">
                            <span className="services-offer-tab__title">{service.title}</span>
                            <span
                              className={`services-offer-tab__desc ${isActive ? "is-visible" : ""}`}
                            >
                              {service.desc}
                            </span>
                          </span>
                          <span className="services-offer-tab__arrow" aria-hidden>
                            →
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <Link to="/contact" className="services-offer-nav__cta">
                  Book a consultation
                </Link>
              </div>
            </Reveal>

            <Reveal variant="right" delay={80} className="services-offer-stage-wrap">
              <div className="services-offer-stage">
                <div className="services-offer-stage__media">
                  {serviceDetails.map((service, index) => (
                    <img
                      key={service.title}
                      src={service.image}
                      alt={service.title}
                      className={`services-offer-stage__image ${
                        activeService === index ? "is-active" : ""
                      }`}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  ))}
                  <div className="services-offer-stage__shade" aria-hidden />
                </div>

                <div key={activeService} className="services-offer-stage__float">
                  <span className="services-offer-stage__badge">
                    <ActiveIcon className="h-4 w-4 stroke-[1.5]" aria-hidden />
                    Service {String(activeService + 1).padStart(2, "0")}
                  </span>
                  <h3 className="services-offer-stage__title font-serif">{active.title}</h3>
                  <p className="services-offer-stage__desc">{active.desc}</p>
                </div>

                <div className="services-offer-stage__progress" aria-hidden>
                  {serviceDetails.map((service, index) => (
                    <button
                      key={service.title}
                      type="button"
                      onClick={() => setActiveService(index)}
                      className={`services-offer-stage__dot ${
                        activeService === index ? "is-active" : ""
                      }`}
                      aria-label={`Show ${service.title}`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
