export type Mentor = {
  id: string;
  name: string;
  initials: string;
  role: string;
  domain: string;
  domainLabel: string;
  /** Only set when an authorized portrait is available; otherwise an initials avatar is shown. */
  photo?: string;
  linkedinUrl: string;
  sectionDescription?: string;
  shortBio: string;
  fullBio: string[];
  expertise: string[];
  /** Areas of interest that are not confirmed professional specializations. */
  interests: string[];
};

export const MENTORS: Record<string, Mentor> = {
  "ks-pavan-sai": {
    id: "ks-pavan-sai",
    name: "K. S. Pavan Sai",
    initials: "KS",
    role: "HRM Mentor",
    domain: "Human Resource Management",
    domainLabel: "HRM",
    photo: "/mentors/ks-pavan-sai.jpg",
    linkedinUrl: "https://www.linkedin.com/in/k-s-pavan-sai-6bb230168/",
    sectionDescription:
      "Explore practical perspectives on human resource management, workplace culture, leadership, employee development, and career readiness.",
    shortBio:
      "Shares practical perspectives on strategic HRM, POSH awareness, people strategy and learning & development to help learners prepare for HR careers.",
    fullBio: [
      "K. S. Pavan Sai's professional focus is human resource management, including strategic HRM, POSH awareness and training, people strategy, and learning & development.",
      "As an HRM mentor, he helps learners connect HR concepts to how organisations actually work: building healthy workplace cultures, developing leaders, and supporting employee growth. He also guides learners on career direction and interview preparation for HR roles.",
    ],
    expertise: [
      "Strategic HRM",
      "POSH Awareness & Training",
      "People Strategy",
      "Learning & Development",
      "Leadership Development",
      "Workplace Culture",
      "Career Mentoring",
      "Interview Preparation",
    ],
    interests: ["People Analytics", "HR Digital Transformation"],
  },
};

const COURSE_MENTORS: Record<string, string[]> = {
  "hrm-job-guarantee": ["ks-pavan-sai"],
};

export function getMentorsForCourse(slug?: string): Mentor[] {
  if (!slug) return [];
  return (COURSE_MENTORS[slug] || [])
    .map((id) => MENTORS[id])
    .filter((m): m is Mentor => Boolean(m));
}
