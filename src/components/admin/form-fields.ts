export type FieldSection = "main" | "sidebar";
export type FieldGroup =
  | "content"
  | "publish"
  | "media"
  | "taxonomy"
  | "details"
  | "applications"
  | "seo"
  | "social";

export type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  section?: FieldSection;
  group?: FieldGroup;
  groupLabel?: string;
  panel?: string;
  panelHint?: string;
  required?: boolean;
  maxLength?: number;
  recommendedLength?: number;
  help?: string;
  tooltip?: string;
  visibleWhen?: { field: string; in: Array<string | boolean> };
} & (
  | { type: "text" | "textarea" | "number" | "datetime" | "url" }
  | { type: "select"; options: { label: string; value: string }[] }
  | { type: "asset"; assetKind?: "IMAGE" | "FILE" | "ALL" }
  | { type: "list" }
  | { type: "richtext"; compact?: boolean }
  | { type: "switch" }
  | { type: "partners" }
  | { type: "gallery"; max?: number }
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
    panel: "Overview",
    panelHint: "The name and short summary visitors see in listings and at the top of the page.",
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
    panel: "Overview",
  },
  {
    name: "detailsHtml",
    label: "Program details",
    type: "richtext",
    placeholder: "Paste or write the full program description…",
    help: "Use this for everything that used to live in separate sections. Paste from a Word document if that is easier.",
    panel: "Program story",
    panelHint: "The long description on the public program page.",
  },
  {
    name: "timelineHtml",
    label: "Program timeline",
    type: "richtext",
    compact: true,
    placeholder: "Duration, phases, or any timeline details…",
    help: "Shown on the public page under the heading Program Timeline.",
    panel: "Timeline",
    panelHint: "Shown on the program page and beside the application form.",
  },
  {
    name: "partners",
    label: "Partners",
    type: "partners",
    help: "Choose from partners already in the system. Their logos appear on the program page.",
    panel: "Partners and brochure",
    panelHint: "Logos and an optional PDF visitors can download.",
  },
  {
    name: "brochurePreviewAssetId",
    label: "Brochure preview",
    type: "asset",
    assetKind: "IMAGE",
    help: "Screenshot or cover image. Visitors click it to download the PDF.",
    panel: "Partners and brochure",
  },
  {
    name: "brochureAssetId",
    label: "Brochure PDF",
    type: "asset",
    assetKind: "FILE",
    help: "Optional. PDF only. Available whether or not applications are open.",
    panel: "Partners and brochure",
  },
  {
    name: "applicationGuidelinesHtml",
    label: "Application guidelines",
    type: "richtext",
    compact: true,
    placeholder: "How to apply by email, what to include, and any deadlines…",
    visibleWhen: { field: "applicationMethod", in: ["EMAIL"] },
    panel: "Email application",
    panelHint: "Instructions shown when someone applies by email.",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    options: statusOptions,
    section: "sidebar",
    group: "publish",
  },
  {
    name: "featured",
    label: "Featured",
    type: "switch",
    section: "sidebar",
    group: "publish",
  },
  {
    name: "applicationsEnabled",
    label: "Receiving applications",
    type: "switch",
    section: "sidebar",
    group: "applications",
    help: "Turn off to close applications even if the dates have not passed.",
  },
  {
    name: "applicationsOpenAt",
    label: "Applications open",
    type: "datetime",
    section: "sidebar",
    group: "applications",
    help: "Leave blank to open as soon as receiving applications is on.",
  },
  {
    name: "applicationsCloseAt",
    label: "Applications close",
    type: "datetime",
    section: "sidebar",
    group: "applications",
    help: "Leave blank to keep applications open until you turn the switch off.",
  },
  {
    name: "applicationMethod",
    label: "Application method",
    type: "select",
    placeholder: "Select a method",
    section: "sidebar",
    group: "applications",
    options: [
      { label: "None", value: "NONE" },
      { label: "Apply via email", value: "EMAIL" },
      { label: "Apply via link", value: "EXTERNAL_LINK" },
      { label: "Built-in form", value: "BUILT_IN_FORM" },
    ],
    help: "Only one method is used. The apply section appears when receiving applications is on and the dates allow it.",
  },
  {
    name: "applicationEmail",
    label: "Application email",
    type: "text",
    placeholder: "programs@africanleadershub.org",
    section: "sidebar",
    group: "applications",
    visibleWhen: { field: "applicationMethod", in: ["EMAIL"] },
    help: "If blank, the site contact email is used.",
  },
  {
    name: "applicationUrl",
    label: "Application link",
    type: "url",
    placeholder: "https://forms.office.com/…",
    section: "sidebar",
    group: "applications",
    visibleWhen: { field: "applicationMethod", in: ["EXTERNAL_LINK"] },
  },
  {
    name: "category",
    label: "Category",
    type: "category",
    categoryKind: "PROGRAM",
    section: "sidebar",
    group: "taxonomy",
    required: true,
  },
  {
    name: "imageAssetId",
    label: "Cover Photo",
    type: "asset",
    assetKind: "IMAGE",
    section: "sidebar",
    group: "media",
    help: "Used for listings, the program page banner, and navigation.",
  },
  {
    name: "galleryAssets",
    label: "Program gallery",
    type: "gallery",
    max: 5,
    section: "sidebar",
    group: "media",
    help: "Up to 5 photos shown under the program story, above the brochure.",
  },
  {
    name: "seoTitle",
    label: "SEO title",
    type: "text",
    placeholder: "Youth Leadership Fellowship | African Leaders Hub",
    maxLength: 60,
    recommendedLength: 55,
    section: "sidebar",
    group: "seo",
    tooltip:
      "The headline that appears in Google and in the browser tab. If you leave this blank, we use the program title. Keep it around 50–60 characters so search engines do not cut it off.",
  },
  {
    name: "seoDescription",
    label: "SEO description",
    type: "textarea",
    placeholder: "A concise search-result summary",
    maxLength: 160,
    recommendedLength: 155,
    section: "sidebar",
    group: "seo",
    tooltip:
      "The short paragraph shown under the title in search results. Use it to say what the program is and who it is for. If blank, we use the excerpt. Aim for about 150–160 characters so the full sentence appears.",
  },
];

