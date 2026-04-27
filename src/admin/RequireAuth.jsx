import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext.jsx";

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    );
  }

  return children;
}
