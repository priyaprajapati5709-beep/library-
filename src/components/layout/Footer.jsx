/**
 * Sits inside AppLayout, so — like the Header — it shows up on every
 * page except the 404 screen.
 */
function Footer() {
  return (
    <footer className="border-t border-line bg-paper-dark mt-auto">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 text-center text-xs text-ink-soft font-mono">
        Open Stacks — a React + Redux library catalog, built for a coursework assignment.
      </div>
    </footer>
  );
}

export default Footer;
