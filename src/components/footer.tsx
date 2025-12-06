import Link from "next/link";
import { Mail, Phone, MapPin, X, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-amber-900/40 text-black w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/african-leaders-hub-logo.png"
                alt="African Leaders Hub Logo"
                className="h-12 w-auto"
                width={100}
                height={100}
              />
            </Link>
            <p className="text-black mb-4 max-w-md">
              Building Africa&apos;s Future through People, Purpose, and Possibility
            </p>
            <p className="text-black text-sm">
              African Leaders Hub (ALH) is a Rwanda-based non-profit advancing Africa&apos;s transformation by equipping people to lead with purpose, integrity, and compassion. Through leadership, learning, and sustainable action, we restore dignity, inspire innovation, and cultivate change that lasts across communities and generations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-black hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-black hover:text-black transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-black hover:text-black transition-colors">
                  Get Involved
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-black hover:text-black transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info & Address</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#8B4513]" />
                <Link
                  href="mailto:africanleadershub@gmail.com"
                  className="text-black hover:text-[#8B4513] transition-colors text-sm"
                >
                  africanleadershub@gmail.com
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#8B4513]" />
                <Link
                  href="tel:+250788358891"
                  className="text-black hover:text-[#8B4513] transition-colors text-sm"
                >
                  +250 788 358 891
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#8B4513]" />
                <span className="text-black text-sm">Kigali, Rwanda</span>
              </div>
              <div className="flex items-center space-x-3">
                <X className="w-4 h-4 text-[#8B4513]" />
                <Link
                  href="https://twitter.com/A_LeadersHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#8B4513] transition-colors text-sm"
                >
                  @A_LeadersHub
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                {/* You may want to use a LinkedIn icon here if available, e.g., <Linkedin className=... /> */}
                <Linkedin className="w-4 h-4 text-[#8B4513]" />
                <Link
                  href="https://www.linkedin.com/company/african-leaders-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#8B4513] transition-colors text-sm"
                >
                  African Leaders Hub
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                {/* Instagram */}
                <Instagram className="w-4 h-4 text-[#8B4513]" />
                <Link
                  href="https://www.instagram.com/a_leadershub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#8B4513] transition-colors text-sm"
                >
                  @a_leadershub
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#8B4513] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black text-sm">
            © 2025 African Leaders Hub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-black hover:text-[#8B4513] transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-black hover:text-[#8B4513] transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
