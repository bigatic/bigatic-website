import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../data/site';

type PersonData = CollectionEntry<'people'>['data'];

interface Palette {
  accent: string;
  deep: string;
  soft: string;
  rgb: string;
}

const nucleusPalettes = {
  cyber: { accent: '#0878b4', deep: '#07517b', soft: '#e6f6fc', rgb: '8 120 180' },
  software: { accent: '#5954b8', deep: '#383578', soft: '#f0effc', rgb: '89 84 184' },
  hci: { accent: '#b24778', deep: '#762b50', soft: '#fbedf4', rgb: '178 71 120' },
  health: { accent: '#278a65', deep: '#185b43', soft: '#e9f7f1', rgb: '39 138 101' },
  intelligent: { accent: '#bd6a16', deep: '#80460c', soft: '#fff3e3', rgb: '189 106 22' },
  multi: { accent: '#14777d', deep: '#0c5055', soft: '#e7f7f7', rgb: '20 119 125' },
  bigatic: { accent: '#176b91', deep: '#0a3b70', soft: '#eaf3f8', rgb: '23 107 145' },
} as const satisfies Record<string, Palette>;

const programPalettes = {
  psychology: { accent: '#9d3f70', soft: '#f9eaf2', rgb: '157 63 112' },
  software: { accent: '#0a5c9e', soft: '#e8f2fb', rgb: '10 92 158' },
  other: { accent: '#596b7b', soft: '#edf1f4', rgb: '89 107 123' },
} as const;

const cssVariables = (values: Record<string, string>) =>
  Object.entries(values)
    .map(([key, value]) => `--${key}: ${value}`)
    .join('; ');

export const getPersonPresentation = (data: PersonData, locale: Locale) => {
  const isEs = locale === 'es';
  const nucleus = data.participation?.nucleus;
  const normalizedNucleus = nucleus?.toLocaleLowerCase(locale) ?? '';

  let nucleusKey: keyof typeof nucleusPalettes = 'bigatic';
  let nucleusLabel = 'BIGATIC';

  if (!nucleus && data.researchAreas.length >= 3) {
    nucleusKey = 'multi';
    nucleusLabel = isEs ? 'Multiárea' : 'Multi-area';
  } else if (normalizedNucleus.includes('cyber')) {
    nucleusKey = 'cyber';
    nucleusLabel = 'CyberBIGATIC';
  } else if (normalizedNucleus.includes('human') || normalizedNucleus.includes('humano')) {
    nucleusKey = 'hci';
    nucleusLabel = isEs ? 'IHC + Tech' : 'HCI + Tech';
  } else if (normalizedNucleus.includes('salud') || normalizedNucleus.includes('health')) {
    nucleusKey = 'health';
    nucleusLabel = isEs ? 'Tech + Salud' : 'Tech + Health';
  } else if (
    normalizedNucleus.includes('sistemas inteligentes') ||
    normalizedNucleus.includes('intelligent systems')
  ) {
    nucleusKey = 'intelligent';
    nucleusLabel = isEs ? 'Sistemas IA' : 'AI Systems';
  } else if (normalizedNucleus.includes('software')) {
    nucleusKey = 'software';
    nucleusLabel = isEs ? 'Software + IA' : 'Software + AI';
  } else if (nucleus) {
    nucleusLabel = nucleus;
  }

  const academicProgram = data.academicProgram ?? '';
  const normalizedProgram = academicProgram.toLocaleLowerCase(locale);
  const programKey =
    normalizedProgram.includes('psicolog') || normalizedProgram.includes('psycholog')
      ? 'psychology'
      : normalizedProgram.includes('software')
        ? 'software'
        : 'other';
  const programPalette = programPalettes[programKey];
  const programCode =
    programKey === 'psychology'
      ? isEs
        ? 'PSI'
        : 'PSY'
      : programKey === 'software'
        ? isEs
          ? 'ISW'
          : 'SWE'
        : 'ACAD';
  const programLabel =
    programKey === 'psychology'
      ? isEs
        ? 'Psicología'
        : 'Psychology'
      : programKey === 'software'
        ? isEs
          ? 'Ing. de Software'
          : 'Software Eng.'
        : academicProgram || (isEs ? 'Programa académico' : 'Academic program');

  const nucleusPalette = nucleusPalettes[nucleusKey];

  return {
    nucleusKey,
    nucleusLabel,
    programKey,
    programCode,
    programLabel,
    themeStyle: cssVariables({
      'theme-accent': nucleusPalette.accent,
      'theme-deep': nucleusPalette.deep,
      'theme-soft': nucleusPalette.soft,
      'theme-rgb': nucleusPalette.rgb,
    }),
    programStyle: cssVariables({
      'program-accent': programPalette.accent,
      'program-soft': programPalette.soft,
      'program-rgb': programPalette.rgb,
    }),
  };
};
