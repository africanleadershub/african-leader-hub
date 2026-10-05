"use client";

import { UnsavedChangesProvider } from "@/components/admin/unsaved-changes";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return <UnsavedChangesProvider>{children}</UnsavedChangesProvider>;
}
