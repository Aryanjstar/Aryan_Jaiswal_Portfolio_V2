import { links } from "@/config";

export const navItems = [
	{ name: "Home", link: "#" },
	{ name: "Experience", link: "#experience" },
	{ name: "Projects", link: "#projects" },
	{ name: "Resume", link: "#resume" },
	{ name: "Music", link: "/notesbyaryan" },
	{ name: "Contact", link: "#contact" },
] as const;

export const gridItems = [
	{
		id: 1,
		title:
			"I believe in collaborative learning and effective team communication",
		description: "",
		className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
		imgClassName: "w-full h-full",
		titleClassName: "justify-end",
		img: "/b1.svg",
		spareImg: "",
	},
	{
		id: 2,
		title: "Eager to learn and contribute to innovative projects",
		description: "",
		className: "lg:col-span-2 md:col-span-3 md:row-span-2",
		imgClassName: "",
		titleClassName: "justify-start",
		img: "",
		spareImg: "",
	},
	{
		id: 3,
		title: "My tech stack",
		description: "I constantly try to improve",
		className: "lg:col-span-2 md:col-span-3 md:row-span-2",
		imgClassName: "",
		titleClassName: "justify-center",
		img: "",
		spareImg: "",
	},
	{
		id: 4,
		title: "Tech enthusiast with a passion for DSA, Dev & AI/ML.",
		description: "",
		className: "lg:col-span-2 md:col-span-3 md:row-span-1",
		imgClassName: "",
		titleClassName: "justify-start",
		img: "/grid.svg",
		spareImg: "/b4.svg",
	},

	{
		id: 5,
		title: "Currently deep diving into GenAI",
		description: "The Inside Scoop",
		className: "md:col-span-3 md:row-span-2",
		imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
		titleClassName: "justify-center md:justify-start lg:justify-center",
		img: "/b5.svg",
		spareImg: "/grid.svg",
	},
	{
		id: 6,
		title: "Ready to bring fresh ideas to your team?",
		description: "",
		className: "lg:col-span-2 md:col-span-3 md:row-span-1",
		imgClassName: "",
		titleClassName: "justify-center md:max-w-full max-w-60 text-center",
		img: "",
		spareImg: "",
	},
] as const;

