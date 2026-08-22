import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

interface MusicControlProps {
  startPlaying: boolean;
}

export default function MusicControl({ startPlaying }: MusicControlProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/romantic-song.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    setReady(true);
    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!startPlaying || !audioRef.current) return;
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
  }, [startPlaying]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      onClick={toggle}
      disabled={!ready}
      className="fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-pink-200 backdrop-blur-xl transition-all hover:scale-110 hover:border-pink-300/40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.span
            key="on"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex items-center justify-center"
          >
            <Music className="h-5 w-5" />
            <motion.span
              className="absolute inset-0 rounded-full border border-pink-400/50"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.span>
        ) : (
          <motion.span key="off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VolumeX className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
