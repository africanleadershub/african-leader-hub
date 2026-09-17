import { MetadataRoute } from "next";
import { getPublishedPrograms, getPublishedPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://africanleadershub.org";
  const [programs, posts] = await Promise.all([getPublishedPrograms(), getPublishedPosts()]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/programs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/get-involved`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  return [
    ...staticPages,
    ...programs.map((program) => ({
      url: `${baseUrl}/programs/${program.slug}`,
      lastModified: program.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