export const projects = [
	{
		id: 1,
		title: "DevTinder",
		des: "A scalable MERN-based developer matching platform using vectorized skill embeddings with ANN search, optimized indexing and caching for low-latency queries, and built-in real-time chat using Socket.IO for seamless collaboration.",
		img: "/devtinder.svg",
		iconLists: ["/re.svg", "/next.svg", "/ts.svg", "/tail.svg", "/c++.svg"],
		sourceCode: "https://github.com/Aryanjstar/DevTinder",
		liveLink: "https://black-cliff-0fbc18c0f.3.azurestaticapps.net/",
	},
	{
		id: 2,
		title: "AURA – Agentic AI for Finance",
		des: "A scalable multi-agent AI system with five specialized agents (Strategist, Quant, Advisor, etc.) using Google Gemini API to deliver personalized financial strategies in real-time, built with microservices on Google Cloud Platform.",
		img: "/aura.svg",
		iconLists: ["/re.svg", "/py.png", "/next.svg", "/tail.svg", "/gc.png"],
		sourceCode: "https://github.com/Aryanjstar/AURA---THE-FINANCE-AI",
		demoLink: "https://youtu.be/48CdosQA8H4",
	},
	{
		id: 3,
		title: "AI Career Navigator",
		des: "An intelligent career guidance platform that analyzes resumes, detects skill gaps, generates personalized interview questions, and recommends tailored career roadmaps using Azure OpenAI GPT-4.1 and modern web technologies.",
		img: "/project1.svg",
		iconLists: ["/py.png", "/re.svg", "/ts.svg", "/three.svg", "/tail.svg"],
		sourceCode: "https://github.com/Aryanjstar/AI-Career-Navigator",
		liveLink: "https://ai-career-navigator-backend.azurewebsites.net",
	},
	{
		id: 4,
		title: "Portfolio Website",
		des: "A personal developer portfolio designed to showcase my journey, projects, skills, and technical growth. Built using React.js, Next.js, Three.js, and Tailwind CSS with smooth animations, bento-style layout, and dynamic 3D elements.",
		img: "/project5.svg",
		iconLists: ["/re.svg", "/next.svg", "/ts.svg", "/three.svg", "/tail.svg"],
		sourceCode: "https://github.com/Aryanjstar/Aryan_Jaiswal_Portfolio",
		liveLink: "https://aryanjaiswal.me",
	},
	{
		id: 5,
		title: "BuzzHive",
		des: "An AI-powered social media analytics platform designed to help content creators, marketers, and brands optimize their content strategy through actionable insights and real-time data using machine learning and NLP.",
		img: "/project3.svg",
		iconLists: ["/ts.svg", "/py.png", "/re.svg", "/tail.svg", "/vs.png"],
		sourceCode: "https://github.com/Aryanjstar/BuzzHive",
		demoLink: "https://youtu.be/GYnDcdoyIpQ",
	},
	{
		id: 6,
		title: "MSA IIIT Dharwad Website",
		des: "Official web platform for the MSA Chapter at IIIT Dharwad, providing students with access to curated learning resources, community updates, event announcements, and guidance related to the Microsoft Student Ambassador program.",
		img: "/project4.svg",
		iconLists: ["/re.svg", "/tail.svg", "/next.svg", "/ts.svg", "/vs.png"],
		sourceCode: "https://github.com/Aryanjstar/MLSA_IIITDWD",
		liveLink: "https://mlsaiiitdwd.netlify.app/",
	},
	{
		id: 7,
		title: "PowerUPResume (PUR)",
		des: "An intelligent resume analysis platform that leverages advanced NLP algorithms and industry-driven heuristics to evaluate resumes beyond basic formatting, providing detailed insights into job-role compatibility and technical keyword density.",
		img: "/project2.svg",
		iconLists: ["/py.png", "/next.svg", "/re.svg", "/tail.svg", "/vs.png"],
		sourceCode: "https://github.com/Aryanjstar/PowerUpResume",
	},
] as const;

