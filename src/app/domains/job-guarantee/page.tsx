"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { applyCustomCourses, isBuiltInCourse, jobGuaranteeCourses } from "../data";
import { COURSES_EVENT } from "../../utils/courseStore";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PremiumCourseCard from "../../components/PremiumCourseCard";
import CourseRoadmapFlowchart from "../../roadmaps/CourseRoadmapFlowchart";
import { findRoadmapCourse, PlanType } from "../../roadmaps/roadmapsData";
import { Briefcase, Shield, TrendingUp, Award, Building2, CheckCircle2, Workflow, ArrowRight, GraduationCap, Crown } from "lucide-react";

const jobGuaranteeTopics: Record<string, string[]> = {
  "data-science-job-guarantee": [
    "Python for Data Engineering & NumPy",
    "Exploratory Data Analysis & Pandas",
    "Statistical Inference & Hypothesis Testing",
    "Supervised & Unsupervised Machine Learning",
    "Deep Learning with PyTorch & TensorFlow",
    "Natural Language Processing & LLM Prompting",
    "Big Data Analytics with Apache Spark",
    "Database Management & Complex SQL",
    "Data Storytelling with Tableau & Power BI",
    "Model Containerization with Docker",
    "End-to-End MLOps Pipelines on Cloud",
    "Real-World Industry Capstone Deployments",
    "1:1 Technical Mock Interviews & Live Drills",
    "100% Guaranteed Corporate Placement Drives",
  ],
  "data-analytics-job-guarantee": [
    "Advanced Excel, Pivot Tables & VBA Macros",
    "Complex SQL Queries, Joins & Window Functions",
    "Interactive Dashboarding in Power BI & DAX",
    "Tableau Visual Storytelling & Executive KPIs",
    "Python for Data Wrangling & Automation",
    "Exploratory Analytics & Trend Forecasting",
    "Sales & Marketing Funnel Analytics",
    "Financial Analytics & Profitability Models",
    "Supply Chain & Inventory Optimization",
    "A/B Testing & Conversion Rate Optimization",
    "Database ETL Pipelines & Data Warehouses",
    "Portfolio Case Studies with Client Briefs",
    "ATS Resume & LinkedIn Optimization",
    "Direct Referrals to 100+ Hiring Partners",
  ],
  "hrm-job-guarantee": [
    "End-to-End Talent Acquisition & Sourcing",
    "Corporate Payroll Management & CTC Structuring",
    "Statutory Compliances (PF, ESI, Gratuity, POSH)",
    "HR Analytics & Attrition Prediction Models",
    "HRIS Software & Employee Portal Management",
    "Performance Management Systems & OKR Design",
    "Employee Relations & Conflict Resolution",
    "Indian Labour Laws & Employment Regulation",
    "Corporate L&D & Employee Onboarding SOPs",
    "Compensation & Benefits Strategy (C&B)",
    "HR Business Partnering (HRBP) Frameworks",
    "Strategic Manpower Planning & Org Design",
    "HR Mock Interviews & Corporate Polish",
    "100% Placement Drives with Partner MNCs",
  ],
};

export default function JobGuaranteePage() {
  const getJobCourses = () =>
    applyCustomCourses(
      jobGuaranteeCourses,
      (c) => !isBuiltInCourse(c.slug) && (Boolean(c.jobGuarantee) || (c.category || "").toLowerCase().includes("job guarantee"))
    );

  const [courses, setCourses] = useState(jobGuaranteeCourses);
  const [selectedJobSlug, setSelectedJobSlug] = useState<string>("data-science-job-guarantee");
  const [activePlan, setActivePlan] = useState<PlanType>("pro");

  useEffect(() => {
    setCourses(getJobCourses());
    const handleUpdate = () => setCourses(getJobCourses());
    window.addEventListener(COURSES_EVENT, handleUpdate);
    return () => window.removeEventListener(COURSES_EVENT, handleUpdate);
  }, []);

  const activeRoadmap = findRoadmapCourse(selectedJobSlug);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Topbar />
      <Header />

      {/* Hero Header */}
      <div className="relative pt-32 pb-14 bg-transparent">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm mb-6 shadow-xs">
              <Shield className="w-4 h-4 text-emerald-500" />
              100% Placement Assurance
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Job Guarantee{" "}
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
                Programs
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Choose an intensive career track with guaranteed corporate placement, personalized mentoring, and pay-after-placement options.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10 max-w-4xl mx-auto"
          >
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800 glossy-black-card">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">Placement Support</div>
                </div>
                <div className="space-y-1 border-x border-slate-200 dark:border-slate-800">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white">₹5-12L</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">Salary Range</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white">100+</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">Hiring Partners</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#guarantee-courses"
                  className="px-5 py-2.5 rounded-xl skeuo-btn-primary text-white text-xs font-black shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span>Explore 3 Job Guarantee Programs</span>
                </a>
                <a
                  href="/plans"
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <Briefcase className="w-4 h-4 text-emerald-500" />
                  <span>View All Pricing & Plans</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <main id="guarantee-courses" className="relative flex-grow pb-20">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <PremiumCourseCard
                key={course.slug}
                href={`/domains/${course.slug}`}
                title={course.title}
                summary={course.summary}
                image={course.image}
                badge="100% Placement"
                badgeColor="from-slate-900 to-slate-800"
                gradient="from-slate-800 via-slate-850 to-slate-900"
                topics={jobGuaranteeTopics[course.slug] || []}
                index={index}
              />
            ))}
          </div>

          {/* Interactive Job Guarantee Roadmap Section */}
          <div className="mt-16 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5 text-emerald-500" />
                  100% Placement Assurance Learning Progression Flowchart
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  Interactive Job Guarantee Roadmap
                </h3>
              </div>

              {/* Course Selector Tabs */}
              <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                {courses.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setSelectedJobSlug(c.slug)}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      selectedJobSlug === c.slug
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                    }`}
                  >
                    {c.title.replace(" (Job Guarantee)", "")}
                  </button>
                ))}
              </div>
            </div>

            {activeRoadmap && (
              <CourseRoadmapFlowchart
                course={activeRoadmap}
                activePlan={activePlan}
                onPlanChange={(newPlan) => setActivePlan(newPlan)}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
