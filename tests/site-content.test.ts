import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { diffList, mergeList, mergeCollection } from '../src/app/utils/siteContent';
import {
  checkAdminCredentials,
  createAdminToken,
  isAdminIdentifier,
  verifyAdminToken,
} from '../src/app/api/_lib/adminAuth';

type Item = { slug: string; title: string };

const defaults: Item[] = [
  { slug: 'a', title: 'A' },
  { slug: 'b', title: 'B' },
  { slug: 'c', title: 'C' },
];

describe('Site content diff & merge', () => {
  test('an unchanged list produces an empty diff', () => {
    assert.deepEqual(diffList(defaults, defaults), { upserts: [], deleted: [] });
  });

  test('round-trips creates, edits and deletes', () => {
    const edited: Item[] = [{ slug: 'new', title: 'New' }, { slug: 'a', title: 'A (edited)' }, { slug: 'c', title: 'C' }];
    const diff = diffList(defaults, edited);
    assert.deepEqual(diff.deleted, ['b']);
    assert.deepEqual(diff.upserts.map((u) => u.slug), ['new', 'a']);
    assert.deepEqual(mergeList(defaults, diff), edited);
  });

  test('defaults added to the code later still appear', () => {
    const diff = diffList(defaults, defaults.filter((d) => d.slug !== 'b'));
    const merged = mergeList([...defaults, { slug: 'd', title: 'D' }], diff);
    assert.deepEqual(merged.map((m) => m.slug), ['a', 'c', 'd']);
  });

  test('a missing diff leaves the defaults untouched', () => {
    assert.equal(mergeList(defaults, undefined), defaults);
  });

  test('collections hide defaults and append added items', () => {
    const merged = mergeCollection(defaults, { added: [{ slug: 'x', title: 'X' }], hidden: ['a'] }, (i) => i.slug);
    assert.deepEqual(merged.map((m) => m.slug), ['b', 'c', 'x']);
  });
});

describe('Admin session', () => {
  test('accepts the admin username case-insensitively plus its aliases', () => {
    assert.ok(checkAdminCredentials('ADMIN@2026', 'admin@nyeras2026'));
    assert.ok(checkAdminCredentials('admin@2026', 'admin@nyeras2026'));
    assert.ok(checkAdminCredentials('admin@nyeras.com', 'admin@nyeras2026'));
    assert.ok(isAdminIdentifier(' ADMIN@2026 '));
  });

  test('rejects wrong passwords and other users', () => {
    assert.equal(checkAdminCredentials('ADMIN@2026', 'wrong'), false);
    assert.equal(checkAdminCredentials('student@example.com', 'admin@nyeras2026'), false);
  });

  test('tokens verify and reject tampering', () => {
    const token = createAdminToken();
    assert.ok(verifyAdminToken(token));
    const [payload, sig] = token.split('.');
    const forged = Buffer.from(JSON.stringify({ sub: 'ADMIN@2026', exp: 9999999999 })).toString('base64url');
    assert.equal(verifyAdminToken(`${forged}.${sig}`), false);
    assert.equal(verifyAdminToken(`${payload}.${sig.slice(0, -2)}xx`), false);
    assert.equal(verifyAdminToken(undefined), false);
    assert.equal(verifyAdminToken('garbage'), false);
  });
});
