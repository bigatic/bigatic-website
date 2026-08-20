import type { CollectionEntry } from 'astro:content';

type PersonData = CollectionEntry<'people'>['data'];

const EXPERIENCE_POINTS = {
  'research-project': 20,
  'research-group': 12,
  'research-assistantship': 25,
  'academic-exchange': 10,
  'professional-experience': 10,
} as const;

export const RANK_LABELS = {
  es: ['Aprendiz', 'Explorador', 'Constructor', 'Vanguardia', 'Mentor'],
  en: ['Apprentice', 'Explorer', 'Builder', 'Vanguard', 'Mentor'],
} as const;

/**
 * Progression ramp for the five ranks, read like RPG tiers but built only from
 * hues already in the design system: steel, brand blue, the multi-area teal,
 * the focus amber and the institutional green reserved for reaching the top.
 */
export const RANK_TIERS = [
  { accent: '#5f7891', deep: '#3d4f61', soft: '#eef2f6', rgb: '95 120 145' },
  { accent: '#0878b4', deep: '#07517b', soft: '#e6f4fc', rgb: '8 120 180' },
  { accent: '#14777d', deep: '#0c5055', soft: '#e6f5f5', rgb: '20 119 125' },
  { accent: '#b06a12', deep: '#7a480b', soft: '#fdf1e0', rgb: '176 106 18' },
  { accent: '#087e35', deep: '#065a26', soft: '#e4f5e9', rgb: '8 126 53' },
] as const;

export const rankTierStyle = (level: number) => {
  const tier = RANK_TIERS[Math.min(Math.max(level, 1), RANK_TIERS.length) - 1];
  return `--tier-accent: ${tier.accent}; --tier-deep: ${tier.deep}; --tier-soft: ${tier.soft}; --tier-rgb: ${tier.rgb}`;
};

export const RANKING_WEIGHTS = {
  academicSemester: 2,
  previousBigaticMembership: 5,
  bigaticProject: 12,
  bigaticPublication: 18,
  maxProjects: 2,
  maxPublications: 2,
  experience: EXPERIENCE_POINTS,
} as const;

export function getPersonRanking(data: PersonData) {
  const academicBase = (data.academicSemester ?? 0) * RANKING_WEIGHTS.academicSemester;
  const continuityPoints = data.previousBigaticMembership
    ? RANKING_WEIGHTS.previousBigaticMembership
    : 0;
  const experiencePoints = data.researchExperience.reduce(
    (total, experience) => total + RANKING_WEIGHTS.experience[experience.kind],
    0,
  );
  const projectPoints =
    Math.min(data.projects.length, RANKING_WEIGHTS.maxProjects) * RANKING_WEIGHTS.bigaticProject;
  const publicationPoints =
    Math.min(data.publications.length, RANKING_WEIGHTS.maxPublications) *
    RANKING_WEIGHTS.bigaticPublication;
  const currentBigaticXp = projectPoints + publicationPoints;
  const documentedScore = academicBase + continuityPoints + currentBigaticXp + experiencePoints;
  const roleFloor =
    data.role === 'research-lead' ? 90 : data.role === 'faculty-researcher' ? 70 : 0;
  const score = Math.min(100, Math.max(documentedScore, roleFloor));
  const level = score >= 80 ? 5 : score >= 60 ? 4 : score >= 40 ? 3 : score >= 20 ? 2 : 1;

  return {
    academicBase,
    continuityPoints,
    currentBigaticXp,
    documentedScore,
    experiencePoints,
    level,
    resultCount: data.projects.length + data.publications.length,
    score,
  };
}
