import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";
import { getOrganizationIdentity, getPublishedLegalPages, getPublishedPrograms, getWebsiteSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [programs, settings, legalPages, identity] = await Promise.all([
    getPublishedPrograms(),
    getWebsiteSettings(),
    getPublishedLegalPages(),
    getOrganizationIdentity(),
  ]);
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navigation
        programs={programs.map((program) => ({
          slug: program.slug,
          title: program.title,
          category: program.category,
          description: program.description,
          imageUrl: program.imageAsset?.url || program.bannerAsset?.url || "/background-pattern-3.jpg",
          featured: program.featured,
        }))}
        settings={{
          siteName: settings?.siteName ?? "African Leaders Hub",
          logoUrl: settings?.logoAsset?.url,
        }}
        identityImage={identity?.heroAsset?.url}
      />
      <main>{children}</main>
      <Footer
        settings={{
          siteName: settings?.siteName ?? "African Leaders Hub",
          tagline: settings?.tagline ?? "Building Africa's Future through People, Purpose, and Possibility",
          email: settings?.emailPrimary ?? "africanleadershub@gmail.com",
          phone: settings?.phonePrimary ?? "+250 788 358 891",
          city: settings?.city ?? "Kigali",
          country: settings?.country ?? "Rwanda",
          logoUrl: settings?.logoAsset?.url,
          socialLinks: Array.isArray(settings?.socialLinks)
            ? (settings.socialLinks as { platform?: string; label?: string; url?: string }[])
            : [],
        }}
        legalPages={legalPages.map((page) => ({ slug: page.slug, title: page.title }))}
      />
    </>
  );
}
