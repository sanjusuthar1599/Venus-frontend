import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { apiJson } from "../lib/adminApi.js";

function formatDate(value) {
  const d = value ? new Date(value) : null;
  if (!d || Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function typeLabel(formType) {
  return formType === "project_planner" ? "Project Planner" : "Contact Form";
}

function typeBadgeClass(formType) {
  return formType === "project_planner"
    ? "bg-violet-50 text-violet-700 ring-violet-200"
    : "bg-sky-50 text-sky-700 ring-sky-200";
}

function InquiryDetail({ inquiry, onClose, onToggleRead }) {
  if (!inquiry) return null;

  const meta = inquiry.meta || {};

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-neutral-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-5 py-4 sm:px-6">
          <div>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${typeBadgeClass(inquiry.form_type)}`}
            >
              {typeLabel(inquiry.form_type)}
            </span>
            <h2 className="mt-3 text-xl font-semibold text-neutral-900">
              {inquiry.name || "Anonymous inquiry"}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">{formatDate(inquiry.createdAt)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-lg text-neutral-500 hover:bg-neutral-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">Email</p>
              <p className="mt-1 text-sm text-neutral-900">{inquiry.email || "—"}</p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">Phone</p>
              <p className="mt-1 text-sm text-neutral-900">{inquiry.phone || "—"}</p>
            </div>
          </div>

          {inquiry.project_type ? (
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                Project type
              </p>
              <p className="mt-1 text-sm text-neutral-900">{inquiry.project_type}</p>
            </div>
          ) : null}

          {inquiry.form_type === "project_planner" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Home type", meta.bhk],
                ["Selected scope", Array.isArray(meta.rooms) ? meta.rooms.join(", ") : "—"],
                ["Finish level", meta.finish_level],
                ["Timeline", meta.timeline],
                ["Recommended package", meta.recommended_package],
                ["Finish direction", meta.finish_direction],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-neutral-200 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                    {label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-800">{value || "—"}</p>
                </div>
              ))}
            </div>
          ) : null}

          {inquiry.message ? (
            <div className="rounded-xl border border-neutral-200 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                Message
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">
                {inquiry.message}
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => onToggleRead(inquiry)}
              className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
            >
              Mark as {inquiry.status === "new" ? "read" : "new"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminContactInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiJson("/api/inquiries");
      setInquiries(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e?.message || "Could not load inquiries");
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (filter === "new") return inquiries.filter((item) => item.status === "new");
    if (filter === "contact") return inquiries.filter((item) => item.form_type === "contact");
    if (filter === "planner")
      return inquiries.filter((item) => item.form_type === "project_planner");
    return inquiries;
  }, [filter, inquiries]);

  const newCount = useMemo(
    () => inquiries.filter((item) => item.status === "new").length,
    [inquiries]
  );

  async function toggleRead(inquiry) {
    const nextStatus = inquiry.status === "new" ? "read" : "new";
    try {
      const updated = await apiJson(`/api/inquiries/${inquiry.id}/status`, {
        method: "PATCH",
        body: { status: nextStatus },
      });
      setInquiries((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setSelected((prev) => (prev?.id === updated.id ? updated : prev));
      toast.success(nextStatus === "read" ? "Marked as read" : "Marked as new");
    } catch (e) {
      toast.error(e?.message || "Update failed");
    }
  }

  async function remove(id, name) {
    if (!window.confirm(`Delete inquiry from “${name || "visitor"}”?`)) return;
    try {
      await apiJson(`/api/inquiries/${id}`, { method: "DELETE" });
      toast.success("Inquiry deleted");
      setSelected((prev) => (prev?.id === id ? null : prev));
      load();
    } catch (e) {
      toast.error(e?.message || "Delete failed");
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Contact Inquiry
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            All messages from the contact page and project planner.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 ring-1 ring-neutral-200">
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">New</span>
          <span className="text-lg font-bold text-[#f27f26]">{newCount}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          ["all", "All"],
          ["new", "New only"],
          ["contact", "Contact form"],
          ["planner", "Project planner"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              filter === value
                ? "bg-[#f27f26] text-white"
                : "bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center text-sm text-neutral-500">
          No inquiries yet. Submissions from your site forms will appear here.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 text-left text-sm">
              <thead className="bg-neutral-50 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3 sm:px-6">Visitor</th>
                  <th className="hidden px-4 py-3 md:table-cell sm:px-6">Type</th>
                  <th className="hidden px-4 py-3 lg:table-cell sm:px-6">Summary</th>
                  <th className="px-4 py-3 sm:px-6">Date</th>
                  <th className="px-4 py-3 sm:px-6">Status</th>
                  <th className="px-4 py-3 text-right sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((inquiry) => {
                  const summary =
                    inquiry.form_type === "project_planner"
                      ? `${inquiry.meta?.bhk || "—"} · ${
                          Array.isArray(inquiry.meta?.rooms)
                            ? inquiry.meta.rooms.slice(0, 2).join(", ")
                            : "—"
                        }`
                      : inquiry.message?.slice(0, 72) || inquiry.project_type || "—";

                  return (
                    <tr
                      key={inquiry.id}
                      className={`align-middle ${
                        inquiry.status === "new" ? "bg-orange-50/40" : ""
                      }`}
                    >
                      <td className="px-4 py-3 sm:px-6">
                        <p className="font-medium text-neutral-900">
                          {inquiry.name || "Visitor"}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {inquiry.email || inquiry.phone || "No contact detail"}
                        </p>
                        <p className="mt-1 text-xs text-[#f27f26] md:hidden">
                          {typeLabel(inquiry.form_type)}
                        </p>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell sm:px-6">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${typeBadgeClass(inquiry.form_type)}`}
                        >
                          {typeLabel(inquiry.form_type)}
                        </span>
                      </td>
                      <td className="hidden max-w-xs px-4 py-3 lg:table-cell sm:px-6">
                        <p className="line-clamp-2 text-neutral-600">{summary}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-neutral-500 sm:px-6">
                        {formatDate(inquiry.createdAt)}
                      </td>
                      <td className="px-4 py-3 sm:px-6">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                            inquiry.status === "new"
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : "bg-neutral-100 text-neutral-600 ring-1 ring-neutral-200"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right sm:px-6">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelected(inquiry)}
                            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(inquiry.id, inquiry.name)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-800 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected ? (
        <InquiryDetail
          inquiry={selected}
          onClose={() => setSelected(null)}
          onToggleRead={toggleRead}
        />
      ) : null}
    </div>
  );
}
