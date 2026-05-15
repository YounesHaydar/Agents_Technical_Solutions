'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { urlFor } from '../lib/sanity';
import { useLanguage } from '../providers/LanguageProvider';

type ProjectImageGalleryProps = {
  images?: any[]; 
  title?: string;
};

export default function ProjectImageGallery({ images = [], title }: ProjectImageGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const { language } = useLanguage();

  if (!images?.length) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-100 text-zinc-500">
        {language === 'ar' ? 'لا توجد صور.' : 'No images available.'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* The Carousel Viewport */}
      <div className="overflow-hidden rounded-3xl border border-zinc-300 dark:border-zinc-800" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div className="relative min-w-0 flex-[0_0_100%]" key={index}>
              <Image
                src={urlFor(img).width(1280).url()}
                alt={`${title} image ${index + 1}`}
                width={1280}
                height={720}
                className="aspect-video h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-950 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          {language === 'ar' ? 'السابق' : 'Previous'}
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-950 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          {language === 'ar' ? 'التالي' : 'Next'}
        </button>
      </div>
    </div>
  );
}