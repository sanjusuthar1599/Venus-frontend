import { API_BASE_URL } from "../config/api.js";

export async function submitInquiry(payload) {
  const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Could not send your message. Please try again.");
  }
  return data;
}
