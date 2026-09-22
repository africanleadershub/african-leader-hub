"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

export type ContentCategory = {
  id: string;
  kind: "NEWS" | "PROGRAM";
  name: string;
  slug: string;
  description?: string | null;
  sortOrder: number;
};

export function CategoryManager({
  kind,
  compact = false,
  onChanged,
}: {
  kind: "NEWS" | "PROGRAM";
  compact?: boolean;
  onChanged?: () => void;
}) {
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState<ContentCategory | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminFetch(`/api/admin/categories?kind=${kind}`);
      const data = await response.json();
      setCategories(data.categories || []);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, [kind]);

  useEffect(() => {
    void load();
  }, [load]);

  function resetForm() {
    setName("");
    setDescription("");
    setEditing(null);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    setSaving(true);
    try {
      const response = await adminFetch("/api/admin/categories", {
        method: editing ? "PATCH" : "POST",
        body: JSON.stringify(
          editing
            ? { id: editing.id, name: name.trim(), description: description.trim() }
            : { kind, name: name.trim(), description: description.trim() }
        ),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed");
      toast.success(editing ? "Category updated" : "Category added");
      resetForm();
      await load();
      onChanged?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(category: ContentCategory) {
    if (!confirm(`Delete “${category.name}”?`)) return;
    const response = await adminFetch(`/api/admin/categories?id=${category.id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Delete failed");
      return;
    }
    toast.success("Category deleted");
    if (editing?.id === category.id) resetForm();
    await load();
    onChanged?.();
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-3 rounded-lg border p-4">
        <div className="space-y-2">
          <Label>{editing ? "Rename category" : "New category"}</Label>
          <Input
            placeholder={kind === "NEWS" ? "Program Updates" : "Youth & Children Empowerment"}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            rows={compact ? 2 : 3}
            placeholder="Optional short description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={saving} className="bg-[#8B4513] hover:bg-[#6B3410]">
            {saving ? "Saving…" : editing ? "Update category" : "Add category"}
          </Button>
          {editing ? (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>
      <div className="space-y-2">
        {loading ? <p className="text-sm text-muted-foreground">Loading categories…</p> : null}
        {!loading && categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No categories yet.</p>
        ) : null}
        {categories.map((category) => (
          <div key={category.id} className="flex items-start justify-between gap-3 rounded-md border px-3 py-2">
            <div className="min-w-0">
              <p className="font-medium">{category.name}</p>
              {category.description ? (
                <p className="text-sm text-muted-foreground">{category.description}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 gap-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`Edit ${category.name}`}
                onClick={() => {
                  setEditing(category);
                  setName(category.name);
                  setDescription(category.description || "");
                }}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`Delete ${category.name}`}
                onClick={() => void remove(category)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryManagerDialog({
  kind,
  open,
  onOpenChange,
  onChanged,
}: {
  kind: "NEWS" | "PROGRAM";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChanged?: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Manage {kind === "NEWS" ? "news" : "program"} categories</DialogTitle>
          <DialogDescription>Add, rename, or remove categories used on this content.</DialogDescription>
        </DialogHeader>
        <CategoryManager kind={kind} compact onChanged={onChanged} />
      </DialogContent>
    </Dialog>
  );
}

export function CategoryField({
  kind,
  label,
  value,
  onChange,
}: {
  kind: "NEWS" | "PROGRAM";
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    const response = await adminFetch(`/api/admin/categories?kind=${kind}`);
    const data = await response.json();
    setCategories(data.categories || []);
  }, [kind]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label>{label}</Label>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(true)}>
          <Plus className="mr-1 size-3.5" />
          Manage
        </Button>
      </div>
      <select
        className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{categories.length ? "Select a category" : "No categories yet"}</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
        {value && !categories.some((category) => category.name === value) ? (
          <option value={value}>{value}</option>
        ) : null}
      </select>
      <CategoryManagerDialog
        kind={kind}
        open={open}
        onOpenChange={setOpen}
        onChanged={() => void load()}
      />
    </div>
  );
}
