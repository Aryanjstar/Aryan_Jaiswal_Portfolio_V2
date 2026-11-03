import { ogImage, ogSize } from "@/lib/og";

export const alt = "Aryan Jaiswal, software engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Aryan Jaiswal · Forward Deployed Engineer at Exotel", title: "I build software that ships to production." });
}
