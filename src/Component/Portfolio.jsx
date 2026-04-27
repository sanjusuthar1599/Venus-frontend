import { useCallback, useEffect, useMemo, useState } from "react";
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

function ProjectCard({ project }) {
  const rawImage = project.project_images?.[0];
  const coverImage =
    rawImage && String(rawImage).trim()
      ? uploadFileUrl("images", rawImage)
      : "";
  const videoFile =
    project.project_video && String(project.project_video).trim()
      ? uploadFileUrl("videos", project.project_video)
      : "";
  const gradient =
    gradientByType[project.project_type] ??
    "from-neutral-100 via-neutral-50 to-neutral-200";

  const title = displayText(project.project_name);
  const location = displayText(project.project_location);
  const typeLabel = project.project_type ?? "";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] ring-1 ring-neutral-200/60 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_56px_-16px_rgba(242,127,38,0.18)] hover:ring-[#f27f26]/25">
      <div
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
      </div>
    </article>
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

  const visible = useMemo(() => {
    if (filter === "All") return posts;
    return posts.filter((p) => p.project_type === filter);
  }, [posts, filter]);

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
              Selected work
            </h2>
            <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-neutral-500 sm:text-base">
              Curated interiors and spaces — browse by category. Each card pulls
              live media from your studio API.
            </p>
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
                </button>
              );
            })}
          </Reveal>
        </div>

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
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && visible.length === 0 && (
          <div className="mt-16 rounded-3xl border border-dashed border-neutral-200 bg-white px-8 py-14 text-center">
            <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-500">
              No projects in this category yet. Upload with{" "}
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
    </div>
  );
};

export default Portfolio;
