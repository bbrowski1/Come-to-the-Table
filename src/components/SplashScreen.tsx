import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  durationMs = 2200
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        onComplete();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  return (
    <div
      id="splash-screen"
      onClick={onComplete}
      className="fixed inset-0 z-50 bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#EBE3D5] flex flex-col items-center justify-between p-8 select-none cursor-pointer overflow-hidden"
    >
      {/* Top Territory Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E2D9]/80 border border-[#D9CFC4] text-[#5A524D] text-xs font-semibold tracking-wider uppercase shadow-xs"
      >
        <span className="w-2 h-2 rounded-full bg-[#D3202A] animate-pulse" />
        The Salvation Army • Central Division
      </motion.div>

      {/* Center Hero Badge (CometotheTable_512.png) */}
      <div className="flex flex-col items-center text-center my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-4 rounded-full bg-[#D3202A]/10 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* CometotheTable_512.png Badge */}
          <img
            id="splash-logo-image"
            src="/CometotheTable_512.png"
            alt="Come to the Table - The Salvation Army"
            className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-full shadow-2xl relative z-10 drop-shadow-lg"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-6"
        >
          <h1 className="text-2xl font-black text-[#201A18] tracking-tight">
            Come to the Table
          </h1>
          <p className="text-sm font-bold text-[#C1440E] uppercase tracking-wider mt-0.5">
            Leader Facilitation Guide
          </p>
          <p className="text-xs text-[#5A524D] mt-2 italic flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D3202A]" />
            "Encourage one another and build each other up" • 1 Thess 5:11
          </p>
        </motion.div>
      </div>

      {/* Bottom Loading Progress & Skip Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-xs flex flex-col items-center gap-3"
      >
        {/* Progress bar */}
        <div className="w-full bg-[#E0D7CB] h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D3202A] transition-all duration-75 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          id="splash-skip-button"
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="text-xs text-[#5A524D] hover:text-[#201A18] font-semibold flex items-center gap-1 py-1 px-3 rounded-full hover:bg-black/5 transition-colors"
        >
          <span>Tap anywhere to continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
};
