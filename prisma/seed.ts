import "dotenv/config";
import { PrismaClient, CareerType } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hashPassword } from "../src/lib/auth/password";
import { programs, programCategories } from "../src/data/programs";
import { sampleNewsArticles, newsCategories } from "../src/data/news";
import { slugify } from "../src/lib/slug";
import { currentCareers } from "../src/data/careers";
import {
  executiveCommittee,
  auditCommittee,
  conflictResolutionCommittee,
} from "../src/data/team";
import { impactStats } from "../src/data/impact";
import { privacyPolicyContent } from "../src/data/privacy-policy";
import { termsOfServiceContent } from "../src/data/terms-of-service";
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const IDENTITY_VALUES = [
  { title: "Empowerment", description: "Building confidence and capabilities in every individual", icon: "Users" },
  { title: "Integrity", description: "Maintaining the highest ethical standards in all actions", icon: "Shield" },
  { title: "Collaboration", description: "Working together for greater collective impact", icon: "Handshake" },
  { title: "Compassion", description: "Serving communities with empathy and understanding", icon: "Heart" },
];

const FAQS = [
  {
    question: "How can I support ALH?",
    answer:
      "You can support us through donations, volunteering, or partnerships. Visit our Get Involved page to learn more about the different ways you can help.",
  },
  {
    question: "Where does ALH operate?",
    answer:
      "We are based in Rwanda and operate primarily in East Africa, with programs reaching communities across the region.",
  },
  {
    question: "How can I volunteer with ALH?",
    answer:
      "We welcome volunteers with various skills and backgrounds. Fill out our volunteer application form on the Get Involved page.",
  },
  {
    question: "What programs does ALH offer?",
    answer:
      "We offer programs in youth empowerment, environmental protection, civic education, women's empowerment, education, and healthcare.",
  },
  {
    question: "How can my organization partner with ALH?",
    answer:
      "We collaborate with government agencies, NGOs, and private organizations. Submit a partnership inquiry from the Get Involved page.",
  },
];

const IMAGE_PARTNERS = [
  { name: "National Unity and Reconciliation Commission", category: "Government Agency", logo: "/logos/National-Unity-Reconciliation-Rwanda-Logo-Vector.svg-.png" },
  { name: "Rwanda Governance Board (RGB)", category: "Government Agency", logo: "/logos/rgb_logo.jpg" },
  { name: "Never Again Rwanda", category: "Local NGO", logo: "/logos/never-again-rwanda-logo.png" },
  { name: "Transparency International", category: "International NGO", logo: "/logos/transparency-international-logo.png" },
];

function careerType(value: string): CareerType {
  switch (value) {
    case "part-time":
      return "PART_TIME";
    case "contract":
      return "CONTRACT";
    case "internship":
      return "INTERNSHIP";
    default:
      return "FULL_TIME";
  }
}

async function upsertExternalAsset(url: string, title: string) {
  const publicId = `local:${url}`;
  return prisma.asset.upsert({
    where: { publicId },
    update: { url, title, alt: title, active: true },
    create: {
      source: "EXTERNAL",
      kind: "IMAGE",
      publicId,
      url,
      title,
      alt: title,
      folder: "local",
      active: true,
    },
  });
}

