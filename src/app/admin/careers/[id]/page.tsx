import { RecordForm } from "@/components/admin/record-form";
import { careerFields } from "@/components/admin/form-fields";

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit career</h1>
      <RecordForm collection="careers" id={id} fields={careerFields} />
    </div>
  );
}
