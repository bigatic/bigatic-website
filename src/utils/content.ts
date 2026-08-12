import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../data/site';

export function byOrder<T extends { data: { order: number } }>(a: T, b: T): number {
  return a.data.order - b.data.order;
}

export function byDateDesc<T extends { data: { date: string } }>(a: T, b: T): number {
  return b.data.date.localeCompare(a.data.date);
}

export function isPublished<T extends { data: { draft: boolean } }>(entry: T): boolean {
  return !entry.data.draft;
}

export function inLocale<T extends { data: { locale: Locale } }>(locale: Locale) {
  return (entry: T): boolean => entry.data.locale === locale;
}

export function formatDate(date: string, locale: Locale): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-CO' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function effectiveCallStatus(
  call: CollectionEntry<'calls'>,
  now = new Date(),
): 'upcoming' | 'open' | 'closed' {
  if (call.data.status === 'closed') return 'closed';

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);

  if (today > call.data.closeDate) return 'closed';
  if (call.data.openDate && today < call.data.openDate) return 'upcoming';
  if (call.data.openDate && today >= call.data.openDate) return 'open';
  return call.data.status;
}

export function findTranslation<T extends { data: { translationKey: string; locale: Locale } }>(
  entries: T[],
  entry: T,
): T | undefined {
  return entries.find(
    (candidate) =>
      candidate.data.translationKey === entry.data.translationKey &&
      candidate.data.locale !== entry.data.locale,
  );
}
