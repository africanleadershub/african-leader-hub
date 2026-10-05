import { RecordForm } from "@/components/admin/record-form";
import { careerFields } from "@/components/admin/form-fields";

export default function NewCareerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">New career</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Work through one block at a time. Publishing and the job details stay in the column on the right.
        </p>
      </div>
      <RecordForm collection="careers" fields={careerFields} />
    </div>
  );
}
