import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";

export default function ReasonsSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="reasons" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <motion.h2
        className="mb-4 text-center text-3xl font-light text-pink-200 sm:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {birthdayConfig.reasonsTitle}
      </motion.h2>
      <motion.p
        className="mb-14 text-center text-sm text-white/40"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Tap each one to see why.
      </motion.p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {birthdayConfig.reasons.map((r, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            className="group relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md transition-all hover:border-pink-300/40 hover:bg-pink-500/10"
            initial={{ opacity: 0, y: 40, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <div className="absolute -right-6 -top-6 text-5xl opacity-20 transition-all group-hover:scale-125 group-hover:opacity-40">
              {r.emoji}
            </div>
            <div className="relative flex h-full flex-col justify-between">
              <span className="text-2xl">{r.emoji}</span>
              <h3 className="text-lg font-light text-pink-100">{r.title}</h3>
            </div>
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-pink-500/0 to-purple-500/0 opacity-0 blur transition-opacity group-hover:from-pink-500/20 group-hover:to-purple-500/20 group-hover:opacity-100" />
          </motion.button>
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
              className="relative max-w-md"
              initial={{ scale: 0.5, rotateY: 30, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-pink-500/30 to-purple-500/30 blur-2xl" />
              <div className="relative rounded-2xl border border-pink-300/20 bg-gradient-to-b from-[#1a0a2e]/90 to-[#0d0518]/90 p-8 text-center">
                <span className="text-5xl">{birthdayConfig.reasons[active].emoji}</span>
                <h3 className="mt-4 text-2xl font-light text-pink-200">
                  {birthdayConfig.reasons[active].title}
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-white/70">
                  {birthdayConfig.reasons[active].message}
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
