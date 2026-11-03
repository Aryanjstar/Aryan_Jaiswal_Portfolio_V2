import Link from "next/link";

import { CopyEmail } from "@/components/site/copy-email";
import { Img } from "@/components/site/img";
import { profile } from "@/content/profile";
import { pdfFor, roles } from "@/content/roles";
import type { RoleKey } from "@/content/schema";

/** F17. Works with JS off: the address is real text and "Write email" is a mailto link. */
export function Contact({ role }: { role: RoleKey }) {
  const roleName = role === "all" ? "Software engineer" : roles[role].word.replace(/^./, (c) => c.toUpperCase());
  const subject = encodeURIComponent(`Hi Aryan — ${roleName} at <company>`);
  const pdf = pdfFor(role);
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-alt bg-bg-alt py-[clamp(72px,11vw,148px)]">
      <div className="mx-auto max-w-[980px] px-5 md:px-8">
        <div className="reveal text-center">
          <Img src="/aryan-x.jpg" alt="Aryan Jaiswal" width={176} height={176} className="mx-auto h-40 w-40 rounded-full object-cover shadow-[0_0_0_3px_var(--bg-alt),0_0_0_4px_var(--hairline)] md:h-44 md:w-44" />
          <h2 id="contact-title" className="display mt-6 text-[clamp(2.5rem,6vw,4.25rem)]">
            {profile.contact.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-balance text-[17px] text-ink-2 md:text-[21px]">{profile.contact.body}</p>
        </div>

        <div className="reveal mx-auto mt-10 max-w-[640px] rounded-[28px] bg-card-alt p-6 text-center md:p-10 glow">
          <p className="text-[13px] font-semibold text-muted">Email</p>
          <p className="mt-1 select-all break-all text-[clamp(1.35rem,4vw,2rem)] font-semibold tracking-[-0.02em]">{profile.email}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CopyEmail />
            <a href={`mailto:${profile.email}?subject=${subject}`} className="btn btn-primary">
              Write email
            </a>
          </div>
          <p className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px]">
            <a className="link-quiet" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span className="chev" aria-hidden>›</span>
            </a>
            <a className="link-quiet" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              GitHub <span className="chev" aria-hidden>›</span>
            </a>
            <a className="link-quiet" href={pdf.href} download>
              Resume PDF <span className="chev" aria-hidden>›</span>
            </a>
            <Link className="link-quiet" href="/resume">
              Resume page <span className="chev" aria-hidden>›</span>
            </Link>
          </p>
        </div>
        <p className="reveal mt-6 text-center text-[14px] text-muted">{profile.locationShort}</p>
      </div>
    </section>
  );
}
