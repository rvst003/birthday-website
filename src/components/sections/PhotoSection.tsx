import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export default function PhotoSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouse = (e: React.MouseEvent) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(1000px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) translateY(${-y * 10}px)`
    );
  };

  const reset = () => setTransform("perspective(1000px) rotateY(0deg) rotateX(0deg)");

  return (
    <section id="photo" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <motion.div
        className="relative z-10 flex max-w-4xl flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
      >
        <motion.h2
          className="mb-10 text-3xl font-light text-pink-200 sm:text-4xl"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {birthdayConfig.photoTitle}
        </motion.h2>

        <motion.div
          ref={frameRef}
          onMouseMove={handleMouse}
          onMouseLeave={reset}
          style={{ transform }}
          className="relative"
          variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 1 } } }}
        >
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-pink-500/30 via-rose-400/20 to-purple-500/30 blur-2xl" />
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-pink-400/40 to-purple-400/40 blur-md" />

          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-md">
            <img
              src={birthdayConfig.photoImage}
              alt="Her"
              className="h-[380px] w-[300px] rounded-xl object-cover sm:h-[520px] sm:w-[400px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.pexels.com/photos/35151475/pexels-photo-35151475.png?auto=compress&cs=tinysrgb&h=650&w=940";
              }}
            />
          </div>

          <motion.div
            className="pointer-events-none absolute -right-4 -top-4 h-8 w-8 text-pink-300"
            animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7-4.5-9.5-9C1 9 3 5 6.5 5c2 0 3.5 1.5 5.5 3.5C14 6.5 15.5 5 17.5 5 21 5 23 9 21.5 12c-2.5 4.5-9.5 9-9.5 9z" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-10 max-w-xl text-center text-lg font-light leading-relaxed text-pink-100/70 sm:text-xl"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {birthdayConfig.photoMessage}
        </motion.p>
      </motion.div>
    </section>
  );
}
