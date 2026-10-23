"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { useAuth } from '../context/AuthContext'
import Topbar from '../components/Topbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AuthModal from '../components/AuthModal'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  BLOGS_EVENT
} from '../utils/blogStore'
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCoursePricingAndMedia,
  COURSES_EVENT
} from '../utils/courseStore'
import { BlogPost } from '../blogs/blogData'
import { Course } from '../domains/types'
import { departmentCategories } from '../domains/data'
import {
  BookOpen,
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Search,
  DollarSign,
  Image as ImageIcon,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  Award,
  Layers,
  LogOut,
  Users,
  Briefcase,
  Sliders,
  Eye,
  Save,
  ShieldCheck,
  KeyRound,
  Handshake
} from 'lucide-react'
import ImageUploadButton from './components/ImageUploadButton'
import GalleryManager from './components/GalleryManager'
import MouManager from './components/MouManager'

const PRESET_THUMBNAILS = [
  { name: 'Full Stack Web Dev', path: '/courses/web-development-fullstack.png' },
  { name: 'Data Science', path: '/courses/datascience.jpg' },
  { name: 'Data Analytics', path: '/courses/dataanalytics.jpg' },
  { name: 'AI & Machine Learning', path: '/aimlintern.jpg' },
  { name: 'Cloud & DevOps / AWS', path: '/courses/aws.png' },
  { name: 'HR Management', path: '/courses/hrm.webp' },
  { name: 'Cybersecurity', path: '/courses/cyber-security.png' },
  { name: '.NET Enterprise', path: '/courses/dotnet.png' },
  { name: 'Agentic AI', path: '/courses/agentic-ai.png' },
]

