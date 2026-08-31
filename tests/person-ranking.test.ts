import assert from 'node:assert/strict';
import test from 'node:test';
import type { CollectionEntry } from 'astro:content';
import { getPersonRanking } from '../src/utils/personRanking.ts';

type PersonData = CollectionEntry<'people'>['data'];

function person(overrides: Partial<PersonData> = {}) {
  return {
    role: 'student-researcher',
    academicSemester: 4,
    previousBigaticMembership: false,
    researchExperience: [],
    projects: [],
    publications: [],
    ...overrides,
  } as PersonData;
}

test('uses the academic semester as a base without granting current BIGATIC XP to newcomers', () => {
  const ranking = getPersonRanking(person({ academicSemester: 4 }));

  assert.equal(ranking.academicBase, 8);
  assert.equal(ranking.currentBigaticXp, 0);
  assert.equal(ranking.score, 8);
});

test('combines semester, continuity, and verified external experience using global weights', () => {
  const seniorWithProject = getPersonRanking(
    person({
      academicSemester: 9,
      previousBigaticMembership: true,
      researchExperience: [
        { kind: 'research-project', name: 'External research project' },
        { kind: 'professional-experience', name: 'Relevant professional practice' },
      ],
    }),
  );
  const studentWithAssistantship = getPersonRanking(
    person({
      academicSemester: 5,
      previousBigaticMembership: false,
      researchExperience: [
        { kind: 'research-assistantship', name: 'External research assistantship' },
        { kind: 'academic-exchange', name: 'Academic exchange' },
      ],
    }),
  );
  const returningTenthSemester = getPersonRanking(
    person({ academicSemester: 10, previousBigaticMembership: true }),
  );

  assert.equal(seniorWithProject.score, 53);
  assert.equal(studentWithAssistantship.score, 45);
  assert.equal(returningTenthSemester.score, 25);
  assert.ok(seniorWithProject.score > studentWithAssistantship.score);
  assert.ok(studentWithAssistantship.score > returningTenthSemester.score);
});

test('increases current BIGATIC XP through linked projects and publications', () => {
  const ranking = getPersonRanking(
    person({ projects: ['project-one'], publications: ['publication-one'] }),
  );

  assert.equal(ranking.currentBigaticXp, 30);
  assert.equal(ranking.resultCount, 2);
});
