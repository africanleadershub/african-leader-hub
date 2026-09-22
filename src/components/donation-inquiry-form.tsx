"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function DonationInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit donation inquiry");
      }
      toast.success("Thank you. We received your donation inquiry and will follow up shortly.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        amount: "",
        message: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit donation inquiry");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="donation-firstName">First Name</Label>
          <Input
            id="donation-firstName"
            value={formData.firstName}
            onChange={(e) => setFormData((current) => ({ ...current, firstName: e.target.value }))}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="donation-lastName">Last Name</Label>
          <Input
            id="donation-lastName"
            value={formData.lastName}
            onChange={(e) => setFormData((current) => ({ ...current, lastName: e.target.value }))}
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="donation-email">Email</Label>
        <Input
          id="donation-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((current) => ({ ...current, email: e.target.value }))}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="donation-phone">Phone Number</Label>
        <Input
          id="donation-phone"
          value={formData.phone}
          onChange={(e) => setFormData((current) => ({ ...current, phone: e.target.value }))}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="donation-amount">Suggested Amount (USD)</Label>
        <Select
          value={formData.amount}
          onValueChange={(value) => setFormData((current) => ({ ...current, amount: value }))}
        >
          <SelectTrigger id="donation-amount" className="w-full">
            <SelectValue placeholder="Select amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50">$50</SelectItem>
            <SelectItem value="100">$100</SelectItem>
            <SelectItem value="250">$250</SelectItem>
            <SelectItem value="500">$500</SelectItem>
            <SelectItem value="1000">$1,000</SelectItem>
            <SelectItem value="custom">Custom / discuss later</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="donation-message">Message (Optional)</Label>
        <Textarea
          id="donation-message"
          value={formData.message}
          onChange={(e) => setFormData((current) => ({ ...current, message: e.target.value }))}
          placeholder="Tell us how you would like to support ALH"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full"
      >
        {isSubmitting ? "Sending…" : "Submit Donation Inquiry"}
      </Button>
      <p className="text-sm text-gray-500">
        This is an inquiry, not a payment. Our team will contact you with next steps.
      </p>
    </form>
  );
}
