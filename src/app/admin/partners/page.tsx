import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminPartnersPage() {
  return (
    <CollectionManager
      collection="partners"
      title="Partners"
      createHref="/admin/partners/new"
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "published", label: "Published" },
      ]}
    />
  );
}