export const careerFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Program Manager",
    required: true,
    panel: "Overview",
    panelHint: "The role name and short overview visitors see in listings.",
  },
  {
    name: "description",
    label: "Summary",
    type: "textarea",
    placeholder: "A short overview of the role and who should apply",
    panel: "Overview",
  },
  {
    name: "detailsHtml",
    label: "Role description",
    type: "richtext",
    placeholder: "Add responsibilities, requirements, and how to apply…",
    panel: "Role",
    panelHint: "Responsibilities and requirements on the public career page.",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    options: statusOptions,
    section: "sidebar",
    group: "publish",
  },
  {
    name: "featured",
    label: "Featured",
    type: "switch",
    section: "sidebar",
    group: "publish",
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    placeholder: "Select employment type",
    section: "sidebar",
    group: "details",
    groupLabel: "Position",
    options: [
      { label: "Full time", value: "FULL_TIME" },
      { label: "Part time", value: "PART_TIME" },
      { label: "Contract", value: "CONTRACT" },
      { label: "Internship", value: "INTERNSHIP" },
    ],
  },
  {
    name: "department",
    label: "Department",
    type: "text",
    placeholder: "Programs",
    section: "sidebar",
    group: "details",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Kigali, Rwanda",
    section: "sidebar",
    group: "details",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    placeholder: "program-manager",
    section: "sidebar",
    group: "details",
  },
  {
    name: "applicationDeadline",
    label: "Application deadline",
    type: "datetime",
    section: "sidebar",
    group: "details",
  },
  {
    name: "applyEmail",
    label: "Apply email",
    type: "text",
    placeholder: "careers@africanleadershub.org",
    section: "sidebar",
    group: "details",
  },
];

export const teamFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Ada Okonkwo",
    required: true,
  },
  {
    name: "position",
    label: "Position",
    type: "text",
    placeholder: "Executive Director",
  },
  {
    name: "biography",
    label: "Biography",
    type: "richtext",
    placeholder: "Write a short biography…",
  },
  {
    name: "responsibilities",
    label: "Responsibilities",
    type: "textarea",
    placeholder: "Strategy, partnerships, and organizational leadership",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    section: "sidebar",
    group: "publish",
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
    ],
  },
  {
    name: "imageAssetId",
    label: "Photo",
    type: "asset",
    section: "sidebar",
    group: "media",
  },
  {
    name: "committee",
    label: "Committee",
    type: "text",
    placeholder: "Executive Committee",
    section: "sidebar",
    group: "details",
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "text",
    placeholder: "Nigeria",
    section: "sidebar",
    group: "details",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    placeholder: "ada-okonkwo",
    section: "sidebar",
    group: "details",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    type: "url",
    placeholder: "https://linkedin.com/in/username",
    section: "sidebar",
    group: "social",
  },
  {
    name: "twitter",
    label: "X / Twitter",
    type: "url",
    placeholder: "https://x.com/username",
    section: "sidebar",
    group: "social",
  },
  {
    name: "facebook",
    label: "Facebook",
    type: "url",
    placeholder: "https://facebook.com/username",
    section: "sidebar",
    group: "social",
  },
  {
    name: "instagram",
    label: "Instagram",
    type: "url",
    placeholder: "https://instagram.com/username",
    section: "sidebar",
    group: "social",
  },
];

