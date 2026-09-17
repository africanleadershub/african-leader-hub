import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminNewsPage() {
  return (
    <CollectionManager
      collection="posts"
      title="News"
      createHref="/admin/news/new"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
