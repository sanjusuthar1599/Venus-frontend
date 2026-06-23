import { Link, useNavigate } from "react-router-dom";

export default function AdminFormModal({ title, subtitle, backTo, children }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-y-auto bg-black/35 px-4 py-8 backdrop-blur-[2px] sm:py-10">
      <div className="w-full max-w-3xl">
        <div className="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-[0_24px_80px_-30px_rgba(0,0,0,0.28)]">
          <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-5 py-4 sm:px-6">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                {title}
              </h1>
              {subtitle ? <p className="mt-1 text-sm text-neutral-500">{subtitle}</p> : null}
            </div>
            <div className="flex items-center gap-2">
              {backTo ? (
                <Link
                  to={backTo}
                  className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 transition hover:bg-neutral-50"
                >
                  Back
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => navigate(backTo || "/admin", { replace: true })}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-lg leading-none text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900"
                aria-label="Close form"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-5 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
