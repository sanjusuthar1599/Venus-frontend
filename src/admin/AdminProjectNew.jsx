import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiForm } from "../lib/adminApi.js";
import { PROJECT_TYPES } from "./constants.js";

export default function AdminProjectNew() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("image");
  const [project_name, setName] = useState("");
  const [project_location, setLoc] = useState("");
  const [project_type, setType] = useState(PROJECT_TYPES[0]);
  const [imageFiles, setImageFiles] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submitImage(e) {
    e.preventDefault();
    if (!imageFiles?.length) {
      toast.error("Add at least one image (up to 5).");
      return;
    }
    const fd = new FormData();
    fd.append("project_name", project_name);
    fd.append("project_location", project_location);
    fd.append("project_type", project_type);
    for (let i = 0; i < imageFiles.length; i++) {
      fd.append("project_image", imageFiles[i]);
    }
    setBusy(true);
    try {
      const created = await apiForm("/post/image/project", fd);
      toast.success("Project created");
      navigate(`/admin/projects/${created._id}/edit`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function submitVideo(e) {
    e.preventDefault();
    if (!videoFile) {
      toast.error("Choose a video file.");
      return;
    }
    const fd = new FormData();
    fd.append("project_name", project_name);
    fd.append("project_location", project_location);
    fd.append("project_type", project_type);
    fd.append("project_video", videoFile);
    setBusy(true);
    try {
      const created = await apiForm("/post/video/project", fd);
      toast.success("Project created");
      navigate(`/admin/projects/${created._id}/edit`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  const sharedFields = (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Project name
        </label>
        <input
          value={project_name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none ring-[#f27f26]/20 focus:border-[#f27f26] focus:ring-2"
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
          className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none ring-[#f27f26]/20 focus:border-[#f27f26] focus:ring-2"
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
          className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none ring-[#f27f26]/20 focus:border-[#f27f26] focus:ring-2"
        >
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          New project
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Image galleries or a single video card — same categories as the public
          portfolio.
        </p>
      </div>

      <div className="flex gap-2 rounded-xl bg-neutral-200/60 p-1">
        <button
          type="button"
          onClick={() => setMode("image")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
            mode === "image"
              ? "bg-white text-neutral-900 shadow"
              : "text-neutral-600"
          }`}
        >
          Images
        </button>
        <button
          type="button"
          onClick={() => setMode("video")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
            mode === "video"
              ? "bg-white text-neutral-900 shadow"
              : "text-neutral-600"
          }`}
        >
          Video
        </button>
      </div>

      {mode === "image" ? (
        <form
          onSubmit={submitImage}
          className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          {sharedFields}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Images (1–5, max 5MB each)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(e.target.files)}
              className="mt-2 block w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-neutral-800"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-gradient-to-r from-[#f27f26] to-amber-500 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-[#f27f26]/20 disabled:opacity-60"
          >
            {busy ? "Creating…" : "Create image project"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={submitVideo}
          className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          {sharedFields}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Video (mp4, webm, mkv, avi — up to 200MB)
            </label>
            <input
              type="file"
              accept="video/mp4,video/webm,video/x-matroska,video/x-msvideo"
              onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
              className="mt-2 block w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-neutral-800"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-gradient-to-r from-[#f27f26] to-amber-500 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-[#f27f26]/20 disabled:opacity-60"
          >
            {busy ? "Creating…" : "Create video project"}
          </button>
        </form>
      )}
    </div>
  );
}
