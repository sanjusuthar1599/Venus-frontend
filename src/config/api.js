const PRODUCTION_API_URL = "https://venus-backend-f9lr.onrender.com";
const DEVELOPMENT_API_URL = "http://localhost:5000";

/**
 * API base URL resolution:
 * 1. VITE_API_URL env (set in Render / .env.local) — highest priority
 * 2. Production build → live backend (never localhost on deployed site)
 * 3. Local dev → localhost:5000
 */
const raw =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? PRODUCTION_API_URL : DEVELOPMENT_API_URL);

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
