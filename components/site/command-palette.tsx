"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { caseStudies } from "@/content/caseStudies";
import { profile, resumePdf } from "@/content/profile";
import { caseStudyProjects, moreProjects } from "@/content/projects";
import { toast } from "@/lib/toast";

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };

/** Subsequence fuzzy match; lower score = better. */
function score(q: string, text: string) {
  if (!q) return 0;
  const t = text.toLowerCase();
  let ti = 0;
  let gaps = 0;
  for (const ch of q.toLowerCase()) {
    const at = t.indexOf(ch, ti);
    if (at < 0) return -1;
    gaps += at - ti;
    ti = at + 1;
  }
  return gaps + (t.startsWith(q.toLowerCase()) ? 0 : 5);
}

/** F2 ⌘K palette. Loaded on demand (not in first-load JS). <dialog> gives the focus trap + Esc; focus is restored on close. */
export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const dialog = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    const ext = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      { id: "work", group: "Go to", label: "Experience", hint: "/#work", run: go("/#work") },
      { id: "selected", group: "Go to", label: "Selected work", hint: "/#selected-work", run: go("/#selected-work") },
      { id: "specs", group: "Go to", label: "Tech specs", hint: "/#specs", run: go("/#specs") },
      { id: "contact", group: "Go to", label: "Contact", hint: "/#contact", run: go("/#contact") },
      { id: "projects", group: "Go to", label: "All projects", hint: "/projects", run: go("/projects") },
      { id: "resume", group: "Go to", label: "Resume page", hint: "/resume", run: go("/resume") },
      { id: "music", group: "Go to", label: "notesbyaryan (music)", hint: "/notesbyaryan", run: go("/notesbyaryan") },
      { id: "now", group: "Go to", label: "Now", hint: "/now", run: go("/now") },
      { id: "colophon", group: "Go to", label: "Colophon (how this site is built)", hint: "/colophon", run: go("/colophon") },
      ...caseStudies.map((c) => ({ id: `cs-${c.slug}`, group: "Case studies", label: c.title, hint: c.kicker, run: go(`/work/${c.slug}`) })),
      ...[...caseStudyProjects, ...moreProjects].map((p) => ({ id: `p-${p.slug}`, group: "Projects", label: p.name, hint: p.links[0].label, run: ext(p.links[0].href) })),
      {
        id: "copy",
        group: "Actions",
        label: "Copy email",
        hint: profile.email,
        run: () => navigator.clipboard.writeText(profile.email).then(() => toast(`Copied ${profile.email}`)),
      },
      {
        id: "pdf",
        group: "Actions",
        label: "Download resume (PDF)",
        run: () => {
          const a = document.createElement("a");
          a.href = resumePdf.general;
          a.download = "Aryan-Jaiswal-Resume.pdf";
          a.click();
          toast("Resume downloading");
        },
      },
      { id: "t-light", group: "Actions", label: "Theme: Light", run: () => setTheme("light") },
      { id: "t-dark", group: "Actions", label: "Theme: Dark", run: () => setTheme("dark") },
      { id: "t-system", group: "Actions", label: "Theme: System", run: () => setTheme("system") },
      { id: "debug", group: "Actions", label: "Debug mode", hint: "type “ship”", run: () => document.documentElement.toggleAttribute("data-debug") },
      { id: "gh", group: "Links", label: "GitHub", hint: "github.com/Aryanjstar", run: ext(profile.links.github) },
      { id: "li", group: "Links", label: "LinkedIn", run: ext(profile.links.linkedin) },
      { id: "lc", group: "Links", label: "LeetCode", run: ext(profile.links.leetcode) },
      { id: "ig", group: "Links", label: "Instagram · @notesbyaryan", run: ext(profile.links.music) },
    ];
  }, [router, setTheme]);

  const results = useMemo(
    () =>
      items
        .map((it) => ({ it, s: Math.max(score(q, it.label), -1) === -1 ? score(q, `${it.group} ${it.hint ?? ""}`) : score(q, it.label) }))
        .filter((r) => r.s >= 0)
        .sort((a, b) => (q ? a.s - b.s : 0))
        .map((r) => r.it),
    [items, q],
  );

  const prev = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const d = dialog.current;
    if (!d || d.open) return;
    prev.current = document.activeElement as HTMLElement | null;
    d.showModal();
  }, []);

  function handleClose() {
    if (dialog.current?.open) return; // reopened before this (late) close event arrived
    onClose();
    const active = document.activeElement;
    if (!active || active === document.body || dialog.current?.contains(active)) prev.current?.focus();
  }

  function run(it: Item | undefined) {
    if (!it) return;
    dialog.current?.close();
    it.run();
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  }

  useEffect(() => {
    document.getElementById(`cmd-${results[active]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  return (
    <dialog ref={dialog} className="palette" aria-label="Command palette" onClose={handleClose} onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
      <div className="flex items-center gap-3 border-b border-hairline px-4">
        <span className="mono text-[13px] text-[var(--term-accent)]" aria-hidden>
          ❯
        </span>
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKey}
          placeholder="Type a command or search…"
          className="h-14 flex-1 bg-transparent text-[17px] text-ink outline-none placeholder:text-muted"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          aria-label="Search commands"
        />
        <kbd className="mono rounded-[6px] bg-bg-alt px-1.5 py-0.5 text-[11px] text-muted">esc</kbd>
      </div>
      <ul id="cmd-list" role="listbox" aria-label="Results" className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-6 text-center text-muted">No results for “{q}”</li>}
        {results.map((it, i) => {
          const header = i === 0 || results[i - 1].group !== it.group ? it.group : null;
          return (
            <li key={it.id} role="none">
              {header && <p className="px-3 pb-1 pt-3 text-[12px] font-semibold text-muted" aria-hidden>{header}</p>}
              <div
                id={`cmd-${it.id}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => run(it)}
                className="flex cursor-pointer items-center justify-between gap-4 rounded-[10px] px-3 py-2.5 text-[15px] aria-selected:bg-blue-soft"
              >
                <span className="truncate text-ink">{it.label}</span>
                {it.hint && <span className="mono truncate text-[12px] text-muted">{it.hint}</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mono flex gap-4 border-t border-hairline px-4 py-2 text-[11px] text-muted" aria-hidden>
        <span>↑↓ move</span>
        <span>↵ open</span>
        <span>esc close</span>
      </p>
    </dialog>
  );
}
