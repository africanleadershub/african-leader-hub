"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CareerApplyForm({ careerId }: { careerId: string }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, careerId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to apply");
      toast.success("Application submitted. We will be in touch.");
      setForm({ firstName: "", lastName: "", email: "", phone: "", coverLetter: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to apply");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-[#8B4513] bg-white p-6">
      <h3 className="text-xl font-semibold">Apply for this role</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>First name</Label>
          <Input placeholder="Amina" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label>Last name</Label>
          <Input placeholder="Diallo" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" placeholder="amina@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      </div>
      <div className="space-y-2">
        <Label>Phone</Label>
        <Input placeholder="+250 788 123 456" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Cover letter</Label>
        <Textarea rows={5} placeholder="Tell us why you are a strong fit for this role" value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} />
      </div>
      <Button disabled={loading} className="bg-[#8B4513] hover:bg-[#6B3410]">
        {loading ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
