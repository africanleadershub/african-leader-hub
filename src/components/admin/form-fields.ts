export type FieldSection = "main" | "sidebar";
export type FieldGroup = "content" | "publish" | "media" | "taxonomy" | "details" | "seo" | "social";

export type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  section?: FieldSection;
  group?: FieldGroup;
  required?: boolean;
  maxLength?: number;
  recommendedLength?: number;
  help?: string;
} & (
  | { type: "text" | "textarea" | "number" | "datetime" | "url" }
  | { type: "select"; options: { label: string; value: string }[] }
  | { type: "asset" }
  | { type: "list" }
  | { type: "richtext"; compact?: boolean }
  | { type: "switch" }
  | { type: "category"; categoryKind: "NEWS" | "PROGRAM" }
);

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

export const programFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Youth Leadership Fellowship",
    required: true,
    maxLength: 70,
    recommendedLength: 60,
    help: "Used as the page title and primary search heading.",
  },
  {
    name: "description",
    label: "Excerpt",
    type: "textarea",
    placeholder: "Summarize the program in a few sentences",
    required: true,
    maxLength: 160,
    recommendedLength: 155,
    help: "Shown in listings, social previews, and search results.",
  },
  { name: "background", label: "Background", type: "textarea", placeholder: "Why this program exists and who it serves" },
  { name: "goal", label: "Goal", type: "textarea", placeholder: "The primary outcome you want to achieve" },
  { name: "objectives", label: "Objectives (one per line)", type: "list", placeholder: "Build leadership capacity\nConnect alumni across countries" },
  { name: "keyActivities", label: "Key activities (one per line)", type: "list", placeholder: "Workshops\nMentorship\nField visits" },
  { name: "targetGroups", label: "Target groups (one per line)", type: "list", placeholder: "University students\nEarly-career professionals" },
  { name: "expectedOutcomes", label: "Expected outcomes (one per line)", type: "list", placeholder: "50 graduates per cohort\nRegional alumni network" },
  { name: "status", label: "Status", type: "select", placeholder: "Select status", options: statusOptions, section: "sidebar", group: "publish" },
  { name: "featured", label: "Featured", type: "switch", section: "sidebar", group: "publish" },
  { name: "category", label: "Category", type: "category", categoryKind: "PROGRAM", section: "sidebar", group: "taxonomy", required: true },
  { name: "imageAssetId", label: "Image", type: "asset", section: "sidebar", group: "media", help: "Used for listings, the program page banner, and navigation." },
  { name: "slug", label: "Slug", type: "text", placeholder: "youth-leadership-fellowship", section: "sidebar", group: "details" },
  { name: "duration", label: "Duration", type: "text", placeholder: "12 months", section: "sidebar", group: "details" },
  { name: "budget", label: "Budget", type: "text", placeholder: "USD 50,000", section: "sidebar", group: "details" },
  { name: "seoTitle", label: "SEO title", type: "text", placeholder: "Youth Leadership Fellowship | African Leaders Hub", maxLength: 60, recommendedLength: 55, section: "sidebar", group: "seo" },
  { name: "seoDescription", label: "SEO description", type: "textarea", placeholder: "A concise search-result summary", maxLength: 160, recommendedLength: 155, section: "sidebar", group: "seo" },
];

export const careerFields: FormField[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Program Manager", required: true },
  { name: "description", label: "Summary", type: "textarea", placeholder: "A short overview of the role and who should apply" },
  { name: "detailsHtml", label: "Details", type: "richtext", placeholder: "Add responsibilities, requirements, and how to apply…" },
  { name: "status", label: "Status", type: "select", placeholder: "Select status", options: statusOptions, section: "sidebar", group: "publish" },
  { name: "featured", label: "Featured", type: "switch", section: "sidebar", group: "publish" },
  { name: "type", label: "Type", type: "select", placeholder: "Select employment type", section: "sidebar", group: "details", options: [
    { label: "Full time", value: "FULL_TIME" },
    { label: "Part time", value: "PART_TIME" },
    { label: "Contract", value: "CONTRACT" },
    { label: "Internship", value: "INTERNSHIP" },
  ]},
  { name: "department", label: "Department", type: "text", placeholder: "Programs", section: "sidebar", group: "details" },
  { name: "location", label: "Location", type: "text", placeholder: "Kigali, Rwanda", section: "sidebar", group: "details" },
  { name: "slug", label: "Slug", type: "text", placeholder: "program-manager", section: "sidebar", group: "details" },
  { name: "applicationDeadline", label: "Application deadline", type: "datetime", section: "sidebar", group: "details" },
  { name: "applyEmail", label: "Apply email", type: "text", placeholder: "careers@africanleadershub.org", section: "sidebar", group: "details" },
];

