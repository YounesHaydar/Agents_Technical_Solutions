'use client';

import { useEffect } from 'react';

export default function ScrollToTopOnMount() {
  useEffect(() => {
    // Disable automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Always scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return null;
}
