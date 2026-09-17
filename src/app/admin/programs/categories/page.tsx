import { CategoryManager } from "@/components/admin/category-manager";

export default function ProgramCategoriesPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Program categories</h1>
        <p className="text-muted-foreground">These categories appear on programs and the public programs page.</p>
      </div>
      <CategoryManager kind="PROGRAM" />
    </div>
  );
}
