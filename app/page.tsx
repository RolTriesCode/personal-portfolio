import AboutSection from "@/components/aboutSection";
import HeroSection from "@/components/heroSection";
import NavBar from "@/components/navbar";
import AnimationSection from "@/components/animationSection";
import SkillSection from "@/components/skillSection";
import CertiSection from "@/components/certiSection";
import ProjectSection from "@/components/projectSection";
import ContactSection from "@/components/contactSection";
import Footer from "@/components/footerSection";
import ChatButton from "@/components/ChatButton";

export default function Home() {
  return (
    <main className="relative">
      <ChatButton />
      <NavBar />
      <HeroSection />
      <AboutSection />
      <AnimationSection />
      <SkillSection />
      <CertiSection />
      <ProjectSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