export default function AdminPage() {
  const { user, isAdmin, isLoading, login, logout, openAuthModal } = useAuth()
  const router = useRouter()

  // Dedicated Admin Direct Login State
  const [adminIdentifier, setAdminIdentifier] = useState('muskanjal638@gmail.com')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminLoginLoading, setAdminLoginLoading] = useState(false)
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null)

  const handleAdminDirectLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminLoginLoading(true)
    setAdminLoginError(null)
    const res = await login(adminIdentifier, adminPassword)
    setAdminLoginLoading(false)
    if (!res.success) {
      setAdminLoginError(res.message)
    }
  }

  // Navigation State
  const [activeTab, setActiveTab] = useState<'programs' | 'blogs' | 'gallery' | 'mous' | 'students'>('programs')
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('All')
  const [statusNotice, setStatusNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Quick Inline Price / Thumbnail State for Courses
  const [inlinePriceMap, setInlinePriceMap] = useState<Record<string, { price: string; originalPrice: string; image: string }>>({})

  // Blog Editor Modal State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null)
  const [blogForm, setBlogForm] = useState<{
    title: string
    slug: string
    category: BlogPost['category']
    excerpt: string
    coverImage: string
    readTime: string
    authorName: string
    authorRole: string
    authorAvatar: string
    tags: string
    intro: string
    sectionsText: string
    takeawaysText: string
    featured: boolean
  }>({
    title: '',
    slug: '',
    category: 'Generative AI',
    excerpt: '',
    coverImage: '/aimlintern.jpg',
    readTime: '6 min read',
    authorName: 'Nyeras Technical Team',
    authorRole: 'Lead Architect',
    authorAvatar: '/s2.png',
    tags: 'AI, Cloud, Engineering',
    intro: '',
    sectionsText: '1. Architecture & Foundations\nDetail the modern technical challenges and system overview.\n\n2. Real-World Execution\nProvide key configuration tips and code architecture.\n\n3. Production Best Practices\nHighlight performance and security tips.',
    takeawaysText: 'Master modern cloud architecture patterns\nImplement sub-50ms vector query latencies\nDeploy production CI/CD pipelines',
    featured: false,
  })

  // Course / Program Full Editor Modal State
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
  const [editingCourseSlug, setEditingCourseSlug] = useState<string | null>(null)
  const [courseForm, setCourseForm] = useState<{
    title: string
    slug: string
    category: string
    summary: string
    price: string
    originalPrice: string
    duration: string
    image: string
    jobGuarantee: boolean
    modulesText: string
  }>({
    title: '',
    slug: '',
    category: 'CSE / IT',
    summary: '',
    price: '₹4,999',
    originalPrice: '₹14,999',
    duration: '3 - 6 Months',
    image: '/courses/web-development-fullstack.png',
    jobGuarantee: false,
    modulesText: 'Frontend Foundations: HTML5, CSS3, Modern JS, React 19\nBackend Architecture: Node.js, Express, REST APIs, PostgreSQL\nCloud & CI/CD: Docker, AWS, Monitoring & Production Deployment\nLive Industry Capstone: End-to-End Enterprise Project',
  })

  // Quick Price & Thumbnail Quick-Edit Modal State
  const [quickEditCourse, setQuickEditCourse] = useState<Course | null>(null)
  const [quickPrice, setQuickPrice] = useState('')
  const [quickOriginalPrice, setQuickOriginalPrice] = useState('')
  const [quickImage, setQuickImage] = useState('')

  // Load data & subscribe to real-time events
  useEffect(() => {
    const loadCourses = () => {
      const c = getAllCourses()
      setCourses(c)

      // Initialize inline price map
      const map: Record<string, { price: string; originalPrice: string; image: string }> = {}
      c.forEach((item) => {
        map[item.slug] = {
          price: item.price || '₹4,999',
          originalPrice: item.originalPrice || '₹14,999',
          image: item.image || '/courses/web-development-fullstack.png'
        }
      })
      setInlinePriceMap(map)
    }
    const handleBlogUpdate = () => setBlogs(getAllBlogs())
    const handleCourseUpdate = loadCourses
    handleBlogUpdate()
    loadCourses()

    window.addEventListener(BLOGS_EVENT, handleBlogUpdate)
    window.addEventListener(COURSES_EVENT, handleCourseUpdate)

    return () => {
      window.removeEventListener(BLOGS_EVENT, handleBlogUpdate)
      window.removeEventListener(COURSES_EVENT, handleCourseUpdate)
    }
  }, [])

  const notify = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusNotice({ text, type })
    setTimeout(() => setStatusNotice(null), 4000)
  }

  // --- BLOG OPERATIONS ---
  const handleOpenNewBlog = () => {
    setEditingBlogSlug(null)
    setBlogForm({
      title: '',
      slug: '',
      category: 'Generative AI',
      excerpt: '',
      coverImage: '/aimlintern.jpg',
      readTime: '6 min read',
      authorName: 'Nyeras Technical Team',
      authorRole: 'Lead Architect',
      authorAvatar: '/s2.png',
      tags: 'AI, Cloud, FullStack',
      intro: '',
      sectionsText: '1. Architecture & Foundations\nDetail the problem and how modern engineering solves it.\n\n2. Real-World Execution\nProvide key configuration tips and best practices.',
      takeawaysText: 'Master modern cloud patterns\nImplement low-latency architectures',
      featured: false,
    })
    setIsBlogModalOpen(true)
  }

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlogSlug(blog.slug)
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage || '/aimlintern.jpg',
      readTime: blog.readTime || '6 min read',
      authorName: blog.author?.name || 'Nyeras Author',
      authorRole: blog.author?.role || 'Senior Mentor',
      authorAvatar: blog.author?.avatar || '/s2.png',
      tags: blog.tags ? blog.tags.join(', ') : '',
      intro: blog.content?.intro || '',
      sectionsText: blog.content?.sections
        ? blog.content.sections
            .map((s) => `${s.heading}\n${s.paragraphs.join('\n\n')}`)
            .join('\n\n---\n\n')
        : '',
      takeawaysText: blog.content?.takeaways ? blog.content.takeaways.join('\n') : '',
      featured: !!blog.featured,
    })
    setIsBlogModalOpen(true)
  }

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSaving) return
    if (!blogForm.title.trim()) {
      notify('Blog title is required', 'error')
      return
    }

    const generatedSlug =
      blogForm.slug.trim() ||
      blogForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

    const rawSections = blogForm.sectionsText.split('---').map((chunk) => chunk.trim()).filter(Boolean)
    const parsedSections = rawSections.map((sec, idx) => {
      const lines = sec.split('\n').map((l) => l.trim()).filter(Boolean)
      const heading = lines[0] || `Section ${idx + 1}`
      const paragraphs = lines.slice(1).length > 0 ? [lines.slice(1).join(' ')] : ['Comprehensive technical overview and implementation.']
      return { heading, paragraphs }
    })

    const payload: BlogPost = {
      title: blogForm.title.trim(),
      slug: generatedSlug,
      category: blogForm.category,
      excerpt: blogForm.excerpt.trim() || 'Comprehensive technical guide by Nyeras.',
      coverImage: blogForm.coverImage.trim() || '/aimlintern.jpg',
      readTime: blogForm.readTime.trim() || '6 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      featured: blogForm.featured,
      author: {
        name: blogForm.authorName.trim() || 'Nyeras Author',
        role: blogForm.authorRole.trim() || 'Technical Lead',
        avatar: blogForm.authorAvatar.trim() || '/s2.png',
      },
      tags: blogForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      content: {
        intro: blogForm.intro.trim() || blogForm.excerpt.trim(),
        sections: parsedSections.length > 0 ? parsedSections : [
          { heading: '1. Overview', paragraphs: [blogForm.intro || 'Article content.'] }
        ],
        takeaways: blogForm.takeawaysText.split('\n').map((t) => t.trim()).filter(Boolean),
      },
    }

    setIsSaving(true)
    const res = editingBlogSlug ? await updateBlog(editingBlogSlug, payload) : await createBlog(payload)
    setIsSaving(false)
    if (res.success) {
      notify(res.message)
      setIsBlogModalOpen(false)
    } else {
      notify(res.message, 'error')
    }
  }

  const handleDeleteBlog = async (slug: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${slug}"?`)) {
      const res = await deleteBlog(slug)
      notify(res.message, res.success ? 'success' : 'error')
    }
  }

  const handleToggleFeatured = async (blog: BlogPost) => {
    const res = await updateBlog(blog.slug, { featured: !blog.featured })
    if (res.success) {
      notify(`"${blog.title}" ${!blog.featured ? 'is now featured at the top' : 'unpinned from featured'}.`)
    } else {
      notify(res.message, 'error')
    }
  }

  // --- PROGRAM / COURSE OPERATIONS ---
  const handleOpenNewCourse = () => {
    setEditingCourseSlug(null)
    setCourseForm({
      title: '',
      slug: '',
      category: 'CSE / IT',
      summary: '',
      price: '₹4,999',
      originalPrice: '₹14,999',
      duration: '3 - 6 Months',
      image: '/courses/web-development-fullstack.png',
      jobGuarantee: false,
      modulesText: 'Foundations & Architecture: Core concepts, best practices\nHands-on Engineering: Real-world projects & toolchains\nProduction Deployment: Cloud environments, CI/CD, and monitoring\nCareer Enablement: 1:1 Mock Interviews & Resume Review',
    })
    setIsCourseModalOpen(true)
  }

  const handleEditCourse = (course: Course) => {
    setEditingCourseSlug(course.slug)
    setCourseForm({
      title: course.title,
      slug: course.slug,
      category: course.category || 'CSE / IT',
      summary: course.summary,
      price: course.price || '₹4,999',
      originalPrice: course.originalPrice || '₹14,999',
      duration: course.duration || '3 - 6 Months',
      image: course.image || '/courses/web-development-fullstack.png',
      jobGuarantee: !!course.jobGuarantee,
      modulesText: course.curriculum
        ? course.curriculum.map((m) => `${m.title}: ${m.topics.join(', ')}`).join('\n')
        : '',
    })
    setIsCourseModalOpen(true)
  }

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSaving) return
    if (!courseForm.title.trim()) {
      notify('Program title is required', 'error')
      return
    }

    const generatedSlug =
      courseForm.slug.trim() ||
      courseForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

    const rawModules = courseForm.modulesText.split('\n').map((l) => l.trim()).filter(Boolean)
    const curriculum = rawModules.map((line) => {
      if (line.includes(':')) {
        const [title, topicsStr] = line.split(':')
        const topics = topicsStr.split(',').map((t) => t.trim()).filter(Boolean)
        return { title: title.trim(), topics: topics.length > 0 ? topics : ['Core Foundations'] }
      }
      return { title: line, topics: ['Key Concepts', 'Practical Projects', 'Industry Mentorship'] }
    })

    const payload: Course = {
      title: courseForm.title.trim(),
      slug: generatedSlug,
      category: courseForm.category,
      summary: courseForm.summary.trim() || 'Comprehensive industry curriculum with live mentorship.',
      price: courseForm.price.trim(),
      originalPrice: courseForm.originalPrice.trim(),
      duration: courseForm.duration.trim(),
      image: courseForm.image.trim() || '/courses/web-development-fullstack.png',
      jobGuarantee: courseForm.jobGuarantee,
      curriculum: curriculum.length > 0 ? curriculum : [
        { title: 'Core Curriculum', topics: ['Hands-on training', 'Project reviews', 'Certification'] }
      ],
      certificates: [
        { name: 'Course Completion' },
        { name: 'Internship Certificate' },
        ...(courseForm.jobGuarantee ? [{ name: 'Job Guarantee Certificate' }] : [])
      ],
    }

    setIsSaving(true)
    const res = editingCourseSlug ? await updateCourse(editingCourseSlug, payload) : await createCourse(payload)
    setIsSaving(false)
    if (res.success) {
      notify(res.message)
      setIsCourseModalOpen(false)
    } else {
      notify(res.message, 'error')
    }
  }

  const handleOpenQuickPriceModal = (course: Course) => {
    setQuickEditCourse(course)
    setQuickPrice(course.price || '₹4,999')
    setQuickOriginalPrice(course.originalPrice || '₹14,999')
    setQuickImage(course.image || '/courses/web-development-fullstack.png')
  }

  const handleSaveQuickPrice = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickEditCourse || isSaving) return

    setIsSaving(true)
    const res = await updateCoursePricingAndMedia(
      quickEditCourse.slug,
      quickPrice.trim(),
      quickOriginalPrice.trim(),
      quickImage.trim()
    )
    setIsSaving(false)

    if (res.success) {
      notify(`Updated pricing & thumbnail for "${quickEditCourse.title}"!`)
      setQuickEditCourse(null)
    } else {
      notify(res.message, 'error')
    }
  }

  const handleSaveInlinePrice = async (slug: string) => {
    const item = inlinePriceMap[slug]
    if (!item) return

    const res = await updateCoursePricingAndMedia(
      slug,
      item.price.trim(),
      item.originalPrice.trim(),
      item.image.trim()
    )

    if (res.success) {
      notify(`Saved live price ${item.price} for "${slug}"!`)
    } else {
      notify(res.message, 'error')
    }
  }

  const handleDeleteCourse = async (slug: string) => {
    if (window.confirm(`Are you sure you want to permanently delete program "${slug}"?`)) {
      const res = await deleteCourse(slug)
      notify(res.message, res.success ? 'success' : 'error')
    }
  }

  // Filtered lists
  const filteredBlogs = blogs.filter((b) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesCategory =
      selectedFilterCategory === 'All' || b.category === selectedFilterCategory
    const matchesSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.slug.toLowerCase().includes(q) ||
      b.author?.name.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  const filteredCourses = courses.filter((c) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesCategory =
      selectedFilterCategory === 'All' ||
      (c.category && c.category.toLowerCase().includes(selectedFilterCategory.toLowerCase()))
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      (c.category && c.category.toLowerCase().includes(q)) ||
      c.slug.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-800 dark:text-slate-100 ${jakarta.className} items-center justify-center`}>
        <div className="w-10 h-10 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin" />
      </div>
    )
  }

  // --- 1. DEDICATED ADMIN LOGIN IF NOT ADMIN ---
  if (!isAdmin) {
    return (
      <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-800 dark:text-slate-100 ${jakarta.className} selection:bg-blue-600 selection:text-white transition-colors duration-300 relative`}>
        <Topbar />
        <Header />
        <AuthModal />
        <main className="flex-1 flex items-center justify-center px-4 pt-36 sm:pt-40 pb-20 relative z-10 overflow-hidden">
          {/* Ambient Animated Mesh Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-40 right-1/4 w-[450px] h-[450px] bg-indigo-500/15 dark:bg-indigo-600/10 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <div className="max-w-md w-full space-y-6 p-8 sm:p-10 rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[3px] bg-gradient-to-r from-transparent via-blue-600 dark:via-blue-400 to-transparent" />
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center mx-auto border border-blue-200 dark:border-blue-800 shadow-inner">
                <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider">
                Restricted Access
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                Nyeras Admin{" "}
                <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent">
                  Studio
                </span>
              </h1>

              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Sign in with administrative credentials to manage courses, pricing, blogs, and partnerships.
              </p>
            </div>

            {user && !isAdmin && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-center justify-between gap-2">
                <span>Signed in as <strong>{user.name}</strong> (Student). Admin privileges required.</span>
                <button
                  type="button"
                  onClick={logout}
                  className="px-2.5 py-1 rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-[11px] font-black cursor-pointer hover:bg-amber-300"
                >
                  Logout
                </button>
              </div>
            )}

            {adminLoginError && (
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{adminLoginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminDirectLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Admin Email / ID
                </label>
                <input
                  type="text"
                  required
                  value={adminIdentifier}
                  onChange={(e) => setAdminIdentifier(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="muskanjal638@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={adminLoginLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white font-black text-sm shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {adminLoginLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials…</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Sign In to Admin Studio</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                ← Return to Nyeras Homepage
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // --- 2. MASTER ADMIN LMS STUDIO (muskanjal638@gmail.com) ---
  if (isAdmin) {
    return (
      <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-800 dark:text-slate-100 ${jakarta.className} selection:bg-blue-600 selection:text-white transition-colors duration-300 relative`}>
        <Topbar />
        <Header />
        <AuthModal />

        {/* Ambient Animated Mesh Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-40 right-1/4 w-[450px] h-[450px] bg-indigo-500/15 dark:bg-indigo-600/10 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute top-72 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-[140px]" />
        </div>

        {/* Floating Success / Error Notice */}
        {statusNotice && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <div
              className={`px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-xl ${
                statusNotice.type === 'success'
                  ? 'bg-white/95 dark:bg-slate-900/95 border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                  : 'bg-white/95 dark:bg-rose-950/95 border-rose-500/50 text-rose-900 dark:text-rose-200'
              }`}
            >
              {statusNotice.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-500" />
              )}
              <span className="text-sm font-black">{statusNotice.text}</span>
            </div>
          </div>
        )}

        <main className="flex-grow relative z-10 overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1780px] w-full mx-auto">
          {/* Top Admin Command Header Card */}
          <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-500/5 relative overflow-hidden mb-10">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 sm:w-80 h-[3px] bg-gradient-to-r from-transparent via-blue-600 dark:via-blue-400 to-transparent" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-3xl">
                {/* Friendly Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-black shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>MASTER ADMINISTRATOR MODE • {user?.username || 'muskanjal638@gmail.com'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.15]">
                  Nyeras LMS &amp;{" "}
                  <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent">
                    Content Studio
                  </span>
                </h1>

                <p className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                  Central control center to <strong className="text-slate-950 dark:text-white">create, edit, and publish blogs</strong>, dynamically <strong className="text-slate-950 dark:text-white">update course prices, strike-through rates, and thumbnails</strong>, or <strong className="text-slate-950 dark:text-white">manage active cohorts</strong> with instant real-time synchronization.
                </p>

                {/* Trust Badges Row */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Real-time Sync Active
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Govt. MSME &amp; ISO Studio
                  </span>
                </div>
              </div>

              {/* Quick Admin Stats & Sign Out (Bento style) */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('programs')
                      setSelectedFilterCategory('All')
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      activeTab === 'programs'
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Programs</span>
                    </div>
                    <span className="block text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{courses.length}</span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Live Courses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('blogs')
                      setSelectedFilterCategory('All')
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      activeTab === 'blogs'
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Articles</span>
                    </div>
                    <span className="block text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{blogs.length}</span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Published Posts</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/50 border border-slate-200 dark:border-slate-700 text-slate-700 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 text-xs font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out Master Session</span>
                </button>
              </div>
            </div>

            {/* Studio Navigation Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 mt-8 pt-6 border-t border-slate-200/90 dark:border-slate-800 overflow-x-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('programs')
                  setSelectedFilterCategory('All')
                }}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'programs'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Courses, Pricing &amp; Thumbnails ({courses.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('blogs')
                  setSelectedFilterCategory('All')
                }}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'blogs'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Blog &amp; Articles Studio ({blogs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'gallery'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>About Page Gallery</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('mous')}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'mous'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs'
                }`}
              >
                <Handshake className="w-4 h-4" />
                <span>University MoUs</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('students')}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'students'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Student Batches &amp; LMS Ops</span>
              </button>
            </div>
          </div>

          {activeTab === 'gallery' && <GalleryManager notify={notify} />}
          {activeTab === 'mous' && <MouManager notify={notify} />}

          {/* Action Bar (Search, Category Filters & Create CTA) */}
          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 ${activeTab === 'gallery' || activeTab === 'mous' ? 'hidden' : ''}`}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={activeTab === 'programs' ? 'Search programs by title, domain, slug...' : 'Search blogs by title, tags, author...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
                />
              </div>

              {/* Category Quick Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {activeTab === 'programs' &&
                  ['All', 'CSE / IT', 'Job Guarantee', 'ECE', 'Mechanical', 'Civil', 'Management'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedFilterCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                        selectedFilterCategory === cat
                          ? 'bg-blue-600 text-white shadow-sm border border-blue-600 font-black'
                          : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}

                {activeTab === 'blogs' &&
                  ['All', 'Generative AI', 'Full Stack', 'Cloud & DevOps', 'Career Guides', 'System Design'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedFilterCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                        selectedFilterCategory === cat
                          ? 'bg-blue-600 text-white shadow-sm border border-blue-600 font-black'
                          : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeTab === 'programs' && (
                <>
                  <button
                    type="button"
                    onClick={handleOpenNewCourse}
                    className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Create New Program</span>
                  </button>
                  <Link
                    href="/domains"
                    target="_blank"
                    className="py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>View Live Domains</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </>
              )}

              {activeTab === 'blogs' && (
                <>
                  <button
                    type="button"
                    onClick={handleOpenNewBlog}
                    className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Create New Blog</span>
                  </button>
                  <Link
                    href="/blogs"
                    target="_blank"
                    className="py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>View Blogs Page</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* TAB 1: PROGRAMS & PRICING STUDIO */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((c, idx) => {
                  const inlineData = inlinePriceMap[c.slug] || {
                    price: c.price || '₹4,999',
                    originalPrice: c.originalPrice || '₹14,999',
                    image: c.image || '/courses/web-development-fullstack.png'
                  }

                  return (
                    <div
                      key={`lms-course-${c.slug || 'course'}-${idx}`}
                      className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between group relative"
                    >
                      <div>
                        {/* Program Thumbnail Header */}
                        <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                          <Image
                            src={inlineData.image || c.image || '/courses/web-development-fullstack.png'}
                            alt={c.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                          
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[11px] font-black text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm">
                            {c.category || 'Engineering'}
                          </span>

                          {c.jobGuarantee && (
                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                              Job Guarantee Track
                            </span>
                          )}

                          {/* Quick Change Thumbnail Button on Hover */}
                          <button
                            type="button"
                            onClick={() => handleOpenQuickPriceModal(c)}
                            className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md cursor-pointer border border-slate-200 dark:border-slate-700"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span>Change Thumbnail</span>
                          </button>
                        </div>

                        <div className="p-5 space-y-3.5">
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold">
                            <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span>{c.duration || '3 - 6 Months'}</span>
                            <span>•</span>
                            <span>{c.curriculum?.length || 4} Modules</span>
                          </div>

                          <h3 className="text-base font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {c.title}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {c.summary}
                          </p>

                          {/* Fast Inline Price Editing Box */}
                          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                <DollarSign className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                <span>Live Price Controls</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => handleSaveInlinePrice(c.slug)}
                                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                                title="Save price immediately"
                              >
                                <Save className="w-3 h-3" />
                                <span>Save Price</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase">Offer Price</label>
                                <input
                                  type="text"
                                  value={inlineData.price}
                                  onChange={(e) => {
                                    const val = e.target.value
                                    setInlinePriceMap((prev) => ({
                                      ...prev,
                                      [c.slug]: { ...prev[c.slug], price: val }
                                    }))
                                  }}
                                  placeholder="₹4,999"
                                  className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-black text-sm focus:outline-none focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase">Strike-through</label>
                                <input
                                  type="text"
                                  value={inlineData.originalPrice}
                                  onChange={(e) => {
                                    const val = e.target.value
                                    setInlinePriceMap((prev) => ({
                                      ...prev,
                                      [c.slug]: { ...prev[c.slug], originalPrice: val }
                                    }))
                                  }}
                                  placeholder="₹14,999"
                                  className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Program Footer Actions */}
                      <div className="p-5 pt-3 border-t border-slate-200/90 dark:border-slate-800/80 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/40">
                        <Link
                          href={`/domains/${c.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>View Live</span>
                        </Link>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditCourse(c)}
                            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                            title="Edit Full Program, Syllabus & Certificates"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit Program</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCourse(c.slug)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800/60 dark:hover:bg-rose-950/60 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                            title="Delete Program"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 2: BLOGS STUDIO */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog, blogIdx) => (
                  <div
                    key={`lms-blog-${blog.slug || 'blog'}-${blogIdx}`}
                    className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Cover Art */}
                      <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                        <Image
                          src={blog.coverImage || '/aimlintern.jpg'}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-md text-[11px] font-black text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm">
                          {blog.category}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(blog)}
                          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                            blog.featured
                              ? 'bg-amber-500 text-white shadow-md'
                              : 'bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm'
                          }`}
                          title="Click to toggle featured state"
                        >
                          {blog.featured ? '★ Featured' : '☆ Pin'}
                        </button>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {blog.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {blog.readTime}
                          </span>
                        </div>

                        <h3 className="text-base font-black text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {blog.title}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                          <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span className="font-bold text-slate-800 dark:text-slate-300">{blog.author?.name || 'Nyeras Team'}</span>
                          <span>•</span>
                          <span className="text-[11px]">{blog.tags?.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-5 pt-3 border-t border-slate-200/90 dark:border-slate-800/80 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/40">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Live Preview</span>
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEditBlog(blog)}
                          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                          title="Edit full blog content"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Article</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlog(blog.slug)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800/60 dark:hover:bg-rose-950/60 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                          title="Delete blog post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT BATCHES & LMS OPS */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Active Students</span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-3xl font-black text-slate-950 dark:text-white">1,842</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">+128 new enrollments this month</p>
                </div>

                <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Live Training Batches</span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-3xl font-black text-slate-950 dark:text-white">24</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Full Stack, AI &amp; Cloud Tracks</p>
                </div>

                <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Verified Credentials</span>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-3xl font-black text-slate-950 dark:text-white">4,120</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">ISO &amp; MSME Verified Certificates</p>
                </div>
              </div>

              {/* Batches Table */}
              <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">Active Cohorts &amp; Batch Schedules</h3>
                  <a
                    href="https://lms.nyeras.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>Launch LMS Server</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                    <thead className="text-xs uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                      <tr>
                        <th className="p-3.5">Cohort ID</th>
                        <th className="p-3.5">Track / Domain</th>
                        <th className="p-3.5">Learners</th>
                        <th className="p-3.5">Lead Mentor</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">NY-AI-2026-B1</td>
                        <td className="p-3.5">Generative AI &amp; LLM Systems</td>
                        <td className="p-3.5">48 Students</td>
                        <td className="p-3.5">Ananya Deshmukh</td>
                        <td className="p-3.5"><span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Active Daily Class</span></td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">NY-FS-2026-B3</td>
                        <td className="p-3.5">Full Stack Web Development</td>
                        <td className="p-3.5">62 Students</td>
                        <td className="p-3.5">Vikram Patel</td>
                        <td className="p-3.5"><span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Active Daily Class</span></td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">NY-JG-DS-2026</td>
                        <td className="p-3.5">Data Science Job Guarantee</td>
                        <td className="p-3.5">35 Students</td>
                        <td className="p-3.5">Rohan Verma</td>
                        <td className="p-3.5"><span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">Placement Drive</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 1. QUICK PRICE & THUMBNAIL MODAL */}
        {quickEditCourse && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Quick Edit: Price &amp; Thumbnail</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-sm mt-0.5">{quickEditCourse.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickEditCourse(null)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveQuickPrice} className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Offer Price
                    </label>
                    <input
                      type="text"
                      required
                      value={quickPrice}
                      onChange={(e) => setQuickPrice(e.target.value)}
                      placeholder="e.g. ₹4,999"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-black text-base focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Original Price
                    </label>
                    <input
                      type="text"
                      value={quickOriginalPrice}
                      onChange={(e) => setQuickOriginalPrice(e.target.value)}
                      placeholder="e.g. ₹14,999"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Thumbnail Image URL or Path
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={quickImage}
                      onChange={(e) => setQuickImage(e.target.value)}
                      placeholder="/courses/web-development-fullstack.png"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:border-blue-500"
                    />
                    <ImageUploadButton label="Upload" onUploaded={setQuickImage} onError={(msg) => notify(msg, 'error')} />
                  </div>

                  {/* Preset Selector */}
                  <div className="mt-3">
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Choose from preset thumbnails:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_THUMBNAILS.map((t) => (
                        <button
                          key={t.path}
                          type="button"
                          onClick={() => setQuickImage(t.path)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                            quickImage === t.path
                              ? 'bg-blue-600 text-white border-blue-600 font-black'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Thumbnail Preview */}
                  {quickImage && (
                    <div className="mt-3 flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <div className="relative h-16 w-28 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900 shrink-0">
                        <Image src={quickImage} alt="Thumbnail preview" fill className="object-cover" />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        <p className="font-bold text-slate-900 dark:text-white">Live Preview</p>
                        <p className="truncate max-w-[200px] text-[11px] font-mono">{quickImage}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setQuickEditCourse(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold shadow-lg shadow-blue-500/20 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 2. FULL BLOG POST BUILDER / EDITOR MODAL */}
        {isBlogModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>{editingBlogSlug ? 'Edit Article Content' : 'Create &amp; Publish New Blog'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="e.g. Scaling Kubernetes Microservices in 2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:border-blue-500"
                    >
                      <option value="Generative AI">Generative AI</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="Cloud & DevOps">Cloud & DevOps</option>
                      <option value="Career Guides">Career Guides</option>
                      <option value="System Design">System Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      placeholder="e.g. 6 min read"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Cover Image URL or Path
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={blogForm.coverImage}
                      onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                      placeholder="/aimlintern.jpg or https://..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:border-blue-500"
                    />
                    <ImageUploadButton
                      label="Upload"
                      onUploaded={(url) => setBlogForm((f) => ({ ...f, coverImage: url }))}
                      onError={(msg) => notify(msg, 'error')}
                    />
                  </div>
                  {/* Preset thumbnails */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {PRESET_THUMBNAILS.slice(0, 5).map((t) => (
                      <button
                        key={t.path}
                        type="button"
                        onClick={() => setBlogForm({ ...blogForm, coverImage: t.path })}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={blogForm.authorName}
                      onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                      placeholder="e.g. Ananya Deshmukh"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Author Role / Title
                    </label>
                    <input
                      type="text"
                      value={blogForm.authorRole}
                      onChange={(e) => setBlogForm({ ...blogForm, authorRole: e.target.value })}
                      placeholder="e.g. Principal AI Scientist"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Excerpt / Brief Card Summary
                  </label>
                  <textarea
                    rows={2}
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    placeholder="Short engaging summary shown in blog grid cards..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Introduction Section
                  </label>
                  <textarea
                    rows={3}
                    value={blogForm.intro}
                    onChange={(e) => setBlogForm({ ...blogForm, intro: e.target.value })}
                    placeholder="Full introductory text for the article..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Content Sections (Separate sections with &apos;---&apos;)
                  </label>
                  <textarea
                    rows={6}
                    value={blogForm.sectionsText}
                    onChange={(e) => setBlogForm({ ...blogForm, sectionsText: e.target.value })}
                    placeholder="1. Section Heading\nSection paragraph details...\n---\n2. Another Section\nDetails..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs leading-relaxed focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Key Takeaways (1 per line)
                  </label>
                  <textarea
                    rows={2}
                    value={blogForm.takeawaysText}
                    onChange={(e) => setBlogForm({ ...blogForm, takeawaysText: e.target.value })}
                    placeholder="Key point 1\nKey point 2"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                    placeholder="AI, FastAPI, Python, VectorSearch"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featuredBlog"
                    checked={blogForm.featured}
                    onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 focus:ring-blue-500"
                  />
                  <label htmlFor="featuredBlog" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Feature this post at the top banner of the Blogs page
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsBlogModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold shadow-lg shadow-blue-500/20 cursor-pointer"
                  >
                    {editingBlogSlug ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 3. FULL PROGRAM / COURSE BUILDER MODAL */}
        {isCourseModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>{editingCourseSlug ? 'Edit Program, Pricing &amp; Syllabus' : 'Create New Cohort Program'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="e.g. Agentic AI & Autonomous Systems"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Department / Domain Category
                    </label>
                    <input
                      type="text"
                      list="lms-course-categories"
                      value={courseForm.category}
                      onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                      placeholder="e.g. CSE / IT, ECE, Job Guarantee, Management..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:border-blue-500"
                    />
                    <datalist id="lms-course-categories">
                      {[...departmentCategories.map((d) => d.title), 'Job Guarantee Track'].map((title) => (
                        <option key={title} value={title} />
                      ))}
                    </datalist>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500">
                      New programs appear on the department page whose name matches this category.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      placeholder="e.g. 3 - 6 Months"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Price Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Discounted / Offer Price *
                    </label>
                    <input
                      type="text"
                      required
                      value={courseForm.price}
                      onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                      placeholder="e.g. ₹4,999"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-black text-base focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Original / Strike-through Price
                    </label>
                    <input
                      type="text"
                      value={courseForm.originalPrice}
                      onChange={(e) => setCourseForm({ ...courseForm, originalPrice: e.target.value })}
                      placeholder="e.g. ₹14,999"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Thumbnail Image URL or Path
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={courseForm.image}
                      onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                      placeholder="/courses/web-development-fullstack.png"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:border-blue-500"
                    />
                    <ImageUploadButton
                      label="Upload"
                      onUploaded={(url) => setCourseForm((f) => ({ ...f, image: url }))}
                      onError={(msg) => notify(msg, 'error')}
                    />
                  </div>

                  {/* Preset Selector */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {PRESET_THUMBNAILS.map((t) => (
                      <button
                        key={t.path}
                        type="button"
                        onClick={() => setCourseForm({ ...courseForm, image: t.path })}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300 cursor-pointer border border-slate-200 dark:border-slate-700"
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>

                  {courseForm.image && (
                    <div className="mt-2 relative h-20 w-36 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
                      <Image src={courseForm.image} alt="Thumbnail preview" fill className="object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Program Summary / Overview
                  </label>
                  <textarea
                    rows={2}
                    value={courseForm.summary}
                    onChange={(e) => setCourseForm({ ...courseForm, summary: e.target.value })}
                    placeholder="Short engaging overview of what learners will build..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Syllabus Modules (1 per line, format: Module Title: Topic 1, Topic 2...)
                  </label>
                  <textarea
                    rows={4}
                    value={courseForm.modulesText}
                    onChange={(e) => setCourseForm({ ...courseForm, modulesText: e.target.value })}
                    placeholder="Module 1: Topic A, Topic B\nModule 2: Topic C, Topic D"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="jobGuaranteeCheckFull"
                    checked={courseForm.jobGuarantee}
                    onChange={(e) => setCourseForm({ ...courseForm, jobGuarantee: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 focus:ring-blue-500"
                  />
                  <label htmlFor="jobGuaranteeCheckFull" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mark as 100% Job Guarantee Placement Track
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCourseModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold shadow-lg shadow-blue-500/20 cursor-pointer"
                  >
                    {editingCourseSlug ? 'Update Program & Pricing' : 'Publish New Program'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Footer />
      </div>
    )
  }

  return null
}
