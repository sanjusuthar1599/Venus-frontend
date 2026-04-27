import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext.jsx";

const navCls = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-[#f27f26] text-white shadow-md shadow-[#f27f26]/30"
      : "text-neutral-600 hover:bg-white hover:text-neutral-900"
  }`;

export default function AdminLayout() {
  const { logout, email } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-neutral-200 bg-white lg:flex">
          <div className="border-b border-neutral-100 px-4 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f27f26]">
              Venus
            </p>
            <p className="mt-1 text-sm font-semibold text-neutral-800">
              Studio admin
            </p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            <NavLink to="/admin" end className={navCls}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/projects" className={navCls}>
              Portfolio
            </NavLink>
            <NavLink to="/admin/projects/new" className={navCls}>
              New project
            </NavLink>
          </nav>
          <div className="border-t border-neutral-100 p-3">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/admin/login", { replace: true });
              }}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              Log out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-xs text-neutral-500">Signed in</p>
              <p className="truncate text-sm font-semibold text-neutral-900">
                {email || "Admin"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <NavLink
                to="/"
                className="hidden rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 transition hover:bg-neutral-50 sm:inline-block"
              >
                View site
              </NavLink>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/admin/login", { replace: true });
                }}
                className="rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-neutral-800 lg:hidden"
              >
                Log out
              </button>
            </div>
          </header>

          <div className="border-b border-neutral-200 bg-white px-4 py-2 lg:hidden">
            <nav className="flex flex-wrap gap-2">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-semibold ${
                    isActive
                      ? "bg-[#f27f26] text-white"
                      : "bg-neutral-100 text-neutral-800"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/admin/projects"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-semibold ${
                    isActive
                      ? "bg-[#f27f26] text-white"
                      : "bg-neutral-100 text-neutral-800"
                  }`
                }
              >
                Portfolio
              </NavLink>
              <NavLink
                to="/admin/projects/new"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-semibold ${
                    isActive
                      ? "bg-[#f27f26] text-white"
                      : "bg-neutral-100 text-neutral-800"
                  }`
                }
              >
                New
              </NavLink>
            </nav>
          </div>

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
