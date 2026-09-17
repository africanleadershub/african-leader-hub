export const programFields = [
  { name: "title", label: "Title", type: "text" as const },
  { name: "slug", label: "Slug", type: "text" as const },
  { name: "category", label: "Category", type: "text" as const },
  { name: "description", label: "Description", type: "textarea" as const },
  { name: "background", label: "Background", type: "textarea" as const },
  { name: "goal", label: "Goal", type: "textarea" as const },
  { name: "objectives", label: "Objectives (one per line)", type: "list" as const },
  { name: "keyActivities", label: "Key activities (one per line)", type: "list" as const },
  { name: "targetGroups", label: "Target groups (one per line)", type: "list" as const },
  { name: "expectedOutcomes", label: "Expected outcomes (one per line)", type: "list" as const },
  { name: "duration", label: "Duration", type: "text" as const },
  { name: "status", label: "Status", type: "select" as const, options: [
    { label: "Draft", value: "DRAFT" },
    { label: "Published", value: "PUBLISHED" },
    { label: "Archived", value: "ARCHIVED" },
  ]},
  { name: "imageAssetId", label: "Image", type: "asset" as const },
];

export const careerFields = [
  { name: "title", label: "Title", type: "text" as const },
  { name: "slug", label: "Slug", type: "text" as const },
  { name: "department", label: "Department", type: "text" as const },
  { name: "location", label: "Location", type: "text" as const },
  { name: "type", label: "Type", type: "select" as const, options: [
    { label: "Full time", value: "FULL_TIME" },
    { label: "Part time", value: "PART_TIME" },
    { label: "Contract", value: "CONTRACT" },
    { label: "Internship", value: "INTERNSHIP" },
  ]},
  { name: "description", label: "Summary", type: "textarea" as const },
  { name: "detailsHtml", label: "Details", type: "richtext" as const },
  { name: "status", label: "Status", type: "select" as const, options: [
    { label: "Draft", value: "DRAFT" },
    { label: "Published", value: "PUBLISHED" },
    { label: "Archived", value: "ARCHIVED" },
  ]},
];

export const teamFields = [
  { name: "name", label: "Name", type: "text" as const },
  { name: "slug", label: "Slug", type: "text" as const },
  { name: "position", label: "Position", type: "text" as const },
  { name: "committee", label: "Committee", type: "text" as const },
  { name: "responsibilities", label: "Responsibilities", type: "text" as const },
  { name: "nationality", label: "Nationality", type: "text" as const },
  { name: "linkedin", label: "LinkedIn", type: "text" as const },
  { name: "twitter", label: "Twitter", type: "text" as const },
  { name: "biography", label: "Biography", type: "richtext" as const },
  { name: "imageAssetId", label: "Photo", type: "asset" as const },
  { name: "status", label: "Status", type: "select" as const, options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ]},
];

export const legalFields = [
  { name: "title", label: "Title", type: "text" as const },
  { name: "slug", label: "Slug", type: "text" as const },
  { name: "excerpt", label: "Excerpt", type: "textarea" as const },
  { name: "published", label: "Published", type: "select" as const, options: [
    { label: "Published", value: "true" },
    { label: "Hidden", value: "false" },
  ]},
  { name: "contentHtml", label: "Content", type: "richtext" as const },
];

export const faqFields = [
  { name: "question", label: "Question", type: "text" as const },
  { name: "answer", label: "Answer", type: "textarea" as const },
];

export const partnerFields = [
  { name: "name", label: "Name", type: "text" as const },
  { name: "category", label: "Category", type: "text" as const },
  { name: "website", label: "Website", type: "text" as const },
  { name: "logoAssetId", label: "Logo", type: "asset" as const },
];

export const impactFields = [
  { name: "title", label: "Title", type: "text" as const },
  { name: "value", label: "Value", type: "text" as const },
  { name: "description", label: "Description", type: "textarea" as const },
  { name: "category", label: "Category", type: "text" as const },
];
