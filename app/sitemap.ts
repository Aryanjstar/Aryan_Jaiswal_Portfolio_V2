import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/caseStudies";
import { SITE_URL } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/projects", "/resume", "/notesbyaryan", "/colophon", "/now"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...caseStudies.map((c) => ({ url: `${SITE_URL}/work/${c.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
