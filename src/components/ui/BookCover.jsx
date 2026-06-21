import { useState } from "react";
import { getCoverUrl } from "../../utils/coverImage";

/**
 * Renders a book cover, falling back to a plain placeholder panel if
 * there's no ISBN or the image fails to load. This is the ONLY place
 * in the app that needs to know covers can fail — everywhere else
 * just renders <BookCover /> and trusts it to handle that.
 */
function BookCover({ isbn, title, className = "" }) {
  const [failed, setFailed] = useState(false);
  const url = getCoverUrl(isbn);
  const showFallback = !url || failed;

  if (showFallback) {
    return (
      <div
        role="img"
        aria-label={`Cover not available for ${title}`}
        className={`flex items-center justify-center bg-paper-dark text-library ${className}`}
      >
        <span aria-hidden="true" className="text-4xl">
          📖
        </span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={`Cover of ${title}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

export default BookCover;
