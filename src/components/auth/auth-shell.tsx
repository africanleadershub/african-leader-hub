import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-[#3d1f0d] lg:flex lg:flex-col lg:justify-between p-10 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #c47a3a 0, transparent 35%), radial-gradient(circle at 80% 80%, #8B4513 0, transparent 40%)",
          }}
        />
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <Image
            src="/african-leaders-hub-logo.png"
            alt="African Leaders Hub"
            width={48}
            height={48}
            className="rounded-md bg-white p-1"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200">African Leaders Hub</p>
            <p className="font-medium">Admin console</p>
          </div>
        </Link>
        <div className="relative z-10 max-w-md space-y-4">
          <p className="text-3xl font-semibold leading-tight">
            Building Africa&apos;s future through people, purpose, and possibility.
          </p>
          <p className="text-amber-100/80">
            Sign in to manage programs, stories, applications, and the public site from one secure workspace.
          </p>
        </div>
        <p className="relative z-10 text-sm text-amber-100/70">Protected access for staff only.</p>
      </div>

      <div className="flex items-center justify-center bg-stone-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Image
              src="/african-leaders-hub-logo.png"
              alt="African Leaders Hub"
              width={40}
              height={40}
            />
            <p className="font-semibold text-[#8B4513]">African Leaders Hub</p>
          </div>
          <div className="rounded-2xl border border-[#8B4513]/15 bg-white p-6 shadow-xl shadow-stone-200/70 sm:p-8">
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
          {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
