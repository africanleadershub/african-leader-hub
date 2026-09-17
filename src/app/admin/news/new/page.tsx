import { RecordForm } from "@/components/admin/record-form";

const fields = [
  { name: "title", label: "Title", type: "text" as const },
  { name: "slug", label: "Slug", type: "text" as const },
  { name: "excerpt", label: "Excerpt", type: "textarea" as const },
  { name: "category", label: "Category", type: "text" as const },
  { name: "authorName", label: "Author", type: "text" as const },
  { name: "status", label: "Status", type: "select" as const, options: [
    { label: "Draft", value: "DRAFT" },
    { label: "Published", value: "PUBLISHED" },
    { label: "Archived", value: "ARCHIVED" },
  ]},
  { name: "featuredImageId", label: "Featured image", type: "asset" as const },
  { name: "contentHtml", label: "Content", type: "richtext" as const },
];

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">New article</h1>
      <RecordForm collection="posts" fields={fields} />
    </div>
  );
}