export const legalFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Privacy Policy",
    required: true,
    maxLength: 70,
    recommendedLength: 60,
    panel: "Overview",
    panelHint: "The page name and short summary shown in listings.",
  },
  {
    name: "excerpt",
    label: "Excerpt",
    type: "textarea",
    placeholder: "A short summary shown in listings",
    maxLength: 160,
    recommendedLength: 155,
    panel: "Overview",
  },
  {
    name: "contentHtml",
    label: "Page content",
    type: "richtext",
    placeholder: "Write the legal page content…",
    panel: "Page",
    panelHint: "The full text visitors read on the public page.",
  },
  {
    name: "published",
    label: "Published",
    type: "switch",
    section: "sidebar",
    group: "publish",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    placeholder: "privacy-policy",
    section: "sidebar",
    group: "details",
  },
  {
    name: "seoTitle",
    label: "SEO title",
    type: "text",
    placeholder: "Privacy Policy | African Leaders Hub",
    maxLength: 60,
    recommendedLength: 55,
    section: "sidebar",
    group: "seo",
    tooltip:
      "The headline that appears in Google and in the browser tab. If you leave this blank, we use the page title. Keep it around 50–60 characters so search engines do not cut it off.",
  },
  {
    name: "seoDescription",
    label: "SEO description",
    type: "textarea",
    placeholder: "A concise search-result summary",
    maxLength: 160,
    recommendedLength: 155,
    section: "sidebar",
    group: "seo",
    tooltip:
      "The short paragraph shown under the title in search results. If blank, we use the excerpt. Aim for about 150–160 characters so the full sentence appears.",
  },
];

export const faqFields: FormField[] = [
  {
    name: "question",
    label: "Question",
    type: "text",
    placeholder: "How can I join a program?",
  },
  {
    name: "answer",
    label: "Answer",
    type: "textarea",
    placeholder: "Explain the answer clearly for visitors",
  },
  {
    name: "published",
    label: "Published",
    type: "switch",
    section: "sidebar",
    group: "publish",
  },
];

export const partnerFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "African Development Bank",
    required: true,
  },
  {
    name: "website",
    label: "Website",
    type: "url",
    placeholder: "https://example.org",
  },
  {
    name: "published",
    label: "Published",
    type: "switch",
    section: "sidebar",
    group: "publish",
  },
  {
    name: "logoAssetId",
    label: "Logo",
    type: "asset",
    section: "sidebar",
    group: "media",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "Institutional partner",
    section: "sidebar",
    group: "details",
  },
];

export const impactFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Leaders trained",
  },
  { name: "value", label: "Value", type: "text", placeholder: "1,200+" },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "What this number represents",
  },
  {
    name: "published",
    label: "Published",
    type: "switch",
    section: "sidebar",
    group: "publish",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "Programs",
    section: "sidebar",
    group: "details",
  },
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
    panel: "Overview",
    panelHint: "The headline and short summary visitors see in listings and search results.",
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
    panel: "Overview",
  },
  {
    name: "contentHtml",
    label: "Article",
    type: "richtext",
    placeholder: "Write the article…",
    panel: "Story",
    panelHint: "The full article on the public news page.",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    options: statusOptions,
    section: "sidebar",
    group: "publish",
  },
  {
    name: "featured",
    label: "Featured",
    type: "switch",
    section: "sidebar",
    group: "publish",
  },
  {
    name: "publishedAt",
    label: "Publish date",
    type: "datetime",
    section: "sidebar",
    group: "publish",
  },
  {
    name: "featuredImageId",
    label: "Image",
    type: "asset",
    section: "sidebar",
    group: "media",
    help: "Used for cards, social previews, and the article banner.",
  },
  {
    name: "category",
    label: "Category",
    type: "category",
    categoryKind: "NEWS",
    section: "sidebar",
    group: "taxonomy",
    groupLabel: "Category",
    required: true,
  },
  {
    name: "tags",
    label: "Tags (one per line)",
    type: "list",
    placeholder: "Leadership\nAlumni",
    section: "sidebar",
    group: "taxonomy",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    placeholder: "alumni-summit-accra",
    section: "sidebar",
    group: "details",
  },
  {
    name: "authorName",
    label: "Author",
    type: "text",
    placeholder: "Communications team",
    section: "sidebar",
    group: "details",
  },
  {
    name: "seoTitle",
    label: "SEO title",
    type: "text",
    placeholder: "Alumni summit opens in Accra | ALH",
    maxLength: 60,
    recommendedLength: 55,
    section: "sidebar",
    group: "seo",
    tooltip:
      "The headline that appears in Google and in the browser tab. If you leave this blank, we use the article title. Keep it around 50–60 characters so search engines do not cut it off.",
  },
  {
    name: "seoDescription",
    label: "SEO description",
    type: "textarea",
    placeholder: "A concise search-result summary",
    maxLength: 160,
    recommendedLength: 155,
    section: "sidebar",
    group: "seo",
    tooltip:
      "The short paragraph shown under the title in search results. If blank, we use the excerpt. Aim for about 150–160 characters so the full sentence appears.",
  },
];
