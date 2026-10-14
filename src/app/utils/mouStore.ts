"use client"

import { createCollectionStore } from './siteContent'

export interface MouPartner {
  name: string
  image: string
  url: string
}

export const mouStore = createCollectionStore<MouPartner>('mous', 'nyeras_site_mous', 'nyeras_mous_updated')
