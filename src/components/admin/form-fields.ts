export const programFields = [
  { name: "title", label: "Title", type: "text" as const, placeholder: "Youth Leadership Fellowship" },
  { name: "slug", label: "Slug", type: "text" as const, placeholder: "youth-leadership-fellowship" },
  { name: "category", label: "Category", type: "text" as const, placeholder: "Leadership" },
  { name: "description", label: "Description", type: "textarea" as const, placeholder: "Summarize the program in a few sentences" },
  { name: "background", label: "Background", type: "textarea" as const, placeholder: "Why this program exists and who it serves" },
  { name: "goal", label: "Goal", type: "textarea" as const, placeholder: "The primary outcome you want to achieve" },
  { name: "objectives", label: "Objectives (one per line)", type: "list" as const, placeholder: "Build leadership capacity\nConnect alumni across countries" },
  { name: "keyActivities", label: "Key activities (one per line)", type: "list" as const, placeholder: "Workshops\nMentorship\nField visits" },
  { name: "targetGroups", label: "Target groups (one per line)", type: "list" as const, placeholder: "University students\nEarly-career professionals" },
  { name: "expectedOutcomes", label: "Expected outcomes (one per line)", type: "list" as const, placeholder: "50 graduates per cohort\nRegional alumni network" },
  { name: "duration", label: "Duration", type: "text" as const, placeholder: "12 months" },
  { name: "status", label: "Status", type: "select" as const, placeholder: "Select status", options: [
    { label: "Draft", value: "DRAFT" },
    { label: "Published", value: "PUBLISHED" },
    { label: "Archived", value: "ARCHIVED" },
  ]},
  { name: "imageAssetId", label: "Image", type: "asset" as const },
];

export const careerFields = [
  { name: "title", label: "Title", type: "text" as const, placeholder: "Program Manager" },
  { name: "slug", label: "Slug", type: "text" as const, placeholder: "program-manager" },
  { name: "department", label: "Department", type: "text" as const, placeholder: "Programs" },
  { name: "location", label: "Location", type: "text" as const, placeholder: "Kigali, Rwanda" },
  { name: "type", label: "Type", type: "select" as const, placeholder: "Select employment type", options: [
    { label: "Full time", value: "FULL_TIME" },
    { label: "Part time", value: "PART_TIME" },
    { label: "Contract", value: "CONTRACT" },
    { label: "Internship", value: "INTERNSHIP" },
  ]},
  { name: "description", label: "Summary", type: "textarea" as const, placeholder: "A short overview of the role and who should apply" },
  { name: "detailsHtml", label: "Details", type: "richtext" as const, placeholder: "Add responsibilities, requirements, and how to apply…" },
  { name: "status", label: "Status", type: "select" as const, placeholder: "Select status", options: [
    { label: "Draft", value: "DRAFT" },
    { label: "Published", value: "PUBLISHED" },
    { label: "Archived", value: "ARCHIVED" },
  ]},
];

export const teamFields = [
  { name: "name", label: "Name", type: "text" as const, placeholder: "Ada Okonkwo" },
  { name: "slug", label: "Slug", type: "text" as const, placeholder: "ada-okonkwo" },
  { name: "position", label: "Position", type: "text" as const, placeholder: "Executive Director" },
  { name: "committee", label: "Committee", type: "text" as const, placeholder: "Executive Committee" },
  { name: "responsibilities", label: "Responsibilities", type: "text" as const, placeholder: "Strategy, partnerships, and organizational leadership" },
  { name: "nationality", label: "Nationality", type: "text" as const, placeholder: "Nigeria" },
  { name: "linkedin", label: "LinkedIn", type: "text" as const, placeholder: "https://linkedin.com/in/username" },
  { name: "twitter", label: "Twitter", type: "text" as const, placeholder: "https://x.com/username" },
  { name: "biography", label: "Biography", type: "richtext" as const, placeholder: "Write a short biography…" },
  { name: "imageAssetId", label: "Photo", type: "asset" as const },
  { name: "status", label: "Status", type: "select" as const, placeholder: "Select status", options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ]},
];

export const legalFields = [
  { name: "title", label: "Title", type: "text" as const, placeholder: "Privacy Policy" },
  { name: "slug", label: "Slug", type: "text" as const, placeholder: "privacy-policy" },
  { name: "excerpt", label: "Excerpt", type: "textarea" as const, placeholder: "A short summary shown in listings" },
  { name: "published", label: "Published", type: "select" as const, placeholder: "Select visibility", options: [
    { label: "Published", value: "true" },
    { label: "Hidden", value: "false" },
  ]},
  { name: "contentHtml", label: "Content", type: "richtext" as const, placeholder: "Write the legal page content…" },
];

export const faqFields = [
  { name: "question", label: "Question", type: "text" as const, placeholder: "How can I join a program?" },
  { name: "answer", label: "Answer", type: "textarea" as const, placeholder: "Explain the answer clearly for visitors" },
];

export const partnerFields = [
  { name: "name", label: "Name", type: "text" as const, placeholder: "African Development Bank" },
  { name: "category", label: "Category", type: "text" as const, placeholder: "Institutional partner" },
  { name: "website", label: "Website", type: "text" as const, placeholder: "https://example.org" },
  { name: "logoAssetId", label: "Logo", type: "asset" as const },
];

export const impactFields = [
  { name: "title", label: "Title", type: "text" as const, placeholder: "Leaders trained" },
  { name: "value", label: "Value", type: "text" as const, placeholder: "1,200+" },
  { name: "description", label: "Description", type: "textarea" as const, placeholder: "What this number represents" },
  { name: "category", label: "Category", type: "text" as const, placeholder: "Programs" },
];

export const postFields = [
  { name: "title", label: "Title", type: "text" as const, placeholder: "Alumni summit opens in Accra" },
  { name: "slug", label: "Slug", type: "text" as const, placeholder: "alumni-summit-accra" },
  { name: "excerpt", label: "Excerpt", type: "textarea" as const, placeholder: "A short summary for cards and search results" },
  { name: "category", label: "Category", type: "text" as const, placeholder: "News" },
  { name: "authorName", label: "Author", type: "text" as const, placeholder: "Communications team" },
  { name: "status", label: "Status", type: "select" as const, placeholder: "Select status", options: [
    { label: "Draft", value: "DRAFT" },
    { label: "Published", value: "PUBLISHED" },
    { label: "Archived", value: "ARCHIVED" },
  ]},
  { name: "featuredImageId", label: "Featured image", type: "asset" as const },
  { name: "contentHtml", label: "Content", type: "richtext" as const, placeholder: "Write the article…" },
];
