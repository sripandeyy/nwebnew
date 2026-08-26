export type Certificate = { name: string; description?: string };
export type CurriculumModule = { title: string; topics: string[] };
export type Course = {
  slug: string;
  title: string;
  summary: string;
  jobGuarantee?: boolean;
  curriculum: CurriculumModule[];
  certificates: Certificate[];
  image?: string;
};
export type Domain = {
  id: string;
  name: string;
  courses: Course[];
};

export type DepartmentCategory = {
  id: string;
  title: string;
  domainIds: string[];
};
