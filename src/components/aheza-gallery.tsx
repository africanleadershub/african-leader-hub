'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export type AhezaGalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export function AhezaGallery({ images, title }: { images: AhezaGalleryImage[]; title: string }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = images.slice(0, 8);

  useEffect(() => {
    if (!api || slides.length <= 1) return;

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [api, slides.length]);

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

  if (!slides.length) return null;

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#8B4513]/10 bg-white p-2 shadow-[0_22px_60px_-32px_rgba(60,38,20,0.45)]">
      <Carousel opts={{ loop: true, align: "start" }} setApi={setApi} className="relative">
        <CarouselContent className="h-[300px] sm:h-[420px]">
          {slides.map((image, index) => (
            <CarouselItem key={`${image.src}-${index}`} className="basis-full pl-0">
              <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-stone-200">
                <Image
                  src={image.src}
                  alt={image.alt || `${title} photo ${index + 1}`}
                  fill
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1280px) 70vw, 100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">ALH Gallery</p>
                  {image.caption ? (
                    <p className="mt-2 max-w-lg text-base font-semibold text-white sm:text-xl">{image.caption}</p>
                  ) : (
                    <p className="mt-2 max-w-lg text-base font-semibold text-white sm:text-xl">{title}</p>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {slides.length > 1 && (
          <>
            <CarouselPrevious className="left-3 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border border-white/30 bg-white/85 text-[#3b2a20] shadow-lg backdrop-blur-sm hover:bg-white disabled:opacity-40" aria-label="Previous image">
              <ChevronLeft className="h-5 w-5" />
            </CarouselPrevious>
            <CarouselNext className="right-3 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border border-white/30 bg-white/85 text-[#3b2a20] shadow-lg backdrop-blur-sm hover:bg-white disabled:opacity-40" aria-label="Next image">
              <ChevronRight className="h-5 w-5" />
            </CarouselNext>
          </>
        )}
      </Carousel>

      {slides.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((image, index) => (
            <button
              key={`${image.src}-thumb-${index}`}
              type="button"
              aria-label={`Select image ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                selectedIndex === index ? "w-8 bg-[#8B4513]" : "w-2.5 bg-[#8B4513]/30 hover:bg-[#8B4513]/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
