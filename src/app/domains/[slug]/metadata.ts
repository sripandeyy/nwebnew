import { findCourseBySlug } from "../data";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { course } = await findCourseBySlug(params.slug);
  return {
    title: course ? course.title : "Course",
    description: course?.summary ?? "Explore course curriculum and certificates.",
  };
}
