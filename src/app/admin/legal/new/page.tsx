import { RecordForm } from "@/components/admin/record-form";
import { legalFields } from "@/components/admin/form-fields";

export default function NewLegalPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">New legal page</h1>
      <RecordForm collection="legal" fields={legalFields} />
    </div>
  );
}
