import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareText, Search, BookOpenCheck, Trophy } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Tell Us About Your Child',
      desc: "Share your child's current school year, target grammar schools, and initial observations around their maths, English, or reasoning strengths.",
      icon: MessageSquareText,
    },
    {
      num: '02',
      title: 'Identify Their Needs',
      desc: 'Through an initial diagnostic or targeted assessment, we pinpoint specific topic gaps, reading speed, and reasoning challenges.',
      icon: Search,
    },
    {
      num: '03',
      title: 'Focused Tutoring',
      desc: 'Structured 1-to-1 lessons at Swan Buildings or online develop foundational understanding, timing tactics, and consistent exam technique.',
      icon: BookOpenCheck,
    },
    {
      num: '04',
      title: 'Prepare With Confidence',
      desc: 'Regular practice and mock assessments ensure your child walks into their 11+ test feeling calm, familiar, and fully prepared.',
      icon: Trophy,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#091024] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
            <span>Our Approach</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Step-By-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            How It Works
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-sans leading-relaxed">
            A transparent, structured four-step process built around your child’s learning pace and target grammar school deadlines.
          </p>
        </div>

        {/* Desktop Horizontal Timeline & Mobile Vertical Timeline */}
        <div className="relative">
          {/* Animated Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[60px] right-[60px] h-[2px] bg-slate-800 z-0">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-[#c5a880] via-blue-400 to-[#c5a880]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col text-left group"
                >
                  {/* Step Badge / Icon Node */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#0e1a38] border-2 border-[#c5a880]/40 group-hover:border-[#c5a880] flex items-center justify-center text-[#c5a880] shadow-lg group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="font-serif text-3xl font-bold text-slate-500 group-hover:text-[#c5a880] transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mb-2.5 group-hover:text-[#e4d4ba] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
