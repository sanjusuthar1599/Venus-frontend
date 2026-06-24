const DEFAULT_TIMEOUT_MS = 90_000;
const DEFAULT_RETRIES = 3;
const RETRY_DELAY_MS = 8_000;
const DEFAULT_CACHE_TTL_MS = 10 * 60 * 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readCache(key, ttlMs, allowStale = false) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (!allowStale && Date.now() - ts > ttlMs) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    /* quota / private mode */
  }
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * GET/POST fetch with timeout, retries (for Render cold start), and optional sessionStorage cache.
 */
export async function fetchJsonWithRetry(url, options = {}) {
  const {
    retries = DEFAULT_RETRIES,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retryDelayMs = RETRY_DELAY_MS,
    cacheKey = null,
    cacheTtlMs = DEFAULT_CACHE_TTL_MS,
    onRetry = null,
    method = "GET",
    ...fetchOptions
  } = options;

  const isGet = !method || method === "GET";

  if (cacheKey && isGet) {
    const cached = readCache(cacheKey, cacheTtlMs);
    if (cached !== null) return cached;
  }

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(
        url,
        { method, ...fetchOptions },
        timeoutMs
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
      if (cacheKey && isGet) writeCache(cacheKey, data);
      return data;
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        onRetry?.(attempt + 1, retries);
        await sleep(retryDelayMs);
      }
    }
  }

  if (cacheKey && isGet) {
    const stale = readCache(cacheKey, cacheTtlMs, true);
    if (stale !== null) return stale;
  }

  throw lastError;
}

export const API_CACHE_KEYS = {
  posts: "venus:cache:posts",
  blogs: "venus:cache:blogs",
  reviews: "venus:cache:reviews",
};
