"use client";

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/sanity'; 
import type { Project } from '../types';
import { useLanguage } from '../providers/LanguageProvider';

// 1. Re-added your missing Prop Types
type ProjectPreviewCardProps = {
  project?: Project;
};

// 2. Re-added your missing formatting function
function formatDate(date?: string, language: 'en' | 'ar' = 'en') {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(language === 'ar' ? 'ar' : 'en', {
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
}

// 3. The updated component with Sanity image optimization
export default function ProjectPreviewCard({ project }: ProjectPreviewCardProps) {
  const { language } = useLanguage();

  // Extract the first image
  const rawImage = project?.images?.[0];
  
  // Build the optimized URL (800px width) if the image exists
  const imageUrl = rawImage ? urlFor(rawImage).width(800).url() : null;
  
  const completed = formatDate(project?.completionDate, language);
  const projectTitle = language === 'ar'
    ? project?.titleAr ?? project?.titleEn ?? 'مشروع بلا عنوان'
    : project?.titleEn ?? project?.titleAr ?? 'Untitled project';
  const projectDescription = language === 'ar'
    ? project?.descriptionAr ?? project?.descriptionEn ?? 'موقع مخصص لعرض الخدمات وإبراز جودة العمل.'
    : project?.descriptionEn ?? project?.descriptionAr ?? 'A custom built website designed to present services and prove the quality of the work.';

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 shadow-lg shadow-black/5 dark:shadow-black/20 transition hover:-translate-y-1 hover:border-zinc-400 dark:hover:border-zinc-700">
      <Link href={`/projects/${project?._id ?? ''}`} className="block">
        <div className="aspect-video bg-zinc-200 dark:bg-zinc-950/80">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={projectTitle ? (language === 'ar' ? `معاينة ${projectTitle}` : `${projectTitle} preview`) : (language === 'ar' ? 'معاينة المشروع' : 'Project preview')}
              width={800} // Matches the Sanity optimized width
              height={450}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-500">
            <span>{project?.client ?? (language === 'ar' ? 'مشروع عميل' : 'Customer project')}</span>
            <span>{completed ?? (language === 'ar' ? 'قيد التنفيذ' : 'In progress')}</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-zinc-950 dark:text-white">{projectTitle}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {projectDescription}
          </p>
        </div>
      </Link>
    </article>
  );
}
