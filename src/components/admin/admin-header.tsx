"use client";

import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const LABELS: Record<string, string> = {
  admin: "Console",
  dashboard: "Dashboard",
  account: "Account",
  assets: "Assets",
  news: "News",
  programs: "Programs",
  categories: "Categories",
  careers: "Careers",
  team: "Team",
  partners: "Partners",
  impact: "Impact",
  legal: "Legal pages",
  faqs: "FAQs",
  inbox: "Inbox",
  identity: "Identity",
  settings: "Settings",
  users: "Users",
  new: "New",
};

function labelFor(segment: string, isLast: boolean) {
  if (LABELS[segment]) return LABELS[segment];
  if (isLast && /^[0-9a-f-]{8,}$/i.test(segment)) return "Edit";
  return segment.replace(/-/g, " ");
}

export function AdminHeader({ name, role }: { name: string; role: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    return { href, label: labelFor(segment, isLast), isLast };
  });

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, index) => (
              <Fragment key={crumb.href}>
                {index > 0 ? (
                  <BreadcrumbSeparator className={index === 1 ? "hidden md:block" : undefined} />
                ) : null}
                <BreadcrumbItem className={index === 0 ? "hidden md:block" : undefined}>
                  {crumb.isLast ? (
                    <BreadcrumbPage className="capitalize">{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href} className="capitalize">
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <p className="hidden text-sm font-medium sm:block">{name}</p>
        <Badge variant="secondary">{role}</Badge>
      </div>
    </header>
  );
}
