import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Project } from '../types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = 'v2021-10-21';
const revalidate = 3600;

// 1. Initialize the official Sanity Client
export const client = createClient({
  projectId: projectId || '',
  dataset,
  apiVersion,
  useCdn: true, // Use the edge network for faster reads
});

// 2. Initialize the Image Builder
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// --- Your Existing Types ---
type SanityImage = {
  asset?: { url?: string; };
  alt?: string;
};

type SanityProjectSocialLink = {
  platform?: string;
  url?: string;
  labelEn?: string;
  labelAr?: string;
};

type SanityProject = {
  _id?: string;
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  completionDate?: string;
  images?: SanityImage[];
  coverPhoto?: SanityImage;
  socialLinks?: SanityProjectSocialLink[];
  client?: string;
  featured?: boolean;
};

// --- Your Existing Mapper ---
function toProject(project?: SanityProject): Project {
  return {
    _id: project?._id ?? '',
    titleEn: project?.titleEn,
    titleAr: project?.titleAr,
    descriptionEn: project?.descriptionEn,
    descriptionAr: project?.descriptionAr,
    completionDate: project?.completionDate,
    images: project?.images?.map((image) => image?.asset?.url).filter((url): url is string => Boolean(url)),
    coverPhoto: project?.coverPhoto?.asset?.url,
    socialLinks: project?.socialLinks?.map((link) => ({
      platform: link?.platform,
      url: link?.url,
      labelEn: link?.labelEn,
      labelAr: link?.labelAr,
    })),
    client: project?.client,
    featured: project?.featured,
  };
}

// --- Updated Fetch Methods ---

export async function getProjects(): Promise<Project[]> {
  if (!projectId) return [];

  const query = '*[_type == "project"] | order(coalesce(completionDate, _createdAt) desc){_id, titleEn, titleAr, descriptionEn, descriptionAr, completionDate, images[]{asset->{url}, alt}, coverPhoto{asset->{url}, alt}, socialLinks[]{platform, url, labelEn, labelAr}, client, featured}';

  // client.fetch automatically extracts the result array
  const data = await client.fetch<SanityProject[]>(
    query,
    {}, // no parameters needed for this query
    { next: { revalidate } } // Keep your ISR cache rules
  );

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map((project) => toProject(project));
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!projectId) return null;

  // Notice we use $id here instead of string injection
  const query = '*[_type == "project" && _id == $id][0]{_id, titleEn, titleAr, descriptionEn, descriptionAr, completionDate, images[]{asset->{url}, alt}, coverPhoto{asset->{url}, alt}, socialLinks[]{platform, url, labelEn, labelAr}, client, featured}';

  // We pass the secure parameters object as the second argument
  const data = await client.fetch<SanityProject>(
    query,
    { id }, 
    { next: { revalidate } }
  );

  if (!data) {
    return null;
  }

  return toProject(data);
}