"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";

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

  async function remove(id: string) {
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
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{items.length} records</p>
        </div>
        {createHref && (
          <Button asChild className="bg-[#8B4513] hover:bg-[#6B3410]">
            <Link href={createHref}>New</Link>
          </Button>
        )}
      </div>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>Loading…</TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>No records yet.</TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={String(item.id)}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.key === "status" || column.key === "published" ? (
                        <Badge variant="secondary">{String(item[column.key])}</Badge>
                      ) : (
                        String(item[column.key] ?? "")
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right space-x-2">
                    {createHref && (
                      <Button asChild size="sm" variant="outline">
                        <Link href={`${createHref.replace(/\/new$/, "")}/${item.id}`}>Edit</Link>
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => void remove(String(item.id))}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
