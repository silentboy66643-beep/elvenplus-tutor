import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, ChevronRight, Award, Compass, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/manchester_tutor_hero_1791204029303.jpg';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const headlineWords = "Give Your Child the Confidence to Succeed in the 11+.".split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center bg-[#070c1a] text-white overflow-hidden"
    >
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1a2f5e]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#c5a880]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle academic background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c5a880 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Location & Academic Focus Kicker (Anti-slop unboxed metadata) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#c5a880] font-medium tracking-wide mb-4">
              <span>Manchester · Swan Buildings</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>11+ Grammar School Entrance Specialists</span>
            </div>

            {/* Main Headline (Word-by-word reveal) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12] mb-5">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.26em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Supporting Headline */}
            <p className="text-lg sm:text-xl font-medium text-slate-200 leading-snug mb-3">
              Focused 11+ tutoring in Manchester designed to strengthen knowledge, exam technique and confidence.
            </p>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed max-w-2xl mb-8">
              Personalised preparation for children working towards the 11+ entrance exam, with focused support across the skills they need most.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#c5a880] hover:bg-[#d6bc96] text-[#070c1a] font-semibold text-sm sm:text-base shadow-lg shadow-[#c5a880]/20 hover:shadow-xl hover:shadow-[#c5a880]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>Book an Enquiry</span>
                <ChevronRight className="w-4 h-4 text-[#070c1a]" />
              </button>

              <a
                href="#preparation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-800/60 text-slate-200 text-sm sm:text-base font-medium transition-all"
              >
                <span>Explore 11+ Preparation</span>
              </a>
            </div>

            {/* Trust Indicators Underneath */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">4.8</span>
                <span className="text-slate-400">Google Rating</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <span className="font-semibold text-white">26</span>
                <span className="text-slate-400">Verified Reviews</span>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#c5a880]" />
                <span className="text-slate-200">11+ Exam Preparation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Visual with Floating Cards */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Image Frame with Double Border Accent */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-slate-700/80 bg-slate-900">
                <img
                  src={heroImg}
                  alt="A tutor helping a pupil prepare for academic 11+ exams in Manchester"
                  className="w-full h-[400px] sm:h-[460px] object-cover object-center"
                  loading="eager"
                />
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070c1a]/85 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-left">
                  <p className="text-xs font-serif font-medium text-slate-200">
                    Individual 1-to-1 and small-group 11+ sessions
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Swan Buildings, 20 Swan St, Manchester M4 5JW
                  </p>
                </div>
              </div>

              {/* Floating Card 1: 11+ Preparation (Top Left) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-[#0c1630]/95 backdrop-blur-md border border-[#c5a880]/30 rounded-xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-[#1a2f5e] flex items-center justify-center text-[#c5a880]">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">11+ Preparation</div>
                  <div className="text-[10px] text-slate-400">Maths · English · Reasoning</div>
                </div>
              </motion.div>

              {/* Floating Card 2: Mock Exams (Top Right) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="absolute -top-3 -right-3 sm:-right-5 bg-[#0c1630]/95 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">Mock Exams</div>
                  <div className="text-[10px] text-slate-400">Timed Realistic Practice</div>
                </div>
              </motion.div>

              {/* Floating Card 3: Maths & English (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute -bottom-5 -left-3 sm:-left-5 bg-[#0c1630]/95 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">Maths & English</div>
                  <div className="text-[10px] text-slate-400">Foundational Mastery</div>
                </div>
              </motion.div>

              {/* Floating Card 4: Exam Confidence (Bottom Right) */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                className="absolute -bottom-5 -right-3 sm:-right-5 bg-[#0c1630]/95 backdrop-blur-md border border-[#c5a880]/40 rounded-xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">Exam Confidence</div>
                  <div className="text-[10px] text-slate-400">Calm & Structured Approach</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
