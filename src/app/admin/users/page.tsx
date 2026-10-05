"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import { DataTable, sortableHeader, type DataTableCellProps, type DataTableColumn } from "@/components/admin/data-table";

type UserRow = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  role: "ADMIN" | "EDITOR";
  active: boolean;
  requirePasswordReset: boolean;
};

const emptyForm = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  role: "EDITOR" as "ADMIN" | "EDITOR",
};

function toRow(user: Omit<UserRow, "name">): UserRow {
  return { ...user, name: `${user.firstName} ${user.lastName}`.trim() };
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminFetch("/api/admin/users");
      const data = await response.json();
      setUsers(((data.users || []) as Omit<UserRow, "name">[]).map(toRow));
      setCurrentUserId(data.currentUserId || "");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setBusy = useCallback((id: string, busy: boolean) => {
    setBusyIds((current) => {
      const next = new Set(current);
      if (busy) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setCreating(true);
    try {
      const response = await adminFetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Could not create user");
        return;
      }
      if (data.inviteSent) {
        toast.success(`User created. A welcome email was sent to ${data.user.email}.`);
      } else {
        toast.warning("User created, but the welcome email could not be sent. Use Resend invite.");
      }
      setForm(emptyForm);
      await load();
    } catch {
      toast.error("Could not create user");
    } finally {
      setCreating(false);
    }
  }

  const updateUser = useCallback(
    async (user: UserRow, body: Record<string, unknown>, success: string) => {
      setBusy(user.id, true);
      try {
        const response = await adminFetch("/api/admin/users", {
          method: "PATCH",
          body: JSON.stringify({ id: user.id, ...body }),
        });
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error || "Could not update user");
          return;
        }
        setUsers((current) => current.map((row) => (row.id === user.id ? toRow(data.user) : row)));
        toast.success(success);
      } catch {
        toast.error("Could not update user");
      } finally {
        setBusy(user.id, false);
      }
    },
    [setBusy]
  );

  const columns = useMemo<DataTableColumn<UserRow>[]>(
    () => [
      { accessorKey: "name", header: sortableHeader<UserRow>("Name") },
      { accessorKey: "email", header: sortableHeader<UserRow>("Email") },
      {
        accessorKey: "role",
        header: sortableHeader<UserRow>("Role"),
        cell: ({ row }: DataTableCellProps<UserRow>) => <Badge variant="secondary">{row.original.role}</Badge>,
      },
      {
        id: "status",
        header: sortableHeader<UserRow>("Status"),
        accessorFn: (row: UserRow) => (!row.active ? "Inactive" : row.requirePasswordReset ? "Invite pending" : "Active"),
        cell: ({ row }: DataTableCellProps<UserRow>) => {
          const user = row.original;
          if (!user.active) {
            return <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">Inactive</Badge>;
          }
          if (user.requirePasswordReset) {
            return <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-800">Invite pending</Badge>;
          }
          return <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">Active</Badge>;
        },
      },
      {
        id: "actions",
        header: () => <span className="flex justify-end">Access</span>,
        enableSorting: false,
        cell: ({ row }: DataTableCellProps<UserRow>) => {
          const user = row.original;
          const isSelf = user.id === currentUserId;
          const busy = busyIds.has(user.id);
          return (
            <div className="flex items-center justify-end gap-3">
              {user.active && user.requirePasswordReset ? (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={busy}
                  onClick={() => updateUser(user, { resendInvite: true }, `Invite resent to ${user.email}`)}
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  Resend invite
                </Button>
              ) : null}
              <div className="flex items-center gap-2" title={isSelf ? "You cannot deactivate your own account" : undefined}>
                <Switch
                  checked={user.active}
                  disabled={busy || isSelf}
                  aria-label={user.active ? `Deactivate ${user.name}` : `Activate ${user.name}`}
                  onCheckedChange={(checked) =>
                    updateUser(
                      user,
                      { active: checked },
                      checked ? `${user.name} can sign in again` : `${user.name} was deactivated and signed out`
                    )
                  }
                />
                <span className="w-14 text-xs text-muted-foreground">{user.active ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          );
        },
      },
    ],
    [busyIds, currentUserId, updateUser]
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Users</h1>
        <p className="text-muted-foreground">Invite editors and administrators to the console.</p>
      </div>
      <section className="max-w-3xl overflow-hidden rounded-xl border bg-white shadow-sm">
        <header className="border-b bg-stone-50 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">Invite a user</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            They get a welcome email with a link to choose their own password before they sign in.
          </p>
        </header>
        <form onSubmit={onSubmit} className="grid gap-4 px-5 py-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="Amina"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              disabled={creating}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Diallo"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              disabled={creating}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="amina@africanleadershub.org"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={creating}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Temporary password</Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={creating}
              required
            />
            <p className="text-xs text-muted-foreground">
              They must replace it on first sign-in. Use uppercase, lowercase, and a number.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(value) => setForm({ ...form, role: value as "ADMIN" | "EDITOR" })}
              disabled={creating}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EDITOR">Editor</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={creating} className="bg-[#8B4513] hover:bg-[#6B3410]">
              {creating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                "Create user"
              )}
            </Button>
          </div>
        </form>
      </section>
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        searchPlaceholder="Search users by name or email…"
        filterColumn="role"
        filterTitle="Role"
        emptyMessage="No users yet."
      />
    </div>
  );
}
