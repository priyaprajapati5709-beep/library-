import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllBooks } from "../features/books/booksSlice";
import BookCover from "../components/ui/BookCover";
import RatingBadge from "../components/ui/RatingBadge";
import EmptyState from "../components/ui/EmptyState";

/**
 * Full detail view for a single book, reached via /books/:category/:id.
 *
 * `id` from the URL is always a string. Seed books have numeric ids
 * and books added through the form have string ids, so we compare
 * with String(book.id) on both sides rather than coercing one way and
 * accidentally breaking the other.
 */
function BookDetailsPage() {
  const { id } = useParams();
  const books = useSelector(selectAllBooks);
  const book = books.find((b) => String(b.id) === id);

  if (!book) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
        <EmptyState
          icon="📕"
          title="This book isn't in the catalog"
          description="It may have been removed, or the link might be out of date."
        />
        <Link to="/books" className="inline-flex items-center text-library font-medium hover:underline">
          ← Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <Link
        to="/books"
        className="inline-flex items-center text-sm text-library font-medium hover:underline mb-6"
      >
        ← Back to Browse
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-8">
        <div className="relative w-full max-w-[220px]">
          <BookCover
            isbn={book.isbn}
            title={book.title}
            className="w-full aspect-[2/3] rounded-sm border border-line"
          />
          <span className="absolute top-2 left-2 bg-ink/85 text-paper font-mono text-xs px-2 py-1 rounded-sm">
            {book.callNumber}
          </span>
        </div>

        <div>
          <span className="text-xs uppercase tracking-wide text-library font-semibold">
            {book.category}
          </span>
          <h1 className="font-display text-3xl mt-1">{book.title}</h1>
          <p className="text-ink-soft mt-1">by {book.author}</p>

          <div className="mt-3">
            <RatingBadge rating={book.rating} className="text-base" />
          </div>

          <p className="mt-6 leading-relaxed text-ink">{book.description}</p>

          <Link
            to="/books"
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-library text-paper text-sm font-medium px-5 py-2.5 hover:bg-library-dark transition-colors"
          >
            ← Back to Browse
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;
