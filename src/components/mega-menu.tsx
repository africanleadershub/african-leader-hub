"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function MegaMenu({
  label,
  open,
  onOpen,
  onClose,
  children,
}: {
  label: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
}) {
  const closeTimer = useRef<number | undefined>(undefined);

  function cancelClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, 140);
  }

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      className="static"
      onMouseEnter={() => {
        cancelClose();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={cn(
          "flex items-center space-x-1 transition-colors hover:text-[#8B4513]",
          open && "text-[#8B4513]"
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        onFocus={onOpen}
      >
        <span>{label}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div
          className="absolute inset-x-0 top-full z-50 border-t border-[#8B4513]/15 bg-white shadow-2xl"
          onMouseEnter={cancelClose}
        >
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

export function MegaFeatureCard({
  href,
  image,
  title,
  description,
  cta,
}: {
  href: string;
  image: string;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <Link href={href} className="group relative isolate flex min-h-[240px] overflow-hidden rounded-2xl bg-stone-900">
      <span
        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      <div className="relative flex h-full flex-col justify-end p-5 text-white">
        <p className="text-lg font-semibold">{title}</p>
        <p className="mt-1 line-clamp-3 text-sm text-white/80">{description}</p>
        <span className="mt-3 text-sm font-medium text-amber-200">{cta}</span>
      </div>
    </Link>
  );
}
