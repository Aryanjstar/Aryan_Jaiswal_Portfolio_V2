import type { Metadata } from "next";

import { ResumeActions } from "@/components/resume/resume-actions";
import { ResumeDoc } from "@/components/resume/resume-doc";
import { resumePdf } from "@/content/profile";
import { pdfFor, roles } from "@/content/roles";
import type { RoleKey } from "@/content/schema";

// Which PDF the single Download button serves for each ?role= (resolved here so the client bundle stays small).
const PDF_BY_ROLE = Object.fromEntries((Object.keys(roles) as RoleKey[]).map((r) => [r, pdfFor(r).href]));

export const metadata: Metadata = {
  title: "Resume",
  description: "Aryan Jaiswal's resume: Forward Deployed Engineer at Exotel, IIIT Dharwad CSE '26.",
  alternates: { canonical: "/resume" },
};

/** F16. Rendered from content/, the single source. Always light when printed. */
export default function Resume() {
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-[820px] px-5 pb-24 pt-10 md:pt-16">
        <ResumeDoc actions={<ResumeActions general={resumePdf.general} byRole={PDF_BY_ROLE} />} />
      </div>
    </div>
  );
}
