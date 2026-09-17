"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import { DataTable, sortableHeader, type DataTableCellProps, type DataTableColumn } from "@/components/admin/data-table";

const TABS = [
  { id: "contacts", label: "Contact" },
  { id: "volunteers", label: "Volunteers" },
  { id: "partnerships", label: "Partnerships" },
  { id: "donations", label: "Donations" },
  { id: "applications", label: "Job applications" },
  { id: "subscribers", label: "Subscribers" },
] as const;

type InboxTab = (typeof TABS)[number]["id"];

type InboxRow = {
  id: string;
  from: string;
  name: string;
  details: string;
  status: string;
  received: string;
  documents: { label: string; url: string; name?: string }[];
};

function inboxRow(row: Record<string, unknown>): InboxRow {
  const received = row.createdAt || row.subscribedAt;
  const career = row.career as { title?: string } | undefined;
  const documents = Array.isArray(row.documents)
    ? (row.documents as { label: string; url: string; name?: string }[])
    : [];
  return {
    id: String(row.id ?? ""),
    from: String(row.email || row.contactEmail || ""),
    name: `${String(row.firstName || row.contactName || row.orgName || "")} ${String(row.lastName || "")}`.trim(),
    details: String(
      career?.title ||
        row.subject ||
        row.interest ||
        row.partnershipInterest ||
        row.amount ||
        row.additionalInfo ||
        row.source ||
        ""
    ),
    status: String(row.status || (row.isActive ? "active" : "inactive")),
    received: received ? new Date(String(received)).toLocaleDateString() : "",
    documents,
  };
}

export default function InboxPage() {
  const [tab, setTab] = useState<InboxTab>("contacts");
  const [items, setItems] = useState<InboxRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (type = tab) => {
    setLoading(true);
    const response = await adminFetch(`/api/admin/inbox?type=${type}`);
    const data = await response.json();
    setItems(((data.items || []) as Record<string, unknown>[]).map(inboxRow));
    setLoading(false);
  }, [tab]);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = useCallback(
    async (id: string, status: string) => {
      const response = await adminFetch("/api/admin/inbox", {
        method: "PATCH",
        body: JSON.stringify({ type: tab, id, status }),
      });
      if (!response.ok) {
        toast.error("Update failed");
        return;
      }
      toast.success("Updated");
      await load();
    },
    [load, tab]
  );

  const columns = useMemo<DataTableColumn<InboxRow>[]>(
    () => [
      {
        accessorKey: "from",
        header: sortableHeader<InboxRow>("From"),
        cell: ({ row }: DataTableCellProps<InboxRow>) => (
          <div>
            <p>{row.original.from}</p>
            <p className="text-xs text-muted-foreground">{row.original.name}</p>
          </div>
        ),
      },
      {
        accessorKey: "details",
        header: sortableHeader<InboxRow>("Details"),
        cell: ({ row }: DataTableCellProps<InboxRow>) => (
          <div className="max-w-md">
            <p className="truncate">{row.original.details}</p>
            {row.original.documents.length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {row.original.documents.map((doc) => (
                  <a
                    key={`${doc.label}-${doc.url}`}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-[#8B4513] hover:underline"
                  >
                    {doc.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: sortableHeader<InboxRow>("Status"),
        cell: ({ row }: DataTableCellProps<InboxRow>) => <Badge variant="secondary">{row.original.status}</Badge>,
      },
      {
        accessorKey: "received",
        header: sortableHeader<InboxRow>("Received"),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }: DataTableCellProps<InboxRow>) =>
          tab === "subscribers" ? null : (
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => void setStatus(row.original.id, "IN_REVIEW")}>
                Review
              </Button>
              <Button size="sm" variant="outline" onClick={() => void setStatus(row.original.id, "ACCEPTED")}>
                Accept
              </Button>
            </div>
          ),
      },
    ],
    [setStatus, tab]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Inbox</h1>
        <p className="text-muted-foreground">Applications, inquiries, and newsletter subscribers.</p>
      </div>
      <Tabs value={tab} onValueChange={(value) => setTab(value as InboxTab)}>
        <TabsList className="flex flex-wrap">
          {TABS.map((item) => (
            <TabsTrigger key={item.id} value={item.id}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((item) => (
          <TabsContent key={item.id} value={item.id}>
            <DataTable
              columns={columns}
              data={items}
              loading={loading}
              searchPlaceholder={`Search ${item.label.toLowerCase()}…`}
              filterColumn="status"
              filterTitle="Status"
              emptyMessage="No items in this inbox."
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
