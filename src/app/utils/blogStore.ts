"use client"

import { BLOG_POSTS, BlogPost } from '../blogs/blogData'
import { ListDiff, SaveResult, diffList, mergeList, saveSiteContent } from './siteContent'

const BLOGS_STORAGE_KEY = 'nyeras_custom_blogs'
export const BLOGS_EVENT = 'nyeras_blogs_updated'

export function getAllBlogs(): BlogPost[] {
  if (typeof window === 'undefined') {
    return BLOG_POSTS
  }

  try {
    const stored = localStorage.getItem(BLOGS_STORAGE_KEY)
    if (stored) {
      const parsed: BlogPost[] = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Error reading blogs from storage', e)
  }

  return BLOG_POSTS
}

export function saveBlogs(blogs: BlogPost[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs))
    window.dispatchEvent(new CustomEvent(BLOGS_EVENT, { detail: blogs }))
  } catch (e) {
    console.error('Error saving blogs to storage', e)
  }
}

/** Applies the published blog list from the database to this browser. */
export function applyPublishedBlogs(diff: ListDiff<BlogPost>) {
  saveBlogs(mergeList(BLOG_POSTS, diff))
}

async function publishBlogs(blogs: BlogPost[], successMessage: string): Promise<SaveResult> {
  const result = await saveSiteContent('blogs', diffList(BLOG_POSTS, blogs))
  if (!result.success) return result
  saveBlogs(blogs)
  return { success: true, message: successMessage }
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const all = getAllBlogs()
  return all.find((b) => b.slug === slug)
}

export async function createBlog(newBlog: BlogPost): Promise<SaveResult> {
  const current = getAllBlogs()
  const exists = current.some((b) => b.slug === newBlog.slug)
  if (exists) {
    return { success: false, message: `A blog post with slug "${newBlog.slug}" already exists.` }
  }

  return publishBlogs([newBlog, ...current], 'Blog post created and published successfully!')
}

export async function updateBlog(slug: string, updatedBlog: Partial<BlogPost>): Promise<SaveResult> {
  const current = getAllBlogs()
  const index = current.findIndex((b) => b.slug === slug)
  if (index === -1) {
    return { success: false, message: `Blog with slug "${slug}" not found.` }
  }

  const updatedList = [...current]
  updatedList[index] = { ...updatedList[index], ...updatedBlog }
  return publishBlogs(updatedList, 'Blog post updated successfully!')
}

export async function deleteBlog(slug: string): Promise<SaveResult> {
  const current = getAllBlogs()
  const filtered = current.filter((b) => b.slug !== slug)
  return publishBlogs(filtered, 'Blog post removed successfully.')
}

export async function resetBlogsToDefault(): Promise<SaveResult> {
  return publishBlogs(BLOG_POSTS, 'Blogs reset to the default posts.')
}
