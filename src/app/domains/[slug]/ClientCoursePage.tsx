"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { findCourseBySlug } from "../data";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PremiumCoursePage from "../../components/PremiumCoursePage";

interface Course {
  title: string;
  summary: string;
  image?: string;
  curriculum: Array<{ title: string; topics: string[] }>;
  jobGuarantee?: boolean;
}

export default function ClientCoursePage({ slug }: { slug: string }) {
  const router = useRouter();
  const [course, setCourse] = React.useState<Course | null>(null);
  const [domainName, setDomainName] = React.useState("Nyeras");
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const result = await findCourseBySlug(slug);
        setCourse(result.course);
        setDomainName(result.domainName || "Nyeras");
      } catch (error) {
        console.error("Error loading course:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourse();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Topbar />
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <h1 className="text-2xl font-semibold">Course not found</h1>
          <p className="mt-2 text-gray-600">The course you are looking for might have been moved.</p>
          <Link href="/domains" className="mt-6 inline-block px-4 py-2 rounded-md bg-[#6600cc] text-white">Back to Domains</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white/60">
      <Topbar />
      <Header />
      <div>
        <PremiumCoursePage course={course} domainName={domainName} />
        <Footer />
      </div>
    </div>
  );
}
