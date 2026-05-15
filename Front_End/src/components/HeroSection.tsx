'use client';

import { useLanguage } from '../providers/LanguageProvider';
import Link from 'next/link';

const content = {
  en: {
    badge: 'Engineering-grade web development',
    headline: 'High-Performance Websites for Technical Teams.',
    description: 'Built with Next.js & Sanity in 4 Weeks. We transform complex requirements into fast, reliable, and scalable web experiences.',
    servicesTitle: 'Core Capabilities',
    services: [
      { name: 'Custom Web Apps', icon: '⚡' },
      { name: 'Headless CMS Integration', icon: '⚙️' },
      { name: 'Performance Optimization', icon: '🚀' },
      { name: 'Technical SEO', icon: '🔍' },
    ],
    ctaPrimary: 'Get a Free Technical Audit',
    ctaSecondary: 'View my work',
    trust: 'Trusted by innovative teams worldwide',
    rating: '5.0 ★ rating from our clients',
  },
  ar: {
    badge: 'تطوير ويب بمعايير هندسية',
    headline: 'مواقع ويب عالية الأداء للفرق التقنية.',
    description: 'نطوّر مواقع ويب سريعة وموثوقة وقابلة للتوسّع باستخدام Next.js وSanity خلال أربعة أسابيع. نحوّل المتطلبات المعقّدة إلى تجارب رقمية واضحة وفعّالة.',
    servicesTitle: 'القدرات الأساسية',
    services: [
      { name: 'تطبيقات ويب مخصصة', icon: '⚡' },
      { name: 'تكامل مع نظام إدارة محتوى منفصل', icon: '⚙️' },
      { name: 'تحسين الأداء', icon: '🚀' },
      { name: 'تحسين محركات البحث التقني', icon: '🔍' },
    ],
    ctaPrimary: 'احصل على تدقيق تقني مجاني',
    ctaSecondary: 'اطّلع على أعمالي',
    trust: 'موثوق لدى فرق مبتكرة حول العالم',
    rating: 'تقييم 5.0 نجوم من عملائنا',
  },
};

export default function HeroSection() {
  const { language, isRTL } = useLanguage();
  const t = content[language];

  return (
    <section className="relative mx-auto flex min-h-[85vh] w-full max-w-7xl flex-col justify-center px-6 py-20 md:px-10 lg:px-12">
      <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        
        {/* Left Column */}
        <div className="flex flex-col items-start" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="mb-6 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
            {t.badge}
          </p>
          
          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl" style={{ color: 'var(--foreground)' }}>
            {t.headline}
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
            {t.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="rounded-full bg-zinc-950 px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-xl dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href="#projects"
              // FIXED: Explicit text colors for both modes and borders that adapt
              className="rounded-full border border-zinc-300 px-8 py-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
            >
              {t.ctaSecondary}
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-200">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              <div className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-300 dark:bg-zinc-800"></div>
              <div className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-400 dark:bg-zinc-700"></div>
              <div className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-500 dark:bg-zinc-600"></div>
            </div>
            <div className="flex flex-col">
              <span style={{ color: 'var(--foreground)' }}>{t.rating}</span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>{t.trust}</span>
            </div>
          </div>
        </div>

        {/* Right Column - FIXED: Now adapts to light/dark mode */}
        <div className="relative glass-panel panel-border rounded-4xl border border-zinc-200 dark:border-zinc-800 p-8" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
          
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
            {t.servicesTitle}
          </p>
          
          <div className="mt-8 grid gap-4">
            {t.services.map((service, idx) => (
              <div
                key={idx}
                className="capability-item flex items-center gap-4 rounded-2xl border p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <div className="capability-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border">
                  <span className="text-xl">{service.icon}</span>
                </div>
                <h3 className="capability-title font-semibold">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}