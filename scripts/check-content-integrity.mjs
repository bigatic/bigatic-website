import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { URL } from 'node:url';
import { load as parseYaml } from 'js-yaml';

const collectionNames = ['research', 'projects', 'people', 'outputs', 'news', 'calls'];
const root = fileURLToPath(new URL('../src/content/', import.meta.url));
const failures = [];
const content = new Map();

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(path)));
    else if (extname(entry.name) === '.md') files.push(path);
  }
  return files;
}

for (const collectionName of collectionNames) {
  const directory = join(root, collectionName);
  const records = await Promise.all(
    (await markdownFiles(directory)).map(async (file) => {
      const source = await readFile(file, 'utf8');
      const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---(?:\s*\n|$)/);
      if (!frontmatter) throw new Error(`Missing YAML frontmatter: ${file}`);
      return { file, ...parseYaml(frontmatter[1]) };
    }),
  );
  const published = records.filter((record) => !record.draft);
  content.set(collectionName, published);
  const routeKeys = new Map();
  const translationKeys = new Map();

  for (const record of published) {
    const routeKey = `${record.locale}:${record.routeSlug}`;
    const translationKey = `${record.locale}:${record.translationKey}`;
    if (routeKeys.has(routeKey)) failures.push(`${collectionName}: duplicate route ${routeKey}`);
    if (translationKeys.has(translationKey))
      failures.push(`${collectionName}: duplicate translation ${translationKey}`);
    routeKeys.set(routeKey, record.file);
    translationKeys.set(translationKey, record.file);
  }

  const pairs = new Map();
  for (const record of published) {
    const locales = pairs.get(record.translationKey) ?? new Set();
    locales.add(record.locale);
    pairs.set(record.translationKey, locales);
  }
  for (const [translationKey, locales] of pairs) {
    if (!locales.has('es') || !locales.has('en')) {
      failures.push(`${collectionName}: ${translationKey} must have published ES and EN entries`);
    }
  }
}

function assertReferences(records, field, targets, label) {
  for (const record of records) {
    const values = Array.isArray(record[field]) ? record[field] : [record[field]].filter(Boolean);
    for (const value of values) {
      if (!targets.has(`${record.locale}:${value}`)) {
        failures.push(`${label}: unresolved ${field} '${value}' in ${record.file}`);
      }
    }
  }
}

const targetKeys = (collectionName) =>
  new Set(content.get(collectionName).map((record) => `${record.locale}:${record.translationKey}`));

function participationTier(category = '') {
  const normalized = category.toLowerCase();
  if (normalized.includes('activo integral') || normalized.includes('fully active')) return 20;
  if (normalized.includes('investigador') || normalized.includes('research member')) return 18;
  if (normalized.includes('articulación') || normalized.includes('liaison')) return 12;
  return category ? 10 : 0;
}

function academicProgramKind(program = '') {
  const normalized = program.toLowerCase();
  if (normalized.includes('psicolog') || normalized.includes('psycholog')) return 'psychology';
  if (normalized.includes('software')) return 'software';
  return program ? 'other' : 'missing';
}

function profilePresentationSignature(record) {
  const externalProfileCount = [
    record.github,
    record.orcid,
    record.linkedin,
    record.googleScholar,
    record.researchGate,
    record.website,
  ].filter(Boolean).length;

  return JSON.stringify({
    role: record.role,
    shortBio: Boolean(record.shortBio),
    photo: Boolean(record.photo),
    researchAreas: [...(record.researchAreas ?? [])].sort(),
    primaryResearchArea: record.primaryResearchArea ?? null,
    researchInterestCount: record.researchInterests?.length ?? 0,
    participationTier: participationTier(record.participation?.category),
    externalProfileCount,
    projects: [...(record.projects ?? [])].sort(),
    publications: [...(record.publications ?? [])].sort(),
    academicProgram: academicProgramKind(record.academicProgram),
    academicSemester: record.academicSemester ?? null,
    previousBigaticMembership: record.previousBigaticMembership ?? false,
    researchExperienceKinds: (record.researchExperience ?? [])
      .map((experience) => experience.kind)
      .sort(),
  });
}

const peoplePairs = new Map();
for (const person of content.get('people')) {
  if (!person.academicProgram) {
    failures.push(`people: academicProgram is required for published profile ${person.file}`);
  }
  if (person.role === 'student-researcher' && !person.academicSemester) {
    failures.push(`people: academicSemester is required for student profile ${person.file}`);
  }
  if (
    person.role === 'student-researcher' &&
    typeof person.previousBigaticMembership !== 'boolean'
  ) {
    failures.push(
      `people: previousBigaticMembership must be explicit for student profile ${person.file}`,
    );
  }
  const pair = peoplePairs.get(person.translationKey) ?? {};
  pair[person.locale] = person;
  peoplePairs.set(person.translationKey, pair);
}
for (const [translationKey, pair] of peoplePairs) {
  if (
    pair.es &&
    pair.en &&
    profilePresentationSignature(pair.es) !== profilePresentationSignature(pair.en)
  ) {
    failures.push(
      `people: ${translationKey} has different ranking or presentation signals in ES and EN`,
    );
  }
}

assertReferences(content.get('projects'), 'researchAreas', targetKeys('research'), 'projects');
assertReferences(content.get('projects'), 'lead', targetKeys('people'), 'projects');
assertReferences(content.get('projects'), 'members', targetKeys('people'), 'projects');
assertReferences(content.get('projects'), 'publications', targetKeys('outputs'), 'projects');
assertReferences(content.get('projects'), 'software', targetKeys('outputs'), 'projects');
assertReferences(content.get('projects'), 'datasets', targetKeys('outputs'), 'projects');
assertReferences(content.get('people'), 'researchAreas', targetKeys('research'), 'people');
assertReferences(content.get('people'), 'primaryResearchArea', targetKeys('research'), 'people');
assertReferences(content.get('people'), 'projects', targetKeys('projects'), 'people');
assertReferences(content.get('people'), 'publications', targetKeys('outputs'), 'people');
assertReferences(content.get('outputs'), 'project', targetKeys('projects'), 'outputs');
assertReferences(content.get('outputs'), 'researchArea', targetKeys('research'), 'outputs');
assertReferences(content.get('news'), 'relatedProject', targetKeys('projects'), 'news');
assertReferences(content.get('news'), 'relatedCall', targetKeys('calls'), 'news');

const outputTypes = new Map(
  content
    .get('outputs')
    .map((record) => [`${record.locale}:${record.translationKey}`, record.type]),
);
for (const project of content.get('projects')) {
  for (const [field, expectedType] of [
    ['software', 'software'],
    ['datasets', 'dataset'],
  ]) {
    for (const key of project[field] ?? []) {
      const actualType = outputTypes.get(`${project.locale}:${key}`);
      if (actualType && actualType !== expectedType) {
        failures.push(
          `projects: ${field} '${key}' must reference output type '${expectedType}', found '${actualType}' in ${project.file}`,
        );
      }
    }
  }
}

if (failures.length) {
  console.error(`Content integrity failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Content integrity passed: routes, translation pairs, and references are valid.');
