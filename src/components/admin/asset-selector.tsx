"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon, Loader2, Search, Upload, Check } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type AssetRecord = {
  id: string;
  url: string;
  title: string | null;
  alt: string | null;
  kind: "IMAGE" | "FILE";
  mimeType: string | null;
  originalFilename: string | null;
};

type AssetSelectorProps = {
  onSelect: (asset: AssetRecord) => void;
  kind?: "IMAGE" | "FILE" | "ALL";
  trigger?: React.ReactNode;
};

export function AssetSelector({
  onSelect,
  kind = "IMAGE",
  trigger,
}: AssetSelectorProps) {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<AssetRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadAssets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: "48",
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
    if (open) void loadAssets();
  }, [open, loadAssets]);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button type="button" variant="outline" size="sm">
            <ImageIcon className="mr-2 h-4 w-4" />
            Media
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Asset library</DialogTitle>
          <DialogDescription>Upload or reuse files and images across the site.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assets"
                className="pl-9"
              />
            </div>
            <Button type="button" variant="outline" onClick={() => void loadAssets()}>
              Refresh
            </Button>
          </div>
          <div
            {...getRootProps()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-sm text-muted-foreground",
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
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-4">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  className="group relative overflow-hidden rounded-lg border text-left"
                  onClick={() => {
                    onSelect(asset);
                    setOpen(false);
                  }}
                >
                  {asset.kind === "IMAGE" ? (
                    <Image
                      src={asset.url}
                      alt={asset.alt || asset.title || "Asset"}
                      width={240}
                      height={160}
                      className="h-28 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-28 items-center justify-center bg-muted p-3 text-xs">
                      {asset.originalFilename || asset.title || "File"}
                    </div>
                  )}
                  <div className="truncate p-2 text-xs">{asset.title || asset.originalFilename || "Untitled"}</div>
                  <span className="absolute right-2 top-2 hidden rounded-full bg-black/70 p-1 text-white group-hover:block">
                    <Check className="h-3 w-3" />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AssetField({
  label,
  value,
  onChange,
  kind = "IMAGE",
}: {
  label: string;
  value?: AssetRecord | null;
  onChange: (asset: AssetRecord | null) => void;
  kind?: "IMAGE" | "FILE" | "ALL";
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        {value?.kind === "IMAGE" && value.url ? (
          <Image src={value.url} alt={value.alt || ""} width={64} height={64} className="h-16 w-16 rounded object-cover" />
        ) : value ? (
          <Badge variant="secondary">{value.originalFilename || value.title}</Badge>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded border text-xs text-muted-foreground">
            None
          </div>
        )}
        <AssetSelector kind={kind} onSelect={onChange} />
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
