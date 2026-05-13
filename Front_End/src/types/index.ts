export type ProjectSocialLink = {
  platform?: string;
  url?: string;
};

export type Project = {
  _id: string;
  title?: string;
  description?: string;
  completionDate?: string;
  images?: string[];
  coverPhoto?: string;
  socialLinks?: ProjectSocialLink[];
  client?: string;
  featured?: boolean;
};
