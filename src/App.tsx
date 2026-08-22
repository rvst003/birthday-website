import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundScene from "@/components/three/BackgroundScene";
import IntroPage from "@/components/sections/IntroPage";
import HeroSection from "@/components/sections/HeroSection";
import PhotoSection from "@/components/sections/PhotoSection";
import MemoriesSection from "@/components/sections/MemoriesSection";
import TimelineSection from "@/components/sections/TimelineSection";
import MemorySpaceSection from "@/components/sections/MemorySpaceSection";
import ReasonsSection from "@/components/sections/ReasonsSection";
import LetterSection from "@/components/sections/LetterSection";
import CakeSection from "@/components/sections/CakeSection";
import FinalSection from "@/components/sections/FinalSection";
import Navigation from "@/components/Navigation";
import MusicControl from "@/components/MusicControl";

export default function App() {
  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToStory = () => {
    document.getElementById("photo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0410] text-pink-50">
      {!started && <IntroPage onOpen={() => setStarted(true)} />}

      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <BackgroundScene
              heartsCount={isMobile ? 6 : 14}
              particlesCount={isMobile ? 300 : 700}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <main className="relative z-10">
          <HeroSection onCta={scrollToStory} />
          <PhotoSection />
          <MemoriesSection />
          <TimelineSection />
          <MemorySpaceSection />
          <ReasonsSection />
          <LetterSection />
          <CakeSection />
          <FinalSection />
        </main>
      )}

      {started && <Navigation />}
      {started && <MusicControl startPlaying={true} />}
    </div>
  );
}
