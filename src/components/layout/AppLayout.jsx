import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Every "normal" page goes through this layout via the nested route
 * in App.jsx. The 404 page deliberately sits OUTSIDE this layout
 * (see App.jsx) so it renders without the Header, per the assignment
 * spec.
 */
function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
