export const siteConfig = {
  siteName: 'BIGATIC',
  spanishName: 'Semillero de Investigación BIGATIC',
  englishName: 'BIGATIC Research Group',
  institution: 'Universidad de Santander',
  institutionShort: 'UDES',
  program: {
    es: 'Programa de Ingeniería de Software',
    en: 'Software Engineering Program',
  },
  location: {
    city: 'Bucaramanga',
    region: 'Santander',
    country: 'Colombia',
  },
  domain: 'https://bigatic.org',
  github: 'https://github.com/bigatic',
  institutionalPage: 'https://udes.edu.co/investigacion/institutos-y-grupos/semilleros/bigatic',
  defaultLocale: 'es',
  supportedLocales: ['es', 'en'] as const,
  contactEmail: null,
} as const;

export type Locale = (typeof siteConfig.supportedLocales)[number];

export const siteLocation = [
  siteConfig.location.city,
  siteConfig.location.region,
  siteConfig.location.country,
].join(', ');
