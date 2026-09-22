import { RecordForm } from "@/components/admin/record-form";
import { programFields } from "@/components/admin/form-fields";

export default function NewProgramPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">New program</h1>
      <RecordForm collection="programs" fields={programFields} />
    </div>
  );
}
