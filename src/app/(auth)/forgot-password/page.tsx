"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Could not send a reset code");
        return;
      }
      toast.success("If an account exists, we sent a verification code.");
      if (data.challengeId) {
        router.push(`/confirm-otp?challengeId=${data.challengeId}&purpose=reset`);
      }
    } catch {
      toast.error("Unable to send a reset code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Forgot password"
      description="Enter your staff email and we will send a one-time confirmation code."
      footer={
        <Link href="/login" className="text-[#8B4513] hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <Button className="w-full bg-[#8B4513] hover:bg-[#6B3410]" disabled={loading}>
          {loading ? "Sending…" : "Send confirmation code"}
        </Button>
      </form>
    </AuthShell>
  );
}
