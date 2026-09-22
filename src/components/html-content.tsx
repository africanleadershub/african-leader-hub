import { sanitizeHtml } from "@/lib/sanitize-html";
import { cn } from "@/lib/utils";

export function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function HtmlContent({
  html,
  className,
  fallback,
}: {
  html?: string | null;
  className?: string;
  fallback?: string;
}) {
  const source = html?.trim() || fallback || "";
  if (!source) return null;
  const markup = looksLikeHtml(source)
    ? source
    : source
        .split(/\n\s*\n/)
        .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
        .join("");
  const sanitized = sanitizeHtml(markup);
  if (!sanitized) return null;
  return (
    <div
      className={cn("prose prose-neutral max-w-none [&>*:last-child]:mb-0", className)}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
