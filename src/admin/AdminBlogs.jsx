import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiJson } from "../lib/adminApi.js";
import { uploadFileUrl } from "../config/api.js";
import AdminFormModal from "./AdminFormModal.jsx";
import AdminBlogCreateForm from "./AdminBlogCreateForm.jsx";

function formatDate(value) {
  const d = value ? new Date(value) : null;
  if (!d || Number.isNaN(d.getTime())) return "No date";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiJson("/api/blogs");
      setBlogs(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e?.message || "Could not load blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(id, title) {
    if (!window.confirm(`Delete blog “${title}”?`)) return;
    try {
      await apiJson(`/api/blogs/${id}`, { method: "DELETE" });
      toast.success("Blog deleted");
      load();
    } catch (e) {
      toast.error(e?.message || "Delete failed");
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Blogs</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage journal posts shown on the public blog page.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#f27f26] to-amber-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-[#f27f26]/25 transition hover:opacity-95"
        >
          New blog
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center text-sm text-neutral-500">
          No blog posts yet. Create one to publish it on the site.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="grid sm:grid-cols-[220px_minmax(0,1fr)]">
                <div className="h-48 bg-neutral-100 sm:h-full">
                  {blog.cover_image ? (
                    <img
                      src={uploadFileUrl("images", blog.cover_image)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f27f26]">
                    {formatDate(blog.published_at || blog.createdAt)}
                  </p>
                  <h2 className="mt-3 text-lg font-semibold text-neutral-900">{blog.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-500">
                    {blog.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      to={`/admin/blogs/${blog._id}/edit`}
                      className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-50"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(blog._id, blog.title)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-800 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {showCreate ? (
        <AdminFormModal
          title="New blog"
          subtitle="Add a journal post with cover image, intro text, and long-form content."
          backTo="/admin/blogs"
        >
          <AdminBlogCreateForm
            onCreated={() => {
              setShowCreate(false);
              load();
            }}
          />
        </AdminFormModal>
      ) : null}
    </div>
  );
}
