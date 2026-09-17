import { RecordForm } from "@/components/admin/record-form";
import { faqFields } from "@/components/admin/form-fields";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit FAQ</h1>
      <RecordForm collection="faqs" id={id} fields={faqFields} titleField="question" />
    </div>
  );
}
