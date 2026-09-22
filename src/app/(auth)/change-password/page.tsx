"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await adminFetch("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Could not update password");
        return;
      }
      toast.success("Password updated");
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      toast.error("Unable to update password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Change password"
      description="Choose a new password before continuing to the console."
      footer={
        <Link href="/login" className="text-[#8B4513] hover:underline">
          Use a different account
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current">Current password</Label>
          <Input
            id="current"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new">New password</Label>
          <Input
            id="new"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            minLength={8}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm new password</Label>
          <Input
            id="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter the new password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            minLength={8}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Use at least 8 characters with uppercase, lowercase, and a number.
        </p>
        <Button className="w-full bg-[#8B4513] hover:bg-[#6B3410]" disabled={loading}>
          {loading ? "Saving…" : "Save password"}
        </Button>
      </form>
    </AuthShell>
  );
}
