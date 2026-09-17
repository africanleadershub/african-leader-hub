"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";

type UserRow = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "EDITOR";
  active: boolean;
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "EDITOR" as "ADMIN" | "EDITOR",
  });

  async function load() {
    const response = await adminFetch("/api/admin/users");
    const data = await response.json();
    setUsers(data.users || []);
  }

  useEffect(() => {
    void load();
  }, []);

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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Users</h1>
      <form onSubmit={onSubmit} className="grid max-w-3xl gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label>First name</Label>
          <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label>Last name</Label>
          <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <select
            className="flex h-10 w-full rounded-md border px-3 text-sm"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as "ADMIN" | "EDITOR" })}
          >
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button className="bg-[#8B4513] hover:bg-[#6B3410]">Create user</Button>
        </div>
      </form>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.active ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
