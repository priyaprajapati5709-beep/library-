/**
 * Seed catalog for the library.
 *
 * This is still "dummy data" in the sense the assignment asks for —
 * nothing here is fetched from a backend — but it's real book
 * metadata (real titles, authors, ISBNs) so the cover art pulled from
 * Open Library actually matches each book instead of showing random
 * stock photos.
 *
 * `id` is a plain integer here because this array is static seed data.
 * Books added later through the Add Book form get a collision-safe
 * id instead (see booksSlice.js) since multiple people could submit
 * the form around the same time.
 */
import { annotateWithCallNumbers } from "../utils/callNumber";

const rawCatalog = [
  // ---- Fiction ----
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    rating: 4.4,
    isbn: "9780743273565",
    description:
      "A young millionaire's obsession with a married woman unravels against the glittering, hollow backdrop of Jazz Age New York.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    rating: 4.8,
    isbn: "9780061120084",
    description:
      "A young girl in a small Alabama town watches her father defend an innocent Black man, and learns hard truths about justice along the way.",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    rating: 4.6,
    isbn: "9780141439518",
    description:
      "Sharp-tongued Elizabeth Bennet clashes with the proud Mr. Darcy in a comedy of manners about marriage, class, and first impressions.",
  },

  // ---- Non-Fiction ----
  {
    id: 4,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Non-Fiction",
    rating: 4.7,
    isbn: "9780062316097",
    description:
      "A sweeping look at how Homo sapiens went from foraging in small bands to building empires, money, and myths that hold societies together.",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Non-Fiction",
    rating: 4.8,
    isbn: "9780735211292",
    description:
      "A practical framework for building good habits and breaking bad ones, built on the idea that tiny, consistent changes compound over time.",
  },
  {
    id: 6,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Non-Fiction",
    rating: 4.5,
    isbn: "9780553380163",
    description:
      "A physicist's attempt to explain the origins of the universe, black holes, and the nature of time itself without losing the general reader.",
  },

  // ---- Sci-Fi ----
  {
    id: 7,
    title: "Dune",
    author: "Frank Herbert",
    category: "Sci-Fi",
    rating: 4.6,
    isbn: "9780441013593",
    description:
      "On a desert planet that holds the universe's most valuable resource, a young heir is thrust into prophecy, politics, and survival.",
  },
  {
    id: 8,
    title: "The Martian",
    author: "Andy Weir",
    category: "Sci-Fi",
    rating: 4.7,
    isbn: "9780553418026",
    description:
      "An astronaut stranded alone on Mars has to engineer his way to survival using nothing but science, duct tape, and stubbornness.",
  },
  {
    id: 9,
    title: "Nineteen Eighty-Four",
    author: "George Orwell",
    category: "Sci-Fi",
    rating: 4.7,
    isbn: "9780451524935",
    description:
      "In a totalitarian future ruled by constant surveillance, one man's quiet act of independent thought becomes an act of rebellion.",
  },

  // ---- Fantasy ----
  {
    id: 10,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    rating: 4.7,
    isbn: "9780547928227",
    description:
      "A comfort-loving hobbit is swept into a quest with dwarves and a wizard to reclaim a mountain hoard guarded by a dragon.",
  },
  {
    id: 11,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    rating: 4.8,
    isbn: "9780590353427",
    description:
      "An orphaned boy discovers he's a wizard and starts his first year at a magical school with secrets hidden beneath its floors.",
  },
  {
    id: 12,
    title: "A Game of Thrones",
    author: "George R. R. Martin",
    category: "Fantasy",
    rating: 4.6,
    isbn: "9780553573404",
    description:
      "Noble houses scheme for control of an iron throne while an ancient threat gathers, unnoticed, beyond a wall of ice in the north.",
  },

  // ---- Mystery ----
  {
    id: 13,
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "Mystery",
    rating: 4.2,
    isbn: "9780307588371",
    description:
      "When a woman vanishes on her anniversary, her husband becomes the prime suspect in a marriage that was never what it seemed.",
  },
  {
    id: 14,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    category: "Mystery",
    rating: 4.1,
    isbn: "9780307474278",
    description:
      "A symbologist races across Europe to decode a murdered curator's final clues before a centuries-old secret is buried for good.",
  },
  {
    id: 15,
    title: "And Then There Were None",
    author: "Agatha Christie",
    category: "Mystery",
    rating: 4.6,
    isbn: "9780062073488",
    description:
      "Ten strangers are lured to an isolated island, where they're picked off one by one for crimes they thought no one knew about.",
  },

  // ---- Biography ----
  {
    id: 16,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    rating: 4.6,
    isbn: "9781451648539",
    description:
      "An unvarnished account of Apple's co-founder, drawn from dozens of interviews with the man himself, his family, friends, and rivals.",
  },
  {
    id: 17,
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "Biography",
    rating: 4.5,
    isbn: "9780553296983",
    description:
      "A teenage girl's diary, written while hiding from Nazi persecution, capturing ordinary hopes and fears against an extraordinary backdrop.",
  },
  {
    id: 18,
    title: "Long Walk to Freedom",
    author: "Nelson Mandela",
    category: "Biography",
    rating: 4.7,
    isbn: "9780316548182",
    description:
      "Nelson Mandela's own account of his journey from rural childhood to decades of imprisonment to leading a nation out of apartheid.",
  },
];

// Attach call numbers once, here, so every consumer (cards, details
// page, the Add Book form's "next number" preview) sees the same
// pre-computed value instead of recalculating it on every render.
export const bookCatalog = annotateWithCallNumbers(rawCatalog);
