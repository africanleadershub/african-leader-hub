import { RecordForm } from "@/components/admin/record-form";
import { teamFields } from "@/components/admin/form-fields";

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit team member</h1>
      <RecordForm collection="team" id={id} fields={teamFields} titleField="name" />
    </div>
  );
}
