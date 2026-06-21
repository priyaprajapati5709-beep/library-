/**
 * Wraps a single form field: label, the input/select/textarea passed
 * in as children, and its error message (if any). Centralizing this
 * means every field gets the same spacing and the same
 * label-to-input association for free.
 */
function FormField({ id, label, error, optional = false, children }) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-1.5">
        {label}
        {optional && <span className="text-ink-soft font-normal"> (optional)</span>}
      </label>

      {children}

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-stamp">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
