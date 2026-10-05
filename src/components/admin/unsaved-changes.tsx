"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type UnsavedChangesContextValue = {
  setDirty: (dirty: boolean) => void;
  confirmLeave: (action: () => void) => void;
};

const UnsavedChangesContext = createContext<UnsavedChangesContextValue>({
  setDirty: () => undefined,
  confirmLeave: (action) => action(),
});

export function useUnsavedChanges(dirty: boolean) {
  const { setDirty } = useContext(UnsavedChangesContext);
  useEffect(() => {
    setDirty(dirty);
    return () => setDirty(false);
  }, [dirty, setDirty]);
}

export function useConfirmLeave() {
  return useContext(UnsavedChangesContext).confirmLeave;
}

export function UnsavedChangesProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dirtyRef = useRef(false);
  const bypassRef = useRef(false);
  const pendingRef = useRef<(() => void) | null>(null);

  const setDirty = useCallback((value: boolean) => {
    if (bypassRef.current && value) return;
    dirtyRef.current = value;
  }, []);

  const confirmLeave = useCallback((action: () => void) => {
    if (!dirtyRef.current) {
      action();
      return;
    }
    pendingRef.current = action;
    setOpen(true);
  }, []);

  const leave = useCallback(() => {
    const action = pendingRef.current;
    pendingRef.current = null;
    bypassRef.current = true;
    dirtyRef.current = false;
    setOpen(false);
    action?.();
  }, []);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirtyRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!dirtyRef.current || bypassRef.current) return;
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      event.preventDefault();
      event.stopPropagation();
      pendingRef.current = () => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      };
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <UnsavedChangesContext.Provider value={{ setDirty, confirmLeave }}>
      {children}
      <AlertDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) pendingRef.current = null;
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have changes that have not been saved. If you leave this page, those changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay on this page</AlertDialogCancel>
            <AlertDialogAction className="bg-[#8B4513] hover:bg-[#6B3410]" onClick={leave}>
              Leave without saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </UnsavedChangesContext.Provider>
  );
}
