import Link from "next/link";
import { Mail, Phone, MapPin, X, Linkedin, Instagram, Facebook, Youtube, Github, Globe, Music2, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

type SocialLink = { platform?: string; label?: string; url?: string };
type LegalLink = { slug: string; title: string };

const DEFAULT_SOCIAL: SocialLink[] = [
  { platform: "twitter", label: "@A_LeadersHub", url: "https://twitter.com/A_LeadersHub" },
  { platform: "linkedin", label: "African Leaders Hub", url: "https://www.linkedin.com/company/african-leaders-hub" },
  { platform: "instagram", label: "@a_leadershub", url: "https://www.instagram.com/a_leadershub/" },
];

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  twitter: X,
  x: X,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  github: Github,
  website: Globe,
  globe: Globe,
  tiktok: Music2,
  whatsapp: MessageCircle,
};

export function Footer({
  settings,
  legalPages = [],
}: {
  settings?: {
    siteName?: string;
    tagline?: string;
    email?: string;
    phone?: string;
    city?: string;
    country?: string;
    logoUrl?: string | null;
    socialLinks?: SocialLink[];
  };
  legalPages?: LegalLink[];
}) {
  const email = settings?.email || "africanleadershub@gmail.com";
  const phone = settings?.phone || "+250 788 358 891";
  const location = `${settings?.city || "Kigali"}, ${settings?.country || "Rwanda"}`;
  const socialLinks =
    settings?.socialLinks?.filter((link) => link.url)?.length
      ? settings.socialLinks.filter((link) => link.url)
      : DEFAULT_SOCIAL;

  return (
    <footer className="bg-amber-900/40 text-black w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src={settings?.logoUrl || "/african-leaders-hub-logo.png"}
                alt={`${settings?.siteName || "African Leaders Hub"} Logo`}
                className="h-12 w-auto"
                width={100}
                height={100}
              />
            </Link>
            <p className="text-black mb-4 max-w-md">
              {settings?.tagline || "Building Africa's Future through People, Purpose, and Possibility"}
            </p>
            <p className="text-black text-sm">
              African Leaders Hub (ALH) is a Rwanda-based non-profit advancing Africa&apos;s transformation by equipping people to lead with purpose, integrity, and compassion. Through leadership, learning, and sustainable action, we restore dignity, inspire innovation, and cultivate change that lasts across communities and generations.
            </p>
          </div>

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

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info & Address</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#8B4513]" />
                <Link href={`mailto:${email}`} className="text-black hover:text-[#8B4513] transition-colors text-sm">
                  {email}
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#8B4513]" />
                <Link href={`tel:${phone.replace(/\s/g, "")}`} className="text-black hover:text-[#8B4513] transition-colors text-sm">
                  {phone}
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#8B4513]" />
                <span className="text-black text-sm">{location}</span>
              </div>
              {socialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[(link.platform || "").toLowerCase()] || Globe;
                return (
                  <div key={`${link.platform}-${link.url}`} className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-[#8B4513]" />
                    <Link href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#8B4513] transition-colors text-sm">
                      {link.label || link.platform || link.url}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-[#8B4513] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black text-sm">
            © {new Date().getFullYear()} {settings?.siteName || "African Leaders Hub"}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-black hover:text-[#8B4513] transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-black hover:text-[#8B4513] transition-colors text-sm">
              Terms of Service
            </Link>
            {legalPages
              .filter((page) => page.slug !== "privacy-policy" && page.slug !== "terms-of-service")
              .map((page) => (
                <Link
                  key={page.slug}
                  href={`/legal/${page.slug}`}
                  className="text-black hover:text-[#8B4513] transition-colors text-sm"
                >
                  {page.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
