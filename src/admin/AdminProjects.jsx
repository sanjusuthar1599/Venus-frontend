import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiJson } from "../lib/adminApi.js";
import { uploadFileUrl } from "../config/api.js";

export default function AdminProjects() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 6;

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

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(posts.length / ROWS_PER_PAGE));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, posts.length]);

  async function remove(id, name) {
    if (!window.confirm(`Delete “${name}”? This removes files from the server.`)) {
      return;
    }
    try {
      await apiJson(`/post/project/${id}`, { method: "DELETE" });
      toast.success("Project deleted");
      load();
    } catch (e) {
      toast.error(e?.message || "Delete failed");
    }
  }

  const totalPages = Math.max(1, Math.ceil(posts.length / ROWS_PER_PAGE));
  const pageStart = (currentPage - 1) * ROWS_PER_PAGE;
  const visiblePosts = posts.slice(pageStart, pageStart + ROWS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Portfolio
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Edit metadata, media, or remove projects.
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#f27f26] to-amber-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-[#f27f26]/25 transition hover:opacity-95"
        >
          New project
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center text-sm text-neutral-500">
          No projects yet. Create one to see it on the public portfolio page.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="max-h-[26rem] overflow-y-auto">
            <table className="min-w-full divide-y divide-neutral-200 text-left text-sm">
              <thead className="sticky top-0 z-10 bg-neutral-50 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3 sm:px-6">Preview</th>
                  <th className="px-4 py-3 sm:px-6">Project</th>
                  <th className="hidden px-4 py-3 sm:table-cell sm:px-6">Type</th>
                  <th className="px-4 py-3 text-right sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {visiblePosts.map((p) => {
                  const thumb =
                    p.project_images?.[0] &&
                    uploadFileUrl("images", p.project_images[0]);
                  const vid =
                    p.project_video &&
                    uploadFileUrl("videos", p.project_video);
                  return (
                    <tr key={p._id} className="align-middle">
                      <td className="px-4 py-3 sm:px-6">
                        <div className="h-14 w-20 overflow-hidden rounded-lg bg-neutral-100">
                          {thumb ? (
                            <img
                              src={thumb}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : vid ? (
                            <video
                              src={vid}
                              muted
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>
                      </td>
                      <td className="px-4 py-3 sm:px-6">
                        <p className="font-medium text-neutral-900">
                          {p.project_name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {p.project_location}
                        </p>
                        <p className="mt-1 text-xs text-[#f27f26] sm:hidden">
                          {p.project_type}
                        </p>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell sm:px-6">
                        {p.project_type}
                      </td>
                      <td className="px-4 py-3 text-right sm:px-6">
                        <div className="flex flex-wrap justify-end gap-2">
                          <Link
                            to={`/admin/projects/${p._id}/edit`}
                            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-50"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => remove(p._id, p.project_name)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-800 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t border-neutral-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs text-neutral-500">
              Showing {Math.min(posts.length, pageStart + 1)}-
              {Math.min(posts.length, pageStart + visiblePosts.length)} of{" "}
              {posts.length} projects
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    page === currentPage
                      ? "border-[#f27f26] bg-[#f27f26] text-white"
                      : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