export const testimonials = [
	{
		quote: `I had the honor of presenting my project as a Plant Disease Classification Intern at the inaugural Infosys Springboard Summit in Bangalore. Alongside my teammates, we showcased our work to industry leaders like Nandan Nilekani and Dr. Pramod Varma. Due to my outstanding performance during the internship, I was given a special invite and a felicitation. The summit was a fantastic opportunity to network and explore innovative tech solutions through insightful discussions, AI and robotics demos, and the "Infosys on Wheels" initiative.`,
		name: "Infosys Springboard",
		title: "Plant Disease Classification Project Intern",
		image: "/profile.svg",
	},

	{
		quote: `Successfully completed Levels 1 and 2 of the Microsoft AI Odyssey Challenge in January 2024, with certification in February. Among the 5% of participants to achieve this, I gained hands-on expertise in Azure Vision, AI Document Intelligence, and AI Language, mastering computer vision, NLP, and scalable AI solutions. As a Microsoft Student Ambassador, my insights on how generative AI drives my success were featured on the Azure Developer Community's YouTube channel.`,
		name: "Microsoft",
		title: "Microsoft AI Odyssey: My Journey to Success",
		image: "/mic.png",
		link: "https://learn.microsoft.com/en-in/users/aryanjstar/transcript/vmljqigg363ropm",
		featuredLink: "https://www.youtube.com/watch?v=wcXFhSJnDE4",
	},

	{
		quote: `GFG college rank 7; solved 400+ DSA problems with a 1-year streak on LeetCode and GFG. This consistent practice across multiple competitive programming platforms demonstrates strong problem-solving abilities and commitment to mastering data structures and algorithms.`,
		name: "Competitive Programming",
		title: "GFG Rank 7 | 400+ Problems | 1-Year Streak",
		image: "/code.svg",
	},

	{
		quote: `I completed the Google Cloud and Gen AI Study Jams, assisting 30+ participants in their learning journey. Through these programs, I gained hands-on experience in cloud technologies and generative AI, reaching the advanced milestone with 25+ Arcade points. This enriching journey expanded my skills and knowledge, culminating in exciting goodies as a reward.`,
		name: "Google",
		title: "Google Cloud & Gen AI Study Jams",
		image: "/google.png",
		link: "https://www.cloudskillsboost.google/public_profiles/7f6ae770-ec84-4186-b4f9-7da9c315d4fe",
	},

	{
		quote: `Our club is focused on Indian Knowledge Systems (IKS), I led initiatives to promote cultural heritage through lectures, discussions, celebrating festivals and workshops. I also designed the club's logo. Under the guidance of our faculty advisor, Dr. Chinmayananda, Prabodhini provides a platform for students to explore and appreciate India's intellectual legacy.`,
		name: "Prabodhini",
		title: "Co-founder & Former Vice President, Prabodhini Club, IIIT Dharwad",
		image: "/prab.jpeg",
	},

	{
		quote: `I've actively contributed to various impactful community service initiatives, including the Tree Plantation Drive and the 2,500 km World Record Human Chain across Karnataka, recognized by Guinness World Records. Through these and many more activities, I've gained valuable experience in teamwork, leadership, event coordination, and community engagement.`,
		name: "National Service Scheme (NSS)",
		title: "Student Volunteer",
		image: "/NSSf.svg",
	},

	{
		quote: `Clinched 3rd place at IIT Dharwad's Parsec 4.0 BitHunt 2.0! 🏆 After clearing Round 1 remotely from our hostel, we tackled diverse challenges—from DSA to reasoning and analytical skills—in Round 2 at the IIT Dharwad campus, securing victory with the help of Vinay Jain, Prathamesh Patil, and Pranay Chenamallah.`,
		name: "IIT Dharwad",
		title: "3rd Place at Parsec 4.0 BitHunt 2.0",
		image: "/iitdh.jpg",
	},

	{
		quote: `Completed the Machine Learning Specialization by DeepLearning.AI on Coursera, a 3-course series led by Andrew Ng. The series covered supervised learning, advanced algorithms, unsupervised learning, and recommender systems, using tools like Python, TensorFlow, and Scikit-Learn. This specialization significantly boosted my AI and Machine Learning skills, marking an important milestone in my tech journey.`,
		name: "Stanford University",
		title: "Machine Learning Specialization",
		image: "/stan.png",
	},

	{
		quote: `I am a Gold Microsoft Student Ambassador and the Founder and Former President of the MSA Chapter at IIIT Dharwad! As a Gold-MSA, I led the official Microsoft community on campus, managed a 60+ core team, and grew MSA Nexus to 350+ members for tech support and learning. Microsoft Student Ambassadors is a global community of student leaders passionate about technology. Through workshops, webinars, and collaborative projects, we empower fellow students with the skills and opportunities to grow in tech.`,
		name: "Microsoft Student Ambassadors",
		title: "Gold-MSA & Founder, Former President of MSA Chapter IIIT Dharwad",
		image: "/mic.png",
	},
	{
		quote: `Received a Letter of Recommendation from Pablo Veramendi, Global Director of Audience Evangelism at Microsoft, recognizing my contributions in event organization, workshop creation, community outreach, and mentoring. This acknowledgment reflects my commitment to building and nurturing the tech community at IIIT Dharwad and beyond.`,
		name: "Microsoft",
		title: "Letter of Recommendation from Pablo Veramendi (Microsoft)",
		image: "/mic.png",
	},
	{
		quote: `As a Troop Lead for the Microsoft JS AI Build-a-thon, I mentored 80+ developers and led the creation of AI Career Navigator to assist students in job and internship preparation. Our team won the Spotlight Award for innovation, impact, and technical excellence in building AI-powered solutions for career development.`,
		name: "Microsoft JS AI Build-a-thon",
		title: "Spotlight Award & Overall Winner & Troop Lead",
		image: "/mic.png",
	},
	{
		quote: `As Team Leader, led the team to become Finalists at the Google Cloud Agentic AI Day Hackathon, placing in the top 3.5% (among 2,000 out of 57,000+ participants) for building AURA, a multi-agent financial platform using Gemini, Node.js, Go, and Fi's Model Context Protocol (MCP) server. This recognition showcases expertise in agentic AI systems and cloud-native architectures.`,
		name: "Google Cloud",
		title: "Team Leader & Finalist – Google Cloud Agentic AI Day Hackathon",
		image: "/google.png",
	},
	{
		quote: `Key contributor to IIITians Network, India's largest IIIT students network with 50k+ members. Drove growth and engagement initiatives while continuing to support collaboration, share ideas, and strengthen connections across the community. This platform serves as a vital resource for students across all IIITs to connect, learn, and grow together.`,
		name: "IIITians Network",
		title: "Key Contributor & Community Builder",
		image: "/iiitians.jpg",
	},
] as const;

