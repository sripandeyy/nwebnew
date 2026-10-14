"use client"

import { Course } from '../domains/types'
import { domains, jobGuaranteeCourses } from '../domains/data'
import { ListDiff, SaveResult, diffList, mergeList, saveSiteContent } from './siteContent'

const COURSES_STORAGE_KEY = 'nyeras_custom_courses'
export const COURSES_EVENT = 'nyeras_courses_updated'

// Extract all initial default courses with sensible default prices if not already set
export function getDefaultCourses(): Course[] {
  const all: Course[] = []
  const seenSlugs = new Set<string>()
  
  for (const d of domains) {
    for (const c of d.courses) {
      if (!seenSlugs.has(c.slug)) {
        seenSlugs.add(c.slug)
        all.push({
          ...c,
          category: d.name,
          price: c.price || '₹4,999',
          originalPrice: c.originalPrice || '₹14,999',
          duration: c.duration || '2 - 4 Months',
        })
      }
    }
  }

  for (const j of jobGuaranteeCourses) {
    if (!seenSlugs.has(j.slug)) {
      seenSlugs.add(j.slug)
      all.push({
        ...j,
        category: 'Job Guarantee Track',
        price: j.price || '₹99,999',
        originalPrice: j.originalPrice || '₹1,49,999',
        duration: j.duration || '6 Months (100% Placement)',
      })
    }
  }

  return all
}

export function getAllCourses(): Course[] {
  if (typeof window === 'undefined') {
    return getDefaultCourses()
  }

  try {
    const stored = localStorage.getItem(COURSES_STORAGE_KEY)
    if (stored) {
      const parsed: Course[] = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        const uniqueList: Course[] = []
        const seen = new Set<string>()
        for (const item of parsed) {
          if (item && item.slug && !seen.has(item.slug)) {
            seen.add(item.slug)
            const isJob = Boolean(item.jobGuarantee) || item.slug?.includes('job-guarantee')
            if (isJob && (item.price === '₹60,000' || item.price === '₹59,999' || !item.price)) {
              item.price = '₹99,999'
              item.originalPrice = '₹1,49,999'
            }
            uniqueList.push(item)
          }
        }
        return uniqueList
      }
    }
  } catch (e) {
    console.error('Error reading courses from storage', e)
  }

  return getDefaultCourses()
}

export function saveCourses(courses: Course[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses))
    window.dispatchEvent(new CustomEvent(COURSES_EVENT, { detail: courses }))
  } catch (e) {
    console.error('Error saving courses to storage', e)
  }
}

/** Applies the published catalogue from the database to this browser. */
export function applyPublishedCourses(diff: ListDiff<Course>) {
  saveCourses(mergeList(getDefaultCourses(), diff))
}

async function publishCourses(courses: Course[], successMessage: string): Promise<SaveResult> {
  const result = await saveSiteContent('courses', diffList(getDefaultCourses(), courses))
  if (!result.success) return result
  saveCourses(courses)
  return { success: true, message: successMessage }
}

export function getCourseBySlug(slug: string): Course | undefined {
  const all = getAllCourses()
  return all.find((c) => c.slug === slug)
}

export async function createCourse(newCourse: Course): Promise<SaveResult> {
  const current = getAllCourses()
  const exists = current.some((c) => c.slug === newCourse.slug)
  if (exists) {
    return { success: false, message: `A program with slug "${newCourse.slug}" already exists.` }
  }

  return publishCourses([newCourse, ...current], 'New program created and published successfully!')
}

export async function updateCourse(slug: string, updatedFields: Partial<Course>): Promise<SaveResult> {
  const current = getAllCourses()
  const index = current.findIndex((c) => c.slug === slug)
  if (index === -1) {
    return { success: false, message: `Program with slug "${slug}" not found.` }
  }

  const updatedList = [...current]
  updatedList[index] = { ...updatedList[index], ...updatedFields }
  return publishCourses(updatedList, 'Program details and pricing updated successfully!')
}

export function updateCoursePricingAndMedia(
  slug: string, 
  price: string, 
  originalPrice: string, 
  image: string,
  title?: string
): Promise<SaveResult> {
  return updateCourse(slug, {
    price,
    originalPrice,
    image,
    ...(title ? { title } : {})
  })
}

export async function deleteCourse(slug: string): Promise<SaveResult> {
  const current = getAllCourses()
  const filtered = current.filter((c) => c.slug !== slug)
  return publishCourses(filtered, 'Program removed from active catalog.')
}

export async function resetCoursesToDefault(): Promise<SaveResult> {
  return publishCourses(getDefaultCourses(), 'Programs reset to the default catalog.')
}
