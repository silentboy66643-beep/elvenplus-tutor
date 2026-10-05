import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Step 2: Academic icon appears (scale + fade) at 200ms
    const t1 = setTimeout(() => setStage(2), 200);

    // Step 3: Reveal "Eleven Plus Tutors" at 500ms
    const t2 = setTimeout(() => setStage(3), 500);

    // Step 4: Reveal "in Manchester" at 850ms
    const t3 = setTimeout(() => setStage(4), 850);

    // Step 5: Reveal subtitle at 1150ms
    const t4 = setTimeout(() => setStage(5), 1150);

    // Step 6: Expand thin line at 1400ms
    const t5 = setTimeout(() => setStage(6), 1400);

    // Step 7: Transition into hero at 1850ms
    const t6 = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 450); // allow fade out to finish
    }, 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 200);
  };

  const words = ["Eleven", "Plus", "Tutors"];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="opening-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070c1a] text-white px-6 overflow-hidden select-none"
        >
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,47,94,0.35)_0%,transparent_70%)] pointer-events-none" />

          {/* Academic Crest Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 relative flex items-center justify-center"
          >
            <div className="w-14 h-14 rounded-full border border-[#c5a880]/30 bg-[#0e172e] flex items-center justify-center shadow-lg shadow-[#050913]">
              <GraduationCap className="w-7 h-7 text-[#c5a880]" />
            </div>
            {/* Soft decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 border border-dashed border-[#c5a880]/20 rounded-full"
            />
          </motion.div>

          {/* Main Title: Word by Word */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2 overflow-hidden">
            {words.map((word, idx) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={
                  stage >= 3
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 30, filter: 'blur(6px)' }
                }
                transition={{
                  duration: 0.45,
                  delay: idx * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Delayed "in Manchester" */}
          <div className="overflow-hidden mb-5">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-lg sm:text-2xl font-serif italic text-[#c5a880] tracking-wide text-center"
            >
              in Manchester
            </motion.div>
          </div>

          {/* Expanding Thin Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={stage >= 6 ? { width: "160px", opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mb-5"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={stage >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-xs sm:text-sm text-slate-300 font-sans tracking-wide text-center max-w-md px-4"
          >
            Helping students prepare with confidence for the 11+ entrance exam.
          </motion.p>

          {/* Skip Button in corner */}
          <button
            onClick={handleSkip}
            className="absolute bottom-6 right-6 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded border border-slate-700/60 bg-slate-900/60 backdrop-blur transition-colors"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
