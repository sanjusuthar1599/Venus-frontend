import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiForm, apiJson } from "../lib/adminApi.js";
import { uploadFileUrl } from "../config/api.js";

function toDateInput(value) {
  const d = value ? new Date(value) : null;
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export default function AdminBlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiJson(`/api/blogs/${id}`);
      setBlog(data);
      setTitle(data.title || "");
      setExcerpt(data.excerpt || "");
      setBody(data.body || "");
      setPublishedAt(toDateInput(data.published_at || data.createdAt));
    } catch (e) {
      toast.error(e?.message || "Could not load blog");
      navigate("/admin/blogs");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  async function save(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("excerpt", excerpt);
    fd.append("body", body);
    if (publishedAt) fd.append("published_at", publishedAt);
    if (coverImage) fd.append("cover_image", coverImage);

    setBusy(true);
    try {
      await apiForm(`/api/blogs/${id}`, fd, { method: "PUT" });
      toast.success("Blog updated");
      setCoverImage(null);
      load();
    } catch (e) {
      toast.error(e?.message || "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Delete this blog permanently?")) return;
    try {
      await apiJson(`/api/blogs/${id}`, { method: "DELETE" });
      toast.success("Blog deleted");
      navigate("/admin/blogs");
    } catch (e) {
      toast.error(e?.message || "Delete failed");
    }
  }

  if (loading || !blog) return <p className="text-sm text-neutral-500">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            <Link to="/admin/blogs" className="text-[#f27f26] hover:underline">
              Blogs
            </Link>{" "}
            / Edit
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
            {blog.title}
          </h1>
        </div>
        <button
          type="button"
          onClick={remove}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-100"
        >
          Delete blog
        </button>
      </div>

      <form
        onSubmit={save}
        className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-xl bg-neutral-100">
            {blog.cover_image ? (
              <img
                src={uploadFileUrl("images", blog.cover_image)}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-48 items-center justify-center text-sm text-neutral-400">
                No image
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[#f27f26] focus:ring-2 focus:ring-[#f27f26]/20"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-[#f27f26] focus:ring-2 focus:ring-[#f27f26]/20"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Publish date
                </label>
                <input
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[#f27f26] focus:ring-2 focus:ring-[#f27f26]/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Replace cover image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files?.[0] ?? null)}
                  className="mt-2 block w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:font-semibold file:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save blog"}
        </button>
      </form>
    </div>
  );
}
