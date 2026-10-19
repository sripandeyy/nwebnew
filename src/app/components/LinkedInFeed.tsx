'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Share2,
  CheckCircle2,
  Clock,
  Sparkles,
  Image as ImageIcon,
  ArrowUpRight,
  FileText,
  PlayCircle,
  Hourglass,
} from 'lucide-react';

export interface LinkedInMediaItem {
  type: 'image' | 'article' | 'video' | 'document' | 'unknown';
  url?: string;
  title?: string;
  description?: string;
  altText?: string;
  thumbnailUrl?: string;
}

export interface NormalizedLinkedInPost {
  id: string;
  urn: string;
  commentary: string;
  createdAt: number;
  createdAtFormatted: string;
  lastModifiedAt?: number;
  postUrl: string;
  author: {
    name: string;
    urn: string;
  };
  media: LinkedInMediaItem[];
}

export interface LinkedInStatus {
  configured: boolean;
  authenticated: boolean;
  live: boolean;
  organizationId: string | null;
  organizationUrn: string | null;
  apiVersion: string | null;
  lastSyncTime: string | null;
  syncInProgress: boolean;
  postCount: number;
  pollingIntervalMs: number | null;
  error: string | null;
}

const COMPANY_PAGE_URL = 'https://www.linkedin.com/company/nyeras-edutech-innovations/';
const POLL_INTERVAL_MS = 60000;
const FRESH_BADGE_MS = 10000;

function LinkedInGlyph({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8V10.9M7.86 6.54a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
    </svg>
  );
}

