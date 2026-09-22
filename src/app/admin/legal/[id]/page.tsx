import { RecordForm } from "@/components/admin/record-form";
import { legalFields } from "@/components/admin/form-fields";

export default async function EditLegalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit legal page</h1>
      <RecordForm collection="legal" id={id} fields={legalFields} />
    </div>
  );
}
