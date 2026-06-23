import { useMemo, useState } from "react";
import Reveal from "../Reveal.jsx";
import {
  budgetFilters,
  budgetFilterMap,
  budgetProjects,
} from "../../config/content.js";

export function BudgetProjectCard({ project, onOpen }) {
  return (
    <button type="button" onClick={onOpen} className="portfolio-budget-card group">
      <img src={project.image} alt={project.title} loading="lazy" />
      <div className="portfolio-budget-card__meta">
        <p className="portfolio-budget-card__title">{project.title}</p>
        <p className="portfolio-budget-card__tag">{project.tag}</p>
        <span className="portfolio-budget-card__btn">View Project</span>
      </div>
    </button>
  );
}

export default function BudgetProjectsSection({ onProjectClick }) {
  const [budgetFilter, setBudgetFilter] = useState("Under 10 Lacs");

  const visible = useMemo(() => {
    const key = budgetFilterMap[budgetFilter];
    return key ? budgetProjects.filter((p) => p.budget === key) : budgetProjects;
  }, [budgetFilter]);

  return (
    <section className="portfolio-budget-section py-16 sm:py-20 lg:py-24">
      <div className="venus-container text-center">
        <span className="portfolio-budget-section__line" aria-hidden />
        <p className="venus-label">Projects For Every Budget</p>
        <h2 className="font-serif mt-3 text-[1.85rem] font-medium leading-tight text-venus-text sm:text-[2.15rem] lg:text-[2.5rem]">
          Beautiful Interiors, Made For You
        </h2>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10 sm:gap-2.5"
          role="tablist"
          aria-label="Filter by budget"
        >
          {budgetFilters.map((item) => {
            const active = budgetFilter === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setBudgetFilter(item)}
                className={`portfolio-budget-filter ${active ? "portfolio-budget-filter--active" : ""}`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="venus-container mt-10 lg:mt-12">
        {visible.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {visible.map((project, i) => (
              <li key={project.id}>
                <Reveal delay={(i % 4) * 50} variant="up">
                  <BudgetProjectCard
                    project={project}
                    onOpen={() => onProjectClick?.(project)}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <p className="venus-desc text-center text-venus-grey">
            No projects in this budget range yet. Contact us for a custom quote.
          </p>
        )}
      </div>
    </section>
  );
}
