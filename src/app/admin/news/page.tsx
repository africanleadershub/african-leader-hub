import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CollectionManager } from "@/components/admin/collection-manager";

export default function AdminNewsPage() {
  return (
    <CollectionManager
      collection="posts"
      title="News"
      createHref="/admin/news/new"
      actions={
        <Button asChild variant="outline">
          <Link href="/admin/news/categories">Categories</Link>
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
