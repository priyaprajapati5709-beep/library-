import { getCategoryPrefix } from "../data/categories";

function formatCallNumber(prefix, sequenceNumber) {
  return `${prefix}-${String(sequenceNumber).padStart(3, "0")}`;
}

/**
 * Builds the NEXT call number for a category, e.g. "FIC-004" if there
 * are already 3 Fiction books. Used when a new book is submitted
 * through the Add Book form, where `existingBooks` is whatever is
 * currently in the Redux store.
 *
 * @param {string} category - the book's category, e.g. "Fiction"
 * @param {Array<{category: string}>} existingBooks - current catalog
 * @returns {string} call number like "FIC-004"
 */
export function generateCallNumber(category, existingBooks) {
  const prefix = getCategoryPrefix(category);
  const countInCategory = existingBooks.filter(
    (book) => book.category === category
  ).length;

  return formatCallNumber(prefix, countInCategory + 1);
}

/**
 * Assigns sequential call numbers to a static, ordered list of books
 * (the seed catalog). Walks the list once, keeping a running count
 * per category, so book 1 in Fiction gets FIC-001, book 2 gets
 * FIC-002, and so on — without anyone hand-typing numbers that could
 * drift out of sync if the catalog is reordered later.
 *
 * @param {Array<object>} books - books WITHOUT a callNumber yet
 * @returns {Array<object>} same books, each with `callNumber` added
 */
export function annotateWithCallNumbers(books) {
  const countsByCategory = {};

  return books.map((book) => {
    const prefix = getCategoryPrefix(book.category);
    const nextCount = (countsByCategory[book.category] ?? 0) + 1;
    countsByCategory[book.category] = nextCount;

    return { ...book, callNumber: formatCallNumber(prefix, nextCount) };
  });
}

