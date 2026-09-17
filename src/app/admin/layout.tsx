import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, displayName } from "@/lib/auth/current-user";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.requirePasswordReset) redirect("/change-password");

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminSidebar role={user.role} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white/90 px-6 py-4 backdrop-blur">
          <Link href="/admin/account" className="hover:text-[#8B4513]">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="font-medium">{displayName(user)}</p>
          </Link>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-[#8B4513]">
            {user.role}
          </span>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
