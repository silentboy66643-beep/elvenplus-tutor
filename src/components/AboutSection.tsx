import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MapPin, Sparkles, GraduationCap } from 'lucide-react';
import aboutImg from '../assets/images/tutor_confidence_about_1791204047804.jpg';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: 'Personalised Support',
      desc: "Every lesson is tailored to your child's specific baseline, addressing individual knowledge gaps rather than applying a one-size-fits-all syllabus.",
    },
    {
      title: 'Exam-Focused Learning',
      desc: 'Mastery of question types, mark schemes, speed strategies, and test layouts common across Greater Manchester grammar school assessments.',
    },
    {
      title: 'Confidence Building',
      desc: 'Nurturing a growth mindset so students tackle challenging questions with curiosity, resilience, and calm exam composure.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#070c1a] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Location Badge */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
              <img
                src={aboutImg}
                alt="Supportive 11+ tutor in Manchester guiding student with learning workbook"
                className="w-full h-[420px] sm:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070c1a]/80 via-transparent to-transparent" />

              {/* Location Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#091124]/90 backdrop-blur-md border border-slate-700/80 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">
                    First Floor, Swan Buildings
                  </div>
                  <div className="text-[11px] text-slate-300">
                    20 Swan St, Manchester M4 5JW · In-person & Online
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Crest badge */}
            <div className="hidden sm:flex absolute -top-5 -right-5 w-16 h-16 rounded-2xl bg-[#0e1933] border border-[#c5a880]/30 items-center justify-center text-[#c5a880] shadow-xl">
              <GraduationCap className="w-8 h-8" />
            </div>
          </div>

          {/* Right Column: Editorial Copy & 3 Highlights */}
          <div className="lg:col-span-7 flex flex-col text-left order-1 lg:order-2">
            <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
              <span>About Eleven Plus Tutors</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Manchester Specialists</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
              Focused Preparation. Individual Support.
            </h2>

            <div className="space-y-4 text-slate-300 text-base sm:text-lg font-sans leading-relaxed mb-8">
              <p>
                Preparing for the 11+ is about more than learning facts. Students need to build strong foundations, develop exam technique and become confident in applying what they know under pressure.
              </p>
              <p>
                Eleven Plus Tutors in Manchester provides focused tutoring designed around the individual student's needs and preparation goals.
              </p>
            </div>

            {/* 3 Highlight Points */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-900/60 transition-colors"
                >
                  <div className="mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#c5a880]" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-white mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-400 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
