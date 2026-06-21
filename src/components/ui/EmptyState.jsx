/**
 * Generic "nothing here" panel. Used when a search/filter turns up
 * no books, and when a Book Details URL points at an id that doesn't
 * exist (e.g. a stale link, or a typo'd id in the address bar).
 */
function EmptyState({ icon = "📭", title, description }) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4 text-ink-soft">
      <span aria-hidden="true" className="text-4xl mb-3">
        {icon}
      </span>
      <p className="font-display text-lg text-ink">{title}</p>
      {description && <p className="text-sm mt-1 max-w-sm">{description}</p>}
    </div>
  );
}

export default EmptyState;
