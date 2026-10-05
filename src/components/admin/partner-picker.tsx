"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AssetField, type AssetRecord } from "@/components/admin/asset-selector";
import { adminFetch } from "@/lib/admin-fetch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export type PartnerOption = {
  id: string;
  name: string;
  category?: string;
  website?: string | null;
  published?: boolean;
  logoAsset?: (Partial<AssetRecord> & { url: string; alt?: string | null }) | null;
};

type PartnerDraft = {
  name: string;
  category: string;
  website: string;
  published: boolean;
  logo: AssetRecord | null;
};

const emptyDraft: PartnerDraft = { name: "", category: "", website: "", published: true, logo: null };

function draftFrom(partner: PartnerOption): PartnerDraft {
  return {
    name: partner.name,
    category: partner.category || "",
    website: partner.website || "",
    published: partner.published ?? true,
    logo: partner.logoAsset?.id ? (partner.logoAsset as AssetRecord) : null,
  };
}

export function PartnerPicker({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: PartnerOption[];
  onChange: (partners: PartnerOption[]) => void;
  help?: string;
}) {
  const [partners, setPartners] = useState<PartnerOption[]>([]);
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<PartnerOption | null>(null);
  const [draft, setDraft] = useState<PartnerDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const selectedIds = useMemo(() => new Set(value.map((partner) => partner.id)), [value]);
  const categories = useMemo(
    () => [...new Set(partners.map((partner) => partner.category).filter(Boolean))] as string[],
    [partners]
  );

  useEffect(() => {
    adminFetch("/api/admin/collections/partners")
      .then((response) => response.json())
      .then((data) => setPartners((data.items || []) as PartnerOption[]))
      .catch(() => undefined);
  }, []);

  const filtered = partners.filter((partner) =>
    partner.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  function toggle(partner: PartnerOption) {
    if (selectedIds.has(partner.id)) {
      onChange(value.filter((item) => item.id !== partner.id));
      return;
    }
    onChange([...value, partner]);
  }

  function openCreate() {
    setEditing(null);
    setDraft({ ...emptyDraft, name: search.trim() });
    setSheetOpen(true);
  }

  function openEdit(partner: PartnerOption) {
    setEditing(partner);
    setDraft(draftFrom(partner));
    setSheetOpen(true);
  }

  async function savePartner(event: FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!draft.name.trim() || !draft.category.trim()) {
      toast.error("Add a name and a category");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...(editing ? { id: editing.id } : {}),
        name: draft.name.trim(),
        category: draft.category.trim(),
        website: draft.website.trim() || null,
        published: draft.published,
        logoAssetId: draft.logo?.id || null,
      };
      const response = await adminFetch("/api/admin/collections/partners", {
        method: editing ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Could not save partner");
        return;
      }
      const saved = data.item as PartnerOption;
      if (editing) {
        setPartners((current) => current.map((partner) => (partner.id === saved.id ? saved : partner)));
        onChange(value.map((partner) => (partner.id === saved.id ? saved : partner)));
        toast.success("Partner updated");
      } else {
        setPartners((current) => [saved, ...current]);
        onChange([...value, saved]);
        setSearch("");
        toast.success("Partner added and selected");
      }
      setSheetOpen(false);
    } catch {
      toast.error("Could not save partner");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{value.length} selected</span>
          <Button type="button" variant="outline" size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add partner
          </Button>
        </div>
      </div>
      <Input
        placeholder="Search partners"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="max-h-64 space-y-1 overflow-y-auto rounded-md border p-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-start gap-3 px-2 py-4 text-sm text-muted-foreground">
            <p>{partners.length === 0 ? "No partners yet." : "No matching partners."}</p>
            <Button type="button" variant="outline" size="sm" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              {search.trim() ? `Add “${search.trim()}”` : "Add a partner"}
            </Button>
          </div>
        ) : (
          filtered.map((partner) => {
            const selected = selectedIds.has(partner.id);
            return (
              <div
                key={partner.id}
                className={cn(
                  "group flex items-center gap-1 rounded-md hover:bg-muted",
                  selected && "bg-[#8B4513]/10"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(partner)}
                  aria-pressed={selected}
                  className="flex flex-1 items-center gap-3 px-2 py-2 text-left text-sm"
                >
                  {partner.logoAsset?.url ? (
                    <Image
                      src={partner.logoAsset.url}
                      alt={partner.logoAsset.alt || partner.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded bg-white object-contain"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded border text-[10px] text-muted-foreground">
                      Logo
                    </span>
                  )}
                  <span className="flex-1">{partner.name}</span>
                  {selected ? <span className="text-xs text-[#8B4513]">Selected</span> : null}
                </button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mr-1 h-8 w-8 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                  aria-label={`Edit ${partner.name}`}
                  onClick={() => openEdit(partner)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            );
          })
        )}
      </div>
      {help ? <p className="text-xs text-muted-foreground">{help}</p> : null}

      <Sheet open={sheetOpen} onOpenChange={(open) => !saving && setSheetOpen(open)}>
        <SheetContent className="w-full gap-0 sm:max-w-md">
          <form onSubmit={savePartner} className="flex h-full flex-col">
            <SheetHeader className="border-b bg-stone-50 px-6 py-5">
              <SheetTitle>{editing ? "Edit partner" : "Add partner"}</SheetTitle>
              <SheetDescription>
                {editing
                  ? "Changes apply everywhere this partner appears."
                  : "The new partner is saved and selected for this program."}
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="partner-name">Name *</Label>
                <Input
                  id="partner-name"
                  placeholder="African Development Bank"
                  value={draft.name}
                  onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner-category">Category *</Label>
                <Input
                  id="partner-category"
                  list="partner-category-options"
                  placeholder="Institutional partner"
                  value={draft.category}
                  onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                  required
                />
                <datalist id="partner-category-options">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
                <p className="text-xs text-muted-foreground">Pick an existing category or type a new one.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner-website">Website</Label>
                <Input
                  id="partner-website"
                  type="url"
                  placeholder="https://example.org"
                  value={draft.website}
                  onChange={(event) => setDraft({ ...draft, website: event.target.value })}
                />
              </div>
              <AssetField
                label="Logo"
                value={draft.logo}
                onChange={(asset) => setDraft({ ...draft, logo: asset })}
              />
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <div>
                  <Label htmlFor="partner-published">Published</Label>
                  <p className="text-xs text-muted-foreground">Unpublished partners are hidden on the site.</p>
                </div>
                <Switch
                  id="partner-published"
                  checked={draft.published}
                  onCheckedChange={(checked) => setDraft({ ...draft, published: checked })}
                />
              </div>
            </div>
            <SheetFooter className="flex-row justify-end gap-2 border-t px-6 py-4">
              <Button type="button" variant="outline" onClick={() => setSheetOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-[#8B4513] hover:bg-[#6B3410]">
                {saving ? "Saving…" : editing ? "Save partner" : "Add partner"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
