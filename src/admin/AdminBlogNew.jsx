import AdminFormModal from "./AdminFormModal.jsx";
import AdminBlogCreateForm from "./AdminBlogCreateForm.jsx";

export default function AdminBlogNew() {
  return (
    <AdminFormModal
      title="New blog"
      subtitle="Add a journal post with cover image, intro text, and long-form content."
      backTo="/admin/blogs"
    >
      <AdminBlogCreateForm />
    </AdminFormModal>
  );
}
