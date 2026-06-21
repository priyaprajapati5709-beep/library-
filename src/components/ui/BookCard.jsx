import { Link } from "react-router-dom";
import BookCover from "./BookCover";
import RatingBadge from "./RatingBadge";

/**
 * Reusable book card styled like a library catalog entry: cover,
 * stamped call number, title/author, rating, and a details link.
 * Lives in one place so Home and Browse never drift out of sync
 * visually.
 */
function BookCard({ book }) {
  return (
    <article className="group flex flex-col bg-paper-dark border border-line rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="relative">
        <BookCover isbn={book.isbn} title={book.title} className="w-full h-56" />
        <span className="absolute top-2 left-2 bg-ink/85 text-paper font-mono text-[11px] px-2 py-1 rounded-sm tracking-wide">
          {book.callNumber}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-1.5">
        <h3 className="font-display text-lg leading-snug line-clamp-2">{book.title}</h3>
        <p className="text-sm text-ink-soft">by {book.author}</p>

        <div className="flex items-center justify-between mt-1">
          <RatingBadge rating={book.rating} />
          <span className="text-[11px] uppercase tracking-wide text-library font-semibold">
            {book.category}
          </span>
        </div>

        <Link
          to={`/books/${book.category}/${book.id}`}
          className="mt-3 inline-flex justify-center items-center rounded-sm bg-library text-paper text-sm font-medium py-2 hover:bg-library-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default BookCard;
