'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface NewsletterSubscribeProps {
  source?: 'news-page' | 'news-article' | 'footer' | 'other';
  className?: string;
  buttonText?: string;
  placeholder?: string;
}

export function NewsletterSubscribe({ 
  source = 'other',
  className = '',
  buttonText = 'Subscribe',
  placeholder = 'Enter your email address'
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Successfully subscribed to newsletter!');
        setEmail(''); // Clear the input
      } else {
        toast.error(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex space-x-2">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50"
        />
        <Button 
          type="submit" 
          size="lg" 
          disabled={isSubmitting}
          className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-6 rounded-full disabled:opacity-50"
        >
          {isSubmitting ? 'Subscribing...' : buttonText}
        </Button>
      </div>
    </form>
  );
}

