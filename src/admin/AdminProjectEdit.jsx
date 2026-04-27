import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiForm, apiJson } from "../lib/adminApi.js";
import { uploadFileUrl } from "../config/api.js";
import { PROJECT_TYPES } from "./constants.js";

export default function AdminProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [project_name, setName] = useState("");
  const [project_location, setLoc] = useState("");
  const [project_type, setType] = useState(PROJECT_TYPES[0]);
  const [addFiles, setAddFiles] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = await apiJson(`/post/project/${id}`);
      setPost(p);
      setName(p.project_name || "");
      setLoc(p.project_location || "");
      setType(p.project_type || PROJECT_TYPES[0]);
    } catch (e) {
      toast.error(e?.message || "Could not load project");
      navigate("/admin/projects");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  async function saveMeta(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await apiJson(`/post/project/${id}`, {
        method: "PUT",
        body: { project_name, project_location, project_type },
      });
      toast.success("Details saved");
      load();
    } catch (e) {
      toast.error(e?.message || "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function addImages(e) {
    e.preventDefault();
    if (!addFiles?.length) {
      toast.error("Choose one or more images.");
      return;
    }
    const fd = new FormData();
    for (let i = 0; i < addFiles.length; i++) {
      fd.append("project_image", addFiles[i]);
    }
    setBusy(true);
    try {
      await apiForm(`/post/project/${id}/images`, fd);
      toast.success("Images added");
      setAddFiles(null);
      load();
    } catch (e) {
      toast.error(e?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function removeImage(filename) {
    try {
      await apiJson(`/post/project/${id}/images`, {
        method: "PATCH",
        body: { remove: [filename] },
      });
      toast.success("Image removed");
      load();
    } catch (e) {
      toast.error(e?.message || "Remove failed");
    }
  }

  async function replaceVideo(e) {
    e.preventDefault();
    if (!videoFile) {
      toast.error("Choose a video file.");
      return;
    }
    const fd = new FormData();
    fd.append("project_video", videoFile);
    setBusy(true);
    try {
      await apiForm(`/post/project/${id}/video`, fd, { method: "PUT" });
      toast.success("Video updated");
      setVideoFile(null);
      load();
    } catch (e) {
      toast.error(e?.message || "Video upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function kill() {
    if (
      !window.confirm(
        "Delete this project permanently? Files will be removed from the server."
      )
    ) {
      return;
    }
    try {
      await apiJson(`/post/project/${id}`, { method: "DELETE" });
      toast.success("Project deleted");
      navigate("/admin/projects");
    } catch (e) {
      toast.error(e?.message || "Delete failed");
    }
  }

  if (loading || !post) {
    return <p className="text-sm text-neutral-500">Loading…</p>;
  }

  const videoUrl = post.project_video
    ? uploadFileUrl("videos", post.project_video)
    : "";

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            <Link to="/admin/projects" className="text-[#f27f26] hover:underline">
              Portfolio
            </Link>{" "}
            / Edit
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
            {post.project_name}
          </h1>
        </div>
        <button
          type="button"
          onClick={kill}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-100"
        >
          Delete project
        </button>
      </div>

      <form
        onSubmit={saveMeta}
        className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-neutral-900">Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Name
            </label>
            <input
              value={project_name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[#f27f26] focus:ring-2 focus:ring-[#f27f26]/20"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Location
            </label>
            <input
              value={project_location}
              onChange={(e) => setLoc(e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[#f27f26] focus:ring-2 focus:ring-[#f27f26]/20"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Category
            </label>
            <select
              value={project_type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[#f27f26] focus:ring-2 focus:ring-[#f27f26]/20"
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save details"}
        </button>
      </form>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-neutral-900">Images</h2>
        <p className="mt-1 text-xs text-neutral-500">
          Remove shots or add more (up to 20 per project on the server).
        </p>
        {post.project_images?.length ? (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {post.project_images.map((fn) => (
              <li
                key={fn}
                className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-2"
              >
                <img
                  src={uploadFileUrl("images", fn)}
                  alt=""
                  className="h-16 w-24 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-[11px] text-neutral-600">
                    {fn}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeImage(fn)}
                    className="mt-1 text-xs font-semibold text-red-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-neutral-500">No images for this row.</p>
        )}

        <form onSubmit={addImages} className="mt-6 space-y-3 border-t border-neutral-100 pt-6">
          <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Add images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setAddFiles(e.target.files)}
            className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:font-semibold file:text-white"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 disabled:opacity-60"
          >
            Upload
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-neutral-900">Video</h2>
        {videoUrl ? (
          <video
            key={videoUrl}
            src={videoUrl}
            controls
            className="mt-4 max-h-64 w-full rounded-xl bg-black"
          />
        ) : (
          <p className="mt-3 text-sm text-neutral-500">No video attached.</p>
        )}
        <form onSubmit={replaceVideo} className="mt-6 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Replace video
          </label>
          <input
            type="file"
            accept="video/mp4,video/webm,video/x-matroska,video/x-msvideo"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:font-semibold file:text-white"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-gradient-to-r from-[#f27f26] to-amber-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60"
          >
            Replace video file
          </button>
        </form>
      </section>
    </div>
  );
}
