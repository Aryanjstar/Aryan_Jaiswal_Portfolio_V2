// Source: docs/redesign/CONTENT.md §1, §11–13, reconciled with Aryan_Resume_Context/profile/CLAIMS.md (2 Nov 2026).

export const SITE_URL = "https://aryanjaiswal.in";

export const profile = {
  name: "Aryan Jaiswal",
  first: "Aryan",
  location: "Bangalore, India",
  locationShort: "Based in Bangalore · open to anywhere in India or remote",
  current: { title: "Forward Deployed Engineer", company: "Exotel", since: "Jun 2026" },
  eyebrow: "Forward Deployed Engineer at Exotel · CSE '26, IIIT Dharwad",
  // D-22: no list of tracks in public copy (Aryan, 3 Nov 2026).
  status: "Open to new roles · anywhere in India or remote",
  statusTip: "Replies within a day",
  headline: { before: "I build software that", accent: "ships", after: "to production." },
  identity:
    "Software engineer who ships to production: AI systems, backends, infrastructure and the products around them.",
  email: "aryanjstar3@gmail.com",
  education: {
    school: "IIIT Dharwad",
    degree: "B.Tech, Computer Science and Engineering",
    years: "2022–2026",
    cgpa: "7.76/10",
    note: "Graduated May 2026",
    // Aryan, 3 Nov 2026: founded the MSA chapter; inaugural alumni secretary who set up the alumni community.
    campus: ["Gold Microsoft Student Ambassador: founded the MSA chapter (500+ members)", "Inaugural Alumni Secretary: set up the college's alumni community"],
    coursework: ["Data Structures and Algorithms", "Operating Systems", "DBMS", "Computer Networks", "OOP"],
  },
  links: {
    github: "https://github.com/Aryanjstar",
    linkedin: "https://www.linkedin.com/in/aryanjstar",
    leetcode: "https://leetcode.com/u/aryanjstar/",
    gfg: "https://www.geeksforgeeks.org/profile/aryanjstar",
    x: "https://x.com/Aryanjstar",
    instagram: "https://instagram.com/aryanjstar",
    music: "https://www.instagram.com/notesbyaryan/",
  },
  greeting: {
    caption: "The languages my production voice agents speak.",
    words: [
      { text: "Hello", lang: "en" },
      { text: "नमस्ते", lang: "hi" },
      { text: "வணக்கம்", lang: "ta" },
      { text: "నమస్కారం", lang: "te" },
      { text: "नमस्कार", lang: "mr" },
    ],
  },
  contact: {
    heading: "Let's talk.",
    // D-22: the role list from CONTENT.md §11 is dropped from public copy.
    body: "Hiring for an engineering role? Write to me. I reply within a day.",
  },
  meta: {
    title: "Aryan Jaiswal: Software Engineer (AI · Backend · Full-stack · Cloud)",
    description:
      "Software engineer and Forward Deployed Engineer at Exotel. I ship AI systems, backend integrations, infrastructure and full-stack products to production.",
  },
} as const;

// D-36 (Aryan, 3 Nov 2026): the PDFs carry his phone number. Source: Aryan_Resume_Context/output/pdf (3 Nov build: Kinetic 150K).
// The HTML pages still don't print the number (crawlable).
export const resumePdf = {
  general: "/resume/Aryan-Jaiswal-Resume.pdf",
  sde: { href: "/resume/Aryan-Jaiswal-Resume-SDE.pdf", available: true },
  aiFde: { href: "/resume/Aryan-Jaiswal-Resume-AI-FDE.pdf", available: true },
};

export const BUILD_DATE = process.env.BUILD_DATE ?? "";
