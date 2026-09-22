import { RecordForm } from "@/components/admin/record-form";
import { impactFields } from "@/components/admin/form-fields";

export default function NewImpactPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">New impact stat</h1>
      <RecordForm collection="impact" fields={impactFields} />
    </div>
  );
}
