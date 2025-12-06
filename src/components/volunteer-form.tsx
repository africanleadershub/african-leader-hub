'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    interest: '',
    availability: '',
    motivation: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Volunteer application submitted successfully! We will review your application and get back to you soon.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          skills: '',
          interest: '',
          availability: '',
          motivation: '',
        });
      } else {
        toast.error(data.error || 'Failed to submit application. Please try again.');
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
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="volFirstName">First Name</Label>
          <Input 
            id="volFirstName" 
            placeholder="Enter your first name" 
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="border border-[#8B4513]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="volLastName">Last Name</Label>
          <Input 
            id="volLastName" 
            placeholder="Enter your last name" 
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="border border-[#8B4513]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="volEmail">Email</Label>
        <Input 
          id="volEmail" 
          type="email" 
          placeholder="Enter your email" 
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="volPhone">Phone Number</Label>
        <Input 
          id="volPhone" 
          placeholder="Enter your phone number" 
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="volLocation">Location</Label>
        <Input 
          id="volLocation" 
          placeholder="City, Country" 
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="volSkills">Skills & Experience</Label>
        <Textarea 
          id="volSkills" 
          placeholder="Describe your skills and relevant experience" 
          required
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="volInterest">Areas of Interest</Label>
        <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
          <SelectTrigger className="w-full border border-[#8B4513]">
            <SelectValue placeholder="Select area of interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="education">Education Programs</SelectItem>
            <SelectItem value="youth">Youth Empowerment</SelectItem>
            <SelectItem value="environment">Environmental Programs</SelectItem>
            <SelectItem value="women">Women Empowerment</SelectItem>
            <SelectItem value="rights">Rights Education</SelectItem>
            <SelectItem value="admin">Administrative Support</SelectItem>
            <SelectItem value="tech">Technology & Digital</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="volAvailability">Availability</Label>
        <Textarea 
          id="volAvailability" 
          placeholder="Describe your availability and preferred time commitment" 
          required
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="volMotivation">Why do you want to volunteer with ALH?</Label>
        <Textarea 
          id="volMotivation" 
          placeholder="Share your motivation and what you hope to contribute" 
          required
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
          className="border border-[#8B4513]"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}

