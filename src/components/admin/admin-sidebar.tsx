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
  CircleUser,
  LogOut,
  GalleryVerticalEnd,
  Tags,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/lib/rbac";
import { adminFetch } from "@/lib/admin-fetch";

type NavItem = {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
  admin?: boolean;
};

type NavGroup = {
  title: string;
  admin?: boolean;
  items: NavItem[];
};

const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { title: "Account", href: "/admin/account", icon: CircleUser },
    ],
  },
  {
    title: "Content",
    items: [
      { title: "News", href: "/admin/news", icon: Newspaper },
      { title: "News categories", href: "/admin/news/categories", icon: Tags },
      { title: "Programs", href: "/admin/programs", icon: GraduationCap },
      { title: "Program categories", href: "/admin/programs/categories", icon: Tags },
      { title: "Careers", href: "/admin/careers", icon: Briefcase },
      { title: "Team", href: "/admin/team", icon: Users },
      { title: "Partners", href: "/admin/partners", icon: Handshake },
      { title: "Impact", href: "/admin/impact", icon: BarChart3 },
      { title: "Legal pages", href: "/admin/legal", icon: FileText },
      { title: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    ],
  },
  {
    title: "Library",
    items: [{ title: "Assets", href: "/admin/assets", icon: Images }],
  },
  {
    title: "Engagement",
    items: [{ title: "Inbox", href: "/admin/inbox", icon: Inbox }],
  },
  {
    title: "Administration",
    admin: true,
    items: [
      { title: "Identity", href: "/admin/identity", icon: IdCard, admin: true },
      { title: "Settings", href: "/admin/settings", icon: Settings, admin: true },
      { title: "Users", href: "/admin/users", icon: UserCog, admin: true },
    ],
  },
];

export function AdminSidebar({
  role,
  name,
  email,
}: {
  role: UserRole;
  name: string;
  email: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const groups = NAV.filter((group) => !group.admin || role === "ADMIN").map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.admin || role === "ADMIN"),
  }));

  async function logout() {
    await adminFetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#8B4513] text-white">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">African Leaders Hub</span>
                  <span className="text-xs">Console</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {groups.map((group) => (
              <SidebarMenuItem key={group.title}>
                <SidebarMenuButton className="font-medium" tooltip={group.title}>
                  {group.title}
                </SidebarMenuButton>
                {group.items.length ? (
                  <SidebarMenuSub>
                    {group.items.map((item) => {
                      const nested = pathname.startsWith(`${item.href}/`);
                      const isCategoryChild =
                        (item.href === "/admin/news" || item.href === "/admin/programs") &&
                        pathname.startsWith(`${item.href}/categories`);
                      const active = pathname === item.href || (nested && !isCategoryChild);
                      return (
                        <SidebarMenuSubItem key={item.href}>
                          <SidebarMenuSubButton asChild isActive={active}>
                            <Link href={item.href}>
                              <item.icon className="size-4" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium">{name}</span>
            <span className="truncate text-xs text-muted-foreground">{email}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => void logout()} aria-label="Sign out">
            <LogOut className="size-4" />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
