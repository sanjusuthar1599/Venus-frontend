import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiForm } from "../lib/adminApi.js";

export default function AdminBlogCreateForm({ onCreated }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("excerpt", excerpt);
    fd.append("body", body);
    if (publishedAt) fd.append("published_at", publishedAt);
    if (coverImage) fd.append("cover_image", coverImage);

    setBusy(true);
    try {
      const created = await apiForm("/api/blogs", fd);
      toast.success("Blog created");
      if (onCreated) onCreated(created);
      else navigate(`/admin/blogs/${created._id}/edit`);
    } catch (err) {
      toast.error(err?.message || "Create failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none ring-[#f27f26]/20 focus:border-[#f27f26] focus:ring-2"
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
          className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none ring-[#f27f26]/20 focus:border-[#f27f26] focus:ring-2"
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
            className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none ring-[#f27f26]/20 focus:border-[#f27f26] focus:ring-2"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Cover image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-neutral-800"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-gradient-to-r from-[#f27f26] to-amber-500 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-[#f27f26]/20 disabled:opacity-60"
      >
        {busy ? "Creating…" : "Create blog"}
      </button>
    </form>
  );
}
