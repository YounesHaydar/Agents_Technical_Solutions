'use client';

import { useEffect } from 'react';

export default function RevealOnScroll() {
  useEffect(() => {
    const elems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!elems.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('reveal-active');
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    elems.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
