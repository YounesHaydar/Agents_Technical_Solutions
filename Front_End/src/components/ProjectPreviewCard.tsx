import Link from 'next/link';

import type { Project } from '../types';

type ProjectPreviewCardProps = {
  project?: Project;
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
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
}

export default function ProjectPreviewCard({ project }: ProjectPreviewCardProps) {
  const imageUrl = project?.images?.[0];
  const completed = formatDate(project?.completionDate);

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 shadow-lg shadow-black/5 dark:shadow-black/20 transition hover:-translate-y-1 hover:border-zinc-400 dark:hover:border-zinc-700">
      <Link href={`/projects/${project?._id ?? ''}`} className="block">
        <div className="aspect-video bg-zinc-200 dark:bg-zinc-950/80">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={project?.title ? `${project.title} preview` : 'Project preview'}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-500">
            <span>{project?.client ?? 'Customer project'}</span>
            <span>{completed ?? 'In progress'}</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-zinc-950 dark:text-white">{project?.title ?? 'Untitled project'}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {project?.description ?? 'A custom built website designed to present services and prove the quality of the work.'}
          </p>
        </div>
      </Link>
    </article>
  );
}
