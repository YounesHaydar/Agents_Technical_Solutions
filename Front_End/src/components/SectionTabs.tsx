"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function SectionTabs() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<'about' | 'services' | 'projects' | null>(null);

  useEffect(() => {
    const sentinel = document.getElementById('hero-end');
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(!entry.isIntersecting);
        });
      },
      { root: null, threshold: 0 }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const sections: Array<{ id: 'about' | 'services' | 'projects'; el: Element | null }> = [
      { id: 'about', el: document.getElementById('about') },
      { id: 'services', el: document.getElementById('services') },
      { id: 'projects', el: document.getElementById('projects') },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleSections.length) {
          const id = visibleSections[0].target.id as 'about' | 'services' | 'projects';
          setActive(id);
        }
      },
      { threshold: [0.2, 0.5, 0.75] }
    );

    sections.forEach((s) => s.el && observer.observe(s.el));
    return () => observer.disconnect();
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<Array<HTMLAnchorElement | null>>([]);

  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    function positionIndicator() {
      const wrap = containerRef.current;
      const activeEl = tabsRef.current.find((el) => el && el.classList.contains('active')) || tabsRef.current[0];
      if (!activeEl || !wrap) return;
      const wrapRect = wrap.getBoundingClientRect();
      const rect = activeEl.getBoundingClientRect();
      const left = rect.left - wrapRect.left;
      setIndicator({ left, width: rect.width });
    }
    positionIndicator();
    window.addEventListener('resize', positionIndicator);
    return () => window.removeEventListener('resize', positionIndicator);
  }, [active]);

  useEffect(() => {
    // set active class on anchors for indicator logic
    tabsRef.current.forEach((el) => {
      if (!el) return;
      const id = el.getAttribute('href')?.replace('#', '');
      if (id && id === active) el.classList.add('active');
      else el.classList.remove('active');
    });
    // update URL fragment without adding history entries
    if (active) {
      try {
        history.replaceState(null, '', `#${active}`);
      } catch {
        /* ignore */
      }
    }
  }, [active]);

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!visible) return;
      const keys = ['ArrowLeft', 'ArrowRight'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const tabs = tabsRef.current.filter(Boolean) as HTMLAnchorElement[];
      const idx = tabs.findIndex((t) => t.classList.contains('active'));
      if (idx === -1) return;
      const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [visible]);

  return (
    <div className={`scroll-tabs ${visible ? 'visible' : ''}`} role="navigation" aria-hidden={!visible}>
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
        <div ref={containerRef} className="tabs-wrap flex items-center gap-3 rounded-full bg-white/90 dark:bg-slate-900/70 px-3 py-2 shadow-sm relative">
          <a ref={(el) => { tabsRef.current[0] = el; }} href="#about" className={`px-3 py-1 text-sm font-medium ${active === 'about' ? 'text-sky-700 dark:text-sky-300' : 'text-slate-800 dark:text-slate-100'}`}>
            Overview
          </a>
          <a ref={(el) => { tabsRef.current[1] = el; }} href="#services" className={`px-3 py-1 text-sm font-medium ${active === 'services' ? 'text-sky-700 dark:text-sky-300' : 'text-slate-800 dark:text-slate-100'}`}>
            Services
          </a>
          <a ref={(el) => { tabsRef.current[2] = el; }} href="#projects" className={`px-3 py-1 text-sm font-medium ${active === 'projects' ? 'text-sky-700 dark:text-sky-300' : 'text-slate-800 dark:text-slate-100'}`}>
            Projects
          </a>
          <motion.span
            className="tab-indicator"
            aria-hidden="true"
            animate={{ left: indicator.left, width: indicator.width }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            style={{ position: 'absolute' }}
          />
          <span className="sr-only" aria-live="polite">{active ? `Active section: ${active}` : ''}</span>
        </div>
      </div>
    </div>
  );
}
