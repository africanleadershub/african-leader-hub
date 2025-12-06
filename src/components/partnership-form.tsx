'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function PartnershipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    orgLocation: '',
    orgDescription: '',
    partnershipInterest: '',
    partnershipGoals: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/partnership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Partnership inquiry submitted successfully! We will review your inquiry and get back to you soon.');
        // Reset form
        setFormData({
          orgName: '',
          orgType: '',
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          orgLocation: '',
          orgDescription: '',
          partnershipInterest: '',
          partnershipGoals: '',
        });
      } else {
        toast.error(data.error || 'Failed to submit partnership inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="orgName">Organization Name</Label>
        <Input 
          id="orgName" 
          placeholder="Enter organization name" 
          required
          value={formData.orgName}
          onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="orgType">Organization Type</Label>
        <Select value={formData.orgType} onValueChange={(value) => setFormData({ ...formData, orgType: value })}>
          <SelectTrigger className="w-full border border-[#8B4513]">
            <SelectValue placeholder="Select organization type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="government">Government Agency</SelectItem>
            <SelectItem value="international">International Organization</SelectItem>
            <SelectItem value="ngo">NGO</SelectItem>
            <SelectItem value="education">Educational Institution</SelectItem>
            <SelectItem value="private">Private Company</SelectItem>
            <SelectItem value="cbo">Community-Based Organization</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contactName">Contact Person</Label>
        <Input 
          id="contactName" 
          placeholder="Enter contact person name" 
          required
          value={formData.contactName}
          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contactEmail">Email</Label>
        <Input 
          id="contactEmail" 
          type="email" 
          placeholder="Enter email address" 
          required
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contactPhone">Phone Number</Label>
        <Input 
          id="contactPhone" 
          placeholder="Enter phone number" 
          required
          value={formData.contactPhone}
          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="orgLocation">Organization Location</Label>
        <Input 
          id="orgLocation" 
          placeholder="City, Country" 
          required
          value={formData.orgLocation}
          onChange={(e) => setFormData({ ...formData, orgLocation: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="orgDescription">Organization Description</Label>
        <Textarea 
          id="orgDescription" 
          placeholder="Describe your organization and its mission" 
          required
          value={formData.orgDescription}
          onChange={(e) => setFormData({ ...formData, orgDescription: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="partnershipInterest">Partnership Interest</Label>
        <Textarea 
          id="partnershipInterest" 
          placeholder="Describe your partnership interests and how you'd like to collaborate" 
          required
          value={formData.partnershipInterest}
          onChange={(e) => setFormData({ ...formData, partnershipInterest: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="partnershipGoals">Partnership Goals</Label>
        <Textarea 
          id="partnershipGoals" 
          placeholder="What do you hope to achieve through this partnership?" 
          required
          value={formData.partnershipGoals}
          onChange={(e) => setFormData({ ...formData, partnershipGoals: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
      </Button>
    </form>
  );
}

