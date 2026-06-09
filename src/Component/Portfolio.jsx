import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import PageHero from "./PageHero.jsx";
import Reveal from "./Reveal.jsx";
import { API_BASE_URL, uploadFileUrl } from "../config/api.js";

const categories = ["All", "Residential", "Commercial", "Hospitality"];

const gradientByType = {
  Residential: "from-stone-100 via-orange-50/40 to-stone-200",
  Commercial: "from-slate-100 via-emerald-50/30 to-slate-200",
  Hospitality: "from-amber-50 via-stone-100 to-neutral-200",
};

/** Clean display strings if API stored values with extra quotes */
function displayText(value) {
  if (value == null) return "";
  const s = String(value).trim();
  return s.replace(/^["']|["']$/g, "").trim();
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

function ProjectCard({ project, onOpen }) {
  const { coverImage, videoFile } = getProjectMedia(project);
  const gradient =
    gradientByType[project.project_type] ??
    "from-neutral-100 via-neutral-50 to-neutral-200";

  const title = displayText(project.project_name);
  const location = displayText(project.project_location);
  const typeLabel = project.project_type ?? "";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] ring-1 ring-neutral-200/60 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_56px_-16px_rgba(242,127,38,0.18)] hover:ring-[#f27f26]/25">
      <div 
        onClick={onOpen}
        className={`relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br sm:aspect-[3/4] ${gradient}`}
      >
        {/* Prefer video when present: image-first hid video when the image URL was missing/broken */}
        {videoFile ? (
          <video
            key={videoFile}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            src={videoFile}
            poster={coverImage || undefined}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            controls
          />
        ) : coverImage ? (
          <img
            src={coverImage}
            alt=""
            className="absolute inset-0 z-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : null}

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-80" />

        <div className="absolute left-4 top-4 z-[2] flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/92 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-800 shadow-sm backdrop-blur-sm">
            {typeLabel}
          </span>
          {videoFile && (
            <span className="flex items-center gap-1 rounded-full bg-neutral-900/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              <span className="inline-block h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white" />
              Video
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-neutral-100 px-5 pb-6 pt-5 sm:px-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-neutral-900 sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">
          {location}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-neutral-800 transition hover:border-[#f27f26]/40 hover:bg-[#f27f26]/5 hover:text-[#f27f26]"
        >
          View studio notes
          <span aria-hidden>→</span>
        </button>
      </div>
    </article>
  );
}

function ProjectPreview({ project, onClose }) {
  const { coverImage, videoFile } = getProjectMedia(project);
  const title = displayText(project.project_name);
  const location = displayText(project.project_location);
  const typeLabel = displayText(project.project_type);

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
      className="fixed inset-0 z-[999] flex items-end justify-center overflow-hidden bg-neutral-950/80 px-4 pb-4 pt-20 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-preview-title"
      onMouseDown={onClose}
    >
      <article
        className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl sm:grid-cols-[1.1fr_0.9fr]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl leading-none text-neutral-900 shadow-lg transition hover:bg-white"
          aria-label="Close project preview"
        >
          ×
        </button>

        <div className="relative min-h-[280px] bg-neutral-900 sm:min-h-[520px]">
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
            <img
              src={coverImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-[#f27f26]/30" />
          )}
        </div>

        <div className="overflow-y-auto p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f27f26]">
            {typeLabel || "Featured project"}
          </p>
          <h3
            id="project-preview-title"
            className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
          >
            {title || "Untitled project"}
          </h3>
          {location ? (
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              {location}
            </p>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ["Design focus", "Layout, material palette, and lighting mood"],
              ["Best for", typeLabel || "Residential and commercial spaces"],
              ["Studio note", "Use this project as a reference for your consultation"],
              ["Next step", "Share rooms, timeline, and inspiration images"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-800">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-gradient-to-r from-[#f27f26] to-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#f27f26]/20 transition hover:brightness-110"
            >
              Plan similar space
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-neutral-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-800 transition hover:border-neutral-900"
            >
              Back to gallery
            </button>
          </div>
        </div>
      </article>
    </div>,
    document.body
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[1.35rem] bg-white shadow-md ring-1 ring-neutral-200/60">
      <div className="aspect-[4/5] animate-pulse bg-gradient-to-br from-neutral-200 to-neutral-100 sm:aspect-[3/4]" />
      <div className="space-y-3 px-6 py-5">
        <div className="h-5 w-3/4 animate-pulse rounded-md bg-neutral-200" />
        <div className="h-4 w-full animate-pulse rounded-md bg-neutral-100" />
        <div className="h-4 w-2/3 animate-pulse rounded-md bg-neutral-100" />
      </div>
    </div>
  );
}

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProject, setSelectedProject] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/post`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("Could not load projects. Is the API running?");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const typeCounts = useMemo(() => {
    return posts.reduce(
      (acc, project) => {
        const type = project.project_type;
        acc.All += 1;
        if (type) acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      { All: 0 }
    );
  }, [posts]);

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = posts.filter((project) => {
      const matchesType = filter === "All" || project.project_type === filter;
      const searchable = [
        project.project_name,
        project.project_location,
        project.project_type,
      ]
        .map(displayText)
        .join(" ")
        .toLowerCase();

      return matchesType && searchable.includes(normalizedQuery);
    });

    return [...filtered].sort((a, b) => {
      const aName = displayText(a.project_name);
      const bName = displayText(b.project_name);

      if (sortBy === "name") return aName.localeCompare(bName);
      if (sortBy === "type") {
        return displayText(a.project_type).localeCompare(displayText(b.project_type));
      }

      const aTime = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const bTime = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return bTime - aTime;
    });
  }, [posts, filter, query, sortBy]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-700">
      <PageHero
        title="Portfolio"
        breadcrumbLabel="Portfolio"
        videoSrc="/portfolio.mp4"
        size="tall"
      />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <Reveal className="max-w-lg text-center lg:text-left" variant="left">
          <div>
            <span
              className="mx-auto mb-5 inline-block h-1 w-12 rounded-full bg-gradient-to-r from-[#f27f26] to-amber-400 lg:mx-0"
              aria-hidden
            />
            <h2 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              Our Work
            </h2>
            <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-neutral-500 sm:text-base">
              Curated interiors and spaces — browse by category. Each card pulls
              live media from your studio API.
            </p>
            {!loading && !error ? (
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Showing {visible.length} of {posts.length} projects
              </p>
            ) : null}
          </div>
          </Reveal>

          <Reveal
            className="flex flex-wrap justify-center gap-1.5 rounded-full bg-white/90 p-1.5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] ring-1 ring-neutral-200/80 backdrop-blur-sm lg:justify-end"
            variant="right"
            delay={120}
            role="tablist"
            aria-label="Filter projects"
          >
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 sm:px-5 sm:text-xs ${
                    active
                      ? "bg-gradient-to-r from-[#f27f26] to-amber-500 text-white shadow-md shadow-[#f27f26]/25"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                  }`}
                >
                  {cat}
                  <span className="ml-2 rounded-full bg-white/20 px-1.5 text-[10px]">
                    {typeCounts[cat] ?? 0}
                  </span>
                </button>
              );
            })}
          </Reveal>
        </div>

        {!loading && !error ? (
          <Reveal
            className="mt-10 grid gap-3 rounded-[1.5rem] border border-neutral-200 bg-white p-3 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] sm:grid-cols-[1fr_auto]"
            variant="up"
            delay={90}
          >
            <label className="relative block">
              <span className="sr-only">Search projects</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by project, location, or category"
                className="h-12 w-full rounded-2xl border border-transparent bg-neutral-50 px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#f27f26]/35 focus:bg-white focus:ring-2 focus:ring-[#f27f26]/15"
              />
            </label>
            <label className="block">
              <span className="sr-only">Sort projects</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 outline-none transition focus:border-[#f27f26]/35 focus:ring-2 focus:ring-[#f27f26]/15 sm:w-44"
              >
                <option value="newest">Newest first</option>
                <option value="name">Name A-Z</option>
                <option value="type">Category</option>
              </select>
            </label>
          </Reveal>
        ) : null}

        {loading && (
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i}>
                <SkeletonCard />
              </li>
            ))}
          </ul>
        )}

        {error && !loading && (
          <div className="mt-16 rounded-3xl border border-red-100 bg-white px-8 py-10 text-center shadow-lg shadow-red-500/5">
            <p className="text-sm text-red-800">{error}</p>
            <button
              type="button"
              onClick={loadPosts}
              className="mt-5 rounded-full bg-neutral-900 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {visible.map((project, i) => (
              <li key={project._id ?? project.id} className="min-w-0">
                <Reveal
                  className="h-full"
                  delay={(i % 9) * 65}
                  variant={i % 4 === 2 ? "scale" : "up"}
                >
                  <ProjectCard
                    project={project}
                    onOpen={() => setSelectedProject(project)}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && visible.length === 0 && (
          <div className="mt-16 rounded-3xl border border-dashed border-neutral-200 bg-white px-8 py-14 text-center">
            <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-500">
              No projects match this view yet. Try another category or search, or upload with{" "}
              <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">
                project_type
              </code>{" "}
              set to Residential, Commercial, or Hospitality.
            </p>
          </div>
        )}

        <Reveal
          className="mt-20 flex flex-col items-center justify-between gap-8 rounded-3xl border border-neutral-200/80 bg-white px-8 py-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] sm:flex-row sm:px-12"
          variant="scale"
          delay={60}
        >
        <div className="flex w-full flex-col items-center justify-between gap-8 sm:flex-row">
          <p className="max-w-md text-center text-[15px] leading-relaxed text-neutral-600 sm:text-left">
            Planning something similar? We tailor scope to renovation, new build, or
            styling-only phases.
          </p>
          <Link
            to="/services"
            className="shrink-0 rounded-full border-2 border-neutral-900 bg-neutral-900 px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-neutral-900"
          >
            Our services
          </Link>
        </div>
        </Reveal>
      </div>

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
