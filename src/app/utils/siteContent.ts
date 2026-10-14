"use client"

export type ListDiff<T> = { upserts: T[]; deleted: string[] }
export type CollectionDiff<T> = { added: T[]; hidden: string[] }

export type SiteContent = {
  courses?: ListDiff<unknown>
  blogs?: ListDiff<unknown>
  gallery?: CollectionDiff<unknown>
  mous?: CollectionDiff<unknown>
}

export type SaveResult = { success: boolean; message: string }

export const SITE_CONTENT_READY_EVENT = 'nyeras_site_content_ready'

let ready = false

export function isSiteContentReady() {
  return ready
}

export function markSiteContentReady() {
  ready = true
  window.dispatchEvent(new Event(SITE_CONTENT_READY_EVENT))
}

export async function fetchSiteContent(): Promise<SiteContent | null> {
  try {
    const res = await fetch('/api/site-content', { cache: 'no-store' })
    if (!res.ok) return null
    return (await res.json()) as SiteContent
  } catch {
    return null
  }
}

export async function saveSiteContent(key: keyof SiteContent, data: unknown): Promise<SaveResult> {
  try {
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ key, data }),
    })
    if (res.ok) return { success: true, message: 'Saved' }
    const body = await res.json().catch(() => null)
    return { success: false, message: body?.error || `Save failed (HTTP ${res.status}).` }
  } catch {
    return { success: false, message: 'Network error: changes were not saved. Please try again.' }
  }
}

/** Records how `list` differs from `defaults` so later code changes to the defaults still show up. */
export function diffList<T extends { slug: string }>(defaults: T[], list: T[]): ListDiff<T> {
  const defaultsBySlug = new Map(defaults.map((d) => [d.slug, JSON.stringify(d)]))
  const present = new Set(list.map((item) => item.slug))
  return {
    upserts: list.filter((item) => defaultsBySlug.get(item.slug) !== JSON.stringify(item)),
    deleted: defaults.filter((d) => !present.has(d.slug)).map((d) => d.slug),
  }
}

export function mergeList<T extends { slug: string }>(defaults: T[], diff: ListDiff<T> | undefined): T[] {
  if (!diff) return defaults
  const upserts = Array.isArray(diff.upserts) ? diff.upserts.filter((u) => u && typeof u.slug === 'string') : []
  const deleted = new Set(Array.isArray(diff.deleted) ? diff.deleted : [])
  const defaultSlugs = new Set(defaults.map((d) => d.slug))
  const overrides = new Map(upserts.map((u) => [u.slug, u]))
  const created = upserts.filter((u) => !defaultSlugs.has(u.slug))
  const kept = defaults.filter((d) => !deleted.has(d.slug)).map((d) => overrides.get(d.slug) ?? d)
  return [...created, ...kept]
}

export function mergeCollection<T>(
  defaults: T[],
  diff: CollectionDiff<T> | undefined,
  idOf: (item: T) => string
): T[] {
  if (!diff) return defaults
  const hidden = new Set(Array.isArray(diff.hidden) ? diff.hidden : [])
  const added = Array.isArray(diff.added) ? diff.added : []
  return [...defaults.filter((d) => !hidden.has(idOf(d))), ...added]
}

export type CollectionStore<T> = {
  event: string
  read: () => CollectionDiff<T>
  applyPublished: (diff: CollectionDiff<T>) => void
  publish: (diff: CollectionDiff<T>) => Promise<SaveResult>
}

/** A published list made of code-defined defaults, minus hidden ids, plus admin-added items. */
export function createCollectionStore<T>(key: 'gallery' | 'mous', storageKey: string, event: string): CollectionStore<T> {
  const empty: CollectionDiff<T> = { added: [], hidden: [] }

  const read = (): CollectionDiff<T> => {
    if (typeof window === 'undefined') return empty
    try {
      const raw = localStorage.getItem(storageKey)
      const parsed = raw ? JSON.parse(raw) : null
      return parsed && Array.isArray(parsed.added) && Array.isArray(parsed.hidden) ? parsed : empty
    } catch {
      return empty
    }
  }

  const applyPublished = (diff: CollectionDiff<T>) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(diff))
    } catch {
      // Storage full or disabled; the event below still updates components on this page.
    }
    window.dispatchEvent(new CustomEvent(event, { detail: diff }))
  }

  const publish = async (diff: CollectionDiff<T>): Promise<SaveResult> => {
    const result = await saveSiteContent(key, diff)
    if (result.success) applyPublished(diff)
    return result
  }

  return { event, read, applyPublished, publish }
}

const MAX_DIMENSION = 1600
const MAX_UPLOAD_BYTES = 3 * 1024 * 1024

function readAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Could not read the file.'))
    reader.readAsDataURL(blob)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('That file is not a readable image.'))
    img.src = src
  })
}

async function prepareImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file (JPG, PNG, WebP or GIF).')
  const original = await readAsDataUrl(file)
  if (file.type === 'image/gif') {
    if (file.size > MAX_UPLOAD_BYTES) throw new Error('GIF images must be smaller than 3 MB.')
    return original
  }

  const img = await loadImage(original)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight))
  if (scale === 1 && file.size <= MAX_UPLOAD_BYTES && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return original
  }

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(img.naturalWidth * scale)
  canvas.height = Math.round(img.naturalHeight * scale)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser could not process this image.')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  // PNG keeps logo transparency; photos compress far better as JPEG.
  const keepPng = file.type === 'image/png' && canvas.width * canvas.height <= 1000 * 1000
  return canvas.toDataURL(keepPng ? 'image/png' : 'image/jpeg', 0.85)
}

/** Uploads an image to the database and returns its public URL (e.g. `/api/media/<id>`). */
export async function uploadImage(file: File): Promise<string> {
  const dataUrl = await prepareImage(file)
  const res = await fetch('/api/admin/media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ dataUrl }),
  })
  const body = await res.json().catch(() => null)
  if (!res.ok || !body?.url) throw new Error(body?.error || `Upload failed (HTTP ${res.status}).`)
  return body.url as string
}
