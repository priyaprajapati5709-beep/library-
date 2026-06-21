import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookAdded, selectAllBooks } from "../features/books/booksSlice";
import { CATEGORIES } from "../data/categories";
import { generateCallNumber } from "../utils/callNumber";
import { validateBookForm } from "../utils/validateBookForm";
import FormField from "../components/ui/FormField";
import Toast from "../components/ui/Toast";

const EMPTY_FORM = {
  title: "",
  author: "",
  description: "",
  category: "",
  rating: "",
  isbn: "",
};

const inputClasses =
  "w-full rounded-sm border border-line bg-paper px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brass";

/**
 * Form for adding a new book. On success: dispatches to Redux (which
 * also unshifts it to the front of the list and persists it to
 * localStorage), shows a confirmation toast, then redirects to
 * Browse Books — where the new book is the first thing visible.
 */
function AddBookPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(selectAllBooks);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error as soon as the user starts fixing it,
    // instead of making them resubmit just to see it disappear.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateBookForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const title = formData.title.trim();

    dispatch(
      bookAdded({
        title,
        author: formData.author.trim(),
        description: formData.description.trim(),
        category: formData.category,
        rating: Number(formData.rating),
        isbn: formData.isbn.trim() || null,
        callNumber: generateCallNumber(formData.category, books),
      })
    );

    setToastMessage(`"${title}" was added to the catalog.`);
    setFormData(EMPTY_FORM);

    // Give the toast a moment to be seen before leaving the page.
    setTimeout(() => navigate("/books"), 1200);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl mb-1">Add a Book</h1>
      <p className="text-ink-soft text-sm mb-8">
        New entries go straight to the top of Browse Books.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <FormField id="title" label="Title" error={errors.title}>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={inputClasses}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
        </FormField>

        <FormField id="author" label="Author" error={errors.author}>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            className={inputClasses}
            aria-invalid={Boolean(errors.author)}
            aria-describedby={errors.author ? "author-error" : undefined}
          />
        </FormField>

        <FormField id="description" label="Description" error={errors.description}>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={inputClasses}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "description-error" : undefined}
          />
        </FormField>

        <FormField id="category" label="Category" error={errors.category}>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClasses}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "category-error" : undefined}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="rating" label="Rating (1–5)" error={errors.rating}>
          <input
            id="rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className={inputClasses}
            aria-invalid={Boolean(errors.rating)}
            aria-describedby={errors.rating ? "rating-error" : undefined}
          />
        </FormField>

        <FormField id="isbn" label="Cover ISBN" optional error={errors.isbn}>
          <input
            id="isbn"
            name="isbn"
            type="text"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="e.g. 9780441013593 — used to fetch cover art"
            className={inputClasses}
            aria-invalid={Boolean(errors.isbn)}
            aria-describedby={errors.isbn ? "isbn-error" : undefined}
          />
        </FormField>

        <button
          type="submit"
          className="w-full rounded-sm bg-library text-paper font-medium py-3 hover:bg-library-dark transition-colors"
        >
          Add Book
        </button>
      </form>

      <Toast message={toastMessage} onDismiss={() => setToastMessage("")} />
    </div>
  );
}

export default AddBookPage;
