"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";

export default function SettingsPage() {
  const [values, setValues] = useState({
    siteName: "",
    tagline: "",
    addressLine1: "",
    city: "",
    country: "",
    phonePrimary: "",
    emailPrimary: "",
    businessHours: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch("/api/admin/site")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setValues((current) => ({ ...current, ...data.settings }));
      })
      .catch(() => undefined);
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await adminFetch("/api/admin/site", {
        method: "PUT",
        body: JSON.stringify({ settings: values }),
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
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-semibold">Website settings</h1>
      {Object.entries({
        siteName: ["Site name", "African Leaders Hub"],
        tagline: ["Tagline", "Developing ethical African leadership"],
        addressLine1: ["Address", "KG 123 St"],
        city: ["City", "Kigali"],
        country: ["Country", "Rwanda"],
        phonePrimary: ["Primary phone", "+250 788 000 000"],
        emailPrimary: ["Primary email", "hello@africanleadershub.org"],
      }).map(([name, [label, placeholder]]) => (
        <div key={name} className="space-y-2">
          <Label>{label}</Label>
          <Input
            placeholder={placeholder}
            value={String(values[name as keyof typeof values] || "")}
            onChange={(e) => setValues((current) => ({ ...current, [name]: e.target.value }))}
          />
        </div>
      ))}
      <div className="space-y-2">
        <Label>Business hours</Label>
        <Textarea
          placeholder="Monday–Friday, 8:00–17:00 CAT"
          value={values.businessHours}
          onChange={(e) => setValues((current) => ({ ...current, businessHours: e.target.value }))}
        />
      </div>
      <Button disabled={saving} className="bg-[#8B4513] hover:bg-[#6B3410]">
        {saving ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
