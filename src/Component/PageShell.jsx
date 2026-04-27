import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home.jsx";
import About from "./About.jsx";
import Services from "./Services.jsx";
import Portfolio from "./Portfolio.jsx";
import Contact from "./Contact.jsx";
import AdminLogin from "../admin/AdminLogin.jsx";
import AdminLayout from "../admin/AdminLayout.jsx";
import AdminDashboard from "../admin/AdminDashboard.jsx";
import AdminProjects from "../admin/AdminProjects.jsx";
import AdminProjectNew from "../admin/AdminProjectNew.jsx";
import AdminProjectEdit from "../admin/AdminProjectEdit.jsx";
import RequireAuth from "../admin/RequireAuth.jsx";

/**
 * Wraps routes with a key on pathname so enter animation replays on navigation.
 */
const PageShell = () => {
  const location = useLocation();

  return (
    <main
      key={location.pathname}
      className="page-route-enter"
      id="main-content"
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectNew />} />
          <Route path="projects/:id/edit" element={<AdminProjectEdit />} />
        </Route>
      </Routes>
    </main>
  );
};

export default PageShell;
