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

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit article</h1>
      <RecordForm collection="posts" id={id} fields={fields} />
    </div>
  );
}
