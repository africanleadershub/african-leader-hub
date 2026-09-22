"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminFetch } from "@/lib/admin-fetch";

const CARDS = [
  { key: "inbox", label: "New inbox items", href: "/admin/inbox" },
  { key: "posts", label: "News posts", href: "/admin/news" },
  { key: "programs", label: "Programs", href: "/admin/programs" },
  { key: "careers", label: "Open careers", href: "/admin/careers" },
  { key: "team", label: "Active team", href: "/admin/team" },
  { key: "assets", label: "Assets", href: "/admin/assets" },
  { key: "subscribers", label: "Subscribers", href: "/admin/inbox?tab=subscribers" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    adminFetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data.stats || {}))
      .catch(() => undefined);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Manage content, applications, and site settings.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map((card) => (
          <Link key={card.key} href={card.href}>
            <Card className="transition hover:border-[#8B4513]">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{stats[card.key] ?? "—"}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
