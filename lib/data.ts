
import vigEnture from '@/public/vigEnture.jpg'
import ignis from '@/public/ignis.jpg'
import mojita from '@/public/mojita.jpg'
import flameAble from '@/public/flameAble.png'
import nexum from '@/public/nexum.png'
import axiom from '@/public/axiom.png'

export const projects = [


    {
        src: nexum,
        title: "Nexum",
        description: "Nexum is the orchestration layer for autonomous AI agents — reasoning through ambiguity, coordinating across your stack, and shipping real outcomes without waiting on a human in the loop.",
        tech: ["Next.js", "GSAP", "Tailwind CSS", "Lenis"],
        year: "2026",
        link: "https://nexus-the-ai-saas.vercel.app//"
    },
    {
        src: axiom,
        title: "Axiom",
        description: "Axiom brings depth, light, and motion to every interface — a design system built for the next dimension of the web.",
        tech: ["Next.js", "GSAP", "Tailwind CSS", "Lenis"],
        year: "2026",
        link: "https://axiom-kappa-sage.vercel.app/"
    },
    {
        src: vigEnture,
        title: "VigEnture",
        description: "A comprehensive travel and adventure tracking platform designed for modern explorers. Features real-time tracking and community sharing.",
        tech: ["Next.js", "React", "Tailwind CSS", "Firebase"],
        year: "2025",
        link: "https://example.com/projects/vigenture"
    },
    {
        src: ignis,
        title: "Ignis",
        description: "An innovative web application focused on fire safety management and reporting. Utilizes advanced data visualization for hazard assessment.",
        tech: ["Next.js", "Tailwind CSS", "Redix", "CodeRabbit"],
        year: "2025",
        link: "https://example.com/projects/ignis"
    },
    {
        src: mojita,
        title: "Mojita",
        description: "A refreshing lifestyle application that offers a curated collection of drink recipes and social features for cocktail enthusiasts.",
        tech: ["Next.js", "Tailwind CSS", "GSAP"],
        year: "2025",
        link: "https://example.com/projects/mojita"
    },
    {
        src: flameAble,
        title: "FlameAble",
        description: "A creative digital canvas for flame-themed art and design, allowing users to create stunning visual effects with simple interactions.",
        tech: ["Canvas API", "JavaScript", "GSAP"],
        year: "2025",
        link: "https://example.com/projects/flameable"
    }
];

export const resumeData = {
    name: "ERROL TABANGEN",
    title: "Full Stack Developer & UI/UX Enthusiast",
    contact: {
        location: "Vigan City, Philippines",
        phone: "+63 9432751762",
        email: "erroltabangen.dev@gmail.com",
        linkedin: "linkedin.com/in/erroltabangen",
    },
    summary: "Full-Stack Web Developer and UI/UX Designer with experience delivering user-friendly web applications through academic and personal projects. Adept at problem-solving, independently turning ideas into functional solutions, collaborating in teams, and turning ideas into functional solutions. Committed to continuous learning and producing high-quality results.",
    education: [
        {
            school: "University of Northern Philippines",
            degree: "Bachelor of Science in Information Technology",
            location: "Vigan City, PH",
            period: "2021 - 2026"
        }
    ],
    academicExperience: [
        {
            role: "Capstone Project – Sole Developer & Designer",
            highlights: [
                "Independently designed the UI/UX and developed the entire system, including frontend, backend, and database integration.",
                "Completed all system requirements ahead of schedule and successfully defended the project."
            ]
        }
    ],
    skills: {
        languages: ["JavaScript", "TypeScript", "PHP", "C/C++ (Arduino)", "HTML", "CSS"],
        frameworks: ["Next.js", "React.js", "Git", "Github", "Tailwind CSS", "Bootstrap", "Figma", "Framer", "GSAP", "Node.js"],
        databases: ["PostgreSQL", "Sanity", "MongoDB", "Firebase", "MySQL", "SQLite", "Redis"]
    }
};
