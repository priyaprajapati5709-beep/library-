import { useEffect } from "react";

/**
 * Floating confirmation toast (e.g. "New book added!"). Auto-dismisses
 * after `duration` ms; `onDismiss` lets the parent clear its message
 * state once that happens so the timer doesn't fire against a stale
 * closure if the message changes again quickly.
 */
function Toast({ message, onDismiss, duration = 2000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-library text-paper px-5 py-3 rounded-sm shadow-lg flex items-center gap-3 z-50"
    >
      <span aria-hidden="true">✅</span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

export default Toast;
