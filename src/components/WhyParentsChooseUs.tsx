import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  SlidersHorizontal,
  Target,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export const WhyParentsChooseUs: React.FC = () => {
  const cards = [
    {
      title: 'Experienced Support',
      desc: 'Expertise in the specific formats, expectations, and challenges of the 11+ entrance exam landscape in Greater Manchester.',
      icon: GraduationCap,
    },
    {
      title: 'Personalised Learning',
      desc: 'No generic workbooks. Tuition adapts to where your child needs the most reinforcement, whether arithmetic word problems or reading inference.',
      icon: SlidersHorizontal,
    },
    {
      title: 'Exam-Focused Preparation',
      desc: 'Targeted practice with actual exam timing, realistic answer sheets, and proven problem-solving routines.',
      icon: Target,
    },
    {
      title: 'Confidence Building',
      desc: 'A warm, encouraging environment that reduces tension and equips students with steady composure when facing tricky questions.',
      icon: ShieldCheck,
    },
    {
      title: 'Focused Attention',
      desc: 'Dedicated 1-to-1 instruction ensuring every misunderstanding is unpacked and corrected before moving ahead.',
      icon: UserCheck,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#070c1a] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
            <span>Parent Decisions</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Why Manchester Families Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Why Parents Choose Eleven Plus Tutors
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-sans leading-relaxed">
            Parents trust our dedicated approach to guide their children through this pivotal academic milestone with clarity and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-7 rounded-2xl bg-[#0c1630] border border-slate-800 hover:border-slate-700 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
