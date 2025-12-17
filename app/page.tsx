import AboutSection from "@/components/aboutSection";
import HeroSection from "@/components/heroSection";
import NavBar from "@/components/navbar";
import AnimationSection from "@/components/animationSection";
import SkillSection from "@/components/skillSection";
import {
    ScrollVelocityContainer,
    ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, SplitText)



export default function Home() {
  return (
    <main className="h-[10000px] relative 2xl:w-[63%] m-auto">
        <NavBar />
        <HeroSection />
        <ScrollVelocityContainer className="text-4xl font-bold md:text-7xl -z-10">
            <ScrollVelocityRow baseVelocity={10} direction={1}>
            Full Stack Developer
            </ScrollVelocityRow>
            <ScrollVelocityRow baseVelocity={10} direction={-1}>
            UI/UX Designer
            </ScrollVelocityRow>
        </ScrollVelocityContainer>
        <AboutSection />
        <AnimationSection />
        <SkillSection />
    </main>
  );
}