export const teamFields: FormField[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Ada Okonkwo", required: true },
  { name: "position", label: "Position", type: "text", placeholder: "Executive Director" },
  { name: "biography", label: "Biography", type: "richtext", placeholder: "Write a short biography…" },
  { name: "responsibilities", label: "Responsibilities", type: "textarea", placeholder: "Strategy, partnerships, and organizational leadership" },
  { name: "status", label: "Status", type: "select", placeholder: "Select status", section: "sidebar", group: "publish", options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ]},
  { name: "imageAssetId", label: "Photo", type: "asset", section: "sidebar", group: "media" },
  { name: "committee", label: "Committee", type: "text", placeholder: "Executive Committee", section: "sidebar", group: "details" },
  { name: "nationality", label: "Nationality", type: "text", placeholder: "Nigeria", section: "sidebar", group: "details" },
  { name: "slug", label: "Slug", type: "text", placeholder: "ada-okonkwo", section: "sidebar", group: "details" },
  { name: "linkedin", label: "LinkedIn", type: "url", placeholder: "https://linkedin.com/in/username", section: "sidebar", group: "social" },
  { name: "twitter", label: "X / Twitter", type: "url", placeholder: "https://x.com/username", section: "sidebar", group: "social" },
  { name: "facebook", label: "Facebook", type: "url", placeholder: "https://facebook.com/username", section: "sidebar", group: "social" },
  { name: "instagram", label: "Instagram", type: "url", placeholder: "https://instagram.com/username", section: "sidebar", group: "social" },
];

export const legalFields: FormField[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Privacy Policy", required: true, maxLength: 70, recommendedLength: 60 },
  { name: "excerpt", label: "Excerpt", type: "textarea", placeholder: "A short summary shown in listings", maxLength: 160, recommendedLength: 155 },
  { name: "contentHtml", label: "Content", type: "richtext", placeholder: "Write the legal page content…" },
  { name: "published", label: "Published", type: "switch", section: "sidebar", group: "publish" },
  { name: "slug", label: "Slug", type: "text", placeholder: "privacy-policy", section: "sidebar", group: "details" },
  { name: "seoTitle", label: "SEO title", type: "text", placeholder: "Privacy Policy | African Leaders Hub", maxLength: 60, recommendedLength: 55, section: "sidebar", group: "seo" },
  { name: "seoDescription", label: "SEO description", type: "textarea", placeholder: "A concise search-result summary", maxLength: 160, recommendedLength: 155, section: "sidebar", group: "seo" },
];

export const faqFields: FormField[] = [
  { name: "question", label: "Question", type: "text", placeholder: "How can I join a program?" },
  { name: "answer", label: "Answer", type: "textarea", placeholder: "Explain the answer clearly for visitors" },
  { name: "published", label: "Published", type: "switch", section: "sidebar", group: "publish" },
];

export const partnerFields: FormField[] = [
  { name: "name", label: "Name", type: "text", placeholder: "African Development Bank", required: true },
  { name: "website", label: "Website", type: "url", placeholder: "https://example.org" },
  { name: "published", label: "Published", type: "switch", section: "sidebar", group: "publish" },
  { name: "logoAssetId", label: "Logo", type: "asset", section: "sidebar", group: "media" },
  { name: "category", label: "Category", type: "text", placeholder: "Institutional partner", section: "sidebar", group: "details" },
];

export const impactFields: FormField[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Leaders trained" },
  { name: "value", label: "Value", type: "text", placeholder: "1,200+" },
  { name: "description", label: "Description", type: "textarea", placeholder: "What this number represents" },
  { name: "published", label: "Published", type: "switch", section: "sidebar", group: "publish" },
  { name: "category", label: "Category", type: "text", placeholder: "Programs", section: "sidebar", group: "details" },
];

export const postFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Alumni summit opens in Accra",
    required: true,
    maxLength: 70,
    recommendedLength: 60,
    help: "Keep this under 60 characters for search results.",
  },
  {
    name: "excerpt",
    label: "Excerpt",
    type: "textarea",
    placeholder: "A short summary for cards and search results",
    required: true,
    maxLength: 160,
    recommendedLength: 155,
    help: "This is the meta description if no SEO description is set.",
  },
  { name: "contentHtml", label: "Content", type: "richtext", placeholder: "Write the article…" },
  { name: "status", label: "Status", type: "select", placeholder: "Select status", options: statusOptions, section: "sidebar", group: "publish" },
  { name: "featured", label: "Featured", type: "switch", section: "sidebar", group: "publish" },
  { name: "publishedAt", label: "Publish date", type: "datetime", section: "sidebar", group: "publish" },
  { name: "featuredImageId", label: "Image", type: "asset", section: "sidebar", group: "media", help: "Used for cards, social previews, and the article banner." },
  { name: "category", label: "Category", type: "category", categoryKind: "NEWS", section: "sidebar", group: "taxonomy", required: true },
  { name: "tags", label: "Tags (one per line)", type: "list", placeholder: "Leadership\nAlumni", section: "sidebar", group: "taxonomy" },
  { name: "slug", label: "Slug", type: "text", placeholder: "alumni-summit-accra", section: "sidebar", group: "details" },
  { name: "authorName", label: "Author", type: "text", placeholder: "Communications team", section: "sidebar", group: "details" },
  { name: "seoTitle", label: "SEO title", type: "text", placeholder: "Alumni summit opens in Accra | ALH", maxLength: 60, recommendedLength: 55, section: "sidebar", group: "seo" },
  { name: "seoDescription", label: "SEO description", type: "textarea", placeholder: "A concise search-result summary", maxLength: 160, recommendedLength: 155, section: "sidebar", group: "seo" },
];
