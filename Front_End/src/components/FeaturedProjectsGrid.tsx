"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useLanguage } from '../providers/LanguageProvider';

type Project = {
  _id?: string;
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  images?: string[];
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
} satisfies Variants;

export default function FeaturedProjectsGrid({ projects, fullWidth = false }: { projects: Project[]; fullWidth?: boolean }) {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Delete action removed per UI update — deletion is handled elsewhere

  const getTitle = (project: Project) => {
    return language === 'ar' ? project.titleAr : project.titleEn;
  };

  const getDescription = (project: Project) => {
    return language === 'ar' ? project.descriptionAr : project.descriptionEn;
  };

  return (
    <div className={`grid gap-6 ${fullWidth ? 'grid-cols-1' : 'sm:grid-cols-2 mt-10'}`}>
      {projects.map((p, idx) => (
        <motion.div 
          key={p._id ?? idx} 
          variants={item} 
          initial="visible" 
          animate="visible"
          className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 shadow-lg shadow-slate-900/10 transition-colors dark:border-slate-800/80 dark:bg-slate-950/80 dark:shadow-black/40"
        >
          <Link href={`/projects/${p._id ?? ''}`} className="block">
            <div className="relative h-64 w-full overflow-hidden bg-zinc-200 dark:bg-slate-900/80">
              {(() => {
                const first = p.images?.[0];
                return first ? (
                  <Image
                    src={first}
                    alt={getTitle(p) || (isArabic ? 'صورة المشروع' : 'Project image')}
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover blur-up transition-transform duration-500 group-hover:scale-105"
                    onLoad={(e) => (e.currentTarget.classList.remove('blur-up'))}
                  />
                ) : null;
              })()}
              {/* Initial gradient and title overlay */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-opacity duration-300 group-hover:opacity-0 dark:from-slate-950/95 dark:via-slate-950/35" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-2xl font-semibold text-white">{getTitle(p)}</h3>
              </div>
              
              {/* Description overlay on hover (CSS-only) */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-slate-950/90 p-6 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-slate-950/95">
                <p className="mb-4 text-sm leading-relaxed text-white/95 dark:text-slate-100">
                  {getDescription(p)}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); e.preventDefault(); router.push(`/projects/${p._id ?? ''}`); }}
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors w-fit bg-transparent"
                  >
                    {isArabic ? 'اقرأ المزيد ←' : 'Read More →'}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
