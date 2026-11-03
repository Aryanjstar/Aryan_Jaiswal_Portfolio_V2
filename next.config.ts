import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { execSync } from "node:child_process";

const sha = (() => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "";
  }
})();

const withAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: { BUILD_DATE: new Date().toISOString().slice(0, 10), BUILD_SHA: sha },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/experience", destination: "/#work", permanent: true },
      { source: "/music", destination: "/notesbyaryan", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/resume.pdf", destination: "/resume/Aryan-Jaiswal-Resume.pdf", permanent: true },
      { source: "/Aryan_Resume.pdf", destination: "/resume/Aryan-Jaiswal-Resume.pdf", permanent: true },
    ];
  },
};

export default withAnalyzer(nextConfig);
