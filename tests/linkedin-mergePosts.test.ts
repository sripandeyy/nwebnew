import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { mergePosts } from '../src/app/api/linkedin/_lib/mergePosts';
import { NormalizedLinkedInPost } from '../src/app/api/linkedin/_lib/types';

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

describe('LinkedIn post merging & duplicate prevention', () => {
  const post1 = makePost(1001, 1700000000000);
  const post2 = makePost(1002, 1700005000000);

  test('adds posts and counts newly added elements', () => {
    const res = mergePosts([], [post1, post2]);
    assert.strictEqual(res.newCount, 2);
    assert.strictEqual(res.posts.length, 2);
  });

  test('prevents duplicates when identical posts are ingested again', () => {
    const first = mergePosts([], [post1]);
    const second = mergePosts(first.posts, [post1]);
    assert.strictEqual(second.newCount, 0);
    assert.strictEqual(second.updatedCount, 0);
    assert.strictEqual(second.posts.length, 1);
  });

  test('detects content edits on existing posts without creating duplicates', () => {
    const res = mergePosts([post1], [{ ...post1, commentary: 'Edited commentary text' }]);
    assert.strictEqual(res.newCount, 0);
    assert.strictEqual(res.updatedCount, 1);
    assert.strictEqual(res.posts.length, 1);
    assert.strictEqual(res.posts[0].commentary, 'Edited commentary text');
  });

  test('refreshes rotated media URLs without counting them as edits', () => {
    const withImage = makePost(2001, 1700000000000, { media: [{ type: 'image', url: 'https://media.licdn.com/a?sig=1' }] });
    const res = mergePosts([withImage], [{ ...withImage, media: [{ type: 'image', url: 'https://media.licdn.com/a?sig=2' }] }]);
    assert.strictEqual(res.updatedCount, 0);
    assert.strictEqual(res.posts[0].media[0].url, 'https://media.licdn.com/a?sig=2');
  });

  test('removes cached posts that LinkedIn no longer returns within the fetched window', () => {
    const older = makePost(3001, 1000);
    const deleted = makePost(3002, 2000);
    const newest = makePost(3003, 3000);

    const res = mergePosts([older, deleted, newest], [older, newest]);
    assert.strictEqual(res.removedCount, 1);
    assert.deepStrictEqual(res.posts.map((p) => p.urn), ['urn:li:share:3003', 'urn:li:share:3001']);
  });

  test('keeps older cached posts that fall outside the fetched window', () => {
    const res = mergePosts([makePost(4001, 1000)], [makePost(4002, 5000)]);
    assert.strictEqual(res.removedCount, 0);
    assert.strictEqual(res.posts.length, 2);
  });

  test('an empty fetch never wipes the cached feed', () => {
    const res = mergePosts([post1, post2], []);
    assert.strictEqual(res.removedCount, 0);
    assert.strictEqual(res.posts.length, 2);
  });

  test('sorts posts newest first', () => {
    const res = mergePosts([], [post1, post2]);
    assert.deepStrictEqual(res.posts.map((p) => p.id), ['urn:li:share:1002', 'urn:li:share:1001']);
  });
});
