"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FeaturedProjectsGrid from "../components/FeaturedProjectsGrid";
import SectionTabs from "../components/SectionTabs";
import RevealOnScroll from "../components/RevealOnScroll";
import { getProjects } from "../lib/sanity";
import { motion } from "framer-motion";
import type { Project } from "../types";

const services = [
  {
    title: "Customer websites",
    description:
      "Fast, responsive sites designed to present services clearly and convert visitors into leads.",
  },
  {
    title: "Portfolio showcases",
    description:
      "Project galleries that surface proof of work with a sharper editorial structure.",
  },
  {
    title: "Sanity CMS setup",
    description:
      "Editable content structures so teams can update projects without touching code.",
  },
];

const workflowSteps = [
  "Understand the customer and their goals",
  "Map the service story and proof points",
  "Build the site in Next.js with Sanity content",
  "Publish with a durable editing workflow",
];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);

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
      <section className="mx-auto w-full max-w-7xl px-6 pt-12 md:px-10 lg:px-12">
        <div className="panel-border relative overflow-hidden rounded-4xl border border-white/40 bg-white/70 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/55 md:p-8 lg:p-10 reveal-up">
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl float-slow" />
          <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl float-slow" />
          <div className="absolute inset-0 section-grid opacity-30" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="max-w-3xl">
              <p className="mono-accent text-xs uppercase tracking-widest text-muted reveal-up">
                Customer showcase studio
              </p>
              <h1 className="headline-serif mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-7xl reveal-up">
                A reliable web presence with the structure and depth your work
                deserves.
              </h1>
              <p
                className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 reveal-up"
                style={{ animationDelay: "140ms" }}
              >
                Built to present services, recent projects, and Sanity-managed
                content through a system that feels precise, engineered, and
                easy to trust.
              </p>

              <div
                className="mt-8 flex flex-wrap gap-3 reveal-up"
                style={{ animationDelay: "200ms" }}
              >
                <a
                  href="#projects-showcase"
                  className="group inline-flex items-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  <span>View my work</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/60 hover:text-slate-950 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-100"
                >
                  Start a project
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-8 top-0 h-40 rounded-full bg-sky-500/20 blur-3xl orbit" />
              <div className="relative grid gap-4">
                <div
                  className="glass-panel panel-border rounded-3xl p-5 md:p-6 reveal-up"
                  style={{ animationDelay: "120ms" }}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted">
                    <span>System status</span>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:text-emerald-300">
                      Stable
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {["Structure", "Content", "Delivery"].map((item, idx) => (
                      <div
                        key={item}
                        data-reveal
                        className={`glass-panel panel-border rounded-4xl p-6 md:p-8 ${idx === 0 ? "reveal-right" : idx === 2 ? "reveal-left" : ""}`}
                        style={{ animationDelay: `${idx * 80}ms` }}
                      >
                        <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {item}
                          </div>
                          <div className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300 font-medium">
                            {item === "Structure" &&
                              "Clear hierarchy and modular sections."}
                            {item === "Content" &&
                              "Sanity-powered editable data."}
                            {item === "Delivery" &&
                              "Built for a smooth handoff."}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div
                    className="glass-panel rounded-3xl p-5 reveal-up"
                    style={{ animationDelay: "160ms" }}
                  >
                    <p className="mono-accent text-xs uppercase tracking-widest text-muted">
                      Trust layer
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                      Designed to feel dependable at a glance.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Strong contrast, deep spacing, and a measured rhythm
                      support technical credibility.
                    </p>
                  </div>
                  <div
                    className="glass-panel rounded-3xl p-5 reveal-up"
                    style={{ animationDelay: "220ms" }}
                  >
                    <p className="mono-accent text-xs uppercase tracking-widest text-muted">
                      Motion layer
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                      Animations that feel engineered, not decorative.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Layered reveals, slow ambient movement, and a glass
                      surface guide attention without noise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="hero-end" />
      <SectionTabs />

      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div
            id="about"
            data-reveal
            className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-right"
          >
            <p className="mono-accent text-xs uppercase tracking-widest text-muted">
              About this site
            </p>
            <h2 className="headline-serif mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">
              A portfolio that explains the value of the work, not just the
              visuals.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              The layout is built like a product system: controlled spacing,
              clear hierarchy, deep surfaces, and a restrained accent palette.
            </p>
          </div>

          <div
            id="services"
            data-reveal
            className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-left"
            style={{ animationDelay: "120ms" }}
          >
            <p className="mono-accent text-xs uppercase tracking-widest text-muted">
              Services
            </p>
            <div className="mt-5 grid gap-3">
              {services.map((service, index) => (
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

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 lg:px-12">
        <div className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-up">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mono-accent text-xs uppercase tracking-widest text-muted">
                Process
              </p>
              <h2 className="headline-serif mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">
                A calm workflow with visible structure.
              </h2>
            </div>
            <div className="hidden max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400 md:block">
              Each step is presented as a controlled system, which makes the
              site feel more reliable and more technical.
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <div
                key={step}
                className="group rounded-3xl border border-slate-200/80 bg-white/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/55"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-widest text-muted">
                    Step
                  </div>
                  <div className="mono-accent text-sm text-sky-700 dark:text-sky-300">
                    0{index + 1}
                  </div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
                  <div className="h-full w-full origin-left rounded-full bg-linear-to-r from-sky-500 via-blue-600 to-amber-500 transition-transform duration-500 group-hover:scale-x-110" />
                </div>
                <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-10 lg:px-12"
      >
        <div className="glass-panel panel-border rounded-4xl px-6 py-10 md:px-10 reveal-up">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mono-accent text-xs uppercase tracking-widest text-muted">
                Next step
              </p>
              <h2 className="headline-serif mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">
                Build the next version around your actual content.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                The current system can now scale into a more specific brand
                direction without losing clarity or editorial discipline.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/projects"
                className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Explore projects
              </Link>
              <a
                href="#top"
                className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:text-slate-950 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-100"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects-showcase"
        className="w-full bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900/50 py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
          <div className="mb-12">
            <p className="mono-accent text-xs uppercase tracking-widest text-muted">
              Featured work
            </p>
            <h2 className="headline-serif mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-5xl">
              Recent projects
            </h2>
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
                <span>View all projects</span>
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