export const workExperience = [
	{
		id: 1,
		title: "Tech Intern | Gen AI | Exotel",
		desc: "Built a full-stack Custom TestCase & Scenario Management System using FastAPI, Redis, and React/TypeScript; implemented CRUD APIs, embedded scenarios, KPI configs, WebSocket real-time updates, and cron-driven post-call analysis with secure tunneling.",
		className: "md:col-span-2",
		thumbnail: "/exp3.svg",
	},
	{
		id: 2,
		title: "AI/ML Intern | Supply Automation | Joveo",
		desc: "Developed an end-to-end RAG-based automation pipeline using n8n, Gemini embeddings, and PostgreSQL (pgvector); parsed email threads, extracted entities, and integrated LLM summarization with WhatsApp and Telegram alerts.",
		className: "md:col-span-2",
		thumbnail: "/exp4.svg",
	},
	{
		id: 3,
		title: "UI/UX Developer Intern | InfoKalash",
		desc: "Redesigned user workflows for 3 client portals using Figma, reducing navigation confusion by 40%. Conducted user research to refine UX and ensured responsive design across 10+ devices.",
		className: "md:col-span-2",
		thumbnail: "/exp1.svg",
	},
	{
		id: 4,
		title: "AI/ML Intern | Plant Disease Classification | Infosys Springboard",
		desc: "Developed a Flask-based plant disease classification app with a CNN model achieving 90%+ accuracy on 60,000+ images. Optimized backend performance, cutting response time by 50% and improving load speed by 30%.",
		className: "md:col-span-2",
		thumbnail: "/exp2.svg",
	},
] as const;

export const socialMedia = [
	{
		name: "GitHub",
		img: "/git.svg",
		link: "https://github.com/Aryanjstar",
	},
	{
		name: "X",
		img: "/twit.svg",
		link: "https://x.com/Aryanjstar",
	},
	{
		name: "LinkedIn",
		img: "/link.svg",
		link: "https://www.linkedin.com/in/aryanjstar",
	},
	{
		name: "Instagram",
		img: "/insta.svg",
		link: "https://instagram.com/aryanjstar",
	},
	{
		name: "LeetCode",
		img: "/lc.png",
		link: "https://leetcode.com/aryanjstar",
	},
	{
		name: "GeeksforGeeks",
		img: "/gfg.png",
		link: "https://www.geeksforgeeks.org/user/aryanjstar/",
	},
] as const;

export const techStack = {
	stack1: ["React", "Node.js", "MongoDB"],
	stack2: ["Express", "Typescript", "Python"],
} as const;
