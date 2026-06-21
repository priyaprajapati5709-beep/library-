/**
 * Generates a unique id for a newly-added book.
 *
 * `crypto.randomUUID()` needs a secure context (https, or localhost
 * during dev) — true for how this app is run, but we fall back to a
 * timestamp + random suffix rather than letting book creation crash
 * if that API is ever unavailable.
 */
export function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
