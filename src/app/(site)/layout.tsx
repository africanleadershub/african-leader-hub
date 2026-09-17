import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";
import { getPublishedPrograms, getWebsiteSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [programs, settings] = await Promise.all([
    getPublishedPrograms(),
    getWebsiteSettings(),
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
        }))}
        settings={{
          siteName: settings?.siteName ?? "African Leaders Hub",
          logoUrl: settings?.logoAsset?.url,
        }}
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
          socialLinks: Array.isArray(settings?.socialLinks) ? settings.socialLinks : [],
        }}
      />
    </>
  );
}
