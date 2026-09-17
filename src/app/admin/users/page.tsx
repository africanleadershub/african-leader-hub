"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "EDITOR" as "ADMIN" | "EDITOR",
  });

  const load = useCallback(async () => {
    setLoading(true);
    const response = await adminFetch("/api/admin/users");
    const data = await response.json();
    setUsers(
      ((data.users || []) as Omit<UserRow, "name">[]).map((user) => ({
        ...user,
        name: `${user.firstName} ${user.lastName}`.trim(),
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await adminFetch("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Could not create user");
      return;
    }
    toast.success("User created");
    setForm({ email: "", firstName: "", lastName: "", password: "", role: "EDITOR" });
    await load();
  }

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
        accessorKey: "active",
        header: sortableHeader<UserRow>("Active"),
        accessorFn: (row: UserRow) => (row.active ? "Yes" : "No"),
      },
    ],
    []
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Users</h1>
        <p className="text-muted-foreground">Invite editors and administrators to the console.</p>
      </div>
      <form onSubmit={onSubmit} className="grid max-w-3xl gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            placeholder="Amina"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
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
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Select
            value={form.role}
            onValueChange={(value) => setForm({ ...form, role: value as "ADMIN" | "EDITOR" })}
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
          <Button className="bg-[#8B4513] hover:bg-[#6B3410]">Create user</Button>
        </div>
      </form>
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
