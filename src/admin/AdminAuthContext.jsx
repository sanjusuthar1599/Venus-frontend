import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { apiLogin, getAuthToken, setAuthToken } from "../lib/adminApi.js";

const AdminAuthContext = createContext(null);

const EMAIL_KEY = "venus_admin_email";

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => getAuthToken());
  const [email, setEmail] = useState(() => localStorage.getItem(EMAIL_KEY) || "");

  const login = useCallback(async (loginEmail, password) => {
    const data = await apiLogin(loginEmail, password);
    setAuthToken(data.token);
    localStorage.setItem(EMAIL_KEY, data.user?.email || loginEmail);
    setToken(data.token);
    setEmail(data.user?.email || loginEmail);
    return data;
  }, []);

  const logout = useCallback(() => {
    setAuthToken("");
    localStorage.removeItem(EMAIL_KEY);
    setToken("");
    setEmail("");
  }, []);

  const value = useMemo(
    () => ({
      token,
      email,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, email, login, logout]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}
