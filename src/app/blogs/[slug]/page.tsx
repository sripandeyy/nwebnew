"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { BlogPost } from '../blogData'
import { getAllBlogs, BLOGS_EVENT } from '../../utils/blogStore'
import { isSiteContentReady, SITE_CONTENT_READY_EVENT } from '../../utils/siteContent'
import { useAuth } from '../../context/AuthContext'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Linkedin,
  Twitter,
  Tag,
  ExternalLink
} from 'lucide-react'

export default function BlogPostDetail() {
  const params = useParams()
  const slug = params?.slug as string
  const { isAdmin } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null)
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([])
  const [contentReady, setContentReady] = useState(false)

  useEffect(() => {
    setMounted(true)
    setAllBlogs(getAllBlogs())
    setContentReady(isSiteContentReady())
    const handleUpdate = () => setAllBlogs(getAllBlogs())
    const handleReady = () => setContentReady(true)
    window.addEventListener(BLOGS_EVENT, handleUpdate)
    window.addEventListener(SITE_CONTENT_READY_EVENT, handleReady)
    return () => {
      window.removeEventListener(BLOGS_EVENT, handleUpdate)
      window.removeEventListener(SITE_CONTENT_READY_EVENT, handleReady)
    }
  }, [])

  const post = allBlogs.find((p) => p.slug === slug)

  // Newly published posts only exist once the published content has loaded.
  if (!mounted || (!post && !contentReady)) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#070913] text-slate-900 dark:text-slate-100 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-white rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#070913] text-slate-900 dark:text-slate-100 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4 pt-32 pb-20 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h1 className="text-2xl font-black text-white">Article Not Found</h1>
            <p className="text-sm text-slate-400">The article you are looking for may have been moved or unpublished.</p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl skeuo-btn-primary text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedPosts = allBlogs.filter((p) => p.slug !== slug).slice(0, 3)

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCopyCode = (snippet: string, idx: number) => {
    navigator.clipboard.writeText(snippet)
    setCopiedCodeIndex(idx)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#070913] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Header />
      
      {/* Admin Control Bar on Article Page */}
      {isAdmin && (
        <div className="relative z-20 bg-slate-900 text-white px-4 py-2.5 shadow-md flex items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-black truncate">
            <span className="truncate">Admin Mode: Viewing <strong>{post.title}</strong></span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/lms"
              className="px-3.5 py-1.5 rounded-xl skeuo-btn-primary text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-300" />
              <span>Full LMS Studio</span>
            </Link>
          </div>
        </div>
      )}

      {/* Article Header & Hero */}
      <header className="relative pt-32 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-slate-50/70 via-transparent to-transparent dark:from-slate-900/30">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Blogs
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-[300px]">
              {post.category}
            </span>
          </div>

          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold shadow-sm">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2] mb-6">
            {post.title}
          </h1>

          {/* Author Bar & Share Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3.5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/30 shadow-md"
              />
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  {post.author.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {post.author.role}
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl skeuo-btn-secondary text-slate-900 dark:text-white text-xs font-bold transition-transform active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Article Body */}
      <article className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1">
        
        {/* Cover Media */}
        <div className="relative rounded-3xl overflow-hidden aspect-video max-h-[480px] w-full bg-slate-900 shadow-2xl mb-12 border border-slate-200 dark:border-slate-800">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8">
            
            {/* Intro Lead */}
            <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-medium mb-10">
              {post.content.intro}
            </div>

            {/* Article Sections */}
            <div className="space-y-10">
              {post.content.sections.map((section, sIdx) => (
                <section key={sIdx} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight pt-2">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Code Snippet Box with Copy Button */}
                  {section.code && (
                    <div className="my-6 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
                        <span>{section.code.language.toUpperCase()}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(section.code!.snippet, sIdx)}
                          className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors"
                        >
                          {copiedCodeIndex === sIdx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                        <code>{section.code.snippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Quote Callout */}
                  {section.quote && (
                    <blockquote className="my-6 pl-5 border-l-4 border-blue-500 italic text-slate-800 dark:text-slate-200 text-lg font-medium bg-slate-50 dark:bg-slate-900/60 p-4 rounded-r-2xl">
                      &ldquo;{section.quote}&rdquo;
                    </blockquote>
                  )}
                </section>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl glossy-black-card border border-slate-800">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mb-4">
                <span>Key Engineering Takeaways</span>
              </h3>
              <ul className="space-y-3">
                {post.content.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-200 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags Pill Bar */}
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Tags:
              </span>
              {post.tags.map((tag, tagIdx) => (
                <span
                  key={`blog-detail-tag-${tag || 'tag'}-${tagIdx}`}
                  className="px-3 py-1 rounded-lg skeuo-badge text-slate-950 dark:text-slate-100 text-xs font-extrabold"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>

          {/* Right Sidebar: Author Bio & Track CTA (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Author Profile Card */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                About the Author
              </h4>
              <div className="flex items-center gap-3.5 mb-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/40"
                />
                <div>
                  <h5 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {post.author.name}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {post.author.role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Senior engineering mentor at Nyera Educational Organisation. Specializes in scalable distributed systems, enterprise generative AI, and career mentoring for tier-1 tech placements.
              </p>
            </div>

            {/* Career Acceleration Callout */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 to-slate-900 text-white shadow-xl border border-blue-800/60">
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/40 uppercase tracking-wider inline-block mb-3">
                100% Placement Track
              </span>
              <h4 className="text-xl font-extrabold text-white leading-snug">
                Ready to Build Production Systems Like This?
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Join our live mentor cohorts with 1:1 code reviews, real capstone microservices, and dedicated MNC placement referrals.
              </p>
              <Link
                href="/plans"
                className="mt-5 w-full py-3 px-4 rounded-xl skeuo-btn-accent text-white font-extrabold text-xs text-center flex items-center justify-center gap-2 shadow-md"
              >
                <span>Explore Cohort Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Back to Blog Hub */}
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl skeuo-btn-secondary text-slate-900 dark:text-white text-xs font-extrabold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>

          </aside>

        </div>

        {/* Related Articles Carousel/Grid */}
        <section className="mt-16 sm:mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Recommended Articles
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Continue learning with more deep-dive architectural tutorials.
              </p>
            </div>
            <Link
              href="/blogs"
              className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost, rIdx) => (
              <article
                key={`rec-blog-${rPost.slug || 'post'}-${rIdx}`}
                className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 p-5 shadow-lg border border-slate-200 dark:border-slate-800/90 hover:shadow-xl transition-all group"
              >
                <div>
                  <Link href={`/blogs/${rPost.slug}`} className="block relative rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800 mb-4">
                    <img
                      src={rPost.coverImage}
                      alt={rPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-extrabold backdrop-blur-md">
                      {rPost.category}
                    </div>
                  </Link>

                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {rPost.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
                    {rPost.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {rPost.readTime}
                  </span>
                  <Link
                    href={`/blogs/${rPost.slug}`}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </article>

      <Footer />
    </main>
  )
}
