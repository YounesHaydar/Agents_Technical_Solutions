'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { useLanguage } from '../providers/LanguageProvider';

type ProjectImageGalleryProps = {
  images?: string[];
  title?: string;
};

export default function ProjectImageGallery({ images = [], title }: ProjectImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  if (!images?.length) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-950/70 text-zinc-500 dark:text-zinc-500">
        {language === 'ar' ? 'لا توجد صور.' : 'No images available.'}
      </div>
    );
  }

  const currentImage = images?.[activeIndex];

  type FullscreenElement = HTMLDivElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
  };

  type FullscreenDocument = Document & {
    webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void> | void;
  };

  const handlePrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const handleFullscreen = async () => {
    if (!imageContainerRef.current) return;

    try {
      const container = imageContainerRef.current as FullscreenElement;
      const fullscreenDocument = document as FullscreenDocument;

      if (!isFullscreen) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          await container.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (fullscreenDocument.fullscreenElement) {
          await fullscreenDocument.exitFullscreen();
        } else if (fullscreenDocument.webkitFullscreenElement) {
          await fullscreenDocument.webkitExitFullscreen?.();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen request failed:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        ref={imageContainerRef}
        className="overflow-hidden rounded-3xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950/80 relative group"
      >
        <Image
          src={currentImage}
          alt={title ? `${title} image ${activeIndex + 1}` : `Project image ${activeIndex + 1}`}
          width={1280}
          height={720}
          className="aspect-video h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={handleFullscreen}
          className="absolute top-4 right-4 rounded-full bg-black/60 hover:bg-black/80 p-2 text-white opacity-0 group-hover:opacity-100 transition"
          title={language === 'ar' ? 'عرض ملء الشاشة' : 'View fullscreen'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4m-4 0l5 5m11-5v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrevious}
          className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm text-zinc-950 dark:text-zinc-200 transition hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          {language === 'ar' ? 'السابق' : 'Previous'}
        </button>

        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-600'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm text-zinc-950 dark:text-zinc-200 transition hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          {language === 'ar' ? 'التالي' : 'Next'}
        </button>
      </div>
    </div>
  );
}
