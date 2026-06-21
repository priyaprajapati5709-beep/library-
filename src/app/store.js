import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import { saveBooksState } from "../utils/storage";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

// Persist the books slice on every state change. This intentionally
// saves the whole slice rather than diffing — the catalog is small
// (a few KB at most), so simplicity wins over micro-optimizing writes.
store.subscribe(() => {
  saveBooksState(store.getState().books);
});

export default store;
