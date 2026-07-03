import { StaticImageData } from 'next/image';
import ignis from '@/public/ignis.jpg';
import vigEnture from '@/public/vigEnture.jpg';
import mojita from '@/public/mojita.jpg';
import flameAble from '@/public/flameAble.png';
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: StaticImageData;
  description: string;
  skills: string[];
}
export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Advanced React & Next.js Frameworks",
    issuer: "Vercel Academy",
    date: "Jan 2025",
    image: ignis,
    description: "Deep dive into Next.js App Router, React Server Components, Server Actions, and rendering strategies.",
    skills: ["Next.js", "React 19", "RSC", "SSR"]
  },
  {
    id: "cert-2",
    title: "Full-Stack Web Development Boot Camp",
    issuer: "freeCodeCamp",
    date: "Nov 2024",
    image: vigEnture,
    description: "Full-stack software engineering certification covering database systems, modern Javascript, API development, and deployment.",
    skills: ["Node.js", "Express", "PostgreSQL", "JavaScript"]
  },
  {
    id: "cert-3",
    title: "Creative Web Animations & GSAP Mastery",
    issuer: "GreenSock Academy",
    date: "Aug 2024",
    image: mojita,
    description: "Advanced techniques for high-performance frontend animations, ScrollTrigger timelines, and SVG morphing.",
    skills: ["GSAP", "ScrollTrigger", "CSS Animation", "SVG"]
  },
  {
    id: "cert-4",
    title: "UI/UX Design Fundamentals & Prototyping",
    issuer: "Figma Academy",
    date: "Jun 2024",
    image: flameAble,
    description: "Mastery of visual hierarchy, typography, wireframing, color theory, and high-fidelity interactive prototyping in Figma.",
    skills: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"]
  },
  {
    id: "cert-5",
    title: "TypeScript Professional Developer Certificate",
    issuer: "Microsoft Learn",
    date: "May 2024",
    image: ignis,
    description: "Rigorous certification covering advanced types, generics, decorators, and system architecture in TS.",
    skills: ["TypeScript", "Design Patterns", "OOP", "Node.js"]
  },
  {
    id: "cert-6",
    title: "Cloud Application Developer Career Certificate",
    issuer: "IBM / Coursera",
    date: "Mar 2024",
    image: vigEnture,
    description: "Cloud-native architecture, microservices, containerization with Docker and Kubernetes, and CI/CD pipelines.",
    skills: ["Docker", "Kubernetes", "Cloud Native", "CI/CD"]
  },
  {
    id: "cert-7",
    title: "Database Systems & SQL Optimization",
    issuer: "PostgreSQL Association",
    date: "Jan 2024",
    image: mojita,
    description: "Relational database design, query optimization, indexing strategies, and database administration.",
    skills: ["PostgreSQL", "SQL", "Indexing", "Optimization"]
  },
  {
    id: "cert-8",
    title: "Mobile App Development with React Native",
    issuer: "Meta Professional Certifications",
    date: "Oct 2023",
    image: flameAble,
    description: "Cross-platform mobile application development, navigation, state management, and native device feature access.",
    skills: ["React Native", "Expo", "iOS & Android", "State Management"]
  }
];