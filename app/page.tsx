import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Chapter } from "@/components/home/chapter";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { OffTheClock } from "@/components/home/off-the-clock";
import { ProjectList } from "@/components/home/project-list";
import { RecognitionList } from "@/components/home/recognition-list";
import { ShipStory } from "@/components/home/ship-story";
import { TechSpecs } from "@/components/home/tech-specs";
import { Terminal } from "@/components/home/terminal";
import { WorkTiles } from "@/components/home/work-tiles";
import { caseStudies, tileOrder } from "@/content/caseStudies";
import { highlightsFor } from "@/content/highlights";
import { musicCopy } from "@/content/music";
import { moreProjects } from "@/content/projects";
import { matches, orderByRole, parseRole } from "@/content/roles";
import { shipSteps } from "@/content/ship";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

// Tailored views are the same page; keep one canonical URL.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home({ searchParams }: Props) {
  const sp = await searchParams;
  const role = parseRole(sp.role);

  // The old plain "Resume view" (?mode=resume) now lives only at /resume (Aryan, 3 Nov 2026); keep old links working.
  if (sp.mode === "resume") redirect(role === "all" ? "/resume" : `/resume?role=${role}`);

  const studies = orderByRole(tileOrder.map((s) => caseStudies.find((c) => c.slug === s)!), role);
  const projects = orderByRole(moreProjects, role);

  return (
    <div data-lens={role === "all" ? undefined : role}>
      <Hero role={role} />

      <Chapter alt eyebrow="Highlights" title="The short version." wide>
        <Highlights items={highlightsFor(role)} />
        <Terminal />
      </Chapter>

      <Chapter id="work" eyebrow="Experience &amp; education" title="Where I'm shipping now." lead="Exotel, a voice AI platform. I joined as a GenAI intern and converted to full-time.">
        <Experience role={role} />
      </Chapter>

      <Chapter alt eyebrow="How I ship" title={<>From customer call to <span className="serif-word">production</span>.</>} lead="Six steps, each shown with a real artifact from a different piece of work." wide>
        <ShipStory steps={shipSteps} />
      </Chapter>

      <Chapter id="selected-work" eyebrow="Selected work" title="Five things I could talk about for an hour." wide>
        <WorkTiles studies={studies} role={role} />
      </Chapter>

      <Chapter alt eyebrow="More projects" title="Built on the side.">
        <ProjectList projects={projects} matchSlugs={projects.filter((p) => matches(p.roles, role)).map((p) => p.slug)} />
        <p className="reveal mt-8 text-center text-[17px]">
          <Link href={role === "all" ? "/projects" : `/projects?role=${role}`} className="link-quiet font-medium">
            All projects <span className="chev" aria-hidden>›</span>
          </Link>
        </p>
      </Chapter>

      <Chapter id="specs" eyebrow="Tech specs" title="What I build with." lead="Every item lists where I used it. Hover or focus one to light up that work across the page." wide>
        <TechSpecs />
      </Chapter>

      <Chapter alt eyebrow="Recognition" title="Outside the day job." wide>
        <RecognitionList />
      </Chapter>

      <Chapter eyebrow="Off the clock" title={musicCopy.homeTitle} lead={musicCopy.homeSub}>
        <OffTheClock />
      </Chapter>

      <Contact role={role} />
    </div>
  );
}
