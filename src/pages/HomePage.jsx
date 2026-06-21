import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllBooks } from "../features/books/booksSlice";
import { CATEGORIES } from "../data/categories";
import BookCard from "../components/ui/BookCard";
import CategoryCard from "../components/ui/CategoryCard";

const POPULAR_COUNT = 4;

/**
 * Landing page: hero, a category grid, and a "Popular Books" strip.
 * "Popular" = highest-rated in the catalog right now, which means
 * this section updates automatically as books are added/rated rather
 * than being a hardcoded list.
 */
function HomePage() {
  const books = useSelector(selectAllBooks);

  const popularBooks = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, POPULAR_COUNT);

  return (
    <div>
      <section className="bg-library text-paper">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-light mb-3">
            No backend, just a catalog
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
            Welcome to Open Stacks
          </h1>
          <p className="mt-4 text-paper/80 max-w-xl mx-auto">
            Browse the shelves, search by title or author, and check out
            books from this library's catalog.
          </p>
          <Link
            to="/books"
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-brass text-ink font-medium px-6 py-3 hover:bg-brass-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper"
          >
            Browse Books
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <h2 className="font-display text-2xl mb-1">Browse by Category</h2>
        <p className="text-ink-soft text-sm mb-6">Pick a shelf to start with.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              count={books.filter((b) => b.category === cat.name).length}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <h2 className="font-display text-2xl mb-1">Popular Books</h2>
        <p className="text-ink-soft text-sm mb-6">
          Highest-rated titles in the catalog right now.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
