'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '../providers/ThemeProvider';
import { LanguageProvider } from '../providers/LanguageProvider';
import SiteHeader from './SiteHeader';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SiteHeader />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
