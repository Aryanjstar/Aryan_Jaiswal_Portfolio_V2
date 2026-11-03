import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/** F12. Off unless NEXT_PUBLIC_ANALYTICS=vercel, so other hosts don't request a missing script (D-20). */
export function Analytics() {
  if (process.env.NEXT_PUBLIC_ANALYTICS !== "vercel") return null;
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
