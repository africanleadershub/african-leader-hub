"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { OtpField } from "@/components/auth/otp-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function ConfirmOtpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const challengeId = searchParams.get("challengeId") || "";
  const purpose = searchParams.get("purpose") === "reset" ? "reset" : "login";
  const redirect = searchParams.get("redirect") || "/admin/dashboard";
  const [code, setCode] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [useBackup, setUseBackup] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = (useBackup ? backupCode : code).trim();
    if (!challengeId) {
      toast.error("This confirmation link is missing a challenge. Start again.");
      return;
    }
    if (value.length < 6) {
      toast.error("Enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        purpose === "reset" ? "/api/auth/forgot-password/verify" : "/api/auth/otp/verify";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, code: value }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Invalid verification code");
        return;
      }

      if (purpose === "reset") {
        toast.success("Code confirmed. Choose a new password.");
        router.push(data.redirectTo || `/reset-password?token=${data.resetToken}`);
        return;
      }

      toast.success("Welcome back");
      router.push(data.redirectTo || redirect);
      router.refresh();
    } catch {
      toast.error("Unable to confirm this code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title={purpose === "reset" ? "Confirm reset code" : "Confirm sign-in"}
      description={
        purpose === "reset"
          ? "Enter the 6-digit code we sent to your email."
          : "Enter the code from your authenticator app, or a backup code."
      }
      footer={
        <Link href={purpose === "reset" ? "/forgot-password" : "/login"} className="text-[#8B4513] hover:underline">
          Start over
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {useBackup && purpose === "login" ? (
          <div className="space-y-2">
            <Label htmlFor="backup">Backup code</Label>
            <Input
              id="backup"
              value={backupCode}
              onChange={(event) => setBackupCode(event.target.value.toUpperCase())}
              placeholder="XXXXXXXXXX"
              autoComplete="one-time-code"
            />
          </div>
        ) : (
          <OtpField value={code} onChange={setCode} disabled={loading} />
        )}
        {purpose === "login" ? (
          <button
            type="button"
            className="text-sm font-medium text-[#8B4513] hover:underline"
            onClick={() => setUseBackup((value) => !value)}
          >
            {useBackup ? "Use authenticator code" : "Use a backup code"}
          </button>
        ) : null}
        <Button className="w-full bg-[#8B4513] hover:bg-[#6B3410]" disabled={loading}>
          {loading ? "Confirming…" : "Confirm"}
        </Button>
      </form>
    </AuthShell>
  );
}

export default function ConfirmOtpPage() {
  return (
    <Suspense>
      <ConfirmOtpForm />
    </Suspense>
  );
}
