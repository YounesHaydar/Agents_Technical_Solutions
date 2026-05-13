export type ProjectSocialLink = {
  platform?: string;
  url?: string;
  labelEn?: string;
  labelAr?: string;
};

export type Project = {
  _id: string;
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  completionDate?: string;
  images?: string[];
  coverPhoto?: string;
  socialLinks?: ProjectSocialLink[];
  client?: string;
  featured?: boolean;
};
