import { createSlice } from "@reduxjs/toolkit";
import { bookCatalog } from "../../data/booksCatalog";
import { loadBooksState } from "../../utils/storage";
import { generateId } from "../../utils/id";

// Hydrate from localStorage if we have it (e.g. books added in a
// previous visit); otherwise fall back to the seed catalog. This runs
// once, at module load, before the store is created.
const persisted = loadBooksState();

const initialState = persisted ?? {
  items: bookCatalog,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    /**
     * Adds a new book to the front of the list, so it's the first
     * thing visible on Browse Books — matches the assignment's
     * "newly added book displayed at the beginning" requirement.
     *
     * The id is generated here (not by the caller) so the slice is
     * the single place responsible for guaranteeing uniqueness, even
     * if the form gets submitted twice in the same millisecond.
     */
    bookAdded: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(bookFields) {
        return {
          payload: {
            ...bookFields,
            id: generateId(),
          },
        };
      },
    },
  },
});

export const { bookAdded } = booksSlice.actions;
export default booksSlice.reducer;

// Selectors live next to the slice that owns the data, so components
// never need to know the state shape (state.books.items) directly.
export const selectAllBooks = (state) => state.books.items;
