import { StaticImageData } from 'next/image';
import domManipulation from '@/public/certificates/A1AxE4rL.jpg';
import communication from '@/public/certificates/ILdGGLy4.jpg';
import jquery from '@/public/certificates/M0aBlKWD.jpg';
import webFundamentals from '@/public/certificates/_o_wNyxY.jpg';
import php from '@/public/certificates/iqtKA6zS.jpg';
import sql from '@/public/certificates/kOxJwzUk.jpg';
import java from '@/public/certificates/qwZNmqN3.jpg';

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
    title: "DOM Manipulation & Responsive Design",
    issuer: "ArmadaLogics",
    date: "Feb 2026",
    image: domManipulation,
    description: "Certificate of Completion awarded to Tabangen, Errol A. in recognition of successfully completing the DOM Manipulation & Responsive Design course.",
    skills: ["DOM", "Responsive Design", "HTML", "CSS"]
  },
  {
    id: "cert-2",
    title: "Communication",
    issuer: "ArmadaLogics",
    date: "Feb 2026",
    image: communication,
    description: "Certificate of Completion awarded to Tabangen, Errol A. in recognition of successfully completing the Communication course.",
    skills: ["Communication", "Professional Skills", "Collaboration"]
  },
  {
    id: "cert-3",
    title: "jQuery",
    issuer: "ArmadaLogics",
    date: "Feb 2026",
    image: jquery,
    description: "Certificate of Completion awarded to Tabangen, Errol A. in recognition of successfully completing the jQuery course.",
    skills: ["jQuery", "JavaScript", "DOM Manipulation", "AJAX"]
  },
  {
    id: "cert-4",
    title: "Web Fundamentals",
    issuer: "ArmadaLogics",
    date: "Feb 2026",
    image: webFundamentals,
    description: "Certificate of Completion awarded to Tabangen, Errol A. in recognition of successfully completing the Web Fundamentals course.",
    skills: ["HTML", "CSS", "JavaScript", "Web Development"]
  },
  {
    id: "cert-5",
    title: "PHP",
    issuer: "ArmadaLogics",
    date: "Feb 2026",
    image: php,
    description: "Certificate of Completion awarded to Tabangen, Errol A. in recognition of successfully completing the PHP course.",
    skills: ["PHP", "Server-Side", "MySQL", "Web Development"]
  },
  {
    id: "cert-6",
    title: "SQL",
    issuer: "ArmadaLogics",
    date: "Feb 2026",
    image: sql,
    description: "Certificate of Completion awarded to Tabangen, Errol A. in recognition of successfully completing the SQL course.",
    skills: ["SQL", "Database", "Queries", "Data Management"]
  },
  {
    id: "cert-7",
    title: "Java",
    issuer: "ArmadaLogics",
    date: "Feb 2026",
    image: java,
    description: "Certificate of Completion awarded to Tabangen, Errol A. in recognition of successfully completing the Java course.",
    skills: ["Java", "OOP", "Programming", "Software Development"]
  }
];
