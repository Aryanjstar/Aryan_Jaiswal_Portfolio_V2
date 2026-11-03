import { z } from "zod";

export const ROLE_KEYS = ["all", "sde", "ai", "backend", "frontend", "fullstack", "devops", "fde"] as const;
export const RoleKey = z.enum(ROLE_KEYS);
export type RoleKey = z.infer<typeof RoleKey>;

/** Tracks a piece of evidence supports; `all` is implied for everything. */
export const Roles = z.array(RoleKey.exclude(["all"])).min(1);
export type Roles = z.infer<typeof Roles>;

export const LinkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
});
export type Link = z.infer<typeof LinkSchema>;

export const HighlightSchema = z.object({
  id: z.string(),
  big: z.string(),
  label: z.string(),
  scope: z.string().min(1),
  roles: z.array(RoleKey).min(1),
});
export type Highlight = z.infer<typeof HighlightSchema>;

export const BulletSchema = z.object({
  text: z.string(),
  /** Bold fragment inside `text`, rendered with emphasis. */
  strong: z.string().optional(),
  roles: Roles,
  caseStudy: z.string().optional(),
});
export type Bullet = z.infer<typeof BulletSchema>;

export const ProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  line: z.string(),
  badge: z.string().optional(),
  links: z.array(LinkSchema),
  roles: Roles,
  stack: z.array(z.string()).default([]),
  /** Year the repository was created (GitHub API, 3 Nov 2026). */
  started: z.number().int().optional(),
  shot: z.string().optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const SongSchema = z.object({
  code: z.string().regex(/^[A-Za-z0-9_-]+$/),
  url: z.string().regex(/^https:\/\/www\.instagram\.com\/reel\/[A-Za-z0-9_-]+\/$/, "canonical reel URL only"),
  title: z.string(),
  subtitle: z.string().optional(),
  /** Aryan's own poetic line shown above the title (usually Devanagari). */
  line: z.string().optional(),
  /** Short description in his words (emoji kept, D-29). */
  description: z.string().optional(),
  /** The "vibe" line shown with a sparkle. */
  vibe: z.string().optional(),
  artist: z.string().optional(),
  /** Optional audio file in /public/audio (Aryan's own recording) so the song can play on the page. */
  audio: z.string().regex(/^\/audio\/[\w.-]+\.(mp3|m4a|aac|mp4|ogg|wav)$/).optional(),
  lang: z.enum(["hi", "en"]),
  place: z.string().optional(),
  // A live performance; `place` (when known) is shown on the card.
  live: z.boolean().optional(),
  postedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  pinned: z.boolean(),
});
export type Song = z.infer<typeof SongSchema>;
export const MusicSchema = z.array(SongSchema);
