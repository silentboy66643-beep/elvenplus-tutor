import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  BookOpen,
  Brain,
  FileSearch,
  Timer,
  FileCheck2,
  ChevronRight,
} from 'lucide-react';

interface SubjectGridProps {
  onSelectSubject: (name: string) => void;
}

export const SubjectGrid: React.FC<SubjectGridProps> = ({ onSelectSubject }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const subjects = [
    {
      name: 'Mathematics',
      icon: Calculator,
      short: 'Number sense, multi-step problem solving & geometry',
      expanded:
        'Focusing on speed, mental calculation shortcuts, fractions, algebra foundations, ratios, and word problem decomposition.',
      color: 'from-amber-500/20 to-transparent',
    },
    {
      name: 'English',
      icon: BookOpen,
      short: 'Literary analysis, nuanced grammar & punctuation',
      expanded:
        'Cultivating expansive vocabulary, advanced grammar rules, syntax structuring, and precise essay/long-answer clarity.',
      color: 'from-blue-500/20 to-transparent',
    },
    {
      name: 'Verbal Reasoning',
      icon: Brain,
      short: 'Logic puzzles, alphabet codes & pattern recognition',
      expanded:
        'Systematic techniques for 21 standard VR question types including synonyms, antonyms, compound words, and letter cipher codes.',
      color: 'from-purple-500/20 to-transparent',
    },
    {
      name: 'Comprehension',
      icon: FileSearch,
      short: 'Inference, authorial intent & complex texts',
      expanded:
        'Techniques for extracting deep meaning, figurative metaphor interpretations, and structuring full-mark analytical responses.',
      color: 'from-emerald-500/20 to-transparent',
    },
    {
      name: 'Exam Technique',
      icon: Timer,
      short: 'Pacing strategies, triage & answer checking',
      expanded:
        'Time allocation tactics, eliminating distractor options in multiple choice, and remaining composed under test pressure.',
      color: 'from-rose-500/20 to-transparent',
    },
    {
      name: 'Mock Exams',
      icon: FileCheck2,
      short: 'Realistic timed exam simulations with diagnostics',
      expanded:
        'Full test conditions, official format answer sheets, timed stamina, and exhaustive error-pattern analysis reports.',
      color: 'from-indigo-500/20 to-transparent',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#090f20] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
            <span>Specialist Disciplines</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Targeted Tuition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Specialised Subject Mastery
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-sans leading-relaxed">
            Hover over any discipline to explore our syllabus focus areas and specific skills developed during tutoring sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub, i) => {
            const Icon = sub.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={sub.name}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectSubject(sub.name)}
                className="group relative p-7 rounded-2xl bg-[#0c1630] border border-slate-800 hover:border-[#c5a880]/60 transition-all duration-300 text-left flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Background subtle gradient bloom on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${sub.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-[#c5a880] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-[#e4d4ba] transition-colors">
                    {sub.name}
                  </h3>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4">
                    {sub.short}
                  </p>

                  {/* Expanded description on hover */}
                  <div
                    className={`text-xs text-slate-400 font-sans transition-all duration-300 overflow-hidden ${
                      isHovered ? 'max-h-28 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="pt-2 border-t border-slate-800 leading-relaxed">
                      {sub.expanded}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-[#c5a880] font-medium">
                  <span>Enquire about {sub.name}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
