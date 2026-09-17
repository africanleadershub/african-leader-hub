"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  Newspaper,
  Briefcase,
  GraduationCap,
  Users,
  Handshake,
  BarChart3,
  FileText,
  HelpCircle,
  Inbox,
  Settings,
  IdCard,
  UserCog,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/lib/rbac";
import { adminFetch } from "@/lib/admin-fetch";

const NAV = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Assets", href: "/admin/assets", icon: Images },
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Programs", href: "/admin/programs", icon: GraduationCap },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
  { name: "Team", href: "/admin/team", icon: Users },
  { name: "Partners", href: "/admin/partners", icon: Handshake },
  { name: "Impact", href: "/admin/impact", icon: BarChart3 },
  { name: "Legal pages", href: "/admin/legal", icon: FileText },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "Inbox", href: "/admin/inbox", icon: Inbox },
  { name: "Identity", href: "/admin/identity", icon: IdCard, admin: true },
  { name: "Settings", href: "/admin/settings", icon: Settings, admin: true },
  { name: "Users", href: "/admin/users", icon: UserCog, admin: true },
];

export function AdminSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const items = NAV.filter((item) => !item.admin || role === "ADMIN");

  async function logout() {
    await adminFetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-white lg:flex lg:flex-col">
      <div className="border-b px-5 py-5">
        <p className="text-xs uppercase tracking-wide text-[#8B4513]">Console</p>
        <p className="font-semibold">African Leaders Hub</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-[#8B4513] text-white"
                  : "text-gray-700 hover:bg-amber-50 hover:text-[#8B4513]"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3">
        <Button variant="ghost" className="w-full justify-start" onClick={() => void logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
