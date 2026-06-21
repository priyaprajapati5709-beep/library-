import { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Browse Books" },
  { to: "/add", label: "Add Book" },
];

/**
 * `end` matters for the "/" link specifically — without it, NavLink
 * would treat "/" as a prefix and mark Home active on every route
 * (since every path starts with "/").
 */
function navLinkClasses({ isActive }) {
  return [
    "px-3 py-2 rounded-sm text-sm font-medium tracking-wide transition-colors",
    isActive
      ? "bg-brass text-ink"
      : "text-paper/85 hover:text-paper hover:bg-white/10",
  ].join(" ");
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-library border-b-4 border-brass">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center justify-between h-16">
        <NavLink
          to="/"
          end
          className="font-display text-xl text-paper font-semibold tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          📚 Open Stacks
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="sm:hidden text-paper p-2 -mr-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="sm:hidden flex flex-col gap-1 px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClasses}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
