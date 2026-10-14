'use client'

import { useEffect } from 'react'
import type { BlogPost } from '../blogs/blogData'
import type { Course } from '../domains/types'
import { applyPublishedBlogs } from '../utils/blogStore'
import { applyPublishedCourses } from '../utils/courseStore'
import { galleryStore, GalleryItem } from '../utils/galleryStore'
import { mouStore, MouPartner } from '../utils/mouStore'
import { CollectionDiff, ListDiff, fetchSiteContent, markSiteContentReady } from '../utils/siteContent'

/** Loads admin-published content from the database into this browser once per page load. */
export default function SiteContentSync() {
  useEffect(() => {
    let cancelled = false
    fetchSiteContent()
      .then((content) => {
        if (cancelled || !content) return
        if (content.courses) applyPublishedCourses(content.courses as ListDiff<Course>)
        if (content.blogs) applyPublishedBlogs(content.blogs as ListDiff<BlogPost>)
        if (content.gallery) galleryStore.applyPublished(content.gallery as CollectionDiff<GalleryItem>)
        if (content.mous) mouStore.applyPublished(content.mous as CollectionDiff<MouPartner>)
      })
      .finally(() => {
        if (!cancelled) markSiteContentReady()
      })
    return () => {
      cancelled = true
    }
  }, [])

  return null
}
