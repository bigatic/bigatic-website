import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isPublished } from '../utils/content';

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection('news'))
    .filter((item) => item.data.locale === 'es' && isPublished(item))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));

  return rss({
    title: 'Actualidad BIGATIC',
    description: 'Convocatorias, proyectos y actividad del Semillero de Investigación BIGATIC.',
    site: context.site ?? new URL('https://bigatic.org'),
    customData: '<language>es-CO</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: new Date(`${post.data.date}T12:00:00Z`),
      link: `/actualidad/${post.data.routeSlug}/`,
      categories: post.data.tags,
    })),
  });
}
