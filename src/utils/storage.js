/**
 * Thin wrapper around localStorage for persisting the books slice.
 *
 * Kept deliberately framework-free (no redux-persist) so the
 * persistence logic is just two small functions anyone reading this
 * codebase can trace end-to-end: load once on startup, save on every
 * store change (wired up in app/store.js).
 *
 * Both functions are defensive on purpose:
 *  - localStorage can throw (private/incognito mode, storage disabled,
 *    quota exceeded) — never let that crash the app.
 *  - Stored JSON can be missing, corrupted, or from an older shape of
 *    the app — fall back to `undefined` so the caller knows to use
 *    the default seed state instead of trusting bad data.
 */
const STORAGE_KEY = "open-stacks:books";

export function loadBooksState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);

    // Sanity-check the shape before trusting it as real app state.
    if (!parsed || !Array.isArray(parsed.items)) return undefined;

    return parsed;
  } catch (error) {
    console.warn("Couldn't read saved library data, starting fresh:", error);
    return undefined;
  }
}

export function saveBooksState(booksState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksState));
  } catch (error) {
    // Not fatal — the app keeps working in-memory for this session,
    // it just won't survive a refresh. Worth a console warning so
    // it's not a silent mystery during development.
    console.warn("Couldn't save library data:", error);
  }
}
