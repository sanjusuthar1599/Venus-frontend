import { createElement } from "react";
import AboutHero from "./AboutHero.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";
import CtaBanner from "./ui/CtaBanner.jsx";
import Reveal from "./Reveal.jsx";
import { coreValues, teamMembers } from "../config/content.js";

const About = () => {
  return (
    <div className="min-h-screen bg-venus-cream text-venus-text">
      <AboutHero />

      <section className="venus-section">
        <div className="venus-container">
          <div className="about-story-grid grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)] lg:gap-16">
            <Reveal variant="right" delay={80}>
              <SectionHeading
                align="left"
                label="Our Story"
                title="The Journey Behind Venus Interiors"
                description="Founded in 2010, Venus Interiors began with a simple idea: to create spaces that are as visually stunning as they are functional. Over the years, we have had the privilege of working with clients across Maharashtra to bring their dreams to life."
              />
              <p className="venus-desc mt-5 text-venus-grey">
                From modular kitchens in Kalyan West to full-home transformations and commercial fit-outs,
                we bring thoughtful layout, quality materials, and transparent communication to every project.
                Our team listens first, designs with intention, and delivers on time.
              </p>
              <p className="venus-desc mt-4 text-venus-grey">
                Based near Rama Bai Garden, we serve clients across Navi Mumbai and beyond — combining local
                craftsmanship with contemporary design sensibilities.
              </p>
            </Reveal>
            <Reveal variant="left">
              <div className="about-story-media overflow-hidden rounded-sm shadow-lg">
                <img
                  // src="/about.png"
                  src="/venus_about_photo.png"
                  alt="Venus Interiors design studio"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="venus-section bg-white">
        <div className="venus-container">
          <Reveal>
            <SectionHeading
              label="What Guides Us"
              title="Our Core Values"
              description="The principles behind every space we design."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:mt-14">
            {coreValues.map(({ title, body, icon }, i) => (
              <Reveal key={title} delay={i * 70} variant="up">
                <article className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-venus-gold/25 bg-venus-cream text-venus-gold">
                    {createElement(icon, { className: "h-6 w-6", "aria-hidden": true })}
                  </div>
                  <h3 className="venus-title mt-5 text-[1.15rem]">{title}</h3>
                  <p className="venus-desc mt-2 text-venus-grey">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="venus-team-section venus-section">
        <div className="venus-container">
          <Reveal>
            <SectionHeading
              label="The Team"
              title="The Creative Minds Behind The Designs"
              description="Experienced designers and consultants dedicated to bringing your vision to life."
            />
          </Reveal>
          <div className="venus-team-grid">
            {teamMembers.map((member, i) => (
              <Reveal key={member.role} delay={i * 80} variant="up">
                <article className="venus-team-card">
                  <div className="venus-team-card__ring">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="venus-team-card__photo"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="venus-team-card__name font-serif">{member.name}</h3>
                  <p className="venus-team-card__role">{member.role}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Let's Create Something Beautiful Together"
        description="Whether you're renovating, building new, or refreshing a single room — we'd love to hear about your project."
        buttonText="Book a Consultation"
        imageSrc="/herosection.png"
      />
    </div>
  );
};

export default About;
