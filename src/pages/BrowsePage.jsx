import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllBooks } from "../features/books/booksSlice";
import { CATEGORIES } from "../data/categories";
import BookCard from "../components/ui/BookCard";
import EmptyState from "../components/ui/EmptyState";

function filterChipClasses(isActive) {
  return [
    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
    isActive
      ? "bg-library text-paper border-library"
      : "bg-paper-dark text-ink-soft border-line hover:border-library hover:text-library",
  ].join(" ");
}

/**
 * Lists every book, optionally filtered by the :category URL param
 * and/or a free-text search that matches title or author.
 */
function BrowsePage() {
  const { category } = useParams();
  const books = useSelector(selectAllBooks);
  const [searchTerm, setSearchTerm] = useState("");

  const visibleBooks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return books.filter((book) => {
      const matchesCategory = !category || book.category === category;
      const matchesSearch =
        !term ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [books, category, searchTerm]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl mb-1">Browse Books</h1>
      <p className="text-ink-soft text-sm mb-6">
        {category ? `Showing the ${category} shelf.` : "Every book in the catalog."}
      </p>

      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Filter by category">
        <Link to="/books" className={filterChipClasses(!category)}>
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            to={`/books/${cat.name}`}
            className={filterChipClasses(category === cat.name)}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <label className="block mb-8">
        <span className="sr-only">Search by title or author</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by title or author..."
          className="w-full rounded-sm border border-line bg-paper px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brass"
        />
      </label>

      {visibleBooks.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No books match that search"
          description="Try a different title, author, or category."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowsePage;
