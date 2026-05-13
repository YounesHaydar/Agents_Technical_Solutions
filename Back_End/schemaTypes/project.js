export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  // Group fields into English / Arabic tabs via fieldsets (Studio will render groups; install tabs plugin for tab UI)
  fieldsets: [
    { name: 'english', title: 'English' },
    { name: 'arabic', title: 'Arabic' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    // English content
    {
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      fieldset: 'english',
    },
    {
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      fieldset: 'english',
    },

    // Arabic content
    {
      name: 'titleAr',
      title: 'Title (Arabic)',
      type: 'string',
      fieldset: 'arabic',
    },
    {
      name: 'descriptionAr',
      title: 'Description (Arabic)',
      type: 'text',
      fieldset: 'arabic',
    },

    {
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    },

    {
      name: 'coverPhoto',
      title: 'Cover Photo',
      type: 'image',
      fieldset: 'media',
      description: 'Main cover image for the project showcase',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      fieldset: 'media',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    },

    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Behance', value: 'behance' },
                  { title: 'Dribbble', value: 'dribbble' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'labelEn',
              title: 'Label (English)',
              type: 'string',
              description: 'Optional display text for this link in English (e.g. Facebook, IG).',
            },
            {
              name: 'labelAr',
              title: 'Label (Arabic)',
              type: 'string',
              description: 'Optional display text for this link in Arabic.',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'titleEn',
      media: 'coverPhoto',
    },
  },
  actions: (prev) => [
    ...prev,
  ],
}