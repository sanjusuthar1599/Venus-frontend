import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminAuthProvider } from "./admin/AdminAuthContext.jsx";
import ScrollToTop from "./Component/ScrollToTop.jsx";
import PageShell from "./Component/PageShell.jsx";
import Navbar from "./Component/Navbar.jsx";
import Footer from "./Component/Footer.jsx";

function AppShell() {
  const location = useLocation();
  const adminChrome = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer position="top-center" theme="light" />
      {!adminChrome && <Navbar />}
      <ScrollToTop />
      <PageShell />
      {!adminChrome && <Footer />}
    </>
  );
}

const App = () => {
  return (
    <Router>
      <AdminAuthProvider>
        <AppShell />
      </AdminAuthProvider>
    </Router>
  );
};

export default App;
