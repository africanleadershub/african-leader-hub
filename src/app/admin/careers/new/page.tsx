import { RecordForm } from "@/components/admin/record-form";
import { careerFields } from "@/components/admin/form-fields";

export default function NewCareerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">New career</h1>
      <RecordForm collection="careers" fields={careerFields} />
    </div>
  );
}
