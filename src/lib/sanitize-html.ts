import sanitizeHtmlLib from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "blockquote",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "a",
  "img",
  "figure",
  "figcaption",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "hr",
  "span",
  "div",
  "pre",
  "code",
  "mark",
];

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return sanitizeHtmlLib(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      "*": ["class", "style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtmlLib.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}
