import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Globe,
  Clock,
  Send,
  CheckCircle2,
  Mail,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject }) => {
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [childYear, setChildYear] = useState('Year 5');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    initialSubject ? [initialSubject] : ['Maths Preparation', 'English Preparation']
  );
  const [goal, setGoal] = useState('Grammar School Admission (Trafford / Manchester)');
  const [tutoringFormat, setTutoringFormat] = useState('In-Person at Swan Buildings');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subjectOptions = [
    'Maths Preparation',
    'English Preparation',
    'Verbal Reasoning',
    'Exam Technique',
    'Mock Exams',
    'Grammar School Preparation',
  ];

  const handleSubjectToggle = (subj: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName,
          email,
          phone,
          childYear,
          subjects: selectedSubjects,
          goal,
          tutoringFormat,
          message,
        }),
      });
    } catch (err) {
      console.error('Enquiry submit error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setMessage('');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#070c1a] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Location, Office Info, and Manchester Context */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
                <span>Start Your Child's Journey</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Manchester Office</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-5">
                Let's Talk About Your Child's 11+ Preparation.
              </h2>

              <p className="text-slate-300 text-base font-sans leading-relaxed mb-8">
                Every child begins with different strengths and priorities. Contact our team to discuss your goals, schedule an assessment, or ask any questions about the 11+ entrance process.
              </p>

              {/* Verified Contact Details Cards */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0c1630] border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-[#142347] flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-0.5">
                      Manchester Tuition Centre
                    </h4>
                    <p className="text-sm font-semibold text-white">
                      First Floor, Swan Buildings
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      20 Swan St, Manchester M4 5JW, United Kingdom
                    </p>
                  </div>
                </div>

                <a
                  href="tel:+447482640654"
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0c1630] border border-slate-800 hover:border-[#c5a880]/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#142347] flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-0.5">
                      Direct Telephone
                    </h4>
                    <p className="text-sm font-semibold text-white group-hover:text-[#c5a880] transition-colors">
                      +44 7482 640654
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Mon – Sat: Dedicated parent consultation line
                    </p>
                  </div>
                </a>

                <a
                  href="https://11plustutorsinmanchester.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0c1630] border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#142347] flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-0.5">
                      Official Website
                    </h4>
                    <p className="text-sm font-semibold text-slate-200">
                      11plustutorsinmanchester.co.uk
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Manchester's dedicated 11+ tutoring resource
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Central Manchester Location Snapshot */}
            <div className="p-4 rounded-xl bg-[#0a1226] border border-slate-800 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">Central Manchester Location</span>
                <span className="text-[11px] text-[#c5a880]">Swan Buildings · M4</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Conveniently situated in the Northern Quarter / Ancoats edge with easy transport links across Manchester, Trafford, Cheshire, and Salford.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-[#0c1630] border border-slate-800 p-6 sm:p-9 shadow-2xl text-left">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  {/* Animated Success Checkmark */}
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-6 shadow-xl shadow-emerald-950/50">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                    Enquiry Received
                  </h3>

                  <p className="text-base text-slate-300 max-w-md font-sans leading-relaxed mb-6">
                    Thanks! Your enquiry has been received. We'll be in touch shortly to discuss your child's 11+ preparation needs.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 mb-8 max-w-sm">
                    Prefer an immediate discussion? You are welcome to telephone our office on{' '}
                    <span className="text-white font-semibold">+44 7482 640654</span>.
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs font-semibold text-[#c5a880] hover:underline"
                  >
                    ← Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-800 pb-4 mb-2">
                    <h3 className="text-xl font-serif font-bold text-white">
                      Book a Free Consultation or Assessment
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      No commitment required. We'll review your goals and suggest the best pathway.
                    </p>
                  </div>

                  {/* Parent Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Parent Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Child's Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Contact Telephone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 7..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Child's Current School Year / Age *
                      </label>
                      <select
                        value={childYear}
                        onChange={(e) => setChildYear(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a880] focus:border-transparent"
                      >
                        <option value="Year 4 (Age 8-9)">Year 4 (Age 8–9, Early Foundations)</option>
                        <option value="Year 5 (Age 9-10)">Year 5 (Age 9–10, Key 11+ Year)</option>
                        <option value="Year 6 (Age 10-11)">Year 6 (Age 10–11, Final Preparation / Mocks)</option>
                        <option value="Year 3 (Age 7-8)">Year 3 (Age 7–8, Early Reading & Number)</option>
                      </select>
                    </div>
                  </div>

                  {/* Subjects They Need Help With */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Subjects & Skills Needed (Select all that apply):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {subjectOptions.map((subj) => {
                        const isSelected = selectedSubjects.includes(subj);
                        return (
                          <button
                            type="button"
                            key={subj}
                            onClick={() => handleSubjectToggle(subj)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors border ${
                              isSelected
                                ? 'bg-[#182952] border-[#c5a880] text-white shadow-sm'
                                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                            }`}
                          >
                            <span className="mr-1.5">{isSelected ? '✓' : '+'}</span>
                            {subj}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Main Preparation Goal & Preferred Tutoring Format */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Main Preparation Goal
                      </label>
                      <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                      >
                        <option value="Trafford Grammar Schools (Altrincham, Sale, etc.)">
                          Trafford Grammar Schools (Altrincham, Sale, etc.)
                        </option>
                        <option value="Manchester Selective / Independent Schools">
                          Manchester Selective / Independent Schools
                        </option>
                        <option value="Confidence Building & Gap Filling">
                          Confidence Building & Gap Filling
                        </option>
                        <option value="Mock Exam Practice & Timing">
                          Mock Exam Practice & Timing
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Preferred Tutoring Format
                      </label>
                      <select
                        value={tutoringFormat}
                        onChange={(e) => setTutoringFormat(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                      >
                        <option value="In-Person at Swan Buildings (Manchester)">
                          In-Person at Swan Buildings (Manchester)
                        </option>
                        <option value="Online Tuition">Interactive Online Tuition</option>
                        <option value="Either / Flexible">Either / Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Tell Us About Your Child's Needs (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. He is doing well in reading but struggles with multi-step maths problems under timed conditions..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#c5a880] hover:bg-[#d6bc96] active:scale-[0.99] text-[#070c1a] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#c5a880]/20 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <Send className="w-4 h-4 text-[#070c1a]" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    We treat all student information with confidentiality and care.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
