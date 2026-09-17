"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";

const TABS = [
  { id: "contacts", label: "Contact" },
  { id: "volunteers", label: "Volunteers" },
  { id: "partnerships", label: "Partnerships" },
  { id: "donations", label: "Donations" },
  { id: "applications", label: "Job applications" },
  { id: "subscribers", label: "Subscribers" },
] as const;

export default function InboxPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("contacts");
  const [items, setItems] = useState<Record<string, unknown>[]>([]);

  async function load(type = tab) {
    const response = await adminFetch(`/api/admin/inbox?type=${type}`);
    const data = await response.json();
    setItems(data.items || []);
  }

  useEffect(() => {
    void load(tab);
  }, [tab]);

  async function setStatus(id: string, status: string) {
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
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Inbox</h1>
        <p className="text-muted-foreground">Applications, inquiries, and newsletter subscribers.</p>
      </div>
      <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)}>
        <TabsList className="flex flex-wrap">
          {TABS.map((item) => (
            <TabsTrigger key={item.id} value={item.id}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((item) => (
          <TabsContent key={item.id} value={item.id}>
            <div className="rounded-lg border bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((row) => (
                    <TableRow key={String(row.id)}>
                      <TableCell>
                        {String(row.email || row.contactEmail || "")}
                        <div className="text-xs text-muted-foreground">
                          {String(row.firstName || row.contactName || row.orgName || "")} {String(row.lastName || "")}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md truncate text-sm">
                        {String(row.subject || row.interest || row.partnershipInterest || row.amount || row.coverLetter || row.source || "")}
                      </TableCell>
                      <TableCell>{String(row.status || (row.isActive ? "active" : "inactive"))}</TableCell>
                      <TableCell>{row.createdAt ? new Date(String(row.createdAt)).toLocaleDateString() : ""}</TableCell>
                      <TableCell className="space-x-2">
                        {tab !== "subscribers" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => void setStatus(String(row.id), "IN_REVIEW")}>
                              Review
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => void setStatus(String(row.id), "ACCEPTED")}>
                              Accept
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
