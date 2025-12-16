// Server component wrapper for the dynamic domain course page.
// Next.js 15 types PageProps.params as a Promise in certain cases; we await it here
// and forward the slug to a dedicated client component.

import ClientCoursePage from "./ClientCoursePage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ClientCoursePage slug={slug} />;
}

