import Image from "next/image";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  url: string;
  alt: string;
};

function cellClass(count: number, index: number) {
  if (count === 1) return "col-span-6 row-span-6";
  if (count === 2) return "col-span-3 row-span-6";
  if (count === 3) return index === 0 ? "col-span-4 row-span-6" : "col-span-2 row-span-3";
  if (count === 4) return index === 0 ? "col-span-4 row-span-6" : "col-span-2 row-span-2";
  return index === 0 ? "col-span-4 row-span-4" : "col-span-2 row-span-2";
}

export function ProgramGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  if (images.length === 0) return null;
  const photos = images.slice(0, 5);

  return (
    <div className="grid h-[280px] grid-cols-6 grid-rows-6 gap-3 sm:h-[420px]">
      {photos.map((image, index) => (
        <div key={`${image.url}-${index}`} className={cn("relative overflow-hidden rounded-2xl bg-stone-200", cellClass(photos.length, index))}>
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
