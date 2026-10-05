import Image from "next/image";
import { cn } from "@/lib/utils";

type PartnerLogoItem = {
  id: string;
  name: string;
  website?: string | null;
  logoAsset?: { url: string; alt?: string | null } | null;
};

export function PartnerLogos({
  partners,
  className,
}: {
  partners: PartnerLogoItem[];
  className?: string;
}) {
  if (partners.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-4", className)}>
      {partners.map((partner) => {
        const logo = partner.logoAsset?.url ? (
          <Image
            src={partner.logoAsset.url}
            alt={partner.logoAsset.alt || partner.name}
            width={180}
            height={72}
            className="h-11 w-auto max-h-11 max-w-[8.5rem] object-contain"
          />
        ) : (
          <span className="text-sm font-medium text-gray-800">{partner.name}</span>
        );

        return (
          <li key={partner.id} className="flex min-w-0 items-center">
            {partner.website ? (
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                title={partner.name}
                className="flex items-center opacity-90 transition hover:opacity-100"
              >
                {logo}
              </a>
            ) : (
              <div title={partner.name} className="flex items-center">
                {logo}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
