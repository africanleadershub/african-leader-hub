"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileUploadField, type SelectedFile } from "@/components/file-upload-field";
import { toast } from "sonner";

export function ProgramApplyForm({
  programId,
  heading = "Apply to this program",
}: {
  programId: string;
  heading?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    motivation: "",
  });
  const [resume, setResume] = useState<SelectedFile[]>([]);
  const [additionalDocuments, setAdditionalDocuments] = useState<SelectedFile[]>([]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = new FormData();
      payload.set("programId", programId);
      payload.set("firstName", form.firstName);
      payload.set("lastName", form.lastName);
      payload.set("email", form.email);
      payload.set("phone", form.phone);
      payload.set("location", form.location);
      payload.set("motivation", form.motivation);
      if (resume[0]) payload.set("resume", resume[0].file);
      additionalDocuments.forEach((item) => payload.append("additionalDocuments", item.file));

      const response = await fetch("/api/programs/apply", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to apply");
      toast.success("Application submitted. We will be in touch.");
      setForm({ firstName: "", lastName: "", email: "", phone: "", location: "", motivation: "" });
      setResume([]);
      setAdditionalDocuments([]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to apply");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-[#8B4513] bg-white p-6">
      <h3 className="text-xl font-semibold">{heading}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>First name</Label>
          <Input
            placeholder="Amina"
            value={form.firstName}
            onChange={(event) => setForm({ ...form, firstName: event.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Last name</Label>
          <Input
            placeholder="Diallo"
            value={form.lastName}
            onChange={(event) => setForm({ ...form, lastName: event.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="amina@example.com"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Phone</Label>
        <Input
          placeholder="+250 788 123 456"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          placeholder="Kigali, Rwanda"
          value={form.location}
          onChange={(event) => setForm({ ...form, location: event.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Why do you want to join this program?</Label>
        <Textarea
          rows={5}
          placeholder="Tell us about your interest, experience, and what you hope to contribute"
          value={form.motivation}
          onChange={(event) => setForm({ ...form, motivation: event.target.value })}
          required
        />
      </div>
      <FileUploadField
        label="Resume / CV"
        files={resume}
        onChange={setResume}
        hint="Optional PDF or Word · max 8MB"
      />
      <FileUploadField
        label="Supporting documents"
        multiple
        files={additionalDocuments}
        onChange={setAdditionalDocuments}
        hint="Optional certificates, recommendations, or other files"
      />
      <Button disabled={loading} className="bg-[#8B4513] hover:bg-[#6B3410]">
        {loading ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
