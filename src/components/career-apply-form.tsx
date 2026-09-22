"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileUploadField, type SelectedFile } from "@/components/file-upload-field";
import { toast } from "sonner";

export function CareerApplyForm({
  careerId,
  heading = "Apply for this role",
}: {
  careerId?: string;
  heading?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    additionalInfo: "",
  });
  const [resume, setResume] = useState<SelectedFile[]>([]);
  const [coverLetter, setCoverLetter] = useState<SelectedFile[]>([]);
  const [additionalDocuments, setAdditionalDocuments] = useState<SelectedFile[]>([]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!resume[0]) {
      toast.error("Upload your resume or CV");
      return;
    }
    setLoading(true);
    try {
      const payload = new FormData();
      if (careerId) payload.set("careerId", careerId);
      payload.set("firstName", form.firstName);
      payload.set("lastName", form.lastName);
      payload.set("email", form.email);
      payload.set("phone", form.phone);
      payload.set("additionalInfo", form.additionalInfo);
      payload.set("resume", resume[0].file);
      if (coverLetter[0]) payload.set("coverLetter", coverLetter[0].file);
      additionalDocuments.forEach((item) => payload.append("additionalDocuments", item.file));

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to apply");
      toast.success("Application submitted. We will be in touch.");
      setForm({ firstName: "", lastName: "", email: "", phone: "", additionalInfo: "" });
      setResume([]);
      setCoverLetter([]);
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
      <FileUploadField
        label="Resume / CV"
        required
        files={resume}
        onChange={setResume}
        hint="PDF or Word · max 8MB"
      />
      <FileUploadField
        label="Cover letter"
        files={coverLetter}
        onChange={setCoverLetter}
        hint="Optional PDF or Word document"
      />
      <FileUploadField
        label="Other documents"
        multiple
        files={additionalDocuments}
        onChange={setAdditionalDocuments}
        hint="Certificates, portfolio, or other supporting files"
      />
      <div className="space-y-2">
        <Label>Additional information</Label>
        <Textarea
          rows={4}
          placeholder="Anything else we should know, such as start date or work authorization"
          value={form.additionalInfo}
          onChange={(event) => setForm({ ...form, additionalInfo: event.target.value })}
        />
      </div>
      <Button disabled={loading} className="bg-[#8B4513] hover:bg-[#6B3410]">
        {loading ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
