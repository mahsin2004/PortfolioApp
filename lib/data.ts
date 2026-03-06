// ============================================
// PORTFOLIO DATA — Edit this file to customize
// ============================================

export const personalInfo = {
    name: "Md Mahsin Mia",
    shortName: "Mahsin",
    title: "Full-Stack Developer",
    roles: [
        "Full-Stack Developer",
        "Software Engineer",
        "Cloud Architect",
        "Mobile Developer",
        "Open Source Contributor",
    ],
    bio: "I'm a passionate full-stack developer with 5+ years of experience building scalable web applications, mobile apps, and cloud-native solutions. I love turning complex problems into elegant, user-friendly experiences.",
    location: "Dhaka, Bangladesh",
    email: "mdmahsinmia@gmail.com",
    phone: "+880 1741156408",
    availability: "Open to opportunities",
    github: "https://github.com/mahsin2004",
    linkedin: "https://linkedin.com/in/md-mahsin-mia",
    twitter: "https://twitter.com/mahsin2004",
    cvUrl: "/cv.pdf",
    stats: [
        { label: "Years Experience", value: "5+", icon: "Calendar" },
        { label: "Projects Completed", value: "80+", icon: "FolderOpen" },
        { label: "Happy Clients", value: "50+", icon: "Users" },
        { label: "Awards Won", value: "12", icon: "Trophy" },
    ],
};

export type Skill = {
    name: string;
    level: number;
    icon?: string;
};

