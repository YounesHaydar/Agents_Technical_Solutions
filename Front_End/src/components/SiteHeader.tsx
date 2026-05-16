'use client';

import Link from 'next/link';
import { useTheme } from '../providers/ThemeProvider';
import { useLanguage, type Language } from '../providers/LanguageProvider';

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';

  const brand = language === 'ar'
     ? { title: 'أيجنت للحلول التقنية', subtitle: 'نظام عروض أعمال يعتمد على الوضوح والموثوقية', studio: 'استوديو مباشر' }
     : { title: "Agent's Technical Solutions", subtitle: 'Clear, reliable work showcases', studio: 'Live Studio' };
  const brandAlt = language === 'ar'
     ? { title: "Agent's Technical Solutions", subtitle: 'Clear, reliable work showcases' }
     : { title: 'أيجنت للحلول التقنية', subtitle: 'نظام عروض أعمال يعتمد على الوضوح والموثوقية' };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl transition-colors dark:bg-slate-950/70">
      <div className="mx-auto w-full max-w-7xl px-6 py-4 md:px-10 lg:px-12">
        <div className="glass-panel panel-border flex items-center justify-between gap-4 rounded-2xl px-4 py-3 md:px-5">
          <Link
            href="/"
            className="group flex items-center gap-3 text-zinc-950 dark:text-zinc-100"
            aria-label={brand.title}
          >
            <span
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-sky-600 via-blue-700 to-slate-900 text-white shadow-lg shadow-blue-900/20"
              aria-hidden
            >
              <span className="absolute inset-0 shine opacity-60" />
              {theme === 'light' ? (
                <svg className="h-5 w-5 text-yellow-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 4V2M12 22v-2M4.93 4.93L3.51 3.51M20.49 20.49l-1.42-1.42M4 12H2m20 0h-2M4.93 19.07l-1.42 1.42M20.49 3.51l-1.42 1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ) : (
                <span className="relative text-sm font-bold tracking-widest">AG</span>
              )}
            </span>
            <span>
              <span className="block text-xs uppercase tracking-widest text-muted">{brand.title}</span>
              <span className="block text-[11px] text-muted mt-0.5">{brandAlt.title}</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-200 md:inline-flex">
              {brand.studio}
            </span>
            {/* Theme Toggle (sun / moon) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              aria-label={language === 'ar' ? (theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الليلي') : (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')}
              title={language === 'ar' ? (theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الليلي') : (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')}
              className="group rounded-full border border-slate-300/70 bg-white/95 p-2 text-zinc-900 shadow-sm shadow-slate-900/6 transition duration-200 hover:scale-105 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-zinc-50"
            >
              {theme === 'dark' ? (
                // Moon icon for dark mode (button shows moon when active)
                <svg className="h-6 w-6 text-indigo-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                // Sun icon for light mode
                <svg className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <label className="sr-only">{language === 'ar' ? 'اختيار اللغة' : 'Language selector'}</label>
            <select
              aria-label={language === 'ar' ? 'اختيار اللغة' : 'Language selector'}
              value={language}
              onChange={(e) => setLanguage(e.currentTarget.value as Language)}
              className="rounded-md border border-slate-300/70 bg-white/95 px-3 py-1 text-sm font-medium text-zinc-900 shadow-sm transition duration-150 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-zinc-50"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

