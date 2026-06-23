import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import PageHero from "./PageHero.jsx";
import CtaBanner from "./ui/CtaBanner.jsx";
import BudgetProjectsSection from "./ui/BudgetProjectsSection.jsx";
import Reveal from "./Reveal.jsx";
import { API_BASE_URL, uploadFileUrl } from "../config/api.js";
import {
  fallbackProjects,
  portfolioFilters,
  portfolioFilterMap,
} from "../config/content.js";

function displayText(value) {
  if (value == null) return "";
  const s = String(value).trim();
  return s.replace(/^["']|["']$/g, "").trim();
}

function normalizeCategory(type) {
  const t = displayText(type).toLowerCase();
  if (t.includes("residential")) return "residential";
  if (t.includes("commercial") || t.includes("hospitality")) return "commercial";
  if (t.includes("modular")) return "modular";
  return "residential";
}

function getProjectMedia(project) {
  const rawImage = project.project_images?.[0];
  const coverImage =
    rawImage && String(rawImage).trim()
      ? uploadFileUrl("images", rawImage)
      : "";
  const videoFile =
    project.project_video && String(project.project_video).trim()
      ? uploadFileUrl("videos", project.project_video)
      : "";

  return { coverImage, videoFile };
}

function apiToCard(project) {
  const { coverImage, videoFile } = getProjectMedia(project);
  const type = displayText(project.project_type);
  return {
    id: project._id ?? project.id,
    title: displayText(project.project_name) || "Untitled Project",
    tag: displayText(project.project_location) || type || "Interior Design",
    category: normalizeCategory(type),
    image: coverImage,
    video: videoFile,
    raw: project,
  };
}

function DarkProjectCard({ project, onOpen }) {
  const { title, tag, image, video } = project;

  return (
    <button type="button" onClick={onOpen} className="portfolio-dark-grid-card group">
      {video ? (
        <video
          src={video}
          poster={image || undefined}
          muted
          loop
          playsInline
          autoPlay
          className="pointer-events-none"
        />
      ) : image ? (
        <img src={image} alt={title} loading="lazy" />
      ) : (
        <div className="flex h-full items-center justify-center bg-venus-charcoal text-sm text-white/50">
          No preview
        </div>
      )}
      <div className="home-portfolio-card-meta absolute bottom-0 left-0 z-10 w-full p-4 sm:p-5">
        <p className="home-portfolio-card-title text-[14px] font-semibold leading-tight text-white sm:text-[15px]">
          {title}
        </p>
        <p className="home-portfolio-card-tag mt-1 text-[11px] text-white/70 sm:text-[12px]">
          {tag}
        </p>
      </div>
    </button>
  );
}

function ProjectPreview({ project, onClose }) {
  const raw = project.raw ?? project;
  const { coverImage, videoFile } = project.raw
    ? getProjectMedia(project.raw)
    : { coverImage: project.image, videoFile: project.video };
  const title = project.title ?? displayText(raw.project_name);
  const tag = project.tag ?? displayText(raw.project_location);
  const typeLabel = displayText(raw.project_type);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-end justify-center overflow-hidden bg-venus-dark/80 px-4 pb-4 pt-20 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-preview-title"
      onMouseDown={onClose}
    >
      <article
        className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-sm bg-white shadow-2xl sm:grid-cols-[1.1fr_0.9fr]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xl leading-none text-venus-text shadow-lg transition hover:bg-white"
          aria-label="Close project preview"
        >
          ×
        </button>

        <div className="relative min-h-[280px] bg-venus-dark sm:min-h-[520px]">
          {videoFile ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={videoFile}
              poster={coverImage || undefined}
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          ) : coverImage ? (
            <img src={coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-venus-dark to-venus-gold/30" />
          )}
        </div>

        <div className="overflow-y-auto p-7 sm:p-9">
          <p className="venus-label">{typeLabel || "Featured Project"}</p>
          <h3
            id="project-preview-title"
            className="venus-title mt-3 text-[1.75rem] sm:text-[2rem]"
          >
            {title}
          </h3>
          {tag ? <p className="venus-desc mt-3 text-venus-grey">{tag}</p> : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="venus-btn-primary">
              Plan Similar Space
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="venus-btn-outline !min-h-[46px]"
            >
              Back To Gallery
            </button>
          </div>
        </div>
      </article>
    </div>,
    document.body
  );
}

function DarkSkeleton() {
  return (
    <div className="aspect-[3/4.15] animate-pulse overflow-hidden rounded-[20px] bg-venus-beige/60" />
  );
}

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [apiPosts, setApiPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/post`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setApiPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("Could not load projects. Showing featured work.");
      setApiPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const allProjects = useMemo(() => {
    if (apiPosts.length > 0) {
      return apiPosts.map(apiToCard);
    }
    return fallbackProjects;
  }, [apiPosts]);

  const visible = useMemo(() => {
    const key = portfolioFilterMap[filter];
    return key ? allProjects.filter((p) => p.category === key) : allProjects;
  }, [allProjects, filter]);

  const openPreview = (project) => {
    setSelectedProject({
      ...project,
      title: project.title,
      tag: project.tag,
      image: project.image,
      video: project.video,
    });
  };

  return (
    <div className="min-h-screen bg-venus-cream text-venus-text">
      <PageHero
        title={
          <>
            Our Projects
            <br />
            A Reflection Of Our Passion
          </>
        }
        subtitle="Explore our curated collection of residential, commercial, and modular interiors — each project crafted with care and attention to detail."
        breadcrumbLabel="Projects"
        imageSrc="/herosection.png"
        size="tall"
      />

      {/* Featured projects */}
      <section className="home-portfolio-section py-14 sm:py-16 lg:py-20">
        <div className="venus-container text-center">
          <span className="home-portfolio-section__line" aria-hidden />
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-venus-gold sm:text-[11px]">
            Our Projects
          </p>
          <h2 className="font-serif mt-3 text-[1.85rem] font-medium text-venus-text sm:text-[2.15rem] lg:text-[2.35rem]">
            Spaces We&apos;re Proud Of
          </h2>

          <div className="mt-6 flex flex-wrap items-center justify-center sm:mt-7">
            {portfolioFilters.map((cat, index) => (
              <span key={cat} className="flex items-center">
                {index > 0 && (
                  <span className="mx-3 text-[11px] text-venus-grey/35 sm:mx-4" aria-hidden>
                    |
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`home-portfolio-filter text-[10px] font-medium uppercase tracking-[0.18em] transition sm:text-[11px] ${
                    filter === cat ? "home-portfolio-filter--active" : ""
                  }`}
                >
                  {cat}
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="venus-container mt-8 lg:mt-10">
          {error && !loading && apiPosts.length === 0 ? (
            <p className="mb-6 text-center text-sm text-venus-grey">{error}</p>
          ) : null}

          {loading ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>
                  <DarkSkeleton />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {visible.map((project, i) => (
                <li key={project.id ?? project.title}>
                  <Reveal delay={(i % 6) * 55} variant="up">
                    <DarkProjectCard
                      project={project}
                      onOpen={() => openPreview(project)}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}

          {!loading && visible.length === 0 && (
            <p className="text-center text-sm text-venus-grey">
              No projects in this category yet.
            </p>
          )}

          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              to="/contact"
              className="inline-flex min-h-[46px] items-center justify-center rounded-[4px] bg-venus-gold px-9 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-venus-tan-dark sm:text-[11px]"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <BudgetProjectsSection onProjectClick={openPreview} />

      <CtaBanner
        title="Have A Project In Mind?"
        description="Let's discuss your vision and create a space you'll love to live in."
        buttonText="Book A Consultation"
        imageSrc="/MODULAR_KITCHEN.avif"
      />

      {selectedProject ? (
        <ProjectPreview
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </div>
  );
};

export default Portfolio;
