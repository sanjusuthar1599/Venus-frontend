import AdminFormModal from "./AdminFormModal.jsx";
import AdminProjectCreateForm from "./AdminProjectCreateForm.jsx";

export default function AdminProjectNew() {
  return (
    <AdminFormModal
      title="New project"
      subtitle="Image galleries or a single video card — same categories as the public portfolio."
      backTo="/admin/projects"
    >
      <AdminProjectCreateForm />
    </AdminFormModal>
  );
}
