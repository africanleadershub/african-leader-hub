"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticateBrowserPasskey } from "@/lib/auth/browser-passkeys";
import { toast } from "sonner";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/dashboard";

  function continueTo(path: string) {
    router.push(path);
    router.refresh();
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Invalid email or password");
        return;
      }
      if (data.requiresTwoFactor && data.challengeId) {
        const params = new URLSearchParams({
          challengeId: data.challengeId,
          purpose: "login",
          redirect,
        });
        continueTo(`/confirm-otp?${params.toString()}`);
        return;
      }
      toast.success("Welcome back");
      continueTo(data.redirectTo || redirect);
    } catch {
      toast.error("Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  async function signInWithPasskey() {
    setLoading(true);
    try {
      const optionsResponse = await fetch("/api/auth/passkey/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email ? { email } : {}),
      });
      const optionsData = await optionsResponse.json();
      if (!optionsResponse.ok) {
        toast.error(optionsData.error || "Could not start passkey sign-in");
        return;
      }
      const credential = await authenticateBrowserPasskey(optionsData.options);
      const verifyResponse = await fetch("/api/auth/passkey/login", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      const data = await verifyResponse.json();
      if (!verifyResponse.ok) {
        toast.error(data.error || "Passkey sign-in failed");
        return;
      }
      toast.success("Welcome back");
      continueTo(data.redirectTo || redirect);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Passkey sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to the African Leaders Hub console."
      footer={
        <Link href="/" className="text-[#8B4513] hover:underline">
          Back to the public site
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-[#8B4513] hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <Button className="w-full bg-[#8B4513] hover:bg-[#6B3410]" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={loading}
        onClick={() => void signInWithPasskey()}
      >
        <KeyRound className="h-4 w-4" />
        Continue with a passkey
      </Button>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
