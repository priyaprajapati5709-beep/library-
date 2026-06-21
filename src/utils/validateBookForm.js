/**
 * Validates the Add Book form fields. Returns a map of
 * fieldName -> error message; an empty object means the form passes.
 *
 * Kept as a plain function (no React, no component state) so the
 * actual validation rules are easy to read in one place and could be
 * unit-tested without rendering anything.
 */
export function validateBookForm(formData) {
  const errors = {};

  const title = formData.title.trim();
  const author = formData.author.trim();
  const description = formData.description.trim();

  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length < 2) {
    errors.title = "Title must be at least 2 characters.";
  }

  if (!author) {
    errors.author = "Author is required.";
  } else if (author.length < 2) {
    errors.author = "Author must be at least 2 characters.";
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length < 10) {
    errors.description = "Description should be at least 10 characters.";
  }

  if (!formData.category) {
    errors.category = "Please select a category.";
  }

  if (formData.rating === "" || formData.rating === null || formData.rating === undefined) {
    errors.rating = "Rating is required.";
  } else {
    const ratingNum = Number(formData.rating);
    if (Number.isNaN(ratingNum)) {
      errors.rating = "Rating must be a number.";
    } else if (ratingNum < 1 || ratingNum > 5) {
      errors.rating = "Rating must be between 1 and 5.";
    }
  }

  // ISBN is optional (just used to fetch cover art), but if someone
  // does type one in, make sure it's at least shaped like a real ISBN
  // rather than silently trying to fetch a cover that can never exist.
  const isbn = formData.isbn?.trim();
  if (isbn) {
    const digitsOnly = isbn.replace(/[-\s]/g, "");
    if (!/^\d{10}(\d{3})?$/.test(digitsOnly)) {
      errors.isbn = "ISBN should be 10 or 13 digits.";
    }
  }

  return errors;
}
