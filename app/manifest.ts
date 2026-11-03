import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aryan Jaiswal",
    short_name: "Aryan",
    description: "Software engineer. Forward Deployed Engineer at Exotel.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0071E3",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
