import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locale = z.enum(['es', 'en']);
const status = z.enum(['active', 'completed', 'planned', 'archived']);
const text = z.string().trim().min(1);
const link = z.url().refine((value) => new URL(value).protocol === 'https:', 'URL must use HTTPS');
const mediaPath = z.string().regex(/^\/[A-Za-z0-9][A-Za-z0-9._~!$&'()*+,;=:@/-]*$/);
const mediaAsset = z
  .object({
    src: mediaPath,
    alt: text,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    caption: text.optional(),
    credit: text.optional(),
  })
  .strict();
const routeSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const civilDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const [year, month, day] = value.split('-').map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    return (
      parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() === month - 1 &&
      parsed.getUTCDate() === day
    );
  }, 'Invalid calendar date');

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.md' }),
  schema: z
    .object({
      name: text,
      // Rotulo breve del area. Existe porque el nombre completo no cabe en el
      // dial del hero ni en una ficha estrecha; nunca sustituye a `name`.
      shortName: text,
      routeSlug,
      locale,
      translationKey: routeSlug,
      shortDescription: text,
      topics: z.array(text).min(1),
      icon: z.enum(['code', 'shield', 'cloud', 'pointer', 'data', 'network']),
      featured: z.boolean().default(false),
      order: z.number().int().positive(),
      status: z.enum(['current', 'developing']).default('current'),
    })
    .strict(),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string(),
      routeSlug,
      locale,
      translationKey: routeSlug,
      summary: z.string(),
      status,
      startDate: civilDate.optional(),
      endDate: civilDate.optional(),
      researchAreas: z.array(z.string()).default([]),
      lead: z.string().optional(),
      members: z.array(z.string()).default([]),
      collaborators: z.array(z.string()).default([]),
      abstract: z.string().optional(),
      problem: z.string().optional(),
      objectives: z.array(z.string()).default([]),
      methodology: z.string().optional(),
      technologies: z.array(z.string()).default([]),
      repository: link.optional(),
      website: link.optional(),
      doi: z
        .string()
        .regex(/^10\.\d{4,9}\/\S+$/)
        .optional(),
      publications: z.array(z.string()).default([]),
      software: z.array(z.string()).default([]),
      datasets: z.array(z.string()).default([]),
      funding: z.string().optional(),
      partners: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      coverImage: mediaAsset.optional(),
      gallery: z.array(mediaAsset).default([]),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    })
    .strict()
    .refine(({ startDate, endDate }) => !startDate || !endDate || startDate <= endDate, {
      path: ['endDate'],
      message: 'endDate must be on or after startDate',
    }),
});

const people = defineCollection({
  loader: glob({ base: './src/content/people', pattern: '**/*.md' }),
  schema: z
    .object({
      name: z.string(),
      routeSlug,
      locale,
      translationKey: routeSlug,
      role: z.enum([
        'research-lead',
        'faculty-researcher',
        'student-researcher',
        'collaborator',
        'alumni',
      ]),
      roleLabel: z.string(),
      affiliation: z.string(),
      academicProgram: text.optional(),
      academicSemester: z.number().int().min(1).max(12).optional(),
      previousBigaticMembership: z.boolean().default(false),
      researchExperience: z
        .array(
          z
            .object({
              kind: z.enum([
                'research-project',
                'research-group',
                'research-assistantship',
                'academic-exchange',
                'professional-experience',
              ]),
              name: z.string(),
            })
            .strict(),
        )
        .default([]),
      photo: mediaPath.optional(),
      shortBio: z.string().optional(),
      researchAreas: z.array(routeSlug).default([]),
      primaryResearchArea: routeSlug.optional(),
      researchInterests: z.array(z.string()).default([]),
      participation: z
        .object({
          nucleus: text,
          category: text,
          activity: text,
          role: text,
        })
        .strict()
        .optional(),
      email: z.email().optional(),
      github: link.optional(),
      orcid: link.optional(),
      linkedin: link.optional(),
      googleScholar: link.optional(),
      researchGate: link.optional(),
      website: link.optional(),
      projects: z.array(z.string()).default([]),
      publications: z.array(z.string()).default([]),
      status: z.enum(['current', 'alumni']).default('current'),
      order: z.number().int().positive(),
      draft: z.boolean().default(false),
    })
    .strict()
    .refine(
      ({ primaryResearchArea, researchAreas }) =>
        !primaryResearchArea || researchAreas.includes(primaryResearchArea),
      {
        path: ['primaryResearchArea'],
        message: 'primaryResearchArea must also be listed in researchAreas',
      },
    )
    .refine(({ role, academicSemester }) => role !== 'student-researcher' || academicSemester, {
      path: ['academicSemester'],
      message: 'academicSemester is required for student researchers',
    }),
});

