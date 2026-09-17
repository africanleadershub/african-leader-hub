import { RecordForm } from "@/components/admin/record-form";
import { postFields } from "@/components/admin/form-fields";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit article</h1>
      <RecordForm collection="posts" id={id} fields={postFields} />
    </div>
  );
}
