import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminImpactPage() {
  return (
    <CollectionManager
      collection="impact"
      title="Impact stats"
      createHref="/admin/impact/new"
      columns={[
        { key: "title", label: "Title" },
        { key: "value", label: "Value" },
        { key: "category", label: "Category" },
      ]}
    />
  );
}
