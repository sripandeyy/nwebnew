"use client"

import { createCollectionStore } from './siteContent'

export type GalleryCategory = 'Partnership' | 'Mentorship' | 'Workshop' | 'Conferences'

export interface GalleryItem {
  id: string
  title: string
  subtitle: string
  category: GalleryCategory
  location: string
  date: string
  image: string
  shortDesc: string
}

export const GALLERY_CATEGORIES: GalleryCategory[] = ['Partnership', 'Mentorship', 'Workshop', 'Conferences']

export const galleryStore = createCollectionStore<GalleryItem>('gallery', 'nyeras_site_gallery', 'nyeras_gallery_updated')
