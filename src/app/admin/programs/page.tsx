import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminProgramsPage() {
  return (
    <CollectionManager
      collection="programs"
      title="Programs"
      createHref="/admin/programs/new"
      actions={
        <Button asChild variant="outline">
          <Link href="/admin/programs/categories">Categories</Link>
        </Button>
      }
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
