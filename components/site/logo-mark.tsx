/** Brand mark: a terminal prompt (`>_`) on a blue squircle; the caret blinks. Same geometry as app/icon.svg. */
export function LogoMark({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="9" fill="#0071E3" />
      <path d="M9.5 10.5 15 16l-5.5 5.5" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="logo-chev" />
      <rect x="17" y="19.6" width="7.5" height="2.8" rx="1.4" fill="#fff" className="logo-caret" />
    </svg>
  );
}
