import { RecordForm } from "@/components/admin/record-form";
import { partnerFields } from "@/components/admin/form-fields";

export default function NewPartnerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">New partner</h1>
      <RecordForm collection="partners" fields={partnerFields} titleField="name" />
    </div>
  );
}
