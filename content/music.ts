import raw from "./music.json";
import { MusicSchema, type Song } from "./schema";

// Source: CONTENT.md §10.1. Array order = Aryan's pinned display order. Validated at build time.
export const songs: Song[] = MusicSchema.parse(raw);

// Page copy is Aryan's own words from the previous site (3 Nov 2026 request).
export const musicCopy = {
  name: "Aryan Jaiswal",
  tagline: "MUSICIAN • SINGER • DREAMER",
  line: "i sing what i can't express",
  lineHi: "कुछ अल्फ़ाज़ जो ज़ुबान पे नहीं आते, वो गीतों से बयां हो जाते हैं ✨",
  follow: "Follow the journey",
  // Update when the song changes (Aryan).
  nowListening: { song: "Tum Ho Toh", from: "Saiyaara" },
  // The vinyl on /notesbyaryan plays this one (Aryan, 3 Nov 2026).
  featuredCode: "DenuMfvBtsX",
  dropsTitle: "♪ LATEST DROPS ♪",
  dropsSub: "From My Heart to Your Soul",
  closing: "In a world full of noise, music is my silence — a place where my soul breathes free.",
  homeTitle: "I also sing.",
  homeSub: "When the terminal goes quiet, the mic comes on. A few from notesbyaryan:",
};

export { fmtMonth } from "@/lib/format";
