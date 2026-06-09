import { useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdminAuth } from "./AdminAuthContext.jsx";

export default function AdminLogin() {
  const { login, isAuthenticated } = useAdminAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);

    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=80')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Luxury Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(242,127,38,0.18), transparent 65%)",
        }}
      />

      {/* Decorative Blur */}
      <div className="absolute left-[-120px] top-[120px] h-[350px] w-[350px] rounded-full bg-orange-500/15 blur-[130px]" />
      <div className="absolute bottom-[-120px] right-[-120px] h-[350px] w-[350px] rounded-full bg-amber-400/15 blur-[130px]" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
        <div
          className="
            relative
            w-full
            max-w-md
            overflow-hidden
            rounded-[32px]
            border
            border-white/15
            bg-white/10
            backdrop-blur-2xl
            p-8
            shadow-[0_25px_80px_rgba(0,0,0,0.55)]
          "
        >
          {/* Top Glow */}
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl" />

          {/* Logo */}
          <div className="relative text-center">
            <div className="mb-5 flex justify-center">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-orange-500
                  to-amber-500
                  text-2xl
                  font-bold
                  text-white
                  shadow-lg
                  shadow-orange-500/30
                "
              >
                V
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.45em] text-amber-400">
              Venus Interior
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="mt-3 text-sm text-white/70">
              Access your projects, portfolios and client spaces.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/80">
                Email
              </label>

              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-3.5
                  text-white
                  placeholder:text-white/40
                  outline-none
                  transition-all
                  duration-300
                  focus:border-orange-400
                  focus:bg-white/15
                  focus:ring-2
                  focus:ring-orange-400/20
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/80">
                Password
              </label>

              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-3.5
                  text-white
                  placeholder:text-white/40
                  outline-none
                  transition-all
                  duration-300
                  focus:border-orange-400
                  focus:bg-white/15
                  focus:ring-2
                  focus:ring-orange-400/20
                "
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="
                mt-2
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-[#f27f26]
                via-orange-500
                to-amber-500
                py-3.5
                text-sm
                font-bold
                uppercase
                tracking-wider
                text-white
                shadow-lg
                shadow-orange-500/30
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-[0_15px_40px_rgba(242,127,38,0.45)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {busy ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="
                text-sm
                font-medium
                text-amber-400
                transition
                hover:text-amber-300
              "
            >
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}