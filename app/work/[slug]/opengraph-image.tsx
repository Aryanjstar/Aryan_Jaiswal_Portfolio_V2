import { caseStudies, caseStudyBySlug } from "@/content/caseStudies";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Case study by Aryan Jaiswal";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudyBySlug(slug)!;
  return ogImage({ kicker: `Case study · ${c.kicker}`, title: c.title, path: `/work/${c.slug}` });
}
