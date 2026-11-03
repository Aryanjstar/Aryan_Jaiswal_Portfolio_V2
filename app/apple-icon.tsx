import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0071E3" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="M9.5 10.5 15 16l-5.5 5.5" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="17" y="19.6" width="7.5" height="2.8" rx="1.4" fill="#fff" />
        </svg>
      </div>
    ),
    size,
  );
}
