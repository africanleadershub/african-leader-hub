
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { programs } from "@/data/programs";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const togglePrograms = () => setIsProgramsOpen(!isProgramsOpen);
  const toggleAbout = () => setIsAboutOpen(!isAboutOpen);
  const toggleGetInvolved = () => setIsGetInvolvedOpen(!isGetInvolvedOpen);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu when clicking outside or on a link
  const handleLinkClick = () => {
    setIsOpen(false);
    setIsProgramsOpen(false);
    setIsAboutOpen(false);
    setIsGetInvolvedOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 bg-white text-black shadow-lg border-t-6 border-[#8B4513]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/african-leaders-hub-logo.png" 
              alt="African Leaders Hub Logo" 
              className="h-12 w-auto"
              width={100}
              height={100}
            />
            <span className="text-sm font-medium hidden sm:block">
              AFRICAN LEADERS HUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="transition-colors hover:text-[#8B4513]">
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-[#8B4513]">
                <span>About Us</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black">
                <DropdownMenuItem asChild>
                  <Link href="/about">Mission & Vision</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about#background">Background</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/who-we-are">Who We Are</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/our-focus">Our Focus</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/careers">Careers</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-[#8B4513]">
                <span>Programs</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black w-[900px] p-6">
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <Link href="/programs" className="text-xl font-bold text-[#8B4513] hover:text-[#6B3410] transition-colors">
                      All Programs
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">Explore our comprehensive programs across all thematic areas</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {programs.map((program) => (
                      <DropdownMenuItem key={program.id} asChild>
                        <Link href={`/programs/${program.slug}`} className="text-sm hover:text-[#8B4513] transition-colors block py-1">
                          {program.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-[#8B4513]">
                <span>Get Involved</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black">
                {/* <DropdownMenuItem asChild>
                  <Link href="/get-involved#donate">Donate</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem asChild>
                  <Link href="/get-involved#volunteer">Volunteer</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/get-involved#partnerships">Partnerships</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/news" className="transition-colors hover:text-[#8B4513]">
              News
            </Link>

            <Button 
              asChild 
              size="lg"
              className="bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="transition-colors text-black hover:text-[#8B4513]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
            onClick={handleLinkClick}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Mobile Menu Header */}
          <div className={`flex items-center justify-between h-16 px-4 border-b`}>
            <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
              <Image 
                src="/african-leaders-hub-logo.png" 
                alt="African Leaders Hub Logo" 
                className="h-10 w-auto"
                width={80}
                height={80}
              />
              <span className={`text-sm font-semibold`}>
                ALH
              </span>
            </Link>
            <button
              onClick={handleLinkClick}
              className={`p-2 rounded-lg transition-colors text-black hover:bg-gray-100`}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Menu Content */}
          <div className="overflow-y-auto h-[calc(100vh-4rem)]">
            <nav className="px-4 py-4 space-y-1">
              {/* Home Link */}
              <Link
                href="/"
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all text-black hover:bg-gray-100 hover:text-[#8B4513]`}
                onClick={handleLinkClick}
              >
                Home
              </Link>
              
              {/* About Dropdown */}
              <div>
                <button
                  onClick={toggleAbout}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-all text-black hover:bg-gray-100 hover:text-[#8B4513]"
                >
                  <span>About Us</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
                    isAboutOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  isAboutOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-4 pt-1 pb-2 space-y-1">
                    <Link
                      href="/about"
                      className="flex items-center px-4 py-2 rounded-lg text-sm transition-all text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]"
                      onClick={handleLinkClick}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Mission & Vision
                    </Link>
                    <Link
                      href="/about#background"
                      className="flex items-center px-4 py-2 rounded-lg text-sm transition-all text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]"
                      onClick={handleLinkClick}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Background
                    </Link>
                    <Link
                      href="/who-we-are"
                      className="flex items-center px-4 py-2 rounded-lg text-sm transition-all text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]"
                      onClick={handleLinkClick}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Who We Are
                    </Link>
                    <Link
                      href="/our-focus"
                      className="flex items-center px-4 py-2 rounded-lg text-sm transition-all text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]"
                      onClick={handleLinkClick}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Our Focus
                    </Link>
                    <Link
                      href="/careers"
                      className="flex items-center px-4 py-2 rounded-lg text-sm transition-all text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]"
                      onClick={handleLinkClick}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Careers
                    </Link>
                  </div>
                </div>
              </div>

              {/* Programs Dropdown */}
              <div>
                <button
                  onClick={togglePrograms}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-all text-black hover:bg-gray-100 hover:text-[#8B4513]"
                >
                  <span>Programs</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
                    isProgramsOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  isProgramsOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-4 pt-1 pb-2 space-y-4">
                    {/* All Programs Link */}
                    <div className="border-b pb-3">
                      <Link
                        href="/programs"
                        className="flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all text-[#8B4513] hover:bg-gray-100 hover:text-[#6B3410]"
                        onClick={handleLinkClick}
                      >
                        <ChevronRight className="w-4 h-4 mr-2" />
                        View All Programs
                      </Link>
                    </div>

                    {/* All Programs List */}
                    <div className="space-y-1">
                      {programs.map((program) => (
                        <Link
                          key={program.id}
                          href={`/programs/${program.slug}`}
                          className="flex items-center px-4 py-2 rounded-lg text-sm transition-all text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]"
                          onClick={handleLinkClick}
                        >
                          <ChevronRight className="w-3 h-3 mr-2 opacity-50" />
                          {program.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Involved Dropdown */}
              <div>
                <button
                  onClick={toggleGetInvolved}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-all text-black hover:bg-gray-100 hover:text-[#8B4513]"
                >
                  <span>Get Involved</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
                    isGetInvolvedOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  isGetInvolvedOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-4 pt-1 pb-2 space-y-1">
                    <Link
                      href="/get-involved#volunteer"
                      className="flex items-center px-4 py-2 rounded-lg text-sm transition-all text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]"
                      onClick={handleLinkClick}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Volunteer
                    </Link>
                    <Link
                      href="/get-involved#partnerships"
                      className="flex items-center px-4 py-2 rounded-lg text-sm transition-all text-gray-700 hover:bg-gray-100 hover:text-[#8B4513]"
                      onClick={handleLinkClick}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Partnerships
                    </Link>
                  </div>
                </div>
              </div>

              {/* News Link */}
              <Link
                href="/news"
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all text-black hover:bg-gray-100 hover:text-[#8B4513]"
                onClick={handleLinkClick}
              >
                News
              </Link>

              {/* Contact Button */}
              <div className="pt-4 pb-6">
                <Link
                  href="/contact"
                  className="block w-full px-4 py-3 rounded-full text-center text-base font-semibold transition-all bg-[#8B4513] text-white hover:bg-[#6B3410]"
                  onClick={handleLinkClick}
                >
                  Get In Touch
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}
