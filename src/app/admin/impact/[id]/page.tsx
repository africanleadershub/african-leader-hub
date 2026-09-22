import { RecordForm } from "@/components/admin/record-form";
import { impactFields } from "@/components/admin/form-fields";

export default async function EditImpactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit impact stat</h1>
      <RecordForm collection="impact" id={id} fields={impactFields} />
    </div>
  );
}
