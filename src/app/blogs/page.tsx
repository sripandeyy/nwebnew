"use client"

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BlogPost } from './blogData'
import { getAllBlogs, BLOGS_EVENT } from '../utils/blogStore'
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Tag,
  CheckCircle2,
  TrendingUp,
  Share2,
  Mail
} from 'lucide-react'

const CATEGORIES = [
  'All',
  'Generative AI',
  'Full Stack',
  'Cloud & DevOps',
  'Career Guides',
  'System Design',
] as const

type CategoryType = (typeof CATEGORIES)[number]

export default function BlogsPage() {
  const [blogsList, setBlogsList] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [emailSubscribed, setEmailSubscribed] = useState(false)
  const [subEmail, setSubEmail] = useState('')

  useEffect(() => {
    setBlogsList(getAllBlogs())
    const handleUpdate = () => setBlogsList(getAllBlogs())
    window.addEventListener(BLOGS_EVENT, handleUpdate)
    return () => window.removeEventListener(BLOGS_EVENT, handleUpdate)
  }, [])

  const filteredPosts = useMemo(() => {
    return blogsList.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query)) ||
        post.author?.name.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [blogsList, selectedCategory, searchQuery])

  const featuredPost = useMemo(() => {
    return blogsList.find((p) => p.featured) || blogsList[0]
  }, [blogsList])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subEmail || !subEmail.includes('@')) return
    setEmailSubscribed(true)
    setSubEmail('')
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#070913] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Header />

      {/* Hero Header Section */}
      <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 overflow-hidden border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-slate-50/70 via-transparent to-transparent dark:from-slate-900/30">
        
        {/* Subtle Ambient Backdrops */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] lg:w-[1000px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-emerald-500/10 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-15 pointer-events-none -z-10" />

        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold mb-4 shadow-sm backdrop-blur-md">
              <span>Nyeras Engineering & Career Blog</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Deep Technical Guides, Architectures & Career Strategies
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Learn practical software engineering, generative AI workflows, cloud infrastructure blueprints, and battle-tested interview frameworks from senior industry practitioners.
            </p>

            {/* Search Bar Input with Skeuomorphic Inset Style */}
            <div className="mt-8 max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by tech stack, topic, or keyword (e.g. RAG, Next.js, Cisco)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl skeuo-input text-slate-900 dark:text-white placeholder-slate-400 text-sm font-semibold focus:outline-none shadow-md"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Tactile Skeuomorphic Track) */}
          <div className="mt-10 flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl skeuo-track max-w-full">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'skeuo-tab-active text-slate-950 dark:text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 flex-1">
        
        {/* Featured Post Spotlight (Only when viewing All and no search) */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Featured Editorial Spotlight
              </h2>
            </div>

            <div className="relative rounded-3xl bg-slate-900 dark:bg-slate-900/90 text-white p-6 sm:p-8 lg:p-10 shadow-2xl glossy-black-card border border-slate-800 overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Cover Media */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video lg:aspect-4/3 bg-slate-800 shadow-xl border border-slate-700">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-extrabold backdrop-blur-md shadow-md">
                    {featuredPost.category}
                  </div>
                </div>

                {/* Right: Article Details */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-semibold mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {featuredPost.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <Link href={`/blogs/${featuredPost.slug}`}>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight hover:text-blue-400 transition-colors leading-snug">
                        {featuredPost.title}
                      </h3>
                    </Link>

                    <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

            {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag, tagIdx) => (
                        <span
                          key={`featured-tag-${tag || 'tag'}-${tagIdx}`}
                          className="px-2.5 py-1 rounded-lg skeuo-badge text-slate-950 dark:text-slate-100 text-[11px] font-extrabold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author & CTA Button */}
                  <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-500/40"
                      />
                      <div>
                        <p className="text-sm font-bold text-white leading-tight">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          {featuredPost.author.role}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl skeuo-btn-accent text-white font-extrabold text-sm shadow-md group"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>
                {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 ml-1">
                {filteredPosts.length}
              </span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No articles found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try adjusting your filters or search keywords.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className="mt-4 px-5 py-2.5 rounded-xl skeuo-btn-secondary text-slate-900 dark:text-white text-xs font-extrabold"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post, postIdx) => (
                <article
                  key={`blog-post-${post.slug || 'post'}-${postIdx}`}
                  className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xl border border-slate-200 dark:border-slate-800/90 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
                >
                  <div>
                    {/* Thumbnail Cover */}
                    <Link href={`/blogs/${post.slug}`} className="block relative rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800 mb-5">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-extrabold backdrop-blur-md">
                        {post.category}
                      </div>
                    </Link>

                    {/* Metadata */}
                    <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-2.5">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/blogs/${post.slug}`}>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer: Author & Read Link */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div className="text-xs">
                        <p className="font-bold text-slate-900 dark:text-white leading-tight">
                          {post.author.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                          {post.author.role}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg skeuo-btn-secondary text-slate-900 dark:text-white text-xs font-extrabold group/btn"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter & Placement Problem Set Subscription CTA */}
        <section className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-2xl glossy-black-card border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold mb-3">
                <Mail className="w-3.5 h-3.5" />
                <span>Weekly Placement & Architecture Briefing</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Get Top-Tier Interview Problems & Tech Blueprints
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                Join 25,000+ engineering students and developers who receive our weekly curated algorithmic teardowns, system design blueprints, and off-campus MNC hiring alerts directly in their inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {emailSubscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">You are Subscribed!</h4>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      Check your inbox for our latest placement prep guide.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3.5 rounded-xl skeuo-input text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl skeuo-btn-accent text-white font-extrabold text-sm shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  )
}
