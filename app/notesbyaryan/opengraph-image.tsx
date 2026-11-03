import { ogImage, ogSize } from "@/lib/og";

export const alt = "notesbyaryan — covers by Aryan Jaiswal";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "notesbyaryan", title: "i sing what i can't express", path: "/notesbyaryan" });
}
