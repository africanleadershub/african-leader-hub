"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import { RichTextEditor, htmlFromJson } from "@/components/editor/rich-text-editor";
import type { JSONContent } from "@tiptap/react";
import { AssetField, type AssetRecord } from "@/components/admin/asset-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { CategoryField } from "@/components/admin/category-manager";
import type { FieldGroup, FormField } from "@/components/admin/form-fields";

const GROUP_ORDER: FieldGroup[] = ["publish", "media", "taxonomy", "details", "seo", "social"];
const GROUP_LABELS: Record<FieldGroup, string> = {
  content: "Content",
  publish: "Publish",
  media: "Media",
  taxonomy: "Organization",
  details: "Details",
  seo: "Search engine listing",
  social: "Social profiles",
};

function toDatetimeLocal(value: unknown) {
  if (!value) return "";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "";
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function CharCount({
  value,
  max,
  recommended,
}: {
  value: string;
  max?: number;
  recommended?: number;
}) {
  if (!max && !recommended) return null;
  const length = value.length;
  const over = max != null && length > max;
  const warn = recommended != null && length > recommended;
  return (
    <p className={cn("text-xs", over ? "text-destructive" : warn ? "text-amber-700" : "text-muted-foreground")}>
      {length}
      {max ? ` / ${max}` : ""}
      {recommended && !over ? ` · aim for ${recommended}` : ""}
      {over ? " — too long for SEO" : ""}
    </p>
  );
}

function FieldControl({
  field,
  values,
  setField,
  collection,
}: {
  field: FormField;
  values: Record<string, unknown>;
  setField: (name: string, value: unknown) => void;
  collection?: string;
}) {
  if (field.type === "textarea" || field.type === "list") {
    const raw =
      field.type === "list"
        ? Array.isArray(values[field.name])
          ? (values[field.name] as string[]).join("\n")
          : String(values[field.name] || "")
        : String(values[field.name] || "");
    return (
      <div className="space-y-2">
        <Label>
          {field.label}
          {field.required ? " *" : ""}
        </Label>
        <Textarea
          placeholder={
            field.placeholder ||
            (field.type === "list" ? "One item per line" : `Write ${field.label.toLowerCase()}`)
          }
          value={raw}
          maxLength={field.maxLength}
          onChange={(event) =>
            setField(
              field.name,
              field.type === "list" ? event.target.value.split("\n").filter(Boolean) : event.target.value
            )
          }
          rows={field.section === "sidebar" ? 4 : 5}
        />
        {field.help ? <p className="text-xs text-muted-foreground">{field.help}</p> : null}
        {field.type === "textarea" ? (
          <CharCount value={raw} max={field.maxLength} recommended={field.recommendedLength} />
        ) : null}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Select
          value={String(values[field.name] || field.options[0]?.value || "")}
          onValueChange={(value) => setField(field.name, value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (field.type === "switch") {
    return (
      <div className="flex items-center justify-between gap-3 rounded-md border px-3 py-2">
        <Label htmlFor={field.name}>{field.label}</Label>
        <Switch
          id={field.name}
          checked={Boolean(values[field.name])}
          onCheckedChange={(checked) => setField(field.name, checked)}
        />
      </div>
    );
  }

  if (field.type === "asset") {
    const relation = field.name.replace(/Id$/, "");
    const nested =
      (values[relation] as AssetRecord | undefined) ||
      (field.name === "featuredImageId" ? (values.bannerImage as AssetRecord | undefined) : undefined) ||
      (field.name === "imageAssetId" ? (values.bannerAsset as AssetRecord | undefined) : undefined);
    return (
      <div className="space-y-2">
        <AssetField
          label={field.label}
          value={nested && nested.url ? nested : null}
        onChange={(asset) => {
          setField(field.name, asset?.id || null);
          setField(relation, asset);
          if (field.name === "featuredImageId") {
            setField("bannerImageId", asset?.id || null);
            setField("bannerImage", asset);
          }
          if (field.name === "imageAssetId" && collection === "programs") {
            setField("bannerAssetId", asset?.id || null);
            setField("bannerAsset", asset);
          }
        }}
        />
        {field.help ? <p className="text-xs text-muted-foreground">{field.help}</p> : null}
      </div>
    );
  }

  if (field.type === "richtext") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <RichTextEditor
          compact={field.compact}
          placeholder={field.placeholder || `Write ${field.label.toLowerCase()}…`}
          value={
            (values[`${field.name}Json`] as JSONContent) ||
            (field.name === "contentHtml"
              ? (values.contentJson as JSONContent)
              : field.name === "detailsHtml"
                ? (values.detailsJson as JSONContent)
                : null) ||
            null
          }
          html={String(values[field.name] || "")}
          onChange={(json, nextHtml) => {
            setField(`${field.name}Json`, json);
            setField(field.name, nextHtml);
          }}
        />
      </div>
    );
  }

  if (field.type === "category") {
    return (
      <CategoryField
        kind={field.categoryKind}
        label={field.label}
        value={String(values[field.name] || "")}
        onChange={(value) => setField(field.name, value)}
      />
    );
  }

  const inputValue =
    field.type === "datetime" ? toDatetimeLocal(values[field.name]) : String(values[field.name] || "");

  return (
    <div className="space-y-2">
      <Label>
        {field.label}
        {field.required ? " *" : ""}
      </Label>
      <Input
        type={field.type === "datetime" ? "datetime-local" : field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
        placeholder={
          field.type === "datetime" ? undefined : field.placeholder || `Enter ${field.label.toLowerCase()}`
        }
        value={inputValue}
        maxLength={field.maxLength}
        onChange={(event) => setField(field.name, event.target.value)}
      />
      {field.help ? <p className="text-xs text-muted-foreground">{field.help}</p> : null}
      <CharCount value={String(values[field.name] || "")} max={field.maxLength} recommended={field.recommendedLength} />
    </div>
  );
}

export function RecordForm({
  collection,
  id,
  fields,
  titleField = "title",
}: {
  collection: string;
  id?: string;
  fields: FormField[];
  titleField?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const mainFields = useMemo(() => fields.filter((field) => field.section !== "sidebar"), [fields]);
  const sidebarFields = useMemo(() => fields.filter((field) => field.section === "sidebar"), [fields]);
  const sidebarGroups = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        fields: sidebarFields.filter((field) => (field.group || "details") === group),
      })).filter((entry) => entry.fields.length > 0),
    [sidebarFields]
  );

  useEffect(() => {
    if (id) return;
    const defaults: Record<string, unknown> = {};
    for (const field of fields) {
      if (field.type === "switch") {
        defaults[field.name] = field.name === "published";
      }
      if (field.type === "select" && field.options[0]) {
        defaults[field.name] = field.options[0].value;
      }
    }
    setValues(defaults);
  }, [fields, id]);

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

  function validate(): string | null {
    for (const field of fields) {
      const value = values[field.name];
      const text = typeof value === "string" ? value.trim() : String(value ?? "").trim();
      if (field.required && !text) return `${field.label} is required`;
      if (field.maxLength && typeof value === "string" && value.length > field.maxLength) {
        return `${field.label} must be ${field.maxLength} characters or fewer`;
      }
    }
    return null;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setSaving(true);
    try {
      const payload = { ...values };
      for (const field of fields) {
        if (field.type === "asset") {
          const asset = values[field.name] as AssetRecord | undefined;
          const idKey = field.name.endsWith("Id") ? field.name : `${field.name}Id`;
          if (asset && typeof asset === "object" && "id" in asset) {
            payload[idKey] = asset.id;
          }
        }
        if (field.type === "richtext") {
          const json = values[`${field.name}Json`] as JSONContent | undefined;
          if (json) payload[field.name] = htmlFromJson(json);
        }
        if (field.type === "datetime") {
          const raw = values[field.name];
          payload[field.name] = raw ? new Date(String(raw)).toISOString() : null;
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
      router.push(
        `/admin/${collection === "posts" ? "news" : collection === "team" ? "team" : collection === "legal" ? "legal" : collection}`
      );
      router.refresh();
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const saveButton = (
    <Button type="submit" disabled={saving} className="bg-[#8B4513] hover:bg-[#6B3410]">
      {saving ? "Saving…" : "Save"}
    </Button>
  );

  return (
    <form onSubmit={onSubmit} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-6">
        {mainFields.map((field) => (
          <FieldControl key={field.name} field={field} values={values} setField={setField} collection={collection} />
        ))}
        {sidebarFields.length === 0 ? saveButton : <div className="lg:hidden">{saveButton}</div>}
      </div>
      {sidebarFields.length > 0 ? (
        <aside className="space-y-4 lg:sticky lg:top-20">
          {sidebarGroups.map((entry) => (
            <Card key={entry.group} className="py-4">
              <CardHeader className="px-4 pb-2">
                <CardTitle className="text-sm font-semibold">{GROUP_LABELS[entry.group]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4">
                {entry.fields.map((field) => (
                  <FieldControl key={field.name} field={field} values={values} setField={setField} collection={collection} />
                ))}
              </CardContent>
            </Card>
          ))}
          {saveButton}
        </aside>
      ) : null}
    </form>
  );
}
