const raw = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const API_BASE_URL = String(raw).replace(/\/$/, "");

/** @param {"images" | "videos"} folder */
export function uploadFileUrl(folder, filename) {
  if (!filename) return "";
  let f = String(filename).trim();
  // DB sometimes stores a full relative path — avoid /uploads/videos/videos/...
  f = f.replace(/^uploads\/(images|videos)\//i, "");
  const segment = encodeURIComponent(f);
  return `${API_BASE_URL}/uploads/${folder}/${segment}`;
}
