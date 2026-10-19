"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { findCourseBySlug } from "../data";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PremiumCoursePage from "../../components/PremiumCoursePage";
import { useAuth } from "../../context/AuthContext";
import { updateCoursePricingAndMedia, COURSES_EVENT } from "../../utils/courseStore";
import { isSiteContentReady, SITE_CONTENT_READY_EVENT } from "../../utils/siteContent";
import { Edit, DollarSign, Image as ImageIcon, CheckCircle2, Sliders, ExternalLink } from "lucide-react";

interface Course {
  slug?: string;
  title: string;
  summary: string;
  image?: string;
  curriculum: Array<{ title: string; topics: string[] }>;
  jobGuarantee?: boolean;
  price?: string;
  originalPrice?: string;
}

export default function ClientCoursePage({ slug }: { slug: string }) {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [domainName, setDomainName] = useState("Nyeras");
  const [isLoading, setIsLoading] = useState(true);

  // In-page admin quick edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPrice, setEditPrice] = useState("");
  const [editOriginalPrice, setEditOriginalPrice] = useState("");
  const [editImage, setEditImage] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [contentReady, setContentReady] = useState(false);

  const loadCourse = useCallback(async () => {
    try {
      const result = await findCourseBySlug(slug);
      if (result.course) {
        const c = { ...result.course, slug: result.course.slug || slug };
        const isSchool =
          (result.domainName || "").toLowerCase().includes("school") ||
          (c as any).category === "Future Skills School Program" ||
          slug === "cpp-programming-foundations" ||
          slug === "java-full-stack-foundations" ||
          slug === "ai-machine-learning-foundations" ||
          slug === "ai-in-economics-data-thinking" ||
          slug === "finance-stock-market-awareness" ||
          slug === "finance-market-awareness";

        const isJob = Boolean((c as any).jobGuarantee) || (c as any).category === "Job Guarantee" || (c as any).tier === "Job Guarantee" || slug.includes("job-guarantee");
        if (isJob && (c.price === "₹60,000" || c.price === "₹59,999" || !c.price)) {
          c.price = "₹99,999";
          c.originalPrice = "₹1,49,999";
        }

        setCourse(c);
        setEditPrice(c.price || (isSchool ? "" : isJob ? "₹99,999" : "₹4,999"));
        setEditOriginalPrice(c.originalPrice || (isSchool ? "" : isJob ? "₹1,49,999" : "₹14,999"));
        setEditImage(c.image || "/courses/web-development-fullstack.png");
      } else {
        setCourse(null);
      }
      setDomainName(result.domainName || "Nyeras");
    } catch (error) {
      console.error("Error loading course:", error);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadCourse();
    setContentReady(isSiteContentReady());
    const handleCourseUpdate = () => {
      loadCourse();
    };
    const handleReady = () => setContentReady(true);
    window.addEventListener(COURSES_EVENT, handleCourseUpdate);
    window.addEventListener(SITE_CONTENT_READY_EVENT, handleReady);
    return () => {
      window.removeEventListener(COURSES_EVENT, handleCourseUpdate);
      window.removeEventListener(SITE_CONTENT_READY_EVENT, handleReady);
    };
  }, [loadCourse]);

  const handleSavePriceAndThumb = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course?.slug) return;
    const res = await updateCoursePricingAndMedia(course.slug, editPrice, editOriginalPrice, editImage);
    if (res.success) {
      setCourse((prev) => prev ? { ...prev, price: editPrice, originalPrice: editOriginalPrice, image: editImage } : null);
      setNotice("Course pricing and thumbnail updated successfully!");
      setIsEditModalOpen(false);
    } else {
      setNotice(res.message);
    }
    setTimeout(() => setNotice(null), 4000);
  };

  // Newly published programs only exist once the published content has loaded.
  if (isLoading || (!course && !contentReady)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-300 dark:border-slate-700 border-t-slate-900 dark:border-t-white"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Topbar />
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">The course you are looking for might have been moved.</p>
          <Link href="/domains/departments" className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-medium hover-lift transition-all">Back to Domains</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isSchoolCourse =
    domainName.toLowerCase().includes("school") ||
    (course as any)?.category === "Future Skills School Program" ||
    slug === "cpp-programming-foundations" ||
    slug === "java-full-stack-foundations" ||
    slug === "ai-machine-learning-foundations" ||
    slug === "ai-in-economics-data-thinking" ||
    slug === "finance-stock-market-awareness" ||
    slug === "finance-market-awareness";

  return (
    <div className="min-h-screen flex flex-col bg-white/60 relative">
      <Topbar />
      <Header />

      {/* Admin Control Bar on Course Page */}
      {isAdmin && (
        <div className="relative z-20 bg-slate-900 text-white px-4 py-2.5 shadow-md flex items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-black truncate">
            <span className="truncate">Admin Mode: Viewing <strong>{course.title}</strong></span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl skeuo-btn-primary text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Edit className="w-3.5 h-3.5 text-slate-300" />
              <span className="sm:hidden">Edit</span>
              <span className="hidden sm:inline">{isSchoolCourse ? "Edit Thumbnail" : "Edit Price & Thumbnail"}</span>
            </button>
            <Link
              href="/lms"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1 shadow-xs transition-all"
            >
              <span className="sm:hidden">LMS</span>
              <span className="hidden sm:inline">Full LMS Studio</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </div>
      )}

      {notice && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 text-sm font-bold shadow-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notice}</span>
          </div>
        </div>
      )}

      <div>
        <PremiumCoursePage course={course} domainName={domainName} />
        <Footer />
      </div>

      {/* Quick Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-slate-300" />
                <span>Quick Edit: {course.title}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePriceAndThumb} className="space-y-4 text-sm">
              {!isSchoolCourse && (
                <div className="grid grid-cols-2 gap-4 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-300 mb-1">Offer Price</label>
                    <input
                      type="text"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      placeholder="₹4,999"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-black text-sm focus:outline-none focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Strike-through</label>
                    <input
                      type="text"
                      value={editOriginalPrice}
                      onChange={(e) => setEditOriginalPrice(e.target.value)}
                      placeholder="₹14,999"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs focus:outline-none focus:border-slate-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Thumbnail Path / URL</label>
                <input
                  type="text"
                  required
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  placeholder="/courses/web-development-fullstack.png"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl skeuo-btn-primary text-white font-extrabold shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  Save & Apply Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
