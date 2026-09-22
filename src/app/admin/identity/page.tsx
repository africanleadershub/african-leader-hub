"use client";

import { FormEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminFetch } from "@/lib/admin-fetch";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/editor/rich-text-editor";

type ValueItem = { title: string; description: string; icon?: string };

export default function IdentityPage() {
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [background, setBackground] = useState("");
  const [values, setValues] = useState<ValueItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    adminFetch("/api/admin/site")
      .then((res) => res.json())
      .then((data) => {
        setMission(data.identity?.mission || "");
        setVision(data.identity?.vision || "");
        setBackground(data.identity?.background || "");
        setValues(Array.isArray(data.identity?.values) ? data.identity.values : []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await adminFetch("/api/admin/site", {
        method: "PUT",
        body: JSON.stringify({ identity: { mission, vision, background, values } }),
      });
      if (!response.ok) throw new Error("Save failed");
      toast.success("Identity saved");
    } catch {
      toast.error("Could not save identity");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-semibold">Mission, vision & values</h1>
      {loaded ? (
        <>
          <div className="space-y-2">
            <Label>Mission</Label>
            <RichTextEditor
              compact
              html={mission}
              placeholder="Describe the organization’s purpose and who it serves"
              onChange={(_json, html) => setMission(html)}
            />
          </div>
          <div className="space-y-2">
            <Label>Vision</Label>
            <RichTextEditor
              compact
              html={vision}
              placeholder="Describe the future the organization is working toward"
              onChange={(_json, html) => setVision(html)}
            />
          </div>
          <div className="space-y-2">
            <Label>Background</Label>
            <RichTextEditor
              html={background}
              placeholder="Share the organization’s history, context, and founding story"
              onChange={(_json, html) => setBackground(html)}
            />
          </div>
        </>
      ) : (
        <div className="h-64 rounded-md border bg-muted/30" />
      )}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Values</Label>
          <Button
            type="button"
            variant="outline"
            onClick={() => setValues((current) => [...current, { title: "", description: "" }])}
          >
            Add value
          </Button>
        </div>
        {values.map((item, index) => (
          <div key={index} className="grid gap-2 rounded-lg border p-3 md:grid-cols-2">
            <Input
              placeholder="Integrity"
              value={item.title}
              onChange={(event) =>
                setValues((current) =>
                  current.map((row, i) => (i === index ? { ...row, title: event.target.value } : row))
                )
              }
            />
            <Input
              placeholder="We act with honesty and accountability"
              value={item.description}
              onChange={(event) =>
                setValues((current) =>
                  current.map((row, i) => (i === index ? { ...row, description: event.target.value } : row))
                )
              }
            />
          </div>
        ))}
      </div>
      <Button disabled={saving} className="bg-[#8B4513] hover:bg-[#6B3410]">
        {saving ? "Saving…" : "Save identity"}
      </Button>
    </form>
  );
}
