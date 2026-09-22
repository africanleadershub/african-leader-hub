import { RecordForm } from "@/components/admin/record-form";
import { programFields } from "@/components/admin/form-fields";

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit program</h1>
      <RecordForm collection="programs" id={id} fields={programFields} />
    </div>
  );
}
