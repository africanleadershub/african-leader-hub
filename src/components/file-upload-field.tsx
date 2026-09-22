"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectedFile = {
  file: File;
  id: string;
};

const ACCEPT = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/rtf": [".rtf"],
  "text/plain": [".txt"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export function FileUploadField({
  label,
  hint,
  required,
  multiple = false,
  files,
  onChange,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  multiple?: boolean;
  files: SelectedFile[];
  onChange: (files: SelectedFile[]) => void;
}) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      const next = accepted.map((file) => ({ file, id: crypto.randomUUID() }));
      onChange(multiple ? [...files, ...next] : next.slice(0, 1));
    },
    [files, multiple, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPT,
    multiple,
    maxSize: 8 * 1024 * 1024,
  });

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        {label}
        {required ? <span className="text-[#8B4513]"> *</span> : null}
      </p>
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-xl border-2 border-dashed px-4 py-6 text-center transition",
          isDragActive ? "border-[#8B4513] bg-amber-50" : "border-[#8B4513]/30 hover:border-[#8B4513]"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-2 h-5 w-5 text-[#8B4513]" />
        <p className="text-sm text-gray-700">
          {isDragActive ? "Drop the file here" : "Drag a file here, or click to browse"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {hint || "PDF, Word, or image · max 8MB"}
        </p>
      </div>
      {files.length > 0 ? (
        <ul className="space-y-2">
          {files.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg border bg-stone-50 px-3 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText className="h-4 w-4 shrink-0 text-[#8B4513]" />
                <span className="truncate">{item.file.name}</span>
              </span>
              <button
                type="button"
                className="ml-3 text-muted-foreground hover:text-red-600"
                onClick={() => onChange(files.filter((file) => file.id !== item.id))}
                aria-label={`Remove ${item.file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
