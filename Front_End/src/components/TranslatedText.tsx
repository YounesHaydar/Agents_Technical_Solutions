'use client';

import { useState } from 'react';
import React from 'react';

type TextId =
  | 'projects.heading'
  | 'projects.title'
  | 'projects.subtitle'
  | 'projects.back'
  | 'projects.noProjects'
  | 'image.noImages'
  | 'gallery.back'
  | 'project.socialLinks'
  | 'project.notes'
  | 'project.noLinks'
  | 'project.clientFallback'
  | 'completion.unavailable'
  | 'button.previous'
  | 'button.next';

const DICT: Record<string, { en: string; ar: string }> = {
  'projects.heading': {
    en: 'Project gallery',
    ar: 'معرض المشاريع',
  },
  'projects.title': {
    en: 'Work shown clearly for customers.',
    ar: 'أعمال معروضة بوضوح للعملاء.',
  },
  'projects.subtitle': {
    en: 'Browse completed projects, open the project detail view, and see the kind of work available for clients.',
    ar: 'تصفح المشاريع المنجزة، افتح تفاصيل المشروع، وشاهد نوع العمل المتاح للعملاء.',
  },
  'projects.back': { en: 'Back to home', ar: 'العودة للرئيسية' },
  'projects.noProjects': { en: 'No projects found yet. Add project documents in Sanity to populate the gallery.', ar: 'لا توجد مشاريع حتى الآن. أضف مستندات مشروع في Sanity لملء المعرض.' },
  'image.noImages': { en: 'No images available.', ar: 'لا توجد صور.' },
  'gallery.back': { en: 'Back to gallery', ar: 'العودة للمعرض' },
  'project.socialLinks': { en: 'Social links', ar: 'الروابط الاجتماعية' },
  'project.notes': { en: 'Project notes', ar: 'ملاحظات المشروع' },
  'project.noLinks': { en: 'No social links were added for this project.', ar: 'لم تتم إضافة روابط اجتماعية لهذا المشروع.' },
  'completion.unavailable': { en: 'Completion date unavailable', ar: 'تاريخ الإنجاز غير متوفر' },
  'project.clientFallback': { en: 'Customer project', ar: 'مشروع عميل' },
  'button.previous': { en: 'Previous', ar: 'السابق' },
  'button.next': { en: 'Next', ar: 'التالي' },
};

export default function TranslatedText({ id }: { id: TextId }) {
  const [language] = useState<'en' | 'ar'>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const storedLanguage = localStorage.getItem('language') as 'en' | 'ar' | null;
    return storedLanguage ?? (document.documentElement.lang === 'ar' ? 'ar' : 'en');
  });

  const entry = DICT[id];
  if (!entry) return null;
  return <>{language === 'ar' ? entry.ar : entry.en}</>;
}
