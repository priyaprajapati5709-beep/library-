import { Link } from "react-router-dom";

/**
 * One category tile on the Home page. Links straight into Browse
 * pre-filtered to that category via the dynamic /books/:category route.
 */
function CategoryCard({ name, count }) {
  return (
    <Link
      to={`/books/${name}`}
      className="flex flex-col justify-between gap-2 p-5 bg-paper-dark border border-line rounded-sm hover:border-brass hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
    >
      <span className="font-display text-lg text-ink">{name}</span>
      <span className="text-xs font-mono text-ink-soft">
        {count} {count === 1 ? "book" : "books"}
      </span>
    </Link>
  );
}

export default CategoryCard;
