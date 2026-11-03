export const fmtMonth = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { month: "short", year: "numeric" });
