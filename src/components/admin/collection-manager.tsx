"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import { DataTable, sortableHeader, type DataTableCellProps, type DataTableColumn } from "@/components/admin/data-table";

type Column = { key: string; label: string };

export function CollectionManager({
  collection,
  title,
  columns,
  createHref,
}: {
  collection: string;
  title: string;
  columns: Column[];
  createHref?: string;
}) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const response = await adminFetch(`/api/admin/collections/${collection}`);
    const data = await response.json();
    setItems(data.items || []);
    setLoading(false);
  }, [collection]);

  useEffect(() => {
    void load();
  }, [load]);

  const remove = useCallback(
    async (id: string) => {
      if (!confirm("Delete this item?")) return;
      const response = await adminFetch(`/api/admin/collections/${collection}?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Delete failed");
        return;
      }
      toast.success("Deleted");
      await load();
    },
    [collection, load]
  );

  const tableColumns = useMemo<DataTableColumn<Record<string, unknown>>[]>(
    () => [
      ...columns.map(
        (column): DataTableColumn<Record<string, unknown>> => ({
          accessorKey: column.key,
          header: sortableHeader<Record<string, unknown>>(column.label),
          cell: ({ row }: DataTableCellProps<Record<string, unknown>>) => {
            const value = row.original[column.key];
            if (column.key === "status" || column.key === "published") {
              return <Badge variant="secondary">{String(value ?? "")}</Badge>;
            }
            return <span>{String(value ?? "")}</span>;
          },
        })
      ),
      {
        id: "actions",
        header: () => <span className="flex justify-end">Actions</span>,
        enableSorting: false,
        cell: ({ row }: DataTableCellProps<Record<string, unknown>>) => (
          <div className="flex justify-end gap-2">
            {createHref ? (
              <Button asChild size="sm" variant="outline">
                <Link href={`${createHref.replace(/\/new$/, "")}/${String(row.original.id)}`}>Edit</Link>
              </Button>
            ) : null}
            <Button size="sm" variant="ghost" onClick={() => void remove(String(row.original.id))}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [columns, createHref, remove]
  );

  const filterColumn = columns.find((column) =>
    ["status", "published", "category"].includes(column.key)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{items.length} records</p>
        </div>
        {createHref ? (
          <Button asChild className="bg-[#8B4513] hover:bg-[#6B3410]">
            <Link href={createHref}>New</Link>
          </Button>
        ) : null}
      </div>
      <DataTable
        columns={tableColumns}
        data={items}
        loading={loading}
        searchPlaceholder={`Search ${title.toLowerCase()}…`}
        filterColumn={filterColumn?.key}
        filterTitle={filterColumn?.label ?? "Filter"}
        emptyMessage={`No ${title.toLowerCase()} yet.`}
      />
    </div>
  );
}
