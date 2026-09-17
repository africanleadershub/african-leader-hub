"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SocialLink = { platform: string; label: string; url: string };

type SettingsValues = {
  siteName: string;
  tagline: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  phonePrimary: string;
  phoneSecondary: string;
  emailPrimary: string;
  emailSecondary: string;
  businessHours: string;
  mapEmbedUrl: string;
};

const EMPTY_SETTINGS: SettingsValues = {
  siteName: "",
  tagline: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "",
  phonePrimary: "",
  phoneSecondary: "",
  emailPrimary: "",
  emailSecondary: "",
  businessHours: "",
  mapEmbedUrl: "",
};

const SOCIAL_PLATFORMS = [
  { value: "twitter", label: "X / Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "github", label: "GitHub" },
  { value: "website", label: "Website" },
];

function parseSocialLinks(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      return {
        platform: String(row.platform || "website"),
        label: String(row.label || ""),
        url: String(row.url || ""),
      };
    })
    .filter((item): item is SocialLink => item !== null);
}

export default function SettingsPage() {
  const [values, setValues] = useState<SettingsValues>(EMPTY_SETTINGS);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch("/api/admin/site")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setValues((current) => ({
            ...current,
            ...Object.fromEntries(
              Object.keys(current).map((key) => [key, data.settings[key] ?? current[key as keyof SettingsValues]])
            ),
          }));
          setSocialLinks(parseSocialLinks(data.settings.socialLinks));
        }
      })
      .catch(() => undefined);
  }, []);

  function updateLink(index: number, patch: Partial<SocialLink>) {
    setSocialLinks((current) => current.map((link, i) => (i === index ? { ...link, ...patch } : link)));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const cleaned = socialLinks
        .map((link) => ({
          platform: link.platform.trim(),
          label: link.label.trim() || SOCIAL_PLATFORMS.find((item) => item.value === link.platform)?.label || link.platform,
          url: link.url.trim(),
        }))
        .filter((link) => link.url);
      const response = await adminFetch("/api/admin/site", {
        method: "PUT",
        body: JSON.stringify({ settings: { ...values, socialLinks: cleaned } }),
      });
      if (!response.ok) throw new Error("Save failed");
      toast.success("Settings saved");
    } catch {
      toast.error("Could not save settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold">Website settings</h1>
      <Card className="py-4">
        <CardHeader className="px-6 pb-2">
          <CardTitle className="text-base">Site details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 px-6 md:grid-cols-2">
          {(
            [
              ["siteName", "Site name", "African Leaders Hub"],
              ["tagline", "Tagline", "Developing ethical African leadership"],
              ["addressLine1", "Address line 1", "KG 123 St"],
              ["addressLine2", "Address line 2", "Kimihurura"],
              ["city", "City", "Kigali"],
              ["country", "Country", "Rwanda"],
              ["phonePrimary", "Primary phone", "+250 788 000 000"],
              ["phoneSecondary", "Secondary phone", "+250 788 111 111"],
              ["emailPrimary", "Primary email", "hello@africanleadershub.org"],
              ["emailSecondary", "Secondary email", "info@africanleadershub.org"],
            ] as const
          ).map(([name, label, placeholder]) => (
            <div key={name} className={name === "tagline" ? "space-y-2 md:col-span-2" : "space-y-2"}>
              <Label>{label}</Label>
              <Input
                placeholder={placeholder}
                value={values[name]}
                onChange={(event) => setValues((current) => ({ ...current, [name]: event.target.value }))}
              />
            </div>
          ))}
          <div className="space-y-2 md:col-span-2">
            <Label>Map embed URL</Label>
            <Input
              placeholder="https://www.google.com/maps/embed?..."
              value={values.mapEmbedUrl}
              onChange={(event) => setValues((current) => ({ ...current, mapEmbedUrl: event.target.value }))}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Business hours</Label>
            <Textarea
              placeholder="Monday–Friday, 8:00–17:00 CAT"
              value={values.businessHours}
              onChange={(event) => setValues((current) => ({ ...current, businessHours: event.target.value }))}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="py-4">
        <CardHeader className="flex flex-row items-center justify-between px-6 pb-2">
          <CardTitle className="text-base">Social media accounts</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setSocialLinks((current) => [...current, { platform: "twitter", label: "", url: "" }])}
          >
            Add account
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 px-6">
          {socialLinks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No social accounts yet. Add the profiles that should appear in the footer.</p>
          ) : null}
          {socialLinks.map((link, index) => (
            <div key={`${link.platform}-${index}`} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[10rem_1fr_1fr_auto]">
              <Select value={link.platform} onValueChange={(platform) => updateLink(index, { platform })}>
                <SelectTrigger>
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Display label"
                value={link.label}
                onChange={(event) => updateLink(index, { label: event.target.value })}
              />
              <Input
                placeholder="https://"
                value={link.url}
                onChange={(event) => updateLink(index, { url: event.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSocialLinks((current) => current.filter((_, i) => i !== index))}
              >
                Remove
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      <Button disabled={saving} className="bg-[#8B4513] hover:bg-[#6B3410]">
        {saving ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
