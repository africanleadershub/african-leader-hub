'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    organization: '',
    message: '',
    newsletter: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully! We will get back to you soon.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          organization: '',
          message: '',
          newsletter: false,
        });
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName" className="text-white font-medium">
            First Name <span className="text-[#8B4513]">*</span>
          </Label>
          <Input 
            id="firstName" 
            placeholder="John" 
            required 
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="border-white bg-black text-white focus:border-[#8B4513] focus:ring-[#8B4513]" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName" className="text-white font-medium">
            Last Name <span className="text-[#8B4513]">*</span>
          </Label>
          <Input 
            id="lastName" 
            placeholder="Doe" 
            required 
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="border-white bg-black text-white focus:border-[#8B4513] focus:ring-[#8B4513]" 
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-white font-medium">
          Email Address <span className="text-[#8B4513]">*</span>
        </Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="john.doe@example.com" 
          required 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border-white bg-black text-white focus:border-[#8B4513] focus:ring-[#8B4513]" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-white font-medium">Phone Number</Label>
          <Input 
            id="phone" 
            type="tel"
            placeholder="+250 788 123 456" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border-white bg-black text-white focus:border-[#8B4513] focus:ring-[#8B4513]" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="subject" className="text-white font-medium">
            Subject <span className="text-[#8B4513]">*</span>
          </Label>
          <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
            <SelectTrigger className="w-full border-white bg-black text-white focus:border-[#8B4513] focus:ring-[#8B4513] p-2">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="programs">Program Information</SelectItem>
              <SelectItem value="partnership">Partnership Opportunity</SelectItem>
              <SelectItem value="volunteer">Volunteer Application</SelectItem>
              <SelectItem value="donation">Donation Inquiry</SelectItem>
              <SelectItem value="media">Media Inquiry</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="organization" className="text-white font-medium">Organization</Label>
        <Input 
          id="organization" 
          placeholder="Your organization name (optional)" 
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          className="border-white bg-black text-white focus:border-[#8B4513] focus:ring-[#8B4513]" 
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-white font-medium">
          Message <span className="text-[#8B4513]">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us how we can help you..."
          rows={6}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="border-white bg-black text-white focus:border-[#8B4513] focus:ring-[#8B4513] resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="newsletter"
          checked={formData.newsletter}
          onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
          className="mt-1 rounded border-white bg-black text-white focus:border-[#8B4513] focus:ring-[#8B4513] p-2"
          aria-label="Subscribe to newsletter"
        />
        <Label htmlFor="newsletter" className="text-sm text-white cursor-pointer">
          Subscribe to our newsletter for updates on our programs and impact
        </Label>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-white hover:bg-gray-100 text-[#8B4513] rounded-full py-2 text-base font-medium transition-colors cursor-pointer disabled:opacity-50"
      >
        <Send className="mr-2 w-4 h-4" />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

