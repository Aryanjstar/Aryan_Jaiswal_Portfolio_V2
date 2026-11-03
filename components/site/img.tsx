/**
 * Server-rendered <img> for assets that are already optimized at build time (WebP/JPEG at display size).
 * Keeps next/image's client runtime off the homepage bundle (D-27).
 */
export function Img({ priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { width: number; height: number; alt: string; priority?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : undefined} {...props} />;
}
