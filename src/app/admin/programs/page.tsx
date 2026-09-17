import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminProgramsPage() {
  return (
    <CollectionManager
      collection="programs"
      title="Programs"
      createHref="/admin/programs/new"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
