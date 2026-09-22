import { RecordForm } from "@/components/admin/record-form";
import { postFields } from "@/components/admin/form-fields";

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">New article</h1>
      <RecordForm collection="posts" fields={postFields} />
    </div>
  );
}
