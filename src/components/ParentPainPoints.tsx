import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, AlertCircle, Clock, Zap, Target, HeartHandshake } from 'lucide-react';

export const ParentPainPoints: React.FC = () => {
  const painPoints = [
    {
      icon: HelpCircle,
      tag: 'Diagnostics',
      title: 'Not sure where your child is struggling?',
      description:
        'Targeted tutoring can help identify areas that need more attention and give students a clearer path forward without overwhelming them.',
    },
    {
      icon: AlertCircle,
      tag: 'Maths Foundations',
      title: 'Gaps in key mathematics concepts?',
      description:
        'Many bright students miss marks on multi-step word problems and speed. We systematically reinforce foundational arithmetic and analytical reasoning.',
    },
    {
      icon: Target,
      tag: 'Verbal Reasoning',
      title: 'Unfamiliar with verbal reasoning formats?',
      description:
        'Verbal reasoning isn’t taught systematically in primary school. We teach proven decoding techniques, vocabulary expansion, and pattern-recognition habits.',
    },
    {
      icon: Clock,
      tag: 'Time Management',
      title: 'Rushing or running out of time in papers?',
      description:
        'Timed practice and strategic pacing teach students how to allocate seconds per mark, skip and return to difficult questions, and stay collected.',
    },
    {
      icon: Zap,
      tag: 'Comprehension Depth',
      title: 'English inference and nuanced texts?',
      description:
        'Entrance exams test beyond surface reading. We guide students to identify authorial intent, vocabulary in context, and write clear, structured answers.',
    },
    {
      icon: HeartHandshake,
      tag: 'Exam Pressure',
      title: 'Anxiety and fear of the exam day?',
      description:
        'Confidence is half the battle. Regular, supportive 1-to-1 attention turns apprehension into quiet composure and self-assurance.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#090f20] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
            <span>Parent Concerns & Solutions</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Empathetic Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            The 11+ Can Feel Like a Lot. Your Child Doesn't Have to Prepare Alone.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-sans leading-relaxed">
            Preparing for grammar school entrance exams brings unique pressures for Manchester families. Here is how focused, individual support addresses the most common hurdles.
          </p>
        </div>

        {/* Pain Point Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group p-6 rounded-xl bg-[#0c1630] border border-slate-800 hover:border-slate-700 hover:bg-[#0e1a38] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#142347] border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 tracking-wide">
                      {point.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mb-2.5 leading-snug group-hover:text-[#e4d4ba] transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {point.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center text-xs text-[#c5a880] font-medium">
                  <span>How we help →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
