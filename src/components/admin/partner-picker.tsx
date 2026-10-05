"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetch } from "@/lib/admin-fetch";
import { cn } from "@/lib/utils";

export type PartnerOption = {
  id: string;
  name: string;
  published?: boolean;
  logoAsset?: { url: string; alt?: string | null } | null;
};

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
  const selectedIds = useMemo(() => new Set(value.map((partner) => partner.id)), [value]);

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

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground">{value.length} selected</span>
      </div>
      <Input
        placeholder="Search partners"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="max-h-64 space-y-1 overflow-y-auto rounded-md border p-2">
        {filtered.length === 0 ? (
          <p className="px-2 py-4 text-sm text-muted-foreground">
            {partners.length === 0
              ? "No partners yet. Add them under Partners first."
              : "No matching partners."}
          </p>
        ) : (
          filtered.map((partner) => {
            const selected = selectedIds.has(partner.id);
            return (
              <button
                key={partner.id}
                type="button"
                onClick={() => toggle(partner)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-muted",
                  selected && "bg-[#8B4513]/10"
                )}
              >
                {partner.logoAsset?.url ? (
                  <Image
                    src={partner.logoAsset.url}
                    alt={partner.logoAsset.alt || partner.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded object-contain bg-white"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded border text-[10px] text-muted-foreground">
                    Logo
                  </span>
                )}
                <span className="flex-1">{partner.name}</span>
                {selected ? <span className="text-xs text-[#8B4513]">Selected</span> : null}
              </button>
            );
          })
        )}
      </div>
      {help ? <p className="text-xs text-muted-foreground">{help}</p> : null}
    </div>
  );
}
