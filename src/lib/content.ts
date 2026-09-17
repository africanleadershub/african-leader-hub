import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getWebsiteSettings = cache(async () => {
  const settings = await prisma.websiteSettings.findUnique({
    where: { id: "default" },
    include: { logoAsset: true },
  });
  return settings;
});

export const getOrganizationIdentity = cache(async () => {
  return prisma.organizationIdentity.findUnique({
    where: { id: "default" },
    include: { heroAsset: true },
  });
});

export const getPublishedPrograms = cache(async () => {
  return prisma.program.findMany({
    where: { status: "PUBLISHED" },
    include: { imageAsset: true, bannerAsset: true },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
});

export const getPublishedTeam = cache(async () => {
  return prisma.teamMember.findMany({
    where: { status: "ACTIVE" },
    include: { imageAsset: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
});

export const getPublishedPartners = cache(async () => {
  return prisma.partner.findMany({
    where: { published: true },
    include: { logoAsset: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
});

export const getPublishedImpact = cache(async () => {
  return prisma.impactStat.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
});

export const getPublishedFaqs = cache(async () => {
  return prisma.faq.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
});

export const getPublishedLegalPages = cache(async () => {
  return prisma.legalPage.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
});

export const getPublishedPosts = cache(async () => {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: { featuredImage: true, bannerImage: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
});

export const getPublishedCareers = cache(async () => {
  return prisma.career.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { postedAt: "desc" }],
  });
});

export const getProgramBySlug = cache(async (slug: string) => {
  return prisma.program.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { imageAsset: true, bannerAsset: true },
  });
});

export const getPostBySlug = cache(async (slug: string) => {
  return prisma.post.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { featuredImage: true, bannerImage: true },
  });
});

export const getCareerBySlug = cache(async (slug: string) => {
  return prisma.career.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
});

export const getLegalPageBySlug = cache(async (slug: string) => {
  return prisma.legalPage.findFirst({
    where: { slug, published: true },
  });
});

export function publicContact(settings: Awaited<ReturnType<typeof getWebsiteSettings>>) {
  const email = settings?.emailPrimary || "africanleadershub@gmail.com";
  const phone = settings?.phonePrimary || "+250 788 358 891";
  return {
    email,
    phone,
    telHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
    mailHref: `mailto:${email}`,
    location: `${settings?.city || "Kigali"}, ${settings?.country || "Rwanda"}`,
  };
}
