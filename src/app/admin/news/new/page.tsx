import { RecordForm } from "@/components/admin/record-form";
import { postFields } from "@/components/admin/form-fields";

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">New article</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Work through one block at a time. Publishing, the image, and the category stay in the column on the right.
        </p>
      </div>
      <RecordForm collection="posts" fields={postFields} />
    </div>
  );
}
