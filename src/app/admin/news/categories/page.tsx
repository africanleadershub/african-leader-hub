import { CategoryManager } from "@/components/admin/category-manager";

export default function NewsCategoriesPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">News categories</h1>
        <p className="text-muted-foreground">These categories appear on news articles and the public news page.</p>
      </div>
      <CategoryManager kind="NEWS" />
    </div>
  );
}
