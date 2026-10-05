import React from 'react';
import { motion } from 'motion/react';
import { Phone, ChevronRight, GraduationCap } from 'lucide-react';

interface ParentCTAProps {
  onOpenEnquiry: () => void;
}

export const ParentCTA: React.FC<ParentCTAProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="py-20 lg:py-24 bg-[#050914] text-white relative overflow-hidden border-y border-slate-800">
      {/* Moving geometric background accents */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-[#c5a880]/10 pointer-events-none"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full border border-blue-500/10 pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#c5a880]/30 text-xs font-medium text-[#c5a880] mb-6">
          <GraduationCap className="w-4 h-4" />
          <span>Swan Buildings, 20 Swan St, Manchester</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight mb-5">
          Is Your Child Preparing for the 11+?
        </h2>

        <p className="text-base sm:text-xl text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed mb-10">
          Start with a conversation about your child's current level, goals and preparation needs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#c5a880] hover:bg-[#d6bc96] text-[#070c1a] font-bold text-base shadow-xl shadow-[#c5a880]/20 hover:shadow-2xl hover:shadow-[#c5a880]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Book an Enquiry</span>
            <ChevronRight className="w-5 h-5 text-[#070c1a]" />
          </button>

          <a
            href="tel:+447482640654"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 text-white font-medium text-base transition-all"
          >
            <Phone className="w-4 h-4 text-[#c5a880]" />
            <span>Call +44 7482 640654</span>
          </a>
        </div>
      </div>
    </section>
  );
};
