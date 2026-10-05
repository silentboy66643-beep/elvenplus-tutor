import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  BookText,
  Brain,
  Timer,
  FileCheck2,
  GraduationCap,
  ArrowRight,
  X,
  CheckCircle,
} from 'lucide-react';
import { ServiceCardItem } from '../types';

interface PreparationSectionProps {
  onSelectServiceForEnquiry: (serviceName: string) => void;
}

export const PreparationSection: React.FC<PreparationSectionProps> = ({
  onSelectServiceForEnquiry,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceCardItem | null>(null);

  const services: ServiceCardItem[] = [
    {
      id: 'maths',
      title: 'Maths Preparation',
      shortDesc:
        'Reinforce essential arithmetic, fractions, decimals, percentages, multi-step word problems, and data interpretation.',
      fullDesc:
        'Our mathematics programme solidifies primary curriculum fundamentals while systematically advancing into high-frequency 11+ styles. Students learn mental shortcuts, algebraic thinking, and methodical checks for complex multi-part problem solving.',
      skillsCovered: [
        'Multi-step word problems and decomposition',
        'Fractions, decimals, percentages and ratios',
        'Area, perimeter, angles and spatial reasoning',
        'Time, distance, speed and money calculations',
        'Quick mental arithmetic and accuracy checks',
      ],
      iconName: 'Calculator',
    },
    {
      id: 'english',
      title: 'English Preparation',
      shortDesc:
        'Deepen reading comprehension, literary inference, rich vocabulary acquisition, and rigorous grammar accuracy.',
      fullDesc:
        'We train students to decipher challenging classic and modern literary passages, identify figurative language, deduce subtle textual nuances, and formulate clear, well-supported written answers that secure top marks.',
      skillsCovered: [
        'Nuanced comprehension & deductive inference',
        'Advanced vocabulary development & context clues',
        'Grammar, punctuation and syntax mastery',
        'Poetry, fiction and non-fiction analysis',
        'Spelling rules and common pitfalls',
      ],
      iconName: 'BookText',
    },
    {
      id: 'verbal',
      title: 'Verbal Reasoning',
      shortDesc:
        'Master the key question types and systematic techniques needed for 11+ verbal reasoning sections.',
      fullDesc:
        'Verbal reasoning requires fast, agile logic that is rarely taught in ordinary school classes. We introduce children to pattern recognition, letter codes, word analogies, antonym/synonym pairs, and logical deduction grids.',
      skillsCovered: [
        'Letter and word codes',
        'Synonyms, antonyms and word associations',
        'Compound words and hidden words in sentences',
        'Number series and letter series logic',
        'Logical deduction under strict timed conditions',
      ],
      iconName: 'Brain',
    },
    {
      id: 'technique',
      title: 'Exam Technique',
      shortDesc:
        'Develop time management, question triage, systematic answer checking, and composed exam focus.',
      fullDesc:
        'Knowledge without exam strategy leads to unforced errors and missed questions. We teach students how to manage their minute-by-minute pace, recognise high-tariff questions, and avoid panic traps.',
      skillsCovered: [
        'Time allocation per section and question mark',
        'Strategic skipping and flag-for-review habits',
        'Elimination of multiple-choice distractors',
        'Minimising careless calculation & transfer slips',
        'Maintaining composure when questions appear novel',
      ],
      iconName: 'Timer',
    },
    {
      id: 'mocks',
      title: 'Mock Exams',
      shortDesc:
        'Timed practice papers replicating authentic exam conditions to build familiarity and stamina.',
      fullDesc:
        'Experiencing the real environment—strict timing, silence, structured answer sheets—removes the shock of the real exam day. Each mock produces detailed diagnostics identifying exactly where marks were lost.',
      skillsCovered: [
        'Full-length timed papers mirroring real tests',
        'Authentic answer sheet bubbling & format practice',
        'Detailed diagnostic breakdown per topic area',
        'Stamina training for multi-paper test mornings',
        'Post-mock review to target weak areas immediately',
      ],
      iconName: 'FileCheck2',
    },
    {
      id: 'grammar',
      title: 'Grammar School Preparation',
      shortDesc:
        'Focused preparation aligned with admission requirements across Trafford and Greater Manchester schools.',
      fullDesc:
        'Targeted support for schools including Altrincham Grammar School for Boys and Girls, Sale Grammar, Stretford Grammar, Urmston Grammar, Loreto Grammar, and Manchester independent schools.',
      skillsCovered: [
        'Familiarisation with Trafford consortium formats',
        'Standardised test format benchmarks',
        'CEM and GL Assessment style question nuances',
        'Tailored target school preparation pathways',
        'Advice on exam day readiness and morning routine',
      ],
      iconName: 'GraduationCap',
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-[#c5a880]" />;
      case 'BookText':
        return <BookText className="w-6 h-6 text-blue-400" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-purple-400" />;
      case 'Timer':
        return <Timer className="w-6 h-6 text-amber-400" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-6 h-6 text-emerald-400" />;
      default:
        return <GraduationCap className="w-6 h-6 text-[#c5a880]" />;
    }
  };

  return (
    <section id="preparation" className="py-20 lg:py-28 bg-[#091024] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
            <span>Core Tutoring Curriculum</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Comprehensive Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Everything Your Child Needs to Prepare for the 11+
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-sans leading-relaxed">
            Our modular curriculum combines foundational mastery with specific test-taking technique, ensuring students feel fully equipped and capable across every element of the examination.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative p-7 rounded-2xl bg-[#0c1630] border border-slate-800 hover:border-[#c5a880]/50 hover:bg-[#0f1b3c] transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/20"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-[#e4d4ba] transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-[#c5a880] group-hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <span className="text-[11px] text-slate-400">
                  Swan Buildings & Online
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Learn More Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#091124] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-left"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                    {getIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {selectedService.title}
                    </h3>
                    <p className="text-xs text-[#c5a880]">
                      11+ Entrance Exam Specialism · Manchester
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6 text-sm text-slate-300 leading-relaxed font-sans">
                <p>{selectedService.fullDesc}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200 mb-3">
                  Key Skills & Techniques Covered:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.skillsCovered.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800"
                    >
                      <CheckCircle className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Available in-person at Swan Buildings or via live online tuition.
                </span>

                <button
                  onClick={() => {
                    const name = selectedService.title;
                    setSelectedService(null);
                    onSelectServiceForEnquiry(name);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#c5a880] hover:bg-[#d6bc96] text-[#070c1a] font-semibold text-xs tracking-wide shadow-md transition-colors cursor-pointer"
                >
                  Enquire About {selectedService.title}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
