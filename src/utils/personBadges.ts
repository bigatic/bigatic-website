import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../data/site';

type PersonData = CollectionEntry<'people'>['data'];

export type BadgeIcon =
  | 'microscope'
  | 'globe'
  | 'flask'
  | 'users'
  | 'briefcase'
  | 'layers'
  | 'file-text'
  | 'compass'
  | 'badge-check'
  | 'flag'
  | 'megaphone'
  | 'network';

export interface PersonBadge {
  key: string;
  icon: BadgeIcon;
  label: string;
  detail: string;
}

interface BadgeCopy {
  label: string;
  detail: string;
}

const badgeCopy = {
  es: {
    'research-assistantship': {
      label: 'Asistencia de investigación',
      detail: 'Asistencia formal registrada en su trayectoria.',
    },
    'academic-exchange': {
      label: 'Intercambio académico',
      detail: 'Intercambio académico vigente o cursado.',
    },
    'research-project': {
      label: 'Proyecto externo',
      detail: 'Participación verificable en otro proyecto de investigación.',
    },
    'research-group': {
      label: 'Semillero externo',
      detail: 'Vinculación a otro semillero o grupo de investigación.',
    },
    'professional-experience': {
      label: 'Experiencia profesional',
      detail: 'Experiencia profesional pertinente al proyecto.',
    },
    'bigatic-project': {
      label: 'Proyecto BIGATIC',
      detail: 'Proyecto del semillero vinculado a su perfil.',
    },
    'bigatic-publication': {
      label: 'Publicación',
      detail: 'Producción académica vinculada a su perfil.',
    },
    'multi-area': {
      label: 'Multiárea',
      detail: 'Trabaja en tres o más áreas de investigación.',
    },
    orcid: {
      label: 'ORCID',
      detail: 'Identificador de investigador registrado.',
    },
    'project-lead': {
      label: 'Liderazgo de proyecto',
      detail: 'Lidera un proyecto dentro de su núcleo.',
    },
    'coordination-support': {
      label: 'Apoyo a coordinación',
      detail: 'Apoya la coordinación de su núcleo.',
    },
    outreach: {
      label: 'Divulgación',
      detail: 'Apoya la divulgación del semillero.',
    },
  },
  en: {
    'research-assistantship': {
      label: 'Research assistantship',
      detail: 'Formal research assistantship on record.',
    },
    'academic-exchange': {
      label: 'Academic exchange',
      detail: 'Current or completed academic exchange.',
    },
    'research-project': {
      label: 'External project',
      detail: 'Verifiable work on another research project.',
    },
    'research-group': {
      label: 'External research group',
      detail: 'Membership in another research group or seedbed.',
    },
    'professional-experience': {
      label: 'Professional experience',
      detail: 'Professional experience relevant to the project.',
    },
    'bigatic-project': {
      label: 'BIGATIC project',
      detail: 'Group project linked to this profile.',
    },
    'bigatic-publication': {
      label: 'Publication',
      detail: 'Academic output linked to this profile.',
    },
    'multi-area': {
      label: 'Multi-area',
      detail: 'Works across three or more research areas.',
    },
    orcid: {
      label: 'ORCID',
      detail: 'Registered researcher identifier.',
    },
    'project-lead': {
      label: 'Project lead',
      detail: 'Leads a project within their strand.',
    },
    'coordination-support': {
      label: 'Coordination support',
      detail: 'Supports the coordination of their strand.',
    },
    outreach: {
      label: 'Communications',
      detail: 'Supports the group communications work.',
    },
  },
} as const satisfies Record<Locale, Record<string, BadgeCopy>>;

const experienceIcons = {
  'research-assistantship': 'microscope',
  'academic-exchange': 'globe',
  'research-project': 'flask',
  'research-group': 'users',
  'professional-experience': 'briefcase',
} as const satisfies Record<PersonData['researchExperience'][number]['kind'], BadgeIcon>;

/**
 * Badges are derived only from structured frontmatter, never from prose.
 * `previousBigaticMembership` is deliberately excluded: docs/RANKING.md states it
 * must never surface as a public badge, stat or trajectory.
 */
export function getPersonBadges(data: PersonData, locale: Locale): PersonBadge[] {
  const copy = badgeCopy[locale];
  const badges: PersonBadge[] = [];
  const add = (key: keyof typeof copy, icon: BadgeIcon) => {
    badges.push({ key, icon, label: copy[key].label, detail: copy[key].detail });
  };

  if (data.projects.length > 0) add('bigatic-project', 'layers');
  if (data.publications.length > 0) add('bigatic-publication', 'file-text');

  const seenKinds = new Set<string>();
  for (const experience of data.researchExperience) {
    if (seenKinds.has(experience.kind)) continue;
    seenKinds.add(experience.kind);
    add(experience.kind, experienceIcons[experience.kind]);
  }

  if (data.researchAreas.length >= 3) add('multi-area', 'compass');

  const participationRole = data.participation?.role.toLocaleLowerCase(locale) ?? '';
  if (
    participationRole.includes('líder de proyecto') ||
    participationRole.includes('project lead')
  ) {
    add('project-lead', 'flag');
  } else if (
    participationRole.includes('coordinación') ||
    participationRole.includes('coordination')
  ) {
    add('coordination-support', 'network');
  } else if (
    participationRole.includes('divulgación') ||
    participationRole.includes('communications')
  ) {
    add('outreach', 'megaphone');
  }

  if (data.orcid) add('orcid', 'badge-check');

  return badges;
}

/** Achievements a student can still reach through group work, used as a forward path. */
export function getUpcomingBadges(data: PersonData, locale: Locale): PersonBadge[] {
  if (data.role !== 'student-researcher') return [];
  const copy = badgeCopy[locale];
  const upcoming: PersonBadge[] = [];

  if (data.projects.length === 0) {
    upcoming.push({
      key: 'bigatic-project',
      icon: 'layers',
      label: copy['bigatic-project'].label,
      detail: copy['bigatic-project'].detail,
    });
  }
  if (data.publications.length === 0) {
    upcoming.push({
      key: 'bigatic-publication',
      icon: 'file-text',
      label: copy['bigatic-publication'].label,
      detail: copy['bigatic-publication'].detail,
    });
  }
  if (data.researchAreas.length < 3) {
    upcoming.push({
      key: 'multi-area',
      icon: 'compass',
      label: copy['multi-area'].label,
      detail: copy['multi-area'].detail,
    });
  }

  return upcoming;
}
