import Image from "next/image";
import { FaDownload } from "react-icons/fa6";
import Link from "next/link";
import {
	SiCplusplus,
	SiJavascript,
	SiTypescript,
	SiPython,
	SiHtml5,
	SiCss3,
	SiMysql,
	SiReact,
	SiNodedotjs,
	SiExpress,
	SiFlask,
	SiTailwindcss,
	SiAmazon as SiAmazonaws,
	SiGooglecloud,
	SiMongodb,
	SiTensorflow,
	SiPytorch,
	SiScikitlearn,
	SiPandas,
	SiNumpy,
	SiGit,
	SiGithub,
	SiVscodium as SiVisualstudiocode,
	SiDocker,
	SiLinux,
	SiPostman,
	SiFigma,
	SiOpenai,
	SiThreedotjs,
	SiNextdotjs,
	SiNetlify,
	SiRedis,
	SiKubernetes,
	SiJest,
	SiCypress,
} from "react-icons/si";
import {
	FaJava,
	FaMicrosoft,
	FaCog,
	FaLaptopCode,
	FaBrain,
	FaProjectDiagram,
	FaMobile,
	FaServer,
	FaCodeBranch,
	FaRobot,
	FaLink,
} from "react-icons/fa";

import { socialMedia } from "@/data";
import { MagicButton } from "@/components/ui/magic-button";

