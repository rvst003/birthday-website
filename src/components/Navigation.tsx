import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Camera, Mail, Cake } from "lucide-react";

const links = [
  { id: "hero", label: "Our Story", icon: Heart },
  { id: "memories", label: "Memories", icon: Camera },
  { id: "letter", label: "Letter", icon: Mail },
  { id: "cake", label: "Birthday", icon: Cake },
];

export default function Navigation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-30 h-1 w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <motion.nav
        className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-2 backdrop-blur-xl sm:gap-2">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="group flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-light text-pink-100/70 transition-all hover:bg-pink-500/20 hover:text-pink-100 sm:px-4 sm:text-sm"
            >
              <l.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{l.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
