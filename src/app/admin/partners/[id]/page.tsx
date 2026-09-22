import { RecordForm } from "@/components/admin/record-form";
import { partnerFields } from "@/components/admin/form-fields";

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit partner</h1>
      <RecordForm collection="partners" id={id} fields={partnerFields} titleField="name" />
    </div>
  );
}
