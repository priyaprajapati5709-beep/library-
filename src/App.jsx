import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import BookDetailsPage from "./pages/BookDetailsPage";
import AddBookPage from "./pages/AddBookPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Every route nested here renders inside AppLayout, so it gets the Header */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BrowsePage />} />
          <Route path="/books/:category" element={<BrowsePage />} />
          <Route path="/books/:category/:id" element={<BookDetailsPage />} />
          <Route path="/add" element={<AddBookPage />} />
        </Route>

        {/* Sits outside AppLayout on purpose — no Header on the 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
