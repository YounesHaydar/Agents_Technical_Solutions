import Link from 'next/link';

import ProjectPreviewCard from '../../components/ProjectPreviewCard';
import TranslatedText from '../../components/TranslatedText';
import { getProjects } from '../../lib/sanity';

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400"><TranslatedText id="projects.heading" /></p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl"><TranslatedText id="projects.title" /></h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300 md:text-lg">
            <TranslatedText id="projects.subtitle" />
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-zinc-300 dark:border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-950 dark:text-zinc-100 transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            Back to home
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-10 lg:px-12">
        {projects?.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
              <ProjectPreviewCard key={project?._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-zinc-500 dark:text-zinc-400">
            <TranslatedText id="projects.noProjects" />
          </div>
        )}
      </section>
    </main>
  );
}
