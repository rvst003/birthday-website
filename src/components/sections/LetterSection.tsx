import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export default function LetterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const full = birthdayConfig.letter;
    const interval = setInterval(() => {
      i++;
      setText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="letter" ref={ref} className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <motion.h2
        className="mb-12 text-center text-3xl font-light text-pink-200 sm:text-4xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {birthdayConfig.letterTitle}
      </motion.h2>

      <motion.div
        className="relative max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 blur-2xl" />
        <div className="relative rounded-2xl border border-pink-200/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-md sm:p-12">
          <div className="absolute left-6 top-6 h-12 w-1 rounded-full bg-pink-400/40" />
          <pre className="font-handwriting whitespace-pre-wrap text-base font-light leading-relaxed text-pink-50/90 sm:text-lg">
            {text}
            {!done && <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-pink-300 align-middle" />}
          </pre>
        </div>
        <motion.div
          className="mt-6 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-handwriting text-lg text-pink-300/80">— Always yours</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
