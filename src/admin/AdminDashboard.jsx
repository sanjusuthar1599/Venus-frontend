import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiJson } from "../lib/adminApi.js";
import { PROJECT_TYPES } from "./constants.js";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiJson("/post");
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e?.message || "Could not load projects");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const by = Object.fromEntries(PROJECT_TYPES.map((t) => [t, 0]));
    for (const p of posts) {
      if (p.project_type && by[p.project_type] !== undefined) {
        by[p.project_type] += 1;
      }
    }
    return { total: posts.length, by };
  }, [posts]);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Overview of portfolio items served to the public site.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Total projects
            </p>
            <p className="mt-2 text-3xl font-bold text-neutral-900">
              {counts.total}
            </p>
          </div>
          {PROJECT_TYPES.map((t) => (
            <div
              key={t}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                {t}
              </p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">
                {counts.by[t]}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          to="/admin/projects"
          className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-50"
        >
          Manage portfolio
        </Link>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#f27f26] to-amber-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-[#f27f26]/25 transition hover:opacity-95"
        >
          New project
        </Link>
      </div>
    </div>
  );
}
