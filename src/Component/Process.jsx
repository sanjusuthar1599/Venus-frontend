import { createElement } from "react";
import PageHero from "./PageHero.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";
import CtaBanner from "./ui/CtaBanner.jsx";
import Reveal from "./Reveal.jsx";
import { processSteps } from "../config/content.js";

const Process = () => {
  return (
    <div className="min-h-screen bg-venus-cream text-venus-text">
      <PageHero
        title="Our Design Process: Simple, Seamless, Successful."
        breadcrumbLabel="Process"
        imageSrc="/service.jpg"
        size="tall"
      />

      <section className="venus-section">
        <div className="venus-container">
          <Reveal>
            <SectionHeading
              label="How We Work"
              title="From Vision To Reality"
              description="A clear, collaborative journey from first conversation to final handover — designed to keep you informed and inspired at every step."
            />
          </Reveal>

          <div className="relative mx-auto mt-14 max-w-3xl lg:mt-20">
            <div
              className="absolute left-[27px] top-8 bottom-8 hidden w-px border-l-2 border-dashed border-venus-gold/30 sm:block"
              aria-hidden
            />

            <ol className="space-y-12 lg:space-y-16">
              {processSteps.map(({ num, title, desc, icon }, i) => (
                <Reveal key={num} delay={i * 80} variant="up">
                  <li className="relative grid gap-5 sm:grid-cols-[56px_1fr] sm:gap-8">
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-venus-gold/30 bg-white text-venus-gold shadow-sm">
                        {createElement(icon, { className: "h-6 w-6", "aria-hidden": true })}
                      </span>
                      <span className="venus-label mt-3">{num}</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="venus-title text-[1.35rem] sm:text-[1.5rem]">{title}</h3>
                      <p className="venus-desc mt-3 text-venus-grey">{desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready To Start Your Project?"
        description="Let's design a space you'll love."
        buttonText="Book a Consultation"
        imageSrc="/Living-room.avif"
      />
    </div>
  );
};

export default Process;
