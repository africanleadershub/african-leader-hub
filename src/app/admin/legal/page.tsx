import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminLegalPage() {
  return (
    <CollectionManager
      collection="legal"
      title="Legal pages"
      createHref="/admin/legal/new"
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "published", label: "Published" },
      ]}
    />
  );
}
