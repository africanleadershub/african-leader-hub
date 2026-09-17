"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { KeyRound, MonitorSmartphone, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { adminFetch } from "@/lib/admin-fetch";
import { registerBrowserPasskey } from "@/lib/auth/browser-passkeys";
import { toast } from "sonner";

type AccountUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "EDITOR";
  totpEnabled: boolean;
  lastLogin: string | null;
  createdAt: string;
  passkeyCount: number;
};

type Passkey = {
  id: string;
  name: string | null;
  deviceType: string | null;
  backedUp: boolean;
  createdAt: string;
  lastUsedAt: string | null;
};

type SessionRow = {
  id: string;
  ipAddress: string | null;
  userAgent: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  lastActivity: string;
  createdAt: string;
  current: boolean;
};

export default function AccountPage() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passkeys, setPasskeys] = useState<Passkey[]>([]);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [setup, setSetup] = useState<{ secret: string; qrDataUrl: string } | null>(null);
  const [setupCode, setSetupCode] = useState("");
  const [disableCode, setDisableCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const [accountRes, passkeyRes, sessionRes] = await Promise.all([
      adminFetch("/api/admin/account"),
      adminFetch("/api/auth/passkey"),
      adminFetch("/api/admin/account/sessions"),
    ]);
    const account = await accountRes.json();
    const passkeyData = await passkeyRes.json();
    const sessionData = await sessionRes.json();
    if (account.user) {
      setUser(account.user);
      setFirstName(account.user.firstName);
      setLastName(account.user.lastName);
    }
    setPasskeys(passkeyData.passkeys || []);
    setSessions(sessionData.sessions || []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    const response = await adminFetch("/api/admin/account", {
      method: "PATCH",
      body: JSON.stringify({ firstName, lastName }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Could not update profile");
      return;
    }
    toast.success("Profile updated");
    await load();
  }

  async function savePassword(event: FormEvent) {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
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
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  async function startTwoFactor() {
    setLoading(true);
    try {
      const response = await adminFetch("/api/auth/2fa", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Could not start authenticator setup");
        return;
      }
      setSetup({ secret: data.secret, qrDataUrl: data.qrDataUrl });
      setSetupCode("");
    } finally {
      setLoading(false);
    }
  }

  async function confirmTwoFactor(event: FormEvent) {
    event.preventDefault();
    const response = await adminFetch("/api/auth/2fa", {
      method: "PUT",
      body: JSON.stringify({ code: setupCode }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Invalid authenticator code");
      return;
    }
    setSetup(null);
    setBackupCodes(data.backupCodes || []);
    toast.success("Authenticator enabled");
    await load();
  }

  async function disableTwoFactor(event: FormEvent) {
    event.preventDefault();
    const response = await adminFetch("/api/auth/2fa", {
      method: "DELETE",
      body: JSON.stringify({ code: disableCode }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Could not disable authenticator");
      return;
    }
    setDisableCode("");
    toast.success("Authenticator disabled");
    await load();
  }

  async function addPasskey() {
    setLoading(true);
    try {
      const optionsResponse = await adminFetch("/api/auth/passkey", { method: "POST" });
      const optionsData = await optionsResponse.json();
      if (!optionsResponse.ok) {
        toast.error(optionsData.error || "Could not start passkey registration");
        return;
      }
      const credential = await registerBrowserPasskey(optionsData.options);
      const name = window.prompt("Name this passkey", "My passkey") || "Passkey";
      const verifyResponse = await adminFetch("/api/auth/passkey", {
        method: "PUT",
        body: JSON.stringify({ credential, name }),
      });
      const data = await verifyResponse.json();
      if (!verifyResponse.ok) {
        toast.error(data.error || "Could not save this passkey");
        return;
      }
      toast.success("Passkey added");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add passkey");
    } finally {
      setLoading(false);
    }
  }

  async function removePasskey(id: string) {
    const response = await adminFetch(`/api/auth/passkey?id=${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Could not remove passkey");
      return;
    }
    toast.success("Passkey removed");
    await load();
  }

  async function closeSession(id: string) {
    const response = await adminFetch(`/api/admin/account/sessions?id=${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Could not close session");
      return;
    }
    if (data.signedOut) {
      window.location.href = "/login";
      return;
    }
    toast.success("Session closed");
    await load();
  }

  async function closeOtherSessions() {
    const response = await adminFetch("/api/admin/account/sessions", { method: "POST" });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Could not close other sessions");
      return;
    }
    toast.success("Other sessions closed");
    await load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Account</h1>
        <p className="text-muted-foreground">
          Manage your profile, password, two-factor authentication, passkeys, and active sessions.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your name is shown in the admin console.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Ada" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Okonkwo" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email || ""} disabled />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{user?.role || "—"}</Badge>
                {user?.lastLogin ? (
                  <p className="text-xs text-muted-foreground">
                    Last sign-in {formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}
                  </p>
                ) : null}
              </div>
              <Button className="bg-[#8B4513] hover:bg-[#6B3410]">Save profile</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Use a unique password with mixed case and a number.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={savePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter the new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <Button className="bg-[#8B4513] hover:bg-[#6B3410]">Update password</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#8B4513]" />
              Authenticator app
            </CardTitle>
            <CardDescription>
              Require a time-based code after your password. Keep backup codes somewhere safe.
            </CardDescription>
          </div>
          <Switch checked={Boolean(user?.totpEnabled)} disabled />
        </CardHeader>
        <CardContent className="space-y-4">
          {!user?.totpEnabled && !setup ? (
            <Button variant="outline" disabled={loading} onClick={() => void startTwoFactor()}>
              Set up authenticator
            </Button>
          ) : null}

          {setup ? (
            <form onSubmit={confirmTwoFactor} className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={setup.qrDataUrl} alt="Authenticator QR code" className="h-[220px] w-[220px] rounded-md border" />
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Scan this code in Google Authenticator, 1Password, or Authy. You can also enter the secret manually:
                </p>
                <code className="block rounded-md bg-stone-100 px-3 py-2 text-sm">{setup.secret}</code>
                <div className="space-y-2">
                  <Label htmlFor="setupCode">6-digit code</Label>
                  <Input
                    id="setupCode"
                    value={setupCode}
                    onChange={(event) => setSetupCode(event.target.value)}
                    placeholder="123456"
                    inputMode="numeric"
                    maxLength={8}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-[#8B4513] hover:bg-[#6B3410]">Enable 2FA</Button>
                  <Button type="button" variant="ghost" onClick={() => setSetup(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          ) : null}

          {user?.totpEnabled ? (
            <form onSubmit={disableTwoFactor} className="flex max-w-md flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="disableCode">Authenticator code to disable</Label>
                <Input
                  id="disableCode"
                  value={disableCode}
                  onChange={(event) => setDisableCode(event.target.value)}
                  placeholder="123456"
                  required
                />
              </div>
              <Button variant="destructive">Disable 2FA</Button>
            </form>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-[#8B4513]" />
              Passkeys
            </CardTitle>
            <CardDescription>
              Sign in with Face ID, Touch ID, Windows Hello, or a hardware security key.
            </CardDescription>
          </div>
          <Button variant="outline" disabled={loading} onClick={() => void addPasskey()}>
            Add passkey
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {passkeys.length === 0 ? (
            <p className="text-sm text-muted-foreground">No passkeys registered yet.</p>
          ) : (
            passkeys.map((passkey) => (
              <div key={passkey.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
                <div>
                  <p className="font-medium">{passkey.name || "Passkey"}</p>
                  <p className="text-xs text-muted-foreground">
                    {passkey.deviceType || "unknown device"}
                    {passkey.lastUsedAt
                      ? ` · last used ${formatDistanceToNow(new Date(passkey.lastUsedAt), { addSuffix: true })}`
                      : " · never used"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => void removePasskey(passkey.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MonitorSmartphone className="h-5 w-5 text-[#8B4513]" />
              Active sessions
            </CardTitle>
            <CardDescription>Close any session you do not recognize.</CardDescription>
          </div>
          <Button variant="outline" onClick={() => void closeOtherSessions()}>
            Close other sessions
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active sessions.</p>
          ) : (
            sessions.map((session) => (
              <div key={session.id} className="flex flex-col gap-3 rounded-lg border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {session.browser || "Browser"} on {session.os || session.device || "unknown device"}
                    </p>
                    {session.current ? <Badge>This device</Badge> : null}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {session.ipAddress || "IP unknown"} · last active{" "}
                    {formatDistanceToNow(new Date(session.lastActivity), { addSuffix: true })}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => void closeSession(session.id)}>
                  {session.current ? "Sign out" : "Close"}
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(backupCodes)} onOpenChange={(open) => !open && setBackupCodes(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save your backup codes</DialogTitle>
            <DialogDescription>
              Each code can be used once if you lose access to your authenticator app. Store them offline.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 font-mono text-sm">
            {backupCodes?.map((code) => (
              <div key={code} className="rounded-md bg-stone-100 px-3 py-2 text-center">
                {code}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                if (backupCodes) {
                  void navigator.clipboard.writeText(backupCodes.join("\n"));
                  toast.success("Backup codes copied");
                }
              }}
            >
              Copy codes
            </Button>
            <Button className="bg-[#8B4513] hover:bg-[#6B3410]" onClick={() => setBackupCodes(null)}>
              I have saved them
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
