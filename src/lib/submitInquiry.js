import { API_BASE_URL } from "../config/api.js";
import { fetchJsonWithRetry } from "./fetchWithRetry.js";

export async function submitInquiry(payload) {
  return fetchJsonWithRetry(`${API_BASE_URL}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    retries: 2,
    retryDelayMs: 6_000,
    cacheKey: null,
  });
}