async function main() {
  const adminEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL || "africanleadershub@gmail.com").toLowerCase();
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_BOOTSTRAP_PASSWORD is required to seed the admin user");
  }

  const passwordHash = await hashPassword(adminPassword);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      firstName: process.env.ADMIN_BOOTSTRAP_FIRST_NAME || "African",
      lastName: process.env.ADMIN_BOOTSTRAP_LAST_NAME || "Leaders Hub Admin",
      password: passwordHash,
      role: "ADMIN",
      active: true,
    },
  });

  await prisma.websiteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "African Leaders Hub",
      tagline: "Building Africa's Future through People, Purpose, and Possibility",
      city: "Kigali",
      country: "Rwanda",
      phonePrimary: "+250 788 358 891",
      emailPrimary: "africanleadershub@gmail.com",
      socialLinks: [
        { platform: "twitter", label: "Twitter", url: "https://twitter.com/A_LeadersHub" },
        { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/african-leaders-hub" },
        { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/a_leadershub/" },
      ],
    },
  });

  await prisma.organizationIdentity.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      mission:
        "To empower youth, children, and women as ethical leaders for sustainable African development. We address systemic challenges like poverty, gender inequality, climate change, unemployment, and rights violations through holistic development programs that combine education, rights awareness, entrepreneurship, and environmental action.",
      vision:
        "A resilient Africa led by informed, innovative generations. We envision a continent where every young person has access to quality education, understands their rights, and has the skills and opportunities to become ethical leaders who drive sustainable development in their communities.",
      background:
        "African Leaders Hub (ALH) was founded to address the critical challenges facing Africa's youth, children, and women. Based in Rwanda, we operate across East Africa, focusing on the most pressing issues affecting our communities.\n\nOur work addresses challenges like teenage pregnancies (22,000+ cases annually in Rwanda), gender-based violence (37% of women affected), deforestation (37,000 hectares lost), unemployment among graduates, and widespread rights violations.\n\nThrough community-led programs, strategic partnerships, and data-driven approaches, we create sustainable solutions that empower individuals and transform communities. Our programs are designed to be scalable, replicable, and aligned with national development strategies.",
      values: IDENTITY_VALUES,
    },
  });

  for (const [index, name] of newsCategories.entries()) {
    await prisma.contentCategory.upsert({
      where: { kind_slug: { kind: "NEWS", slug: slugify(name) } },
      update: { name, sortOrder: index },
      create: { kind: "NEWS", name, slug: slugify(name), sortOrder: index },
    });
  }
  for (const [index, name] of programCategories.entries()) {
    await prisma.contentCategory.upsert({
      where: { kind_slug: { kind: "PROGRAM", slug: slugify(name) } },
      update: { name, sortOrder: index },
      create: { kind: "PROGRAM", name, slug: slugify(name), sortOrder: index },
    });
  }

  await prisma.legalPage.upsert({
    where: { slug: "privacy-policy" },
    update: {},
    create: {
      slug: "privacy-policy",
      title: "Privacy Policy",
      excerpt: "How African Leaders Hub collects, uses, and protects your information.",
      contentHtml: privacyPolicyContent,
      published: true,
      sortOrder: 1,
      seoTitle: "Privacy Policy - African Leaders Hub",
    },
  });

  await prisma.legalPage.upsert({
    where: { slug: "terms-of-service" },
    update: {},
    create: {
      slug: "terms-of-service",
      title: "Terms of Service",
      excerpt: "Terms governing use of the African Leaders Hub website and programs.",
      contentHtml: termsOfServiceContent,
      published: true,
      sortOrder: 2,
      seoTitle: "Terms of Service - African Leaders Hub",
    },
  });

  for (const [index, faq] of FAQS.entries()) {
    const existing = await prisma.faq.findFirst({ where: { question: faq.question } });
    if (!existing) {
      await prisma.faq.create({
        data: { ...faq, sortOrder: index + 1, published: true },
      });
    }
  }

  for (const [index, program] of programs.entries()) {
    const image = await upsertExternalAsset(program.image, program.title);
    const banner = await upsertExternalAsset(program.bannerImage, `${program.title} banner`);
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: {},
      create: {
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
        implementationPlan: program.implementationPlan,
        partners: program.partners,
        duration: program.duration,
        budget: program.budget,
        imageAssetId: image.id,
        bannerAssetId: banner.id,
        status: "PUBLISHED",
        sortOrder: index + 1,
        seoTitle: `${program.title} - African Leaders Hub`,
        seoDescription: program.description,
      },
    });
  }

  const team = [
    ...executiveCommittee,
    ...auditCommittee,
    ...conflictResolutionCommittee,
  ];
  for (const [index, member] of team.entries()) {
    const image = await upsertExternalAsset(member.image, member.name);
    await prisma.teamMember.upsert({
      where: { slug: member.id },
      update: {},
      create: {
        slug: member.id,
        name: member.name,
        position: member.position,
        committee: member.committee,
        responsibilities: member.responsibilities,
        biography: member.biography,
        nationality: member.nationality,
        linkedin: member.linkedin,
        twitter: member.twitter,
        facebook: member.facebook,
        instagram: member.instagram,
        imageAssetId: image.id,
        status: "ACTIVE",
        sortOrder: index + 1,
      },
    });
  }

  for (const [index, partner] of IMAGE_PARTNERS.entries()) {
    const logo = await upsertExternalAsset(partner.logo, partner.name);
    const existing = await prisma.partner.findFirst({ where: { name: partner.name } });
    if (!existing) {
      await prisma.partner.create({
        data: {
          name: partner.name,
          category: partner.category,
          logoAssetId: logo.id,
          published: true,
          sortOrder: index + 1,
        },
      });
    }
  }

  for (const [index, stat] of impactStats.entries()) {
    const existing = await prisma.impactStat.findFirst({ where: { title: stat.title } });
    if (!existing) {
      await prisma.impactStat.create({
        data: {
          title: stat.title,
          value: stat.value,
          description: stat.description,
          category: stat.category,
          published: true,
          sortOrder: index + 1,
        },
      });
    }
  }

  for (const article of sampleNewsArticles) {
    const featured = await upsertExternalAsset(article.image, article.title);
    const banner = await upsertExternalAsset(article.bannerImage, `${article.title} banner`);
    await prisma.post.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        contentHtml: article.content,
        authorName: article.author,
        category: article.category,
        tags: article.tags ?? [],
        featuredImageId: featured.id,
        bannerImageId: banner.id,
        featured: Boolean(article.featured),
        status: "PUBLISHED",
        publishedAt: new Date(article.date),
        readTime: article.readTime,
        seoTitle: article.title,
        seoDescription: article.excerpt,
      },
    });
  }

  for (const career of currentCareers) {
    await prisma.career.upsert({
      where: { slug: career.slug },
      update: {},
      create: {
        slug: career.slug,
        title: career.title,
        department: career.department,
        location: career.location,
        type: careerType(career.type),
        description: career.description,
        detailsHtml: career.detailsHtml,
        applicationDeadline: career.applicationDeadline
          ? new Date(career.applicationDeadline)
          : undefined,
        postedAt: new Date(career.postedDate),
        featured: Boolean(career.featured),
        status: "PUBLISHED",
      },
    });
  }

  console.log("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