const outputs = defineCollection({
  loader: glob({ base: './src/content/outputs', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string(),
      routeSlug,
      locale,
      translationKey: routeSlug,
      authors: z.array(z.string()).min(1),
      year: z.number().int().min(1900).max(2200),
      type: z.enum([
        'journal-article',
        'conference-paper',
        'book-chapter',
        'software',
        'dataset',
        'technical-report',
        'poster',
        'presentation',
        'thesis',
        'research-prototype',
        'other',
      ]),
      venue: z.string().optional(),
      publisher: z.string().optional(),
      doi: z
        .string()
        .regex(/^10\.\d{4,9}\/\S+$/)
        .optional(),
      url: link.optional(),
      repository: link.optional(),
      citation: z.string().optional(),
      bibtex: z.string().optional(),
      abstract: z.string().optional(),
      project: z.string().optional(),
      researchArea: z.string().optional(),
      featured: z.boolean().default(false),
      version: z.string().optional(),
      language: z.string().optional(),
      license: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .strict(),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string(),
      routeSlug,
      locale,
      translationKey: routeSlug,
      date: civilDate,
      updatedDate: civilDate.optional(),
      summary: z.string(),
      author: z.string(),
      image: mediaPath.optional(),
      imageAlt: text.optional(),
      imageWidth: z.number().int().positive().optional(),
      imageHeight: z.number().int().positive().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      relatedProject: z.string().optional(),
      relatedEvent: z.string().optional(),
      relatedCall: z.string().optional(),
    })
    .strict()
    .refine(({ date, updatedDate }) => !updatedDate || date <= updatedDate, {
      path: ['updatedDate'],
      message: 'updatedDate must be on or after date',
    })
    .refine(({ image, imageAlt }) => !image || Boolean(imageAlt), {
      path: ['imageAlt'],
      message: 'imageAlt is required when image is provided',
    })
    .refine(({ image, imageAlt }) => !imageAlt || Boolean(image), {
      path: ['image'],
      message: 'image is required when imageAlt is provided',
    })
    .refine(
      ({ image, imageWidth, imageHeight }) =>
        !image || (Boolean(imageWidth) && Boolean(imageHeight)),
      {
        path: ['imageWidth'],
        message: 'imageWidth and imageHeight are required when image is provided',
      },
    )
    .refine(({ image, imageWidth, imageHeight }) => image || (!imageWidth && !imageHeight), {
      path: ['image'],
      message: 'image is required when image dimensions are provided',
    }),
});

const calls = defineCollection({
  loader: glob({ base: './src/content/calls', pattern: '**/*.md' }),
  schema: z
    .object({
      semester: z.string(),
      routeSlug,
      locale,
      translationKey: routeSlug,
      title: z.string(),
      status: z.enum(['upcoming', 'open', 'closed']),
      openDate: civilDate.optional(),
      closeDate: civilDate,
      formUrl: link,
      summary: z.string(),
      requirements: z.array(z.string()).min(1),
      workMode: z.array(z.string()).min(1),
      researchAreas: z.array(z.string()).min(1),
      transversalNote: z.string(),
      poster: mediaPath.optional(),
      posterSmall: mediaPath.optional(),
      posterLarge: mediaPath.optional(),
      posterAlt: text.optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    })
    .strict()
    .refine(({ openDate, closeDate }) => !openDate || openDate <= closeDate, {
      path: ['closeDate'],
      message: 'closeDate must be on or after openDate',
    })
    .refine(
      ({ poster, posterSmall, posterLarge, posterAlt }) =>
        !(poster || posterSmall || posterLarge) || Boolean(posterAlt),
      {
        path: ['posterAlt'],
        message: 'posterAlt is required when poster media is provided',
      },
    )
    .refine(({ posterSmall, posterLarge, poster }) => !(posterSmall || posterLarge) || poster, {
      path: ['poster'],
      message: 'poster is required when responsive poster variants are provided',
    })
    .refine(({ poster, posterAlt }) => !posterAlt || Boolean(poster), {
      path: ['poster'],
      message: 'poster is required when posterAlt is provided',
    }),
});

export const collections = { research, projects, people, outputs, news, calls };
