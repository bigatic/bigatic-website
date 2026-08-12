import type { Locale } from '../data/site';

export const localizedRoutes = {
  home: { es: '/', en: '/en/' },
  about: { es: '/quienes-somos/', en: '/en/about/' },
  research: { es: '/investigacion/', en: '/en/research/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
  people: { es: '/integrantes/', en: '/en/people/' },
  outputs: { es: '/produccion/', en: '/en/outputs/' },
  news: { es: '/actualidad/', en: '/en/news/' },
  join: { es: '/unete/', en: '/en/join/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
} as const;

export type RouteKey = keyof typeof localizedRoutes;

export function route(key: RouteKey, locale: Locale): string {
  return localizedRoutes[key][locale];
}

export function alternateStaticPath(pathname: string): string {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  for (const pair of Object.values(localizedRoutes)) {
    if (pair.es === normalized) return pair.en;
    if (pair.en === normalized) return pair.es;
  }
  return normalized.startsWith('/en/') ? normalized.replace(/^\/en\//, '/') : `/en${normalized}`;
}

export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}
