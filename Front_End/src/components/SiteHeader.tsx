'use client';

import Link from 'next/link';
import { useTheme } from '../providers/ThemeProvider';
import { useLanguage } from '../providers/LanguageProvider';

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl transition-colors dark:bg-slate-950/70">
      <div className="mx-auto w-full max-w-7xl px-6 py-4 md:px-10 lg:px-12">
        <div className="glass-panel panel-border flex items-center justify-between gap-4 rounded-2xl px-4 py-3 md:px-5">
          <Link href="/" className="group flex items-center gap-3 text-zinc-950 dark:text-zinc-100">
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-sky-600 via-blue-700 to-slate-900 text-white shadow-lg shadow-blue-900/20">
              <span className="absolute inset-0 shine opacity-60" />
              <span className="relative text-sm font-bold tracking-widest">TS</span>
            </span>
            <span>
              <span className="block text-xs uppercase tracking-widest text-muted">Technical Solutions</span>
              <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Reliability-driven portfolio system</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-200 md:inline-flex">
              Live studio
            </span>
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="group rounded-full border border-slate-300/70 bg-white/80 p-2 text-zinc-950 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/60 hover:shadow-lg hover:shadow-sky-900/10 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-zinc-100"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1hm0 5a1 1 0 011 1v1a1 1 0 11-2 0V9a1 1 0 011-1zm0 5a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm3.314-3a1 1 0 101.414 1.414l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414zM15 7a1 1 0 011 1h1a1 1 0 11 0 2h-1a1 1 0 11-2 0v-1a1 1 0 011-1zm-11 8a1 1 0 100 2h1a1 1 0 100-2H4zM6.686 15.314a1 1 0 10-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414l1.414-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-950 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-900/10 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-zinc-100"
              title={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

