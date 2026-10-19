import { NormalizedLinkedInPost } from './types';

// Signed media URLs rotate on every fetch, so they are excluded when detecting real edits
function contentSignature(post: NormalizedLinkedInPost): string {
  return JSON.stringify({
    commentary: post.commentary,
    lastModifiedAt: post.lastModifiedAt,
    media: (post.media || []).map((m) => ({ type: m.type, title: m.title, description: m.description })),
  });
}

export interface MergeResult {
  posts: NormalizedLinkedInPost[];
  newCount: number;
  updatedCount: number;
  removedCount: number;
}

function toMillis(value: number | string): number {
  return typeof value === 'number' ? value : new Date(value).getTime();
}

export function sortNewestFirst(posts: NormalizedLinkedInPost[]): NormalizedLinkedInPost[] {
  return [...posts].sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
}

/**
 * Merges a fresh fetch into the cached feed with duplicate prevention.
 * Returns the merged feed, newest first.
 */
export function mergePosts(existing: NormalizedLinkedInPost[], incoming: NormalizedLinkedInPost[]): MergeResult {
  const postsMap = new Map<string, NormalizedLinkedInPost>();
  for (const post of existing) {
    if (post && post.urn) postsMap.set(post.urn, post);
  }

  let newCount = 0;
  let updatedCount = 0;
  const fresh = incoming.filter((p) => p && p.urn);

  for (const post of fresh) {
    const current = postsMap.get(post.urn);
    if (!current) {
      newCount++;
      postsMap.set(post.urn, post);
    } else {
      // Always keep the freshest copy (media URLs expire), but only count real content edits
      if (contentSignature(current) !== contentSignature(post)) updatedCount++;
      postsMap.set(post.urn, { ...current, ...post });
    }
  }

  // Incoming posts are the newest N by creation time, so any cached post inside that
  // window that LinkedIn no longer returns has been deleted or hidden.
  let removedCount = 0;
  if (fresh.length > 0) {
    const incomingUrns = new Set(fresh.map((p) => p.urn));
    const oldestIncoming = Math.min(...fresh.map((p) => toMillis(p.createdAt)));
    for (const [urn, post] of postsMap) {
      if (!incomingUrns.has(urn) && toMillis(post.createdAt) >= oldestIncoming) {
        postsMap.delete(urn);
        removedCount++;
      }
    }
  }

  return { posts: sortNewestFirst(Array.from(postsMap.values())), newCount, updatedCount, removedCount };
}
