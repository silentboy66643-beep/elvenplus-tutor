import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, Landmark } from 'lucide-react';

export const ResultsSuccess: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Stronger Foundations',
      description: 'Build understanding across important maths and English skills.',
      detail:
        'Reinforce core mathematical calculations, vocabulary mastery, and analytical thinking so learning feels natural rather than memorised.',
    },
    {
      icon: Compass,
      title: 'Better Exam Technique',
      description: 'Develop approaches for working through questions more confidently.',
      detail:
        'Equip students with strategic reading, process of elimination, time division, and reliable cross-checking methods.',
    },
    {
      icon: ShieldCheck,
      title: 'Greater Confidence',
      description: 'Help students feel more comfortable with the demands of exam preparation.',
      detail:
        'Transform apprehension and test anxiety into steady self-assurance through regular encouragement and step-by-step progress.',
    },
    {
      icon: Landmark,
      title: 'Grammar School Preparation',
      description: 'Focused preparation for students working towards selective-school entrance.',
      detail:
        'Specialised orientation aligned with admissions standards for Altrincham, Trafford, and Greater Manchester selective schools.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#070c1a] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
            <span>Realistic Student Growth</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Lasting Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Preparation That Builds More Than Exam Skills
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-sans leading-relaxed">
            While grammar school entry is the target, our students leave with study habits, intellectual stamina, and self-belief that serve them throughout secondary school.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="p-7 rounded-2xl bg-[#0c1630] border border-slate-800 hover:border-slate-700 transition-all text-left flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0 mt-1">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-[#e4d4ba] mb-2 font-sans">
                    {item.description}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    {item.detail}
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
