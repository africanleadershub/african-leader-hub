"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import { RichTextEditor, htmlFromJson } from "@/components/editor/rich-text-editor";
import type { JSONContent } from "@tiptap/react";
import { AssetField, type AssetRecord } from "@/components/admin/asset-selector";
import { slugify } from "@/lib/slug";

type Field =
  | { name: string; label: string; type: "text" | "textarea" | "number" | "datetime" }
  | { name: string; label: string; type: "select"; options: { label: string; value: string }[] }
  | { name: string; label: string; type: "asset" }
  | { name: string; label: string; type: "list" }
  | { name: string; label: string; type: "richtext" };

export function RecordForm({
  collection,
  id,
  fields,
  titleField = "title",
}: {
  collection: string;
  id?: string;
  fields: Field[];
  titleField?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    adminFetch(`/api/admin/collections/${collection}`)
      .then((res) => res.json())
      .then((data) => {
        const item = (data.items || []).find((row: { id: string }) => row.id === id);
        if (item) setValues(item);
      })
      .catch(() => toast.error("Failed to load record"));
  }, [collection, id]);

  function setField(name: string, value: unknown) {
    setValues((current) => {
      const next = { ...current, [name]: value };
      if (name === titleField && !id && !current.slug) {
        next.slug = slugify(String(value || ""));
      }
      return next;
    });
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = { ...values };
      for (const field of fields) {
        if (field.type === "asset") {
          const asset = values[field.name] as AssetRecord | undefined;
          const idKey = field.name.endsWith("Asset")
            ? `${field.name}Id`
            : field.name.endsWith("Image")
              ? `${field.name}Id`
              : `${field.name}Id`;
          if (asset && typeof asset === "object" && "id" in asset) {
            payload[idKey] = asset.id;
          }
        }
        if (field.type === "richtext") {
          const json = values[`${field.name}Json`] as JSONContent | undefined;
          if (json) payload[field.name] = htmlFromJson(json);
        }
      }
      if (id) payload.id = id;
      const response = await adminFetch(`/api/admin/collections/${collection}`, {
        method: id ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed");
      toast.success("Saved");
      router.push(`/admin/${collection === "posts" ? "news" : collection === "team" ? "team" : collection === "legal" ? "legal" : collection}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-4xl">
      {fields.map((field) => {
        if (field.type === "textarea" || field.type === "list") {
          return (
            <div key={field.name} className="space-y-2">
              <Label>{field.label}</Label>
              <Textarea
                value={
                  field.type === "list"
                    ? Array.isArray(values[field.name])
                      ? (values[field.name] as string[]).join("\n")
                      : String(values[field.name] || "")
                    : String(values[field.name] || "")
                }
                onChange={(e) =>
                  setField(
                    field.name,
                    field.type === "list" ? e.target.value.split("\n").filter(Boolean) : e.target.value
                  )
                }
                rows={5}
              />
            </div>
          );
        }
        if (field.type === "select") {
          return (
            <div key={field.name} className="space-y-2">
              <Label>{field.label}</Label>
              <select
                className="flex h-10 w-full rounded-md border px-3 text-sm"
                value={String(values[field.name] || field.options[0]?.value || "")}
                onChange={(e) => setField(field.name, e.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }
        if (field.type === "asset") {
          const raw = values[field.name] as AssetRecord | undefined;
          const nested =
            (values[field.name.replace(/Id$/, "")] as AssetRecord | undefined) ||
            (values.imageAsset as AssetRecord | undefined) ||
            (values.featuredImage as AssetRecord | undefined) ||
            raw;
          return (
            <AssetField
              key={field.name}
              label={field.label}
              value={nested && nested.url ? nested : null}
              onChange={(asset) => {
                setField(field.name, asset?.id || null);
                setField(field.name.replace(/Id$/, ""), asset);
              }}
            />
          );
        }
        if (field.type === "richtext") {
          return (
            <div key={field.name} className="space-y-2">
              <Label>{field.label}</Label>
              <RichTextEditor
                value={(values[`${field.name}Json`] as JSONContent) || null}
                onChange={(json, html) => {
                  setField(`${field.name}Json`, json);
                  setField(field.name, html);
                }}
              />
            </div>
          );
        }
        return (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            <Input
              type={field.type === "datetime" ? "datetime-local" : field.type === "number" ? "number" : "text"}
              value={String(values[field.name] || "")}
              onChange={(e) => setField(field.name, e.target.value)}
            />
          </div>
        );
      })}
      <Button type="submit" disabled={saving} className="bg-[#8B4513] hover:bg-[#6B3410]">
        {saving ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
