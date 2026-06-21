# 📚 Open Stacks — Online Library

A single-page library catalog built with **React (Vite)**, **Redux Toolkit**, and **React Router**. Browse books by category, search by title/author, view full details, and add new books — all backed by a Redux store that persists to `localStorage`.

Built for React Assignment 2.

## Running it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Repository

Source code and project history are available at: https://github.com/priyaprajapati5709-beep/library-.git

## Features

| Page | What it does |
|---|---|
| **Home** (`/`) | Welcome hero, a category grid (with live book counts), and a "Popular Books" strip showing the highest-rated titles. |
| **Browse Books** (`/books`, `/books/:category`) | Lists books, filterable by category via dynamic routing, plus a live search across title and author. |
| **Book Details** (`/books/:category/:id`) | Full details for one book — cover, call number, title, author, category, rating, description — with a "Back to Browse" link. |
| **Add Book** (`/add`) | A validated form to add a new book. On submit: the book is unshifted to the front of the Redux store, a confirmation toast appears, and the user is redirected to Browse Books where the new entry is first. |
| **404** | Catches any undefined route, shows the exact invalid URL, and links back home. Rendered **without** the header, intentionally outside the main layout. |

## Design notes

- **Catalog aesthetic** — book cards show a generated "call number" (e.g. `FIC-004`) based on category, like a real library catalog. Cover art is pulled from [Open Library's cover API](https://openlibrary.org/dev/docs/api/covers) using each book's real ISBN, with a graceful fallback icon if a cover ever fails to load.
- **Persistence** — newly added books survive a page refresh via a small `localStorage` sync on the Redux store (see `src/utils/storage.js` + `src/app/store.js`). Not required by the brief, added as a UX improvement.
- **Validation** — all fields are required (title, author, description, category, rating 1–5); ISBN is optional but checked for a valid 10/13-digit shape if provided. See `src/utils/validateBookForm.js`.

## Tech stack

- **React 19** + **Vite** — project setup & dev server
- **React Router v7** — routing, including dynamic `:category` and `:id` params
- **Redux Toolkit** + **React Redux** — global state for the book list
- **Tailwind CSS v4** — utility-first styling with a custom theme (`src/index.css`)

## Project structure

```
src/
  app/store.js              Redux store setup + localStorage sync
  features/books/           booksSlice (the only thing that mutates the catalog)
  data/                     Seed catalog (18 real books) + category list
  components/layout/        Header, Footer, AppLayout
  components/ui/            BookCard, BookCover, RatingBadge, Toast, FormField, EmptyState, CategoryCard
  pages/                    One file per route
  utils/                    callNumber, coverImage, storage, id, validateBookForm
```

Comments throughout the codebase explain *why* a piece of logic exists, not just what it does — particularly around the persistence layer, call-number generation, and form validation, since those are the parts most likely to look mysterious without context.
