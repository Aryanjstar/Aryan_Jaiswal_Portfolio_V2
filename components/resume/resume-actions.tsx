"use client";

import { useEffect, useState } from "react";

import { CopyEmail } from "@/components/site/copy-email";

/**
 * Resume header actions (F16): one Download PDF button and Copy email (Aryan, 3 Nov 2026).
 * Recruiters expect a single, clearly labelled PDF; visible "General / SDE / AI" variants read as
 * applying for everything. The tailored PDF is still served when the visit carries ?role=.
 * Printing the page still works with ⌘P (print stylesheet).
 */
export function ResumeActions({ general, byRole }: { general: string; byRole: Record<string, string> }) {
  const [href, setHref] = useState(general);
  useEffect(() => {
    const role = new URLSearchParams(window.location.search).get("role");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL once after hydration
    if (role && byRole[role]) setHref(byRole[role]);
  }, [byRole]);

  return (
    <>
      <a href={href} download aria-label="Download resume (PDF)" className="btn btn-primary !min-h-10 justify-center !text-[14px]">
        Download <span aria-hidden className="btn-arrow-down">↓</span>
      </a>
      <CopyEmail variant="ghost" className="!min-h-10 justify-center !text-[14px]" />
    </>
  );
}
