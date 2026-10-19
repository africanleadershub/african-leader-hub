"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export type GalleryImage = {
  url: string;
  alt: string;
};

export function ProgramGallery({
  images,
  title,
  className,
}: {
  images: GalleryImage[];
  title: string;
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const photos = images.slice(0, 8);

  useEffect(() => {
    if (!api || photos.length <= 1) return;

    const autoPlay = window.setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => window.clearInterval(autoPlay);
  }, [api, photos.length]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      <Carousel
        opts={{ loop: true, align: "start" }}
        setApi={setApi}
        className="relative"
      >
        <div className="overflow-hidden rounded-[28px] border border-[#8B4513]/10 bg-stone-100 shadow-[0_20px_50px_-28px_rgba(74,46,23,0.45)]">
          <CarouselContent className="h-[280px] sm:h-[420px]">
            {photos.map((image, index) => (
              <CarouselItem key={`${image.url}-${index}`} className="basis-full pl-0">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt || `${title} photo ${index + 1}`}
                    fill
                    className="h-full w-full object-cover transition-transform duration-500"
                    style={{ objectPosition: "center center" }}
                    sizes="(min-width: 1280px) 45vw, (min-width: 768px) 70vw, 100vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                        Program highlight
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white sm:text-2xl">
                        {title}
                      </p>
                    </div>
                    <div className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                      {index + 1} / {photos.length}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {photos.length > 1 && (
            <>
              <CarouselPrevious className="left-3 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border border-white/30 bg-white/80 text-[#3b2a20] shadow-lg backdrop-blur-sm hover:bg-white disabled:opacity-40" />
              <CarouselNext className="right-3 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border border-white/30 bg-white/80 text-[#3b2a20] shadow-lg backdrop-blur-sm hover:bg-white disabled:opacity-40" />
            </>
          )}
        </div>

        {photos.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {photos.map((image, index) => (
              <button
                key={`${image.url}-dot-${index}`}
                type="button"
                aria-label={`View slide ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  selectedIndex === index ? "w-8 bg-[#8B4513]" : "w-2.5 bg-[#8B4513]/30 hover:bg-[#8B4513]/50"
                )}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}
