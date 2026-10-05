import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What is the 11+ entrance exam?',
      answer:
        'The 11+ is a selective entrance examination taken by pupils in primary school (typically during early Year 6) seeking admission into grammar schools across Greater Manchester, such as the Trafford grammar schools, as well as selective independent secondary schools.',
    },
    {
      id: 'faq-2',
      question: 'What subjects can my child get help with?',
      answer:
        'We provide focused tutoring across Mathematics, English reading comprehension, vocabulary, grammar, Verbal Reasoning techniques, and general exam strategy. Each student’s timetable is targeted to their specific subject needs.',
    },
    {
      id: 'faq-3',
      question: 'Do you offer mock exams?',
      answer:
        'Yes. We offer realistic mock exam sessions designed to simulate actual test conditions. These help pupils get accustomed to timed pressure, experience structured answer sheets, and receive diagnostic feedback highlighting topic strengths and areas requiring further practice.',
    },
    {
      id: 'faq-4',
      question: 'Can tutoring help improve exam confidence?',
      answer:
        'Yes. Many pupils feel overwhelmed by the unfamiliar formats and strict timing of 11+ papers. By building step-by-step mastery, teaching structured question techniques, and offering patient encouragement, we help students walk into their exams feeling calm, composed, and confident.',
    },
    {
      id: 'faq-5',
      question: 'Can tutoring be personalised to my child’s needs?',
      answer:
        'Absolutely. We begin by understanding your child’s current level, target schools, and specific challenge areas. Lessons are individually adapted to close gaps—whether that is complex multi-step maths word problems, reading inference, or speed in verbal reasoning.',
    },
    {
      id: 'faq-6',
      question: 'Do you offer online tuition?',
      answer:
        'Yes. In addition to in-person sessions at our central Manchester location in Swan Buildings (M4 5JW), we provide interactive online tuition for families across Greater Manchester and beyond who prefer remote learning.',
    },
    {
      id: 'faq-7',
      question: 'How do I get started?',
      answer:
        'Getting started begins with an informal discussion. Fill out the enquiry form on this website or call our Manchester office on +44 7482 640654. We will discuss your child’s goals, current stage of preparation, and the best next steps.',
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#091024] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Answers for Manchester Parents
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-sans max-w-xl mx-auto">
            Clear information about our 11+ tutoring approach, subjects, and how to get started.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-xl bg-[#0c1630] border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-bold text-white pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 text-[#c5a880] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#142347]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 font-sans leading-relaxed border-t border-slate-800/80">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Note directing for custom queries */}
        <div className="mt-10 p-6 rounded-2xl bg-[#070c1a] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-serif font-bold text-white mb-1">
              Have a specific question about your child?
            </h4>
            <p className="text-xs text-slate-400 font-sans">
              Our Manchester tutoring team is always pleased to discuss individual requirements.
            </p>
          </div>
          <a
            href="tel:+447482640654"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-semibold text-white hover:border-[#c5a880] transition-colors shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Call +44 7482 640654</span>
          </a>
        </div>
      </div>
    </section>
  );
};
