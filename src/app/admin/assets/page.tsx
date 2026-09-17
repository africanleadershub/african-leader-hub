"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { LayoutGrid, List, Loader2, Search, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DataTable, sortableHeader, type DataTableCellProps, type DataTableColumn } from "@/components/admin/data-table";
import type { AssetRecord } from "@/components/admin/asset-selector";

type AssetKindFilter = "ALL" | "IMAGE" | "FILE";
type ViewMode = "list" | "card";

type AssetRow = AssetRecord & {
  createdAt?: string;
  bytes?: number | null;
};

function formatBytes(bytes?: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminAssetsPage() {
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<AssetKindFilter>("ALL");
  const [view, setView] = useState<ViewMode>("card");

  const loadAssets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: "96",
        ...(kind !== "ALL" ? { kind } : {}),
        ...(search ? { search } : {}),
      });
      const response = await adminFetch(`/api/admin/assets?${params}`);
      const data = await response.json();
      if (response.ok) setAssets(data.assets ?? []);
    } catch {
      toast.error("Failed to load assets");
    } finally {
      setLoading(false);
    }
  }, [kind, search]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadAssets();
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [loadAssets]);

  const onDrop = useCallback(
    async (files: File[]) => {
      if (!files.length) return;
      setUploading(true);
      try {
        const form = new FormData();
        files.forEach((file) => form.append("files", file));
        form.append("folder", "african-leaders-hub");
        const response = await adminFetch("/api/admin/assets", {
          method: "POST",
          body: form,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Upload failed");
        toast.success(`${data.assets.length} file(s) uploaded`);
        await loadAssets();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [loadAssets]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const remove = useCallback(
    async (id: string) => {
      if (!confirm("Delete this asset?")) return;
      const response = await adminFetch(`/api/admin/assets/${id}`, { method: "DELETE" });
      if (!response.ok) {
        toast.error("Delete failed");
        return;
      }
      toast.success("Asset deleted");
      await loadAssets();
    },
    [loadAssets]
  );

  const columns = useMemo<DataTableColumn<AssetRow>[]>(
    () => [
      {
        accessorKey: "title",
        header: sortableHeader<AssetRow>("File"),
        cell: ({ row }: DataTableCellProps<AssetRow>) => (
          <div className="flex items-center gap-3">
            {row.original.kind === "IMAGE" ? (
              <Image
                src={row.original.url}
                alt={row.original.alt || row.original.title || "Asset"}
                width={48}
                height={48}
                className="size-12 rounded object-cover"
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded border text-[10px]">File</div>
            )}
            <div className="min-w-0">
              <p className="truncate font-medium">{row.original.title || row.original.originalFilename || "Untitled"}</p>
              <p className="truncate text-xs text-muted-foreground">{row.original.originalFilename}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "kind",
        header: sortableHeader<AssetRow>("Type"),
        cell: ({ row }: DataTableCellProps<AssetRow>) => <Badge variant="secondary">{row.original.kind}</Badge>,
      },
      {
        accessorKey: "mimeType",
        header: sortableHeader<AssetRow>("Format"),
        cell: ({ row }: DataTableCellProps<AssetRow>) => row.original.mimeType || "—",
      },
      {
        id: "size",
        accessorFn: (row: AssetRow) => row.bytes ?? 0,
        header: sortableHeader<AssetRow>("Size"),
        cell: ({ row }: DataTableCellProps<AssetRow>) => formatBytes(row.original.bytes),
      },
      {
        id: "actions",
        enableSorting: false,
        header: () => <span className="flex justify-end">Actions</span>,
        cell: ({ row }: DataTableCellProps<AssetRow>) => (
          <div className="flex justify-end">
            <Button size="sm" variant="ghost" onClick={() => void remove(row.original.id)}>
              <Trash2 className="mr-1 size-4" />
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [remove]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Assets</h1>
        <p className="text-muted-foreground">
          Upload files and images, then reuse them anywhere in the site.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-8 text-sm text-muted-foreground",
          isDragActive && "border-[#8B4513] bg-amber-50"
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Upload className="mb-2 h-5 w-5" />
            Drop files here or click to upload
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, filename, or alt text…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={kind} onValueChange={(value) => setKind(value as AssetKindFilter)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All types</SelectItem>
              <SelectItem value="IMAGE">Images</SelectItem>
              <SelectItem value="FILE">Files</SelectItem>
            </SelectContent>
          </Select>
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value) => {
              if (value === "list" || value === "card") setView(value);
            }}
            variant="outline"
          >
            <ToggleGroupItem value="card" aria-label="Card view">
              <LayoutGrid className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button type="button" variant="outline" onClick={() => void loadAssets()}>
            Refresh
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <DataTable
          columns={columns}
          data={assets}
          loading={loading}
          showToolbar={false}
          emptyMessage="No assets uploaded yet."
        />
      ) : loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : assets.length === 0 ? (
        <p className="rounded-lg border bg-card py-16 text-center text-sm text-muted-foreground">
          No assets uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {assets.map((asset) => (
            <div key={asset.id} className="group overflow-hidden rounded-lg border bg-card">
              {asset.kind === "IMAGE" ? (
                <Image
                  src={asset.url}
                  alt={asset.alt || asset.title || "Asset"}
                  width={320}
                  height={220}
                  className="h-36 w-full object-cover"
                />
              ) : (
                <div className="flex h-36 items-center justify-center bg-muted p-3 text-xs">
                  {asset.originalFilename || asset.title || "File"}
                </div>
              )}
              <div className="flex items-start justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {asset.title || asset.originalFilename || "Untitled"}
                  </p>
                  <p className="text-xs text-muted-foreground">{asset.kind}</p>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="size-8 opacity-70 group-hover:opacity-100"
                  onClick={() => void remove(asset.id)}
                  aria-label="Delete asset"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
