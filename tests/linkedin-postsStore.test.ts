import './helpers/isolate-env';
import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { postsStore } from '../src/server/linkedin/postsStore';
import { NormalizedLinkedInPost } from '../src/server/linkedin/types';

function makePost(id: number, createdAt: number, extra: Partial<NormalizedLinkedInPost> = {}): NormalizedLinkedInPost {
  return {
    id: `urn:li:share:${id}`,
    urn: `urn:li:share:${id}`,
    commentary: `Post ${id}`,
    createdAt,
    createdAtFormatted: 'Nov 14, 2023',
    postUrl: `https://www.linkedin.com/feed/update/urn:li:share:${id}`,
    author: { name: 'Nyeras EduTech', urn: 'urn:li:organization:123' },
    media: [],
    ...extra,
  };
}

describe('LinkedIn Posts Store & Duplicate Prevention', () => {
  beforeEach(() => {
    postsStore.clear();
  });

  const mockPost1 = makePost(1001, 1700000000000);
  const mockPost2 = makePost(1002, 1700005000000);

  test('adds posts and counts newly added elements', () => {
    const res = postsStore.addOrUpdatePosts([mockPost1, mockPost2]);
    assert.strictEqual(res.newCount, 2);
    assert.strictEqual(res.total, 2);
    assert.strictEqual(postsStore.getPostCount(), 2);
  });

  test('prevents duplicates when identical posts are ingested again', () => {
    postsStore.addOrUpdatePosts([mockPost1]);
    const secondSync = postsStore.addOrUpdatePosts([mockPost1]);
    assert.strictEqual(secondSync.newCount, 0, 'Should not count existing post as new');
    assert.strictEqual(secondSync.total, 1, 'Total should remain 1');
  });

  test('detects content updates on existing posts without creating duplicates', () => {
    postsStore.addOrUpdatePosts([mockPost1]);

    const res = postsStore.addOrUpdatePosts([{ ...mockPost1, commentary: 'Edited commentary text' }]);
    assert.strictEqual(res.newCount, 0);
    assert.strictEqual(res.updatedCount, 1);
    assert.strictEqual(postsStore.getPostCount(), 1);
    assert.strictEqual(postsStore.getAllPosts()[0].commentary, 'Edited commentary text');
  });

  test('refreshes rotated media URLs without counting them as edits', () => {
    const withImage = makePost(2001, 1700000000000, {
      media: [{ type: 'image', url: 'https://media.licdn.com/a?sig=1' }],
    });
    postsStore.addOrUpdatePosts([withImage]);

    const res = postsStore.addOrUpdatePosts([
      { ...withImage, media: [{ type: 'image', url: 'https://media.licdn.com/a?sig=2' }] },
    ]);
    assert.strictEqual(res.updatedCount, 0);
    assert.strictEqual(postsStore.getAllPosts()[0].media[0].url, 'https://media.licdn.com/a?sig=2');
  });

  test('removes cached posts that LinkedIn no longer returns within the fetched window', () => {
    const older = makePost(3001, 1000);
    const deleted = makePost(3002, 2000);
    const newest = makePost(3003, 3000);
    postsStore.addOrUpdatePosts([older, deleted, newest]);

    // Next sync window covers createdAt >= 1000 but no longer includes 3002
    const res = postsStore.addOrUpdatePosts([older, newest]);
    assert.strictEqual(res.removedCount, 1);
    assert.deepStrictEqual(postsStore.getAllPosts().map((p) => p.urn), ['urn:li:share:3003', 'urn:li:share:3001']);
  });

  test('keeps older cached posts that fall outside the fetched window', () => {
    const old = makePost(4001, 1000);
    postsStore.addOrUpdatePosts([old]);

    const res = postsStore.addOrUpdatePosts([makePost(4002, 5000)]);
    assert.strictEqual(res.removedCount, 0);
    assert.strictEqual(postsStore.getPostCount(), 2);
  });

  test('sorts posts by createdAt descending (newest first)', () => {
    postsStore.addOrUpdatePosts([mockPost1, mockPost2]);
    const all = postsStore.getAllPosts();
    assert.strictEqual(all[0].id, 'urn:li:share:1002', 'Newer post should be first');
    assert.strictEqual(all[1].id, 'urn:li:share:1001', 'Older post should be second');
  });
});