export type SkillCategory = {
    id: string;
    label: string;
    icon: string;
    color: string;
    skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
    {
        id: "frontend",
        label: "Frontend",
        icon: "Monitor",
        color: "#7c3aed",
        skills: [
            { name: "React / Next.js", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Tailwind CSS", level: 92 },
            { name: "Vue.js", level: 75 },
            { name: "HTML5 / CSS3", level: 98 },
            { name: "Framer Motion", level: 82 },
        ],
    },
    {
        id: "backend",
        label: "Backend",
        icon: "Server",
        color: "#06b6d4",
        skills: [
            { name: "Node.js / Express", level: 92 },
            { name: "Python / FastAPI", level: 85 },
            { name: "PostgreSQL", level: 88 },
            { name: "MongoDB", level: 84 },
            { name: "GraphQL", level: 78 },
            { name: "Redis", level: 75 },
        ],
    },
    {
        id: "cloud",
        label: "Cloud & DevOps",
        icon: "Cloud",
        color: "#10b981",
        skills: [
            { name: "AWS (EC2, S3, Lambda)", level: 85 },
            { name: "Docker / Kubernetes", level: 82 },
            { name: "CI/CD (GitHub Actions)", level: 88 },
            { name: "Terraform", level: 72 },
            { name: "Nginx / Linux", level: 80 },
            { name: "Vercel / Railway", level: 90 },
        ],
    },
    {
        id: "mobile",
        label: "Mobile",
        icon: "Smartphone",
        color: "#f59e0b",
        skills: [
            { name: "React Native", level: 88 },
            { name: "Expo", level: 85 },
            { name: "iOS (Swift basics)", level: 55 },
            { name: "Android (Kotlin basics)", level: 50 },
            { name: "PWA", level: 90 },
        ],
    },
    {
        id: "design",
        label: "Design & Tools",
        icon: "Palette",
        color: "#ec4899",
        skills: [
            { name: "Figma", level: 88 },
            { name: "UI/UX Design", level: 82 },
            { name: "Adobe XD", level: 70 },
            { name: "Git / GitHub", level: 95 },
            { name: "Agile / Scrum", level: 85 },
        ],
    },
];

export type Experience = {
    type: "work" | "education";
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
    tech?: string[];
};

export const experiences: Experience[] = [
    {
        type: "work",
        company: "TechCorp Inc.",
        role: "Senior Full-Stack Developer",
        period: "2022 – Present",
        location: "San Francisco, CA",
        description: [
            "Led development of a microservices platform serving 2M+ users",
            "Architected React + Node.js applications with 99.9% uptime",
            "Mentored a team of 5 junior developers",
            "Reduced API response times by 60% via caching strategies",
        ],
        tech: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
    },
    {
        type: "work",
        company: "StartupXYZ",
        role: "Frontend Engineer",
        period: "2020 – 2022",
        location: "Remote",
        description: [
            "Built a real-time dashboard with React and WebSockets",
            "Implemented design system used by 3 product teams",
            "Boosted Lighthouse performance score from 45 to 96",
            "Drove app installs 40% via PWA implementation",
        ],
        tech: ["React", "TypeScript", "GraphQL", "Tailwind", "Firebase"],
    },
    {
        type: "work",
        company: "Freelance",
        role: "Full-Stack Developer",
        period: "2019 – 2020",
        location: "Remote",
        description: [
            "Delivered 15+ client projects across e-commerce, SaaS, and media",
            "Built custom CMS solutions with headless WordPress + Next.js",
            "Built REST APIs with Node.js/Express for mobile clients",
        ],
        tech: ["React", "Node.js", "MongoDB", "WordPress", "AWS S3"],
    },
    {
        type: "education",
        company: "University of California, Berkeley",
        role: "B.Sc. Computer Science",
        period: "2015 – 2019",
        location: "Berkeley, CA",
        description: [
            "Graduated with Honors (GPA: 3.8/4.0)",
            "Specialized in Human-Computer Interaction and Distributed Systems",
            "Led university robotics club for 2 years",
        ],
    },
];

export type Project = {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    category: "web" | "mobile" | "ai" | "oss" | "all";
    tech: string[];
    github?: string;
    live?: string;
    featured: boolean;
    emoji: string;
    gradient: string;
};

export const projects: Project[] = [
    {
        id: "saas-dashboard",
        title: "SaaS Analytics Dashboard",
        description: "Real-time analytics platform with multi-tenant architecture serving 2M+ monthly active users.",
        longDescription: "Built for an enterprise SaaS company, this dashboard handles real-time data from 50+ integrations, custom charts, role-based access control, and billing via Stripe.",
        category: "web",
        tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe"],
        github: "https://github.com/alexdev/saas-dash",
        live: "https://saas-dash.demo",
        featured: true,
        emoji: "📊",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
        id: "ecommerce-pwa",
        title: "E-Commerce PWA",
        description: "Offline-capable e-commerce store with AI-powered product recommendations.",
        longDescription: "A full-featured Progressive Web App with offline mode, push notifications, AI recommendations via TensorFlow.js, and instant payments via Apple/Google Pay.",
        category: "web",
        tech: ["Next.js", "TypeScript", "MongoDB", "TensorFlow.js", "Stripe"],
        github: "https://github.com/alexdev/ecom-pwa",
        live: "https://ecom-pwa.demo",
        featured: true,
        emoji: "🛒",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
        id: "fitness-app",
        title: "FitTrack Mobile App",
        description: "Cross-platform fitness tracking app with workout plans, nutrition logging, and progress analytics.",
        longDescription: "A React Native fitness app with AI-generated workout plans, nutrition tracking with barcode scanning, wearable sync (Apple Watch, Fitbit), and social features.",
        category: "mobile",
        tech: ["React Native", "Expo", "Node.js", "MongoDB", "ML Kit"],
        github: "https://github.com/alexdev/fittrack",
        live: "https://fittrack.demo",
        featured: true,
        emoji: "💪",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
        id: "ai-chat",
        title: "AI Writing Assistant",
        description: "GPT-4 powered writing assistant with real-time collaboration, document editor, and style customization.",
        longDescription: "An AI writing tool built on top of GPT-4 and LangChain, featuring real-time multi-user collaboration, custom writing style profiles, SEO optimization suggestions, and browser extension.",
        category: "ai",
        tech: ["Next.js", "Python", "FastAPI", "LangChain", "OpenAI", "PostgreSQL"],
        github: "https://github.com/alexdev/ai-writer",
        live: "https://ai-writer.demo",
        featured: true,
        emoji: "🤖",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
        id: "open-ui",
        title: "OpenUI Component Library",
        description: "Open-source React component library with 80+ accessible, themeable components. 2.3K GitHub stars.",
        longDescription: "A community-driven React component library built on Radix UI primitives with full accessibility (WCAG 2.1 AA), dark mode, and 15 built-in themes.",
        category: "oss",
        tech: ["React", "TypeScript", "Radix UI", "Storybook", "Vitest"],
        github: "https://github.com/alexdev/open-ui",
        live: "https://open-ui.docs",
        featured: false,
        emoji: "🧩",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
        id: "devops-tool",
        title: "CloudDeploy CLI",
        description: "Developer CLI tool for one-command multi-cloud deployments. 800+ npm weekly downloads.",
        longDescription: "A Node.js CLI that simplifies multi-cloud deployments to AWS, GCP, and Azure. Supports Docker, serverless functions, databases, and automatic SSL setup.",
        category: "oss",
        tech: ["Node.js", "TypeScript", "AWS SDK", "Terraform", "Docker"],
        github: "https://github.com/alexdev/cloud-deploy",
        featured: false,
        emoji: "☁️",
        gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    },
];

export type Achievement = {
    title: string;
    issuer: string;
    date: string;
    description: string;
    icon: string;
    type: "certification" | "award" | "community";
    color: string;
    badge?: string;
};

export const achievements: Achievement[] = [
    {
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2024",
        description: "Professional-level certification for designing scalable and fault-tolerant AWS architectures.",
        icon: "☁️",
        type: "certification",
        color: "#ff9900",
    },
    {
        title: "Google Developer Expert",
        issuer: "Google",
        date: "2023",
        description: "Recognized as a Google Developer Expert in Web Technologies for community contributions.",
        icon: "🏆",
        type: "award",
        color: "#4285f4",
    },
    {
        title: "Meta React Certification",
        issuer: "Meta / Coursera",
        date: "2023",
        description: "Advanced React development certification covering hooks, performance optimization, and testing.",
        icon: "⚛️",
        type: "certification",
        color: "#0866ff",
    },
    {
        title: "Hackathon Winner – MLH Hack",
        issuer: "Major League Hacking",
        date: "2022",
        description: "1st place in the AI track for building an accessibility-first screen reader powered by GPT-3.",
        icon: "🥇",
        type: "award",
        color: "#f59e0b",
    },
    {
        title: "Open Source Contributor 2023",
        issuer: "GitHub / Hacktoberfest",
        date: "2023",
        description: "Contributed 40+ pull requests to top open-source repositories during Hacktoberfest.",
        icon: "🌟",
        type: "community",
        color: "#7c3aed",
    },
    {
        title: "Kubernetes Administrator (CKA)",
        issuer: "CNCF",
        date: "2023",
        description: "Certified Kubernetes Administrator with expertise in cluster management and containerization.",
        icon: "⎈",
        type: "certification",
        color: "#326ce5",
    },
];

export type Testimonial = {
    name: string;
    role: string;
    company: string;
    text: string;
    avatar: string;
};

export const testimonials: Testimonial[] = [
    {
        name: "Sarah Johnson",
        role: "CTO",
        company: "TechCorp Inc.",
        avatar: "SJ",
        text: "Alex is one of the most talented developers I've worked with. They delivered our analytics platform ahead of schedule and the code quality was exceptional. The architecture decisions they made have scaled flawlessly to millions of users.",
    },
    {
        name: "Marcus Williams",
        role: "Product Lead",
        company: "StartupXYZ",
        avatar: "MW",
        text: "Alex transformed our frontend. They rebuilt our entire UI from scratch with incredible attention to detail — performance went from 45 to 96 on Lighthouse. The team absolutely loves the new design system they created.",
    },
    {
        name: "Emily Chen",
        role: "Founder & CEO",
        company: "FitTrack",
        avatar: "EC",
        text: "Working with Alex on our mobile app was a fantastic experience. They understood our vision immediately and delivered a polished React Native app with features we didn't even know we needed. Highly recommended!",
    },
    {
        name: "David Osei",
        role: "Engineering Manager",
        company: "CloudBase",
        avatar: "DO",
        text: "Alex's work on our cloud infrastructure saved us $30K/month in AWS costs. Their deep knowledge of DevOps combined with strong coding skills is rare. They're also a fantastic mentor to junior developers.",
    },
];
