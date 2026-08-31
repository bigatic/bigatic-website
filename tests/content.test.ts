import assert from 'node:assert/strict';
import test from 'node:test';
import type { CollectionEntry } from 'astro:content';
import { effectiveCallStatus } from '../src/utils/content.ts';

function call(
  status: 'upcoming' | 'open' | 'closed',
  openDate?: string,
  closeDate = '2026-08-14',
): CollectionEntry<'calls'> {
  return { data: { status, openDate, closeDate } } as unknown as CollectionEntry<'calls'>;
}

test('keeps a scheduled call upcoming before its opening date in Bogotá', () => {
  assert.equal(
    effectiveCallStatus(call('upcoming', '2026-08-10'), new Date('2026-08-09T17:00:00Z')),
    'upcoming',
  );
});

test('opens a scheduled call on its opening date in Bogotá', () => {
  assert.equal(
    effectiveCallStatus(call('upcoming', '2026-08-10'), new Date('2026-08-10T17:00:00Z')),
    'open',
  );
});

test('keeps a call open throughout its closing date in Bogotá', () => {
  assert.equal(
    effectiveCallStatus(call('open', '2026-08-10'), new Date('2026-08-14T17:00:00Z')),
    'open',
  );
});

test('closes a call after its closing date in Bogotá', () => {
  assert.equal(
    effectiveCallStatus(call('open', '2026-08-10'), new Date('2026-08-15T17:00:00Z')),
    'closed',
  );
});

test('lets an explicit closed status override the dates', () => {
  assert.equal(
    effectiveCallStatus(call('closed', '2026-08-10'), new Date('2026-08-10T17:00:00Z')),
    'closed',
  );
});

test('keeps an upcoming call without an opening date under editorial control', () => {
  assert.equal(
    effectiveCallStatus(call('upcoming', undefined), new Date('2026-08-10T17:00:00Z')),
    'upcoming',
  );
});
