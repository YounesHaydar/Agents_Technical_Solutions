import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ProjectImageGallery from '../../../components/ProjectImageGallery';
import TranslatedText from '../../../components/TranslatedText';
import ProjectSocialLinks from '../../../components/ProjectSocialLinks';
import { getProjectById } from '../../../lib/sanity';

export const revalidate = 3600;

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(date?: string) {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(parsedDate);
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);
  const metadataTitle = project?.titleEn ?? project?.titleAr;
  const metadataDescription = project?.descriptionEn ?? project?.descriptionAr;

  return {
    title: metadataTitle ? `${metadataTitle} | Project` : 'Project | Portfolio',
    description: metadataDescription ?? 'Detailed view of a selected customer project.',
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  const completed = formatDate(project?.completionDate);
  const projectTitle = project.titleEn ?? project.titleAr ?? 'Untitled project';
  const projectDescription =
    project.descriptionEn ??
    project.descriptionAr ??
    'A detailed view of the project, built to help customers understand the value and quality of the work.';

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <Link
          href="/projects"
          className="inline-flex rounded-full border border-zinc-300 dark:border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-950 dark:text-zinc-100 transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <TranslatedText id="gallery.back" />
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {project?.client ?? <TranslatedText id="project.clientFallback" />}
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">{projectTitle}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-300 md:text-lg">
              {projectDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-4 py-2">
                {completed ?? <TranslatedText id="completion.unavailable" />}
              </span>
              <span className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-4 py-2">
                {project?.socialLinks?.length ? `${project.socialLinks.length} links` : <TranslatedText id="project.noLinks" />}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 p-6">
            <h2 className="text-xl font-semibold"><TranslatedText id="projects.heading" /></h2>
            <div className="mt-5">
              <ProjectImageGallery images={project?.images} title={projectTitle} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 p-6">
            <h2 className="text-xl font-semibold"><TranslatedText id="project.socialLinks" /></h2>
            {project?.socialLinks?.length ? (
              <ProjectSocialLinks links={project.socialLinks} />
            ) : (
              <p className="mt-4 text-zinc-500 dark:text-zinc-400"><TranslatedText id="project.noLinks" /></p>
            )}
          </div>

          <div className="rounded-3xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 p-6">
            <h2 className="text-xl font-semibold"><TranslatedText id="project.notes" /></h2>
            <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
              Use this area to explain the problem, the design decisions, and the results delivered for the customer.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
