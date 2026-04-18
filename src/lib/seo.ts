export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const generateSEOTags = (metadata: SEOMetadata) => {
  const {
    title,
    description,
    image = '/og-image.jpg',
    url,
    type = 'website',
    author = 'Erwing Solorzano',
  } = metadata;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      image,
      url,
      type,
      siteName: 'Erwing Solorzano - Portafolio',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image,
      creator: '@erwingsolorzano',
    },
  };
};

export const generateJSONLD = (type: 'Person' | 'WebSite', data: any) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  if (type === 'Person') {
    return JSON.stringify({
      ...baseSchema,
      name: data.name,
      jobTitle: data.role,
      description: data.bio,
      url: data.url,
      image: data.avatar,
      sameAs: [
        data.linkedin,
        data.github,
      ].filter(Boolean),
      knowsAbout: [
        'JavaScript',
        'TypeScript',
        'React',
        'Astro',
        'Web Development',
        'Frontend Engineering',
      ],
    });
  }

  if (type === 'WebSite') {
    return JSON.stringify({
      ...baseSchema,
      name: data.name,
      description: data.description,
      url: data.url,
      author: {
        '@type': 'Person',
        name: data.author,
      },
    });
  }

  return '';
};

export const defaultSEO: SEOMetadata = {
  title: 'Erwing Solorzano - Desarrollador Full Stack',
  description: 'Desarrollador Full Stack especializado en React, TypeScript y experiencias web rápidas, claras y orientadas a resultados.',
  image: '/og-image.jpg',
  author: 'Erwing Solorzano',
};
