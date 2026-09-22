import { redirect } from "next/navigation";
import { getCurrentUser, displayName } from "@/lib/auth/current-user";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.requirePasswordReset) redirect("/change-password");

  return (
    <SidebarProvider>
      <AdminSidebar role={user.role} name={displayName(user)} email={user.email} />
      <SidebarInset>
        <AdminHeader name={displayName(user)} role={user.role} />
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
