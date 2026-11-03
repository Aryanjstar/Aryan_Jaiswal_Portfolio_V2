import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Full-bleed band alternating --bg / --bg-alt with a small eyebrow and a centered 600 headline (plan §5.2). */
export function Chapter({
  id,
  alt = false,
  eyebrow,
  title,
  lead,
  children,
  wide = false,
  className,
}: {
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={cn(alt ? "on-alt bg-bg-alt" : "bg-bg", "py-[clamp(72px,11vw,148px)]", className)}>
      <div className={cn("mx-auto px-5 md:px-8", wide ? "max-w-[1200px]" : "max-w-[980px]")}>
        {(eyebrow || title) && (
          <header className="reveal mx-auto mb-[clamp(36px,6vw,64px)] max-w-[820px] text-center">
            {eyebrow && <p className="text-[15px] font-semibold text-muted md:text-[17px]">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className="display mt-2 text-[clamp(2rem,4.5vw,3.25rem)]">
                {title}
              </h2>
            )}
            {lead && <p className="mx-auto mt-4 max-w-[640px] text-[17px] text-ink-2 md:text-[19px]">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
