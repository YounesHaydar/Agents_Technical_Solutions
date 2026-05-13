import type { Project, ProjectSocialLink } from '../types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = 'v2021-10-21';
const revalidate = 3600;

type SanityImage = {
  asset?: {
    url?: string;
  };
  alt?: string;
};

type SanityProject = {
  _id?: string;
  title?: string;
  description?: string;
  completionDate?: string;
  images?: SanityImage[];
  coverPhoto?: SanityImage;
  socialLinks?: ProjectSocialLink[];
  client?: string;
  featured?: boolean;
};

type SanityResponse = {
  result?: SanityProject[] | SanityProject;
};

function toProject(project?: SanityProject): Project {
  return {
    _id: project?._id ?? '',
    title: project?.title,
    description: project?.description,
    completionDate: project?.completionDate,
    images: project?.images?.map((image) => image?.asset?.url).filter((url): url is string => Boolean(url)),
    coverPhoto: project?.coverPhoto?.asset?.url,
    socialLinks: project?.socialLinks?.map((link) => ({
      platform: link?.platform,
      url: link?.url,
    })),
    client: project?.client,
    featured: project?.featured,
  };
}

async function sanityFetch<T>(query: string) {
  if (!projectId) {
    return null as T | null;
  }

  const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    return null as T | null;
  }

  return (await response.json()) as T;
}

export async function getProjects(): Promise<Project[]> {
  const data = await sanityFetch<SanityResponse>(
    '*[_type == "project"] | order(coalesce(completionDate, _createdAt) desc){_id, title, description, completionDate, images[]{asset->{url}, alt}, coverPhoto{asset->{url}, alt}, socialLinks[]{platform, url}, client, featured}'
  );

  if (!data?.result || !Array.isArray(data.result)) {
    return [];
  }

  return data.result.map((project) => toProject(project));
}

export async function getProjectById(id: string): Promise<Project | null> {
  const data = await sanityFetch<SanityResponse>(
    `*[_type == "project" && _id == "${id}"][0]{_id, title, description, completionDate, images[]{asset->{url}, alt}, coverPhoto{asset->{url}, alt}, socialLinks[]{platform, url}, client, featured}`
  );

  if (!data?.result || Array.isArray(data.result)) {
    return null;
  }

  return toProject(data.result);
}