export const Resume = () => {
	const education = [
		{
			institution: "Indian Institute of Information Technology, Dharwad",
			degree: "Bachelor of Technology in Computer Science and Engineering",
			duration: "2022 - 2026",
			location: "Dharwad, Karnataka",
		},
	];

	const experience = [
		{
			company: "Exotel",
			position: "Tech Intern | Gen AI",
			duration: "Oct 2025 – Present",
			location: "Remote",
			responsibilities: [
				"Built full-stack Custom TestCase & Scenario Management using FastAPI, Redis (persistent storage) and React/TypeScript; implemented CRUD APIs, embedded scenarios, additions, KPI configs, UUID/timestamp, and Redis-backed job execution.",
				"Integrated system with test pipeline: WebSocket real-time updates, cron-driven post-call analysis, secure tunneling via Cloudflare/Ngrok, Redis orchestration, automated job orchestration pipelines, and test recording ingestion for verification.",
			],
		},
		{
			company: "Joveo",
			position: "AI/ML Intern | Supply Automation",
			duration: "Oct 2025",
			location: "Remote",
			responsibilities: [
				"Developed and deployed an RAG-based automation pipeline using n8n, Gemini embeddings, and PostgreSQL (pgvector); parsed email threads, extracted entities, and indexed 384-d vectors for contextual retrieval in AI-driven workflows.",
				"Integrated LLM summarization, WhatsApp and Telegram alerts, automated monitoring, and reports with insights.",
			],
		},
		{
			company: "InfoKalash",
			position: "UI/UX Developer Intern",
			duration: "Jan 2025",
			location: "Remote",
			responsibilities: [
				"Led usability redesign reducing navigation confusion by 40% through revamped Figma workflows, improved IA, component libraries, and developer handoffs; coordinated design docs and interactive prototypes for rapid implementation.",
				"Conducted research with 15+ users, synthesized feedback into A/B-testable prototypes that increased engagement by 30%.",
			],
		},
		{
			company: "Infosys Springboard",
			position: "AI/ML Intern | Plant Disease Classification",
			duration: "Mar 2024 – June 2024",
			location: "Remote",
			responsibilities: [
				"Built and productionized a CNN-based plant disease classifier with Python and Flask REST APIs; developed reproducible training pipelines on 60,000+ images, applied augmentations and class-weighting, achieving 90% accuracy and 92% precision.",
				"Optimized backend and deployment to improve reliability and latency—cut API time by 50% and load by 30%—via JWT auth, async queues, Redis caching, batched queries, Docker CI/CD, and k-fold validation for inference stability.",
			],
		},
	];

	const projects = [
		{
			title: "DevTinder",
			technologies: [
				{ name: "JavaScript", icon: <SiJavascript className="w-4 h-4" /> },
				{ name: "React.js", icon: <SiReact className="w-4 h-4" /> },
				{ name: "Node.js", icon: <SiNodedotjs className="w-4 h-4" /> },
				{ name: "Express.js", icon: <SiExpress className="w-4 h-4" /> },
				{ name: "MongoDB", icon: <SiMongodb className="w-4 h-4" /> },
			],
			links: {
				live: "https://black-cliff-0fbc18c0f.3.azurestaticapps.net/",
				github: "https://github.com/Aryanjstar/DevTinder",
			},
			description: [
				"Engineered a scalable MERN-based developer matching platform using vectorized skill embeddings with ANN search, optimized indexing and caching for low-latency queries, and built real-time chat using Socket.IO for seamless collaboration.",
				"Implemented secure JWT + Google OAuth authentication, integrated Razorpay webhooks, deployed backend on Azure via CI/CD using Docker, and crafted a mobile-first, component-driven responsive UI with Tailwind CSS for enhanced UX.",
			],
		},
		{
			title: "AURA – Agentic AI for Finance",
			technologies: [
				{ name: "Node.js", icon: <SiNodedotjs className="w-4 h-4" /> },
				{ name: "Python", icon: <SiPython className="w-4 h-4" /> },
				{ name: "React.js", icon: <SiReact className="w-4 h-4" /> },
				{ name: "GCP", icon: <SiGooglecloud className="w-4 h-4" /> },
			],
			links: {
				demo: "https://youtu.be/48CdosQA8H4",
				github: "https://github.com/Aryanjstar/AURA---THE-FINANCE-AI",
			},
			description: [
				"Constructed a scalable multi-agent AI system with five specialized agents (Strategist, Quant, Advisor, etc.) using the Google Gemini API to deliver personalized financial strategies in real-time.",
				"Engineered a microservices-based platform deployed on Google Cloud App Engine, integrating a secure Go-based MCP server for processing unstructured financial data.",
				"Built a real-time analytics dashboard with React.js and D3.js, integrating LLM-driven sentiment analysis to automate insights and reduce manual review time by 90%.",
			],
		},
		{
			title: "AI Career Navigator",
			technologies: [
				{ name: "Azure OpenAI", icon: <SiOpenai className="w-4 h-4" /> },
				{ name: "React.js", icon: <SiReact className="w-4 h-4" /> },
				{ name: "TypeScript", icon: <SiTypescript className="w-4 h-4" /> },
				{ name: "Flask", icon: <SiFlask className="w-4 h-4" /> },
				{ name: "Three.js", icon: <SiThreedotjs className="w-4 h-4" /> },
			],
			links: {
				live: "https://ai-career-navigator-backend.azurewebsites.net",
				github: "https://github.com/Aryanjstar/AI-Career-Navigator",
			},
			description: [
				"Designed and productionized a comprehensive AI career assistant using Azure OpenAI GPT-4.1 with RAG (chunking, embeddings, vector store) and dynamic interview generators; validated by 100+ users for resume feedback and gap analysis.",
				"Deployed and optimized microservices on Azure App Service with queue workers and Azure AI Search, ensuring 99% uptime while handling 500+ operations via batching and sharding; integrated A/B pipelines, reducing user prep time by 60%.",
			],
		},
	];

	const technicalSkills = {
		"CS Fundamentals & Languages": [
			{
				name: "Data Structures",
				icon: <FaProjectDiagram className="w-5 h-5" />,
			},
			{ name: "Algorithms", icon: <FaBrain className="w-5 h-5" /> },
			{ name: "OOP", icon: <FaLaptopCode className="w-5 h-5" /> },
			{ name: "Operating Systems", icon: <FaCog className="w-5 h-5" /> },
			{ name: "Java", icon: <FaJava className="w-5 h-5" /> },
			{ name: "Python", icon: <SiPython className="w-5 h-5" /> },
			{ name: "C++", icon: <SiCplusplus className="w-5 h-5" /> },
			{ name: "SQL", icon: <SiMysql className="w-5 h-5" /> },
		],
		Frontend: [
			{ name: "React", icon: <SiReact className="w-5 h-5" /> },
			{ name: "HTML", icon: <SiHtml5 className="w-5 h-5" /> },
			{ name: "CSS", icon: <SiCss3 className="w-5 h-5" /> },
			{ name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" /> },
			{ name: "JavaScript", icon: <SiJavascript className="w-5 h-5" /> },
			{ name: "TypeScript", icon: <SiTypescript className="w-5 h-5" /> },
			{ name: "Responsive Design", icon: <FaMobile className="w-5 h-5" /> },
		],
		"Backend & APIs": [
			{ name: "Node.js", icon: <SiNodedotjs className="w-5 h-5" /> },
			{ name: "Express", icon: <SiExpress className="w-5 h-5" /> },
			{ name: "Flask", icon: <SiFlask className="w-5 h-5" /> },
			{ name: "RESTful APIs", icon: <FaServer className="w-5 h-5" /> },
			{ name: "MongoDB", icon: <SiMongodb className="w-5 h-5" /> },
			{ name: "MySQL", icon: <SiMysql className="w-5 h-5" /> },
			{ name: "Redis", icon: <SiRedis className="w-5 h-5" /> },
		],
		"Cloud & DevOps": [
			{ name: "Azure", icon: <FaMicrosoft className="w-5 h-5" /> },
			{ name: "AWS", icon: <SiAmazonaws className="w-5 h-5" /> },
			{ name: "GCP", icon: <SiGooglecloud className="w-5 h-5" /> },
			{ name: "Docker", icon: <SiDocker className="w-5 h-5" /> },
			{ name: "Kubernetes", icon: <SiKubernetes className="w-5 h-5" /> },
			{ name: "CI/CD", icon: <FaCodeBranch className="w-5 h-5" /> },
			{ name: "Linux", icon: <SiLinux className="w-5 h-5" /> },
		],
		"Testing & Tools": [
			{ name: "Git", icon: <SiGit className="w-5 h-5" /> },
			{ name: "GitHub", icon: <SiGithub className="w-5 h-5" /> },
			{ name: "Postman", icon: <SiPostman className="w-5 h-5" /> },
			{ name: "Jest", icon: <SiJest className="w-5 h-5" /> },
			{ name: "Cypress", icon: <SiCypress className="w-5 h-5" /> },
		],
		"AI/ML & Libraries": [
			{ name: "LLM", icon: <SiOpenai className="w-5 h-5" /> },
			{ name: "TensorFlow", icon: <SiTensorflow className="w-5 h-5" /> },
			{ name: "PyTorch", icon: <SiPytorch className="w-5 h-5" /> },
			{ name: "scikit-learn", icon: <SiScikitlearn className="w-5 h-5" /> },
			{ name: "Pandas", icon: <SiPandas className="w-5 h-5" /> },
			{ name: "NumPy", icon: <SiNumpy className="w-5 h-5" /> },
			{ name: "Hugging Face", icon: <FaRobot className="w-5 h-5" /> },
			{ name: "LangChain", icon: <FaLink className="w-5 h-5" /> },
		],
	};

	const achievements = [
		"Spotlight Award Winner – Microsoft JS AI Build-a-thon: As a Troop Lead, I mentored 80+ developers and led the creation of AI Career Navigator to assist students in job and internship preparation.",
		"Finalist – Google Cloud Agentic AI Day Hackathon: Among top 3.5% (2,000/57,000+) for building AURA, a multi-agent financial platform using Gemini, Node.js, Go, and Fi's Model Context Protocol (MCP) server.",
		"Letter of Recommendation (Microsoft): Received LOR from Pablo Veramendi, Global Director, Audience Evangelism at Microsoft, recognizing contributions in event organization, workshop creation, community outreach, and mentoring.",
		"Finalist – Level Supermind Hackathon: Top 2% (500/25,000+) for BuzzHive, an AI-driven social media analytics platform.",
		"Gold-MSA, Founder & President – MSA Chapter, IIIT Dharwad: As a Gold Microsoft Student Ambassador, led the official community, managed a 60+ core team, and grew MSA Nexus to 350+ members for tech support and learning.",
		"Competitive Programming: GFG college rank 8; solved 400+ DSA problems with a 1-year streak on LeetCode and GFG.",
		"IIITians Network: Key contributor to India's largest IIIT students network (50k+ members); drove growth and engagement while continuing to support initiatives, share ideas, and strengthen collaboration across the community.",
	];

	return (
		<section id="resume" className="py-20">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-12">
					<h1 className="heading">
						My <span className="text-purple">Resume</span>
					</h1>

					<Link href="/Aryan_Resume.pdf" target="_blank" rel="noreferrer noopener">
						<MagicButton
							title="Resume"
							icon={<FaDownload />}
							position="right"
							asChild
						/>
					</Link>
				</div>

				<div className="space-y-12">
					{/* Personal Info */}
					<div className="text-center border-b border-white/[0.1] pb-8">
						<h2 className="text-4xl font-bold text-white mb-2">
							Aryan Jaiswal
						</h2>
						<p className="text-lg text-white-200 mb-4">
							Computer Science Student & Full Stack Developer
						</p>
						<div className="flex justify-center space-x-6 text-white-200 flex-wrap">
							<span>📧 aryanjstar3@gmail.com</span>
							<span>📍 Brijmanganj, Uttar Pradesh</span>
						</div>
						<div className="flex justify-center space-x-4 mt-4 flex-wrap">
							<Link
								href="https://linkedin.com/in/aryanjstar"
								target="_blank"
								rel="noreferrer noopener"
								className="text-purple hover:text-white-100 transition-colors"
							>
								LinkedIn
							</Link>
							<Link
								href="https://github.com/aryanjstar"
								target="_blank"
								rel="noreferrer noopener"
								className="text-purple hover:text-white-100 transition-colors"
							>
								GitHub
							</Link>
							<Link
								href="https://leetcode.com/aryanjstar"
								target="_blank"
								rel="noreferrer noopener"
								className="text-purple hover:text-white-100 transition-colors"
							>
								LeetCode
							</Link>
							<Link
								href="https://www.geeksforgeeks.org/user/aryanjstar/"
								target="_blank"
								rel="noreferrer noopener"
								className="text-purple hover:text-white-100 transition-colors"
							>
								GeeksforGeeks
							</Link>
						</div>
					</div>

					{/* Education */}
					<div>
						<h3 className="text-2xl font-bold text-purple mb-6">Education</h3>
						<div className="space-y-4">
							{education.map((edu, index) => (
								<div key={index} className="border-l-2 border-purple pl-6">
									<h4 className="text-xl font-semibold text-white">
										{edu.degree}
									</h4>
									<p className="text-white-200 mb-1">{edu.institution}</p>
									<div className="flex justify-between text-white-100 flex-wrap">
										<span>{edu.duration}</span>
										<span>{edu.location}</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Work Experience */}
					<div>
						<h3 className="text-2xl font-bold text-purple mb-6">Experience</h3>
						<div className="space-y-8">
							{experience.map((exp, index) => (
								<div key={index} className="border-l-2 border-purple pl-6">
									<div className="flex justify-between items-start mb-2 flex-wrap">
										<div>
											<h4 className="text-xl font-semibold text-white">
												{exp.position}
											</h4>
											<p className="text-white-200">{exp.company}</p>
										</div>
										<div className="text-right text-white-100">
											<p>{exp.duration}</p>
											<p>{exp.location}</p>
										</div>
									</div>
									<ul className="space-y-2 text-white-100">
										{exp.responsibilities.map((responsibility, idx) => (
											<li key={idx} className="flex items-start">
												<span className="text-purple mr-2 mt-1">•</span>
												<span className="leading-relaxed">
													{responsibility}
												</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* Projects */}
					<div>
						<h3 className="text-2xl font-bold text-purple mb-6">Projects</h3>
						<div className="space-y-8">
							{projects.map((project, index) => (
								<div key={index} className="border-l-2 border-purple pl-6">
									<div className="flex justify-between items-start mb-3 flex-wrap">
										<h4 className="text-xl font-semibold text-white">
											{project.title}
										</h4>
										<div className="flex space-x-4">
											{project.links.github && (
												<Link
													href={project.links.github}
													target="_blank"
													rel="noreferrer noopener"
													className="text-purple hover:text-white-100 transition-colors"
												>
													GitHub
												</Link>
											)}
											{project.links.demo && (
												<Link
													href={project.links.demo}
													target="_blank"
													rel="noreferrer noopener"
													className="text-purple hover:text-white-100 transition-colors"
												>
													Demo
												</Link>
											)}
											{project.links.live && (
												<Link
													href={project.links.live}
													target="_blank"
													rel="noreferrer noopener"
													className="text-purple hover:text-white-100 transition-colors"
												>
													Live
												</Link>
											)}
										</div>
									</div>
									<div className="flex flex-wrap gap-3 mb-4">
										{project.technologies.map((tech, idx) => (
											<div
												key={idx}
												className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10132e] to-[#1a1a3e] text-white-100 rounded-lg border border-white/[0.1] hover:border-purple/50 transition-all duration-300 hover:scale-105"
											>
												<span className="text-purple">{tech.icon}</span>
												<span className="text-sm font-medium">{tech.name}</span>
											</div>
										))}
									</div>
									<ul className="space-y-2 text-white-100">
										{project.description.map((desc, idx) => (
											<li key={idx} className="flex items-start">
												<span className="text-purple mr-2 mt-1">•</span>
												<span className="leading-relaxed">{desc}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* Technical Skills */}
					<div>
						<h3 className="text-2xl font-bold text-purple mb-8">
							Technical Skills
						</h3>
						<div className="space-y-8">
							{Object.entries(technicalSkills).map(([category, skills]) => (
								<div key={category}>
									<h4 className="text-xl font-semibold text-white mb-4">
										{category}
									</h4>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
										{skills.map((skill) => (
											<div
												key={skill.name}
												className="flex flex-col items-center p-4 bg-gradient-to-br from-[#0f0f23] via-[#16213e] to-[#0f0f23] rounded-xl border border-white/[0.1] hover:border-purple/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple/20 group"
											>
												<div className="text-purple group-hover:text-white transition-colors duration-300 mb-2">
													{skill.icon}
												</div>
												<span className="text-sm text-white-100 text-center font-medium">
													{skill.name}
												</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Accomplishments & Leadership */}
					<div>
						<h3 className="text-2xl font-bold text-purple mb-6">
							Accomplishments & Leadership
						</h3>
						<div className="grid grid-cols-1 gap-4">
							{achievements.map((achievement, index) => (
								<div
									key={index}
									className="flex items-start p-4 bg-black-200 rounded-lg border border-white/[0.1]"
								>
									<span className="text-purple text-lg mr-3 flex-shrink-0 -mt-1">
										•
									</span>
									<span className="text-white-100 leading-relaxed">
										{achievement}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
