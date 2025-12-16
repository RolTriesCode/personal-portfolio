import NavBar from "@/components/navbar";
import HeroSection from "@/components/heroSection";
import { ScrollTrigger, SplitText } from 'gsap/all'
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText)





export default function Home() {
  return (
    <main className="h-[10000px] relative 2xl:w-[63%] m-auto">
      <NavBar />
      <HeroSection />
      <div className="h-screen border-2 border-red-500">

      </div>
    </main>
  );
}
