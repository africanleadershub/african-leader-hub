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
