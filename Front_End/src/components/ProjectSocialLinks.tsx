'use client';

import React from 'react';
import { useLanguage } from '../providers/LanguageProvider';

type ProjectSocialLinkItem = {
  platform?: string | null;
  url?: string | null;
  labelEn?: string | null;
  labelAr?: string | null;
};

function getPlatformDisplayNameFromKey(key?: string) {
  if (!key) return 'Social';
  const k = key.toLowerCase();
  switch (k) {
    case 'facebook':
      return 'Facebook';
    case 'instagram':
      return 'Instagram';
    case 'twitter':
      return 'X';
    case 'linkedin':
      return 'LinkedIn';
    case 'github':
      return 'GitHub';
    case 'youtube':
      return 'YouTube';
    case 'tiktok':
      return 'TikTok';
    case 'pinterest':
      return 'Pinterest';
    case 'behance':
      return 'Behance';
    case 'dribbble':
      return 'Dribbble';
    default:
      return 'Social';
  }
}

export default function ProjectSocialLinks({ links }: { links?: ProjectSocialLinkItem[] | null }) {
  const { language } = useLanguage();

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 grid gap-3">
      {links.map((link, index) => {
        const platformName = getPlatformDisplayNameFromKey(link?.platform ?? undefined);
        const display = language === 'ar' ? (link?.labelAr || platformName) : (link?.labelEn || platformName);

        return (
          <a
            key={`${link?.platform ?? 'social'}-${index}`}
            href={link?.url ?? '#'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition font-medium"
          >
            {display}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
      })}
    </div>
  );
}
