import type { Link } from "./schema";

// Source: CONTENT.md §9.
export type Recognition = { kicker: string; title: string; detail?: string; links: Link[] };

export const recognition: Recognition[] = [
  {
    kicker: "Paper · COMSNETS 2026",
    title: "A Bid-Driven Optimization Framework for Real-Time Electric Vehicle Charging Scheduling",
    detail: "Main conference, pp. 60–66. With Pranay Ch., Vinay Jain, Malay Kumar.",
    links: [
      { label: "IEEE Xplore publication", href: "https://ieeexplore.ieee.org/document/11418229" },
    ],
  },
  {
    kicker: "Microsoft JS AI Build-a-thon",
    title: "Overall Winner + People's Choice",
    detail: "Troop Lead, mentoring 80+ developers.",
    links: [
      { label: "Program", href: "https://github.com/Azure-Samples/JS-AI-Build-a-thon/blob/main/README.md" },
      { label: "Badge", href: "https://www.credly.com/badges/78eec55a-554b-4706-8990-261e20b92fc9/linked_in_profile" },
    ],
  },
  {
    kicker: "Google Cloud Agentic AI Day",
    title: "Finalist, team lead",
    detail: "Top 3.5% of 57,000+ participants.",
    links: [{ label: "Proof", href: "https://drive.google.com/file/d/1pKSY7Rol-mGALg7XRb_uN9UDeuLEH3ZP/view?usp=sharing" }],
  },
  {
    kicker: "Microsoft",
    title: "Gold Microsoft Student Ambassador",
    detail: "Highest tier. Founded the IIIT Dharwad chapter, 500+ members. Also a Gold Startup Scout: referred 8 startups.",
    links: [{ label: "Microsoft feature", href: "https://techcommunity.microsoft.com/blog/studentdeveloperblog/meet-aryan-jaiswal/4538102" }],
  },
  {
    kicker: "Problem solving",
    title: "867 LeetCode problems (165 hard)",
    detail: "October 2026 snapshot. GeeksforGeeks institute rank 2 at IIIT Dharwad.",
    links: [
      { label: "LeetCode", href: "https://leetcode.com/u/aryanjstar/" },
      { label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/profile/aryanjstar" },
    ],
  },
  {
    kicker: "Certified",
    title: "Microsoft Azure AI Apps & Agents Developer Associate",
    detail: "Also GitHub Agentic AI Developer and Azure AI Fundamentals (AI-900).",
    links: [
      { label: "Azure AI Apps & Agents", href: "https://learn.microsoft.com/en-us/users/aryanjstar/credentials/certification/azure-ai-apps-and-agents-developer-associate?tab=credentials-tab" },
      { label: "GitHub Agentic AI", href: "https://learn.microsoft.com/api/credentials/share/en-us/Aryanjstar/D269D8B15535F5D1?sharingId=3E11B14851102961" },
      { label: "AI-900", href: "https://learn.microsoft.com/en-in/users/aryanjstar/credentials/e4c4296f82bdf8ad" },
    ],
  },
];

export const recognitionSmall: { text: string; href?: string }[] = [
  { text: "Co-organized GitHub Copilot Dev Days Bengaluru with TechNexus at Microsoft Reactor (~200 attendees)" },
  { text: "Exotel Swag Battle Winner 2025" },
  { text: "Talk: Future Voices: Generative AI Impact on Student Careers", href: "https://www.youtube.com/watch?v=wcXFhSJnDE4" },
  { text: "3rd place, Parsec 4.0 BitHunt 2.0, IIT Dharwad" },
];
