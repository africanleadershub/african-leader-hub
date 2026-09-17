import { RecordForm } from "@/components/admin/record-form";
import { faqFields } from "@/components/admin/form-fields";

export default function NewFaqPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">New FAQ</h1>
      <RecordForm collection="faqs" fields={faqFields} titleField="question" />
    </div>
  );
}
