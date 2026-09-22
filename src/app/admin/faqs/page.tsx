import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminFaqsPage() {
  return (
    <CollectionManager
      collection="faqs"
      title="FAQs"
      createHref="/admin/faqs/new"
      columns={[
        { key: "question", label: "Question" },
        { key: "published", label: "Published" },
      ]}
    />
  );
}
