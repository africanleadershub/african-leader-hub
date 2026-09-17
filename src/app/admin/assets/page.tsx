"use client";

import { AssetSelector } from "@/components/admin/asset-selector";

export default function AdminAssetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Assets</h1>
        <p className="text-muted-foreground">Upload files and images, then reuse them anywhere in the site.</p>
      </div>
      <AssetSelector
        kind="ALL"
        trigger={undefined}
        onSelect={() => undefined}
      />
      <p className="text-sm text-muted-foreground">
        Open the library with the button above to search, upload, and inspect media. Content forms also use this selector.
      </p>
    </div>
  );
}
