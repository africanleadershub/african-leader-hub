import { RecordForm } from "@/components/admin/record-form";
import { teamFields } from "@/components/admin/form-fields";

export default function NewTeamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">New team member</h1>
      <RecordForm collection="team" fields={teamFields} titleField="name" />
    </div>
  );
}
