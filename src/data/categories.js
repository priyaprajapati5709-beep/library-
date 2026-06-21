/**
 * Every category the library knows about, plus the short prefix used
 * to build catalog "call numbers" (e.g. FIC-001).
 *
 * This file is the single source of truth for categories — Home's
 * category grid, Browse's filter chips, and the Add Book form's
 * <select> all read from here. Add a new genre once, it shows up
 * everywhere automatically.
 */
export const CATEGORIES = [
  { name: "Fiction", prefix: "FIC" },
  { name: "Non-Fiction", prefix: "NF" },
  { name: "Sci-Fi", prefix: "SF" },
  { name: "Fantasy", prefix: "FAN" },
  { name: "Mystery", prefix: "MYS" },
  { name: "Biography", prefix: "BIO" },
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

/**
 * Look up a category's call-number prefix. Falls back to the first
 * three letters of the category name (uppercased) for any category
 * that isn't in the list above — so the app never crashes if someone
 * adds a book under a typo'd or future category.
 */
export function getCategoryPrefix(categoryName) {
  const match = CATEGORIES.find((c) => c.name === categoryName);
  if (match) return match.prefix;
  return categoryName ? categoryName.slice(0, 3).toUpperCase() : "GEN";
}
