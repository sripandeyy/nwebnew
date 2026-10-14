export type { Certificate, CurriculumModule, Course, Domain, DepartmentCategory } from "./types";
import type { Course, Domain, DepartmentCategory } from "./types";
import {
  cseItCourses,
  eceCourses,
  mechanicalCourses,
  civilCourses,
  managementCourses,
  bioCourses,
  foodTechCourses,
  futureSkillsSchoolCourses,
} from "./courseCatalog";

export { futureSkillsSchoolCourses };

export const domains: Domain[] = [
  {
    id: "cse-it",
    name: "CSE / IT",
    courses: cseItCourses,
  },
  {
    id: "ece",
    name: "ECE Domains",
    courses: eceCourses,
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering Domains",
    courses: mechanicalCourses,
  },
  {
    id: "civil",
    name: "Civil Engineering Domains",
    courses: civilCourses,
  },
  {
    id: "management",
    name: "Management & Commerce Domains",
    courses: managementCourses,
  },
  {
    id: "bio",
    name: "BIO DOMAINS",
    courses: bioCourses,
  },
  {
    id: "food-tech",
    name: "FOOD TECHNOLOGY",
    courses: foodTechCourses,
  },
  {
    id: "future-skills-school",
    name: "Future Skills School Program",
    courses: futureSkillsSchoolCourses,
  },
];

export const jobGuaranteeCourses: Course[] = [
  {
    slug: "data-science-job-guarantee",
    title: "Data Science (Job Guarantee)",
    summary:
      "Project-heavy DS track with mentoring, mock interviews, and placement support.",
    jobGuarantee: true,
    price: "₹99,999",
    originalPrice: "₹1,49,999",
    curriculum: [
      { title: "Foundations", topics: ["Python", "Stats", "EDA", "SQL"] },
      { title: "ML Core", topics: ["Supervised/Unsupervised", "Modeling", "Validation"] },
      { title: "Analytics & BI", topics: ["Power BI", "Dashboards", "Storytelling"] },
      { title: "Career", topics: ["Resume", "LinkedIn", "Mock Interviews"] },
    ],
    certificates: [
      { name: "Course Completion" },
      { name: "Internship Certificate" },
      { name: "Job Guarantee Certificate" },
    ],
    image: "/courses/datascience.jpg",
  },
  {
    slug: "data-analytics-job-guarantee",
    title: "Data Analytics (Job Guarantee)",
    summary:
      "Practical analytics track with SQL, Excel, Power BI and real dashboards.",
    jobGuarantee: true,
    price: "₹99,999",
    originalPrice: "₹1,49,999",
    curriculum: [
      { title: "Excel & SQL", topics: ["Excel Advanced", "SQL Queries", "Joins", "CTEs"] },
      { title: "BI & Visualization", topics: ["Power BI", "Data Modeling", "DAX", "Publishing"] },
      { title: "Case Studies", topics: ["Sales", "Ops", "Marketing Analytics"] },
      { title: "Career", topics: ["Portfolio", "Resume", "Mocks"] },
    ],
    certificates: [
      { name: "Course Completion" },
      { name: "Internship Certificate" },
      { name: "Job Guarantee Certificate" },
    ],
    image: "/courses/dataanalytics.jpg",
  },
  {
    slug: "hrm-job-guarantee",
    title: "Human Resource Management (Job Guarantee)",
    summary: "End-to-end HRM with TA, payroll, compliance, HR analytics, and HRIS tools.",
    jobGuarantee: true,
    price: "₹99,999",
    originalPrice: "₹1,49,999",
    curriculum: [
      { title: "HR Core", topics: ["Talent Acquisition", "Onboarding", "L&D", "Performance Mgmt"] },
      { title: "HR Ops", topics: ["Payroll", "Compliance", "Policies", "Employee Relations"] },
      { title: "HR Analytics", topics: ["Excel & SQL", "Dashboards", "Reporting"] },
      { title: "Career", topics: ["Resume", "LinkedIn", "Mock Interviews"] },
    ],
    certificates: [
      { name: "Course Completion" },
      { name: "Internship Certificate" },
      { name: "Job Guarantee Certificate" },
    ],
    image: "/courses/hrm.webp",
  },
];

