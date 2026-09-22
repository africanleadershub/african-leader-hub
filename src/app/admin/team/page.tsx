import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminTeamPage() {
  return (
    <CollectionManager
      collection="team"
      title="Team"
      createHref="/admin/team/new"
      columns={[
        { key: "name", label: "Name" },
        { key: "position", label: "Position" },
        { key: "committee", label: "Committee" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
