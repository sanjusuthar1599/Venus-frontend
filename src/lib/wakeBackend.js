import { API_BASE_URL } from "../config/api.js";

let wakePromise = null;

/** Ping health endpoint once per session to reduce cold-start delay on data requests. */
export function wakeBackend() {
  if (wakePromise) return wakePromise;

  wakePromise = fetch(`${API_BASE_URL}/api/health`, {
    method: "GET",
    cache: "no-store",
  }).catch(() => {});

  return wakePromise;
}
