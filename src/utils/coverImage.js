/**
 * Cover art comes from Open Library's free, keyless cover API:
 * https://covers.openlibrary.org/b/isbn/{isbn}-{size}.jpg
 *
 * We don't control that service, so any component that renders a
 * cover MUST handle the image failing to load (wrong ISBN, offline,
 * the service being down, etc). See <BookCover> for the actual
 * fallback UI — this file only builds the URL.
 *
 * Sizes: "S" (small, ~50px wide), "M" (~180px), "L" (~500px).
 */
export function getCoverUrl(isbn, size = "M") {
  if (!isbn) return null;
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
}
