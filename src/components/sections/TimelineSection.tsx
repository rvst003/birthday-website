import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export default function TimelineSection() {
  const items = birthdayConfig.timeline;

  return (
    <section id="story" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <motion.h2
        className="mb-20 text-center text-3xl font-light text-pink-200 sm:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {birthdayConfig.timelineTitle}
      </motion.h2>

      <div className="relative w-full max-w-2xl">
        <div className="absolute left-4 top-0 h-full w-px sm:left-1/2 sm:-translate-x-1/2">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-pink-400/80 via-rose-400/60 to-purple-400/40"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>

        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className={`relative mb-16 flex w-full items-center ${
                isLeft ? "sm:justify-start" : "sm:justify-end"
              } justify-start pl-12 sm:pl-0`}
              initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className={`sm:w-[45%] ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-pink-300/30 hover:bg-pink-500/5">
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="mt-2 text-xl font-light text-pink-100">{item.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-pink-300/60">{item.date}</p>
                  <p className="mt-3 text-sm font-light leading-relaxed text-white/60">{item.description}</p>
                </div>
              </div>

              <motion.div
                className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 sm:left-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <div className="absolute inset-0 rounded-full bg-pink-400" />
                <div className="absolute -inset-2 rounded-full bg-pink-400/40 blur-md animate-pulse" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
