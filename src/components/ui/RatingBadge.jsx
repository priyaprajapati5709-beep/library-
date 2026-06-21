/**
 * Displays a rating as a star + number. The whole thing carries one
 * aria-label so screen readers announce "Rated 4.6 out of 5" instead
 * of reading the star glyph and number as two disconnected pieces.
 */
function RatingBadge({ rating, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-sm text-ink-soft ${className}`}
      aria-label={`Rated ${rating} out of 5`}
    >
      <span aria-hidden="true" className="text-brass">
        ★
      </span>
      <span aria-hidden="true">{rating.toFixed(1)}</span>
    </span>
  );
}

export default RatingBadge;