export default function LinkedInFeed() {
  const [posts, setPosts] = useState<NormalizedLinkedInPost[]>([]);
  const [status, setStatus] = useState<LinkedInStatus | null>(null);
  const [loaded, setLoaded] = useState(false);
  // URNs already shown; null until the first successful load so initial posts are not flagged as new
  const knownUrns = useRef<Set<string> | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [freshUrns, setFreshUrns] = useState<Set<string>>(new Set());
  const [expandedPostIds, setExpandedPostIds] = useState<Record<string, boolean>>({});
  const [activeMediaModal, setActiveMediaModal] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, ms = 5000) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), ms);
  }, []);

  const fetchFeedData = useCallback(async () => {
    try {
      const res = await fetch('/api/linkedin/posts', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.status) setStatus(data.status);
        if (Array.isArray(data.posts)) {
          const incoming = data.posts as NormalizedLinkedInPost[];
          const previous = knownUrns.current;
          const added = previous ? incoming.filter((p) => !previous.has(p.urn)).map((p) => p.urn) : [];
          knownUrns.current = new Set(incoming.map((p) => p.urn));
          setPosts(incoming);

          if (added.length > 0) {
            setFreshUrns((prev) => new Set([...prev, ...added]));
            setTimeout(() => {
              setFreshUrns((prev) => {
                const next = new Set(prev);
                added.forEach((u) => next.delete(u));
                return next;
              });
            }, FRESH_BADGE_MS);
            showToast(`${added.length} new LinkedIn post${added.length === 1 ? '' : 's'} from Nyeras`);
          }
        }
      }
    } catch (err) {
      console.warn('Failed to fetch LinkedIn feed data:', err);
    } finally {
      setLoaded(true);
    }
  }, [showToast]);

  useEffect(() => {
    fetchFeedData();
    const interval = setInterval(fetchFeedData, POLL_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [fetchFeedData]);

  const toggleExpand = (id: string) => {
    setExpandedPostIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = async (post: NormalizedLinkedInPost) => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Nyeras EduTech on LinkedIn',
          text: post.commentary.slice(0, 120),
          url: post.postUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(post.postUrl);
      showToast('Post link copied to clipboard', 3000);
    }
  };

  const formatTimeAgo = (timestamp: number | string) => {
    const time = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();
    if (isNaN(time)) return 'Recently';
    const seconds = Math.floor((Date.now() - time) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(#[\p{L}\p{N}_]+|https?:\/\/[^\s]+)/gu);
    return parts.map((part, index) => {
      if (/^#[\p{L}\p{N}_]+$/u.test(part)) {
        return (
          <a
            key={index}
            href={`https://www.linkedin.com/feed/hashtag/${encodeURIComponent(part.slice(1))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 font-semibold"
          >
            {part}
          </a>
        );
      }
      if (part.startsWith('http://') || part.startsWith('https://')) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline dark:text-indigo-400 break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const renderMedia = (post: NormalizedLinkedInPost, item: LinkedInMediaItem, key: number) => {
    if (item.type === 'article') {
      return (
        <a
          key={key}
          href={item.url || post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group/article hover:bg-slate-200/50 dark:hover:bg-slate-800/40 transition-colors"
        >
          {item.thumbnailUrl && (
            <div className="relative h-44 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                src={item.thumbnailUrl}
                alt={item.title || 'Article preview'}
                loading="lazy"
                className="w-full h-full object-cover group-hover/article:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Article</span>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
              {item.title || 'Read the full article'}
            </h5>
            {item.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{item.description}</p>
            )}
          </div>
        </a>
      );
    }

    if (item.type === 'video') {
      if (item.url) {
        return (
          <video
            key={key}
            controls
            preload="none"
            poster={item.thumbnailUrl}
            className="w-full max-h-72 bg-black"
          >
            <source src={item.url} />
          </video>
        );
      }
      return (
        <a
          key={key}
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-slate-900"
        >
          {item.thumbnailUrl && (
            <img src={item.thumbnailUrl} alt={item.title || 'Video preview'} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70" />
          )}
          <span className="relative inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
            <PlayCircle className="w-4 h-4" /> Watch on LinkedIn
          </span>
        </a>
      );
    }

    if (item.type === 'document') {
      return (
        <a
          key={key}
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3.5 hover:bg-slate-200/50 dark:hover:bg-slate-800/40 transition-colors"
        >
          <FileText className="w-8 h-8 text-blue-500 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Document</span>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
              {item.title || 'View document on LinkedIn'}
            </p>
          </div>
        </a>
      );
    }

    if (item.type === 'image') {
      if (!item.url) {
        return (
          <a
            key={key}
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/40"
          >
            <ImageIcon className="w-4 h-4 text-blue-500" /> View image on LinkedIn
          </a>
        );
      }
      return (
        <button
          type="button"
          key={key}
          className="relative block h-56 w-full overflow-hidden bg-slate-200 dark:bg-slate-800"
          onClick={() => setActiveMediaModal(item.url || null)}
        >
          <img
            src={item.url}
            alt={item.altText || item.title || 'LinkedIn post image'}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            View Media
          </span>
        </button>
      );
    }

    return null;
  };

  const isLive = Boolean(status?.live);
  const hasPosts = posts.length > 0;

  const statusBadge = (() => {
    if (!loaded) return { label: 'Loading', tone: 'slate' as const };
    if (isLive) return { label: 'Live', tone: 'emerald' as const };
    if (status && !status.configured) return { label: 'Not configured', tone: 'amber' as const };
    if (status && !status.authenticated) return { label: 'Pending authorization', tone: 'amber' as const };
    return { label: 'Pending', tone: 'amber' as const };
  })();

  const toneClasses = {
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
    slate: 'bg-slate-500/10 border-slate-500/30 text-slate-600 dark:text-slate-400',
  }[statusBadge.tone];

  const dotClasses = { emerald: 'bg-emerald-500', amber: 'bg-amber-500', slate: 'bg-slate-400' }[statusBadge.tone];

  return (
    <section id="linkedin-feed" className="relative py-14 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            role="status"
            className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 z-50 sm:max-w-md bg-slate-900/95 text-white backdrop-blur-2xl px-5 py-3.5 rounded-2xl border border-blue-500/30 shadow-2xl flex items-center gap-3 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[1780px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm mb-3">
              <LinkedInGlyph className="w-3.5 h-3.5" />
              <span>Official Company Page</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Nyeras on LinkedIn
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-normal">
              The latest posts from the Nyeras EduTech Innovations LinkedIn page.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border backdrop-blur-xl ${toneClasses}`}>
              <span className={`inline-flex rounded-full h-2 w-2 ${dotClasses}`} />
              <span>{statusBadge.label}</span>
            </div>

            <a
              href={COMPANY_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Follow Nyeras</span>
            </a>
          </div>
        </div>

        {!hasPosts ? (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/15 bg-white/60 dark:bg-slate-900/50 px-6 py-12 text-center">
            <Hourglass className="mx-auto w-8 h-8 text-slate-400 mb-3" />
            <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100">
              {!loaded
                ? 'Loading LinkedIn updates...'
                : isLive
                  ? 'No public posts yet.'
                  : 'Our LinkedIn updates will appear here soon.'}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Meanwhile, follow Nyeras directly on LinkedIn.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => {
              const isPostExpanded = expandedPostIds[post.id] || false;
              const hasLongText = post.commentary && post.commentary.length > 220;
              const displayedText =
                hasLongText && !isPostExpanded ? `${post.commentary.slice(0, 220)}...` : post.commentary;

              return (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-blue-500/20 overflow-hidden shrink-0">
                          <span>N</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                              {post.author?.name || 'Nyeras EduTech Innovations'}
                            </h4>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20 shrink-0" />
                            {freshUrns.has(post.urn) && (
                              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500 text-white text-[9px] font-extrabold uppercase tracking-wider">
                                New
                              </span>
                            )}
                          </div>
                          <time
                            dateTime={new Date(post.createdAt).toISOString()}
                            title={post.createdAtFormatted}
                            className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1"
                          >
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(post.createdAt)}
                          </time>
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-[#0077b5] shrink-0">
                        <LinkedInGlyph />
                      </div>
                    </div>

                    {post.commentary && (
                      <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-line mb-4 break-words">
                        {renderFormattedText(displayedText)}
                        {hasLongText && (
                          <button
                            onClick={() => toggleExpand(post.id)}
                            className="ml-2 inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {isPostExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    )}

                    {post.media && post.media.length > 0 && (
                      <div className="rounded-2xl overflow-hidden mb-4 border border-slate-200/60 dark:border-white/5 bg-slate-100 dark:bg-slate-950/40 divide-y divide-slate-200/60 dark:divide-white/5">
                        {post.media.map((item, mIdx) => renderMedia(post, item, mIdx))}
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-950/40 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between gap-4">
                    <button
                      onClick={() => handleShare(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <span>View on LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeMediaModal && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveMediaModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeMediaModal}
                alt="Enlarged LinkedIn media"
                className="w-auto h-auto max-h-[85vh] object-contain"
              />
              <button
                onClick={() => setActiveMediaModal(null)}
                aria-label="Close media preview"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
