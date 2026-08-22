import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";

interface CardProps {
  image: string;
  caption: string;
  index: number;
  onOpen: () => void;
}

function PolaroidCard({ image, caption, index, onOpen }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState("");

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt(`perspective(800px) rotateY(${x * 25}deg) rotateX(${-y * 25}deg) scale(1.05)`);
  };

  const reset = () => setTilt("perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)");

  const baseRot = (index % 2 === 0 ? -1 : 1) * (3 + (index % 3));

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 60, rotateZ: baseRot }}
      whileInView={{ opacity: 1, y: 0, rotateZ: baseRot }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        onClick={onOpen}
        style={{ transform: tilt }}
        className="group relative cursor-pointer rounded-sm bg-white/95 p-3 pb-12 shadow-2xl transition-all duration-300 hover:shadow-pink-500/40"
      >
        <div className="absolute -inset-1 rounded-sm bg-gradient-to-tr from-pink-400/0 to-purple-400/0 opacity-0 blur-md transition-opacity group-hover:from-pink-400/40 group-hover:to-purple-400/40 group-hover:opacity-100" />
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={caption}
            className="h-48 w-full object-cover grayscale-[0.1] transition-all duration-500 group-hover:grayscale-0 sm:h-56"
            onError={(e) => {
              const fallbacks = [
                "https://images.pexels.com/photos/1024963/pexels-photo-1024963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                "https://images.pexels.com/photos/12829876/pexels-photo-12829876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                "https://images.pexels.com/photos/20339544/pexels-photo-20339544.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                "https://images.pexels.com/photos/14839193/pexels-photo-14839193.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                "https://images.pexels.com/photos/29712333/pexels-photo-29712333.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                "https://images.pexels.com/photos/12071172/pexels-photo-12071172.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
              ];
              (e.target as HTMLImageElement).src = fallbacks[index % fallbacks.length];
            }}
          />
        </div>
        <p className="absolute bottom-3 left-0 right-0 text-center text-sm font-handwriting text-gray-700">
          {caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function MemoriesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="memories" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <motion.h2
        className="mb-4 text-center text-3xl font-light text-pink-200 sm:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        Our Memories 📸
      </motion.h2>
      <motion.p
        className="mb-16 text-center text-sm text-white/40"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Hover to feel them. Click to hold them close.
      </motion.p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {birthdayConfig.memories.map((m, i) => (
          <PolaroidCard
            key={i}
            image={m.image}
            caption={m.caption}
            index={i}
            onOpen={() => setActive(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative max-w-lg"
              initial={{ scale: 0.7, rotateY: -20 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-pink-500/30 to-purple-500/30 blur-2xl" />
              <div className="relative rounded-lg bg-white p-3 pb-14 shadow-2xl">
                <img
                  src={birthdayConfig.memories[active].image}
                  alt={birthdayConfig.memories[active].caption}
                  className="max-h-[60vh] w-full rounded-md object-cover"
                  onError={(e) => {
                    const fallbacks = [
                      "https://images.pexels.com/photos/1024963/pexels-photo-1024963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                      "https://images.pexels.com/photos/12829876/pexels-photo-12829876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                    ];
                    (e.target as HTMLImageElement).src = fallbacks[active % fallbacks.length];
                  }}
                />
                <p className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-lg text-gray-700">
                  {birthdayConfig.memories[active].caption}
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg transition-transform hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
