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
} from "./courseCatalog";

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
];

export const jobGuaranteeCourses: Course[] = [
  {
    slug: "data-science-job-guarantee",
    title: "Data Science (Job Guarantee)",
    summary:
      "Project-heavy DS track with mentoring, mock interviews, and placement support.",
    jobGuarantee: true,
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
  for (const d of domains) {
    const c = d.courses.find((c) => c.slug === slug);
    if (c) return { course: c, domainName: d.name };
  }
  const j = jobGuaranteeCourses.find((c) => c.slug === slug);
  if (j) return { course: j, domainName: "Job Guarantee" };
  return { course: null };
}

export const departmentCategories: DepartmentCategory[] = [
  { id: "cse-it", title: "CSE / IT", domainIds: ["cse-it"] },
  { id: "ece", title: "ECE", domainIds: ["ece"] },
  { id: "mech-civil", title: "Mechanical / Civil", domainIds: ["mechanical", "civil"] },
  { id: "management", title: "Management & Commerce", domainIds: ["management"] },
  { id: "bio-food", title: "BIO Domains / FOOD TECHNOLOGY", domainIds: ["bio", "food-tech"] },
];

export function getCoursesForDepartmentCategory(categoryId: string): { title: string; courses: Course[] } | null {
  const cat = departmentCategories.find((c) => c.id === categoryId);
  if (!cat) return null;
  const courses: Course[] = [];
  for (const id of cat.domainIds) {
    const d = domains.find((dd) => dd.id === id);
    if (d) courses.push(...d.courses);
  }
  return { title: cat.title, courses };
}
