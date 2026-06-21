import { useLocation, Link } from "react-router-dom";

/**
 * Catch-all 404. Rendered OUTSIDE AppLayout (see App.jsx), so it has
 * no Header — required by the assignment spec.
 */
function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div
          aria-hidden="true"
          className="inline-block border-4 border-stamp text-stamp font-display text-2xl uppercase tracking-wide px-6 py-3 -rotate-3 rounded-sm"
        >
          Not in Circulation
        </div>

        <h1 className="font-display text-3xl mt-8">Page Not Found</h1>
        <p className="mt-3 text-ink-soft">There's no catalog entry at:</p>
        <p className="mt-1 font-mono text-sm bg-paper-dark border border-line rounded-sm px-3 py-2 break-all inline-block">
          {pathname}
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-library text-paper font-medium px-6 py-3 hover:bg-library-dark transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
