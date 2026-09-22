import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminCareersPage() {
  return (
    <CollectionManager
      collection="careers"
      title="Careers"
      createHref="/admin/careers/new"
      columns={[
        { key: "title", label: "Title" },
        { key: "department", label: "Department" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
