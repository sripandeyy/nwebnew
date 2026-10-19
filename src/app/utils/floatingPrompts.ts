'use client';

import { useEffect, useSyncExternalStore } from 'react';

export type PromptCorner = 'left' | 'right';

type PromptRequest = { id: string; corner: PromptCorner };

const PHONE_QUERY = '(max-width: 639px)';
const NO_REQUESTS: PromptRequest[] = [];

let queue: PromptRequest[] = NO_REQUESTS;
const listeners = new Set<() => void>();

function setQueue(next: PromptRequest[]) {
  queue = next;
  listeners.forEach((listener) => listener());
}

function subscribeQueue(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function subscribePhone(listener: () => void) {
  const media = window.matchMedia(PHONE_QUERY);
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
}

/**
 * Bottom-corner prompts (cookie notice, callback card, LinkedIn card) take turns:
 * one per corner on larger screens and a single one on phones, where every
 * prompt spans the full width. Returns whether this prompt may render now.
 */
export function useFloatingPromptSlot(id: string, corner: PromptCorner, wanted: boolean): boolean {
  useEffect(() => {
    if (!wanted) return;
    setQueue([...queue, { id, corner }]);
    return () => setQueue(queue.filter((request) => request.id !== id));
  }, [id, corner, wanted]);

  const requests = useSyncExternalStore(subscribeQueue, () => queue, () => NO_REQUESTS);
  const isPhone = useSyncExternalStore(
    subscribePhone,
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false
  );

  const holder = requests.find((request) => isPhone || request.corner === corner);
  return wanted && holder?.id === id;
}
