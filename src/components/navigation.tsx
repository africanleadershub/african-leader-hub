"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, Heart, Handshake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MegaFeatureCard, MegaMenu } from "@/components/mega-menu";
import { INVOLVEMENT } from "@/lib/involvement";

export type NavProgram = {
  slug: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
};

type MenuKey = "about" | "programs" | "involved" | null;

export function Navigation({
  programs = [],
  settings,
  identityImage,
}: {
  programs?: NavProgram[];
  settings?: { siteName?: string; logoUrl?: string | null };
  identityImage?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const pathname = usePathname();

  const featuredPrograms = [...programs]
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, 6);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => {
    setIsOpen(false);
    setIsProgramsOpen(false);
    setIsAboutOpen(false);
    setIsGetInvolvedOpen(false);
    setOpenMenu(null);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setIsOpen(false);
    setIsProgramsOpen(false);
    setIsAboutOpen(false);
    setIsGetInvolvedOpen(false);
  }, [pathname]);

  const aboutImage = identityImage || "/hero-image.jpg";

  return (
    <nav className="fixed top-0 z-50 w-full border-t-6 border-[#8B4513] bg-white text-black shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between overflow-visible px-4 sm:px-6 md:h-24 lg:px-8">
        <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
          <Image
            src={settings?.logoUrl || "/african-leaders-hub-logo.png"}
            alt={`${settings?.siteName || "African Leaders Hub"} Logo`}
            className="h-12 w-auto"
            width={100}
            height={100}
          />
          <span className="hidden text-sm font-medium sm:block">
            {(settings?.siteName || "AFRICAN LEADERS HUB").toUpperCase()}
          </span>
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          <Link href="/" className="transition-colors hover:text-[#8B4513]" onMouseEnter={() => setOpenMenu(null)}>
            Home
          </Link>

          <MegaMenu
            label="About Us"
            open={openMenu === "about"}
            onOpen={() => setOpenMenu("about")}
            onClose={() => setOpenMenu((current) => (current === "about" ? null : current))}
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
              <MegaFeatureCard
                href="/who-we-are"
                image={aboutImage}
                title="Who we are"
                description="Meet the people, partners, and purpose behind African Leaders Hub."
                cta="Explore our story →"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/about",
                    title: "Mission & Vision",
                    text: "How we empower youth, children, and women as ethical leaders.",
                  },
                  {
                    href: "/about#background",
                    title: "Background",
                    text: "The journey from Kigali to a continental leadership platform.",
                  },
                  {
                    href: "/our-focus",
                    title: "Our Focus",
                    text: "Education, rights, entrepreneurship, and environmental action.",
                  },
                  {
                    href: "/careers",
                    title: "Careers",
                    text: "Join a team building Africa’s future through people and possibility.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-stone-200 p-4 transition hover:border-[#8B4513] hover:bg-amber-50"
                    onClick={() => setOpenMenu(null)}
                  >
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                  </Link>
                ))}
              </div>
            </div>
          </MegaMenu>

          <MegaMenu
            label="Programs"
            open={openMenu === "programs"}
            onOpen={() => setOpenMenu("programs")}
            onClose={() => setOpenMenu((current) => (current === "programs" ? null : current))}
          >
            <div className="flex items-end justify-between gap-4 border-b pb-4">
              <div>
                <p className="text-xl font-bold text-[#8B4513]">Our programs</p>
                <p className="text-sm text-muted-foreground">
                  Education, rights awareness, entrepreneurship, and climate action across Africa.
                </p>
              </div>
              <Link href="/programs" className="shrink-0 text-sm font-medium text-[#8B4513] hover:underline">
                View all programs →
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPrograms.map((program) => (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="group overflow-hidden rounded-2xl border border-stone-200 transition hover:border-[#8B4513] hover:shadow-md"
                  onClick={() => setOpenMenu(null)}
                >
                  <div className="relative h-28">
                    <Image src={program.imageUrl} alt="" fill className="object-cover transition group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-[#8B4513]">{program.category}</p>
                    <p className="mt-1 font-semibold text-gray-900">{program.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{program.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </MegaMenu>

          <MegaMenu
            label="Get Involved"
            open={openMenu === "involved"}
            onOpen={() => setOpenMenu("involved")}
            onClose={() => setOpenMenu((current) => (current === "involved" ? null : current))}
          >
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { ...INVOLVEMENT.donate, text: INVOLVEMENT.donate.description, image: INVOLVEMENT.donate.banner, icon: Heart },
                { ...INVOLVEMENT.volunteer, text: INVOLVEMENT.volunteer.description, image: INVOLVEMENT.volunteer.banner, icon: Users },
                { ...INVOLVEMENT.partner, text: INVOLVEMENT.partner.description, image: INVOLVEMENT.partner.banner, icon: Handshake },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group overflow-hidden rounded-2xl border border-stone-200 transition hover:border-[#8B4513] hover:shadow-md"
                  onClick={() => setOpenMenu(null)}
                >
                  <div className="relative h-36 overflow-hidden bg-stone-200">
                    <span
                      className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <item.icon className="absolute left-4 top-4 h-8 w-8 text-white" />
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </MegaMenu>

          <Link href="/news" className="transition-colors hover:text-[#8B4513]" onMouseEnter={() => setOpenMenu(null)}>
            News
          </Link>
          <Button asChild size="lg" className="rounded-full bg-[#8B4513] text-white hover:bg-[#6B3410]">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-black hover:text-[#8B4513]">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {openMenu ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/20 md:top-24"
          onClick={() => setOpenMenu(null)}
        />
      ) : null}

      {isOpen ? (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={handleLinkClick} aria-hidden="true" />
      ) : null}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <Image src="/african-leaders-hub-logo.png" alt="African Leaders Hub Logo" className="h-10 w-auto" width={80} height={80} />
            <span className="text-sm font-semibold">ALH</span>
          </Link>
          <button onClick={handleLinkClick} className="rounded-lg p-2 text-black hover:bg-gray-100" aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="space-y-1 px-4 py-4">
            <Link href="/" className="flex items-center rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-100 hover:text-[#8B4513]" onClick={handleLinkClick}>
              Home
            </Link>
            <div>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-100 hover:text-[#8B4513]"
              >
                <span>About Us</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all ${isAboutOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="space-y-1 pb-2 pl-4 pt-1">
                  {[
                    ["/about", "Mission & Vision"],
                    ["/about#background", "Background"],
                    ["/who-we-are", "Who We Are"],
                    ["/our-focus", "Our Focus"],
                    ["/careers", "Careers"],
                  ].map(([href, label]) => (
                    <Link key={href} href={href} className="flex items-center rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]" onClick={handleLinkClick}>
                      <ChevronRight className="mr-2 h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-100 hover:text-[#8B4513]"
              >
                <span>Programs</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isProgramsOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all ${isProgramsOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="space-y-1 pb-2 pl-4 pt-1">
                  <Link href="/programs" className="flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-[#8B4513]" onClick={handleLinkClick}>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    View All Programs
                  </Link>
                  {programs.map((program) => (
                    <Link
                      key={program.slug}
                      href={`/programs/${program.slug}`}
                      className="flex items-center rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]"
                      onClick={handleLinkClick}
                    >
                      <ChevronRight className="mr-2 h-3 w-3 opacity-50" />
                      {program.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => setIsGetInvolvedOpen(!isGetInvolvedOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-100 hover:text-[#8B4513]"
              >
                <span>Get Involved</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isGetInvolvedOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all ${isGetInvolvedOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="space-y-1 pb-2 pl-4 pt-1">
                  {[
                    [INVOLVEMENT.donate.href, INVOLVEMENT.donate.title],
                    [INVOLVEMENT.volunteer.href, INVOLVEMENT.volunteer.title],
                    [INVOLVEMENT.partner.href, INVOLVEMENT.partner.title],
                  ].map(([href, label]) => (
                    <Link key={href} href={href} className="flex items-center rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]" onClick={handleLinkClick}>
                      <ChevronRight className="mr-2 h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/news" className="flex items-center rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-100 hover:text-[#8B4513]" onClick={handleLinkClick}>
              News
            </Link>
            <div className="pb-6 pt-4">
              <Link href="/contact" className="block w-full rounded-full bg-[#8B4513] px-4 py-3 text-center text-base font-semibold text-white hover:bg-[#6B3410]" onClick={handleLinkClick}>
                Get In Touch
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}
