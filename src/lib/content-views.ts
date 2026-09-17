type ProgramLike = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  background: string;
  goal: string;
  objectives: string[];
  keyActivities: string[];
  targetGroups: string[];
  expectedOutcomes: string[];
  implementationPlan?: string | null;
  partners: string[];
  duration?: string | null;
  budget?: string | null;
  imageAsset?: { url: string } | null;
  bannerAsset?: { url: string } | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

type PostLike = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  publishedAt?: string | Date | null;
  createdAt: string | Date;
  authorName: string;
  category: string;
  featured: boolean;
  tags: string[];
  readTime?: string | null;
  featuredImage?: { url: string } | null;
  bannerImage?: { url: string } | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

type CareerLike = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  detailsHtml: string;
  applicationDeadline?: string | Date | null;
  postedAt: string | Date;
  featured: boolean;
};

export function toProgramView(program: ProgramLike) {
  return {
    id: program.id,
    slug: program.slug,
    title: program.title,
    category: program.category,
    description: program.description,
    background: program.background,
    goal: program.goal,
    objectives: program.objectives,
    keyActivities: program.keyActivities,
    targetGroups: program.targetGroups,
    expectedOutcomes: program.expectedOutcomes,
    implementationPlan: program.implementationPlan || undefined,
    partners: program.partners,
    duration: program.duration || undefined,
    budget: program.budget || undefined,
    image: program.imageAsset?.url || program.bannerAsset?.url || "/background-pattern-3.jpg",
    bannerImage: program.imageAsset?.url || program.bannerAsset?.url || "/hero-image.jpg",
    seoTitle: program.seoTitle || undefined,
    seoDescription: program.seoDescription || undefined,
  };
}

export function toPostView(post: PostLike) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.contentHtml,
    date: new Date(post.publishedAt ?? post.createdAt).toISOString(),
    author: post.authorName,
    category: post.category,
    image: post.featuredImage?.url || post.bannerImage?.url || "/hero-image.jpg",
    bannerImage: post.featuredImage?.url || post.bannerImage?.url || "/hero-image.jpg",
    featured: post.featured,
    tags: post.tags,
    readTime: post.readTime || undefined,
    seoTitle: post.seoTitle || undefined,
    seoDescription: post.seoDescription || undefined,
  };
}

export type ProgramView = ReturnType<typeof toProgramView>;
export type PostView = ReturnType<typeof toPostView>;
export type CareerView = ReturnType<typeof toCareerView>;

export function toCareerView(career: CareerLike) {
  return {
    id: career.id,
    slug: career.slug,
    title: career.title,
    department: career.department,
    location: career.location,
    type: career.type.toLowerCase().replaceAll("_", "-") as
      | "full-time"
      | "part-time"
      | "contract"
      | "internship",
    description: career.description,
    detailsHtml: career.detailsHtml,
    applicationDeadline: career.applicationDeadline
      ? new Date(career.applicationDeadline).toISOString()
      : undefined,
    postedDate: new Date(career.postedAt).toISOString(),
    featured: career.featured,
  };
}
