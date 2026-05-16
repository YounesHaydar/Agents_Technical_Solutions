"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Link from "next/link";
import FeaturedProjectsGrid from "../components/FeaturedProjectsGrid";
import SectionTabs from "../components/SectionTabs";
import RevealOnScroll from "../components/RevealOnScroll";
import { getProjects } from "../lib/sanity";
import { motion } from "framer-motion";
import type { Project } from "../types";
import { useLanguage } from "../providers/LanguageProvider";

const content = {
  en: {
    aboutLabel: 'About us:',
    aboutTitle: 'A team of Engineers dedicated to solve all your technical problems and provide the best service to increase your traction and profits all around.',
    aboutCopy: 'The layout is built like a product system: controlled spacing, clear hierarchy, deep surfaces, and a restrained accent palette.',
    servicesLabel: 'Services',
    services: [
      {
        title: 'Customer websites',
        description: 'Fast, responsive sites designed to present services clearly and convert visitors into leads.',
      },
      {
        title: 'Portfolio showcases',
        description: 'Project galleries that surface proof of work with a sharper editorial structure.',
      },
      {
        title: 'Sanity CMS setup',
        description: 'Editable content structures so teams can update projects without touching code.',
      },
    ],
    processLabel: 'Process',
    processTitle: 'A calm workflow with visible structure.',
    processCopy: 'Each step is presented as a controlled system, which makes the site feel more reliable and more technical.',
    workflowSteps: [
      'Understand the customer and their goals',
      'Map the service story and proof points',
      'Build the site in Next.js with Sanity content',
      'Publish with a durable editing workflow',
    ],
    nextStepLabel: 'Next step',
    nextStepTitle: 'Build the next version around your actual content.',
    nextStepCopy: 'The current system can now scale into a more specific brand direction without losing clarity or editorial discipline.',
    exploreProjects: 'Explore projects',
    backToTop: 'Back to top',
    featuredWorkLabel: 'Featured work',
    featuredWorkTitle: 'Recent projects',
    viewAllProjects: 'View all projects',
  },
  ar: {
    aboutLabel: 'من نحن:',
    aboutTitle: 'فريق من المهندسين مكرس لحل جميع مشاكلك التقنية وتقديم أفضل خدمة لزيادة التفاعل والأرباح في كل مكان.',
    aboutCopy: 'تم بناء الواجهة كنظام منتج: مسافات مضبوطة، وتسلسل بصري واضح، وسطح عميق، ولوحة ألوان هادئة.',
    servicesLabel: 'الخدمات',
    services: [
      {
        title: 'مواقع للعملاء',
        description: 'مواقع سريعة ومتجاوبة تعرض الخدمات بوضوح وتحوّل الزوار إلى عملاء محتملين.',
      },
      {
        title: 'معارض أعمال',
        description: 'معارض مشاريع تبرز جودة العمل ضمن بنية تحريرية أوضح.',
      },
      {
        title: 'إعداد Sanity CMS',
        description: 'هياكل محتوى قابلة للتحرير حتى يتمكن الفريق من تحديث المشاريع دون لمس الكود.',
      },
    ],
    processLabel: 'العملية',
    processTitle: 'سير عمل هادئ ببنية واضحة.',
    processCopy: 'يُعرض كل خطوة كنظام مضبوط، ما يجعل الموقع يبدو أكثر موثوقية واحترافية.',
    workflowSteps: [
      'فهم العميل وأهدافه',
      'رسم قصة الخدمة ونقاط الإثبات',
      'بناء الموقع باستخدام Next.js وSanity',
      'الإطلاق عبر سير تحرير مستقر',
    ],
    nextStepLabel: 'الخطوة التالية',
    nextStepTitle: 'ابنِ النسخة التالية حول محتواك الحقيقي.',
    nextStepCopy: 'يمكن للنظام الحالي أن يتوسع الآن نحو هوية أدق دون أن يفقد وضوحه أو انضباطه التحريري.',
    exploreProjects: 'استعرض المشاريع',
    backToTop: 'العودة إلى الأعلى',
    featuredWorkLabel: 'الأعمال المميزة',
    featuredWorkTitle: 'المشاريع الأخيرة',
    viewAllProjects: 'عرض جميع المشاريع',
  },
} as const;

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data ?? []);
    });
  }, []);

  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden text-zinc-950 dark:text-zinc-100"
    >
      <RevealOnScroll />
      
      {/* 1. The New High-Converting Hero Section */}
      <HeroSection />

      <div id="hero-end" />
      
      {/* 2. Navigation Tabs */}
      <SectionTabs />

      {/* 3. About & Services Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div
            id="about"
            data-reveal
            suppressHydrationWarning
            className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-right"
          >
            <p className="mono-accent text-xs uppercase tracking-widest text-muted">{t.aboutLabel}</p>
            <h2 className="headline-serif mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">{t.aboutTitle}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">{t.aboutCopy}</p>
          </div>

          <div
            id="services"
            data-reveal
            suppressHydrationWarning
            className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-left"
            style={{ animationDelay: "120ms" }}
          >
            <p className="mono-accent text-xs uppercase tracking-widest text-muted">{t.servicesLabel}</p>
            <div className="mt-5 grid gap-3">
              {t.services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 18,
                    delay: index * 0.12,
                  }}
                >
                  <div className="group rounded-3xl border border-slate-200/80 bg-white/70 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/40 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950/50">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-slate-950 dark:text-white">
                        {service.title}
                      </h3>
                      <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-200">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Section */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 lg:px-12">
        <div className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-up">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mono-accent text-xs uppercase tracking-widest text-muted">
                {t.processLabel}
              </p>
              <h2 className="headline-serif mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">{t.processTitle}</h2>
            </div>
            <div className="hidden max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400 md:block">
              {t.processCopy}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.workflowSteps.map((step, index) => (
              <div
                key={step}
                className="group rounded-3xl border border-slate-200/80 bg-white/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/55"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-widest text-muted">
                    {language === 'ar' ? 'خطوة' : 'Step'}
                  </div>
                  <div className="mono-accent text-sm text-sky-700 dark:text-sky-300">
                    0{index + 1}
                  </div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
                  <div className="h-full w-full origin-left rounded-full bg-linear-to-r from-sky-500 via-blue-600 to-amber-500 transition-transform duration-500 group-hover:scale-x-110" />
                </div>
                <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-100">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact / Next Steps Section */}
      <section
        id="contact"
        className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-10 lg:px-12"
      >
        <div className="glass-panel panel-border rounded-4xl px-6 py-10 md:px-10 reveal-up">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mono-accent text-xs uppercase tracking-widest text-muted">
                {t.nextStepLabel}
              </p>
              <h2 className="headline-serif mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">{t.nextStepTitle}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">{t.nextStepCopy}</p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/projects"
                className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                {t.exploreProjects}
              </Link>
              <a
                href="#top"
                className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:text-slate-950 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-50"
              >
                {t.backToTop}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Projects Showcase Section */}
      <section
        id="projects-showcase"
        className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900/50 py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
          <div className="mb-12">
            <p className="mono-accent text-xs uppercase tracking-widest text-muted">{t.featuredWorkLabel}</p>
            <h2 className="headline-serif mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-5xl">{t.featuredWorkTitle}</h2>
          </div>
          <div className="reveal-up">
            <FeaturedProjectsGrid projects={projects} fullWidth={true} />
          </div>
          {projects.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                <span>{t.viewAllProjects}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}