export function findCourseBySlug(slug: string): { course: Course | null; domainName?: string } {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('nyeras_custom_courses')
      if (stored) {
        const parsed: Course[] = JSON.parse(stored)
        const financeAliases = ["finance-market-awareness", "finance-stock-market-awareness"]
        const candidates = financeAliases.includes(slug) ? financeAliases : [slug]
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed.some((c) => c && candidates.includes(c.slug))) {
          // The stored catalogue is a full snapshot, so a missing slug means the admin deleted it.
          return { course: null }
        }
        const matched = parsed.find((c) => c.slug === slug)
        if (matched) {
          const isJob = Boolean(matched.jobGuarantee) || matched.slug?.includes('job-guarantee');
          if (isJob && (matched.price === '₹60,000' || matched.price === '₹59,999' || !matched.price)) {
            matched.price = '₹99,999';
            matched.originalPrice = '₹1,49,999';
          }
          return { course: matched, domainName: matched.category || (isJob ? "Job Guarantee" : "Domain Course") }
        }
      }
    } catch (e) {
      console.error('Error reading dynamic courses in findCourseBySlug', e)
    }
  }

  const targetSlug = slug === "finance-market-awareness" ? "finance-stock-market-awareness" : slug;

  for (const d of domains) {
    const c = d.courses.find((c) => c.slug === targetSlug || (slug === "finance-stock-market-awareness" && c.slug === "finance-market-awareness"));
    if (c) return { course: c, domainName: d.name };
  }
  const j = jobGuaranteeCourses.find((c) => c.slug === targetSlug);
  if (j) return { course: j, domainName: "Job Guarantee" };
  return { course: null };
}

export const departmentCategories: DepartmentCategory[] = [
  { id: "cse-it", title: "CSE / IT", domainIds: ["cse-it"] },
  { id: "ece", title: "ECE", domainIds: ["ece"] },
  { id: "mech-civil", title: "Mechanical / Civil", domainIds: ["mechanical", "civil"] },
  { id: "management", title: "Management & Commerce", domainIds: ["management"] },
  { id: "bio-food", title: "BIO Domains / FOOD TECHNOLOGY", domainIds: ["bio", "food-tech"] },
  { id: "future-skills-school", title: "Future Skills School Program", domainIds: ["future-skills-school"] },
];

/**
 * Applies the admin-published catalogue (a full snapshot in localStorage) to a code-defined list:
 * edits replace the defaults, deleted programs are dropped and new programs accepted by
 * `includeNew` are appended.
 */
export function applyCustomCourses(defaults: Course[], includeNew: (course: Course) => boolean): Course[] {
  if (typeof window === 'undefined') return defaults
  try {
    const stored = localStorage.getItem('nyeras_custom_courses')
    const parsed: Course[] = stored ? JSON.parse(stored) : []
    if (!Array.isArray(parsed) || parsed.length === 0) return defaults

    const customMap = new Map<string, Course>()
    parsed.forEach((item) => {
      if (item && item.slug) customMap.set(item.slug, item)
    })

    const merged = defaults.filter((c) => customMap.has(c.slug)).map((c) => customMap.get(c.slug)!)
    const existingSlugs = new Set(defaults.map((c) => c.slug))
    for (const item of customMap.values()) {
      if (!existingSlugs.has(item.slug) && includeNew(item)) merged.push(item)
    }
    return merged
  } catch (e) {
    console.error('Error reading dynamic courses', e)
    return defaults
  }
}

/** Every program slug that ships with the site code, across all domains and tracks. */
const builtInSlugs = new Set([...domains.flatMap((d) => d.courses.map((c) => c.slug)), ...jobGuaranteeCourses.map((c) => c.slug)])

export function isBuiltInCourse(slug: string) {
  return builtInSlugs.has(slug)
}

export function getCoursesForDepartmentCategory(
  categoryId: string,
  includeCustom = true
): { title: string; courses: Course[] } | null {
  const cat = departmentCategories.find((c) => c.id === categoryId);
  if (!cat) return null;
  const courses: Course[] = [];
  for (const id of cat.domainIds) {
    const d = domains.find((dd) => dd.id === id);
    if (d) courses.push(...d.courses);
  }
  if (!includeCustom) return { title: cat.title, courses };

  const targetTitle = cat.title.toLowerCase()
  const targetId = cat.id.toLowerCase()
  const matchesCategory = (item: Course) => {
    if (builtInSlugs.has(item.slug)) return false
    const itemCat = (item.category || '').trim().toLowerCase()
    if (!itemCat) return false
    return itemCat.includes(targetTitle) || targetTitle.includes(itemCat) || itemCat.includes(targetId)
  }

  return { title: cat.title, courses: applyCustomCourses(courses, matchesCategory) };
}
