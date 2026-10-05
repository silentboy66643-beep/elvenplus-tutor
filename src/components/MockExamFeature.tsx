import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  ChevronRight,
  TrendingUp,
  Info,
} from 'lucide-react';

interface MockExamFeatureProps {
  onAskAboutMocks: () => void;
}

export const MockExamFeature: React.FC<MockExamFeatureProps> = ({ onAskAboutMocks }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'diagnostic'>('overview');

  const scorecardData = [
    {
      subject: 'Mathematics',
      status: 'Strong',
      statusType: 'success',
      icon: CheckCircle2,
      note: 'Arithmetic & multi-step word problems completed with high accuracy.',
      score: '88%',
    },
    {
      subject: 'English',
      status: 'Good',
      statusType: 'success',
      icon: CheckCircle2,
      note: 'Solid comprehension; recommendation to refine vocabulary deduction.',
      score: '81%',
    },
    {
      subject: 'Verbal Reasoning',
      status: 'More Practice',
      statusType: 'warning',
      icon: AlertCircle,
      note: 'Codes and antonym sections required targeted speed techniques.',
      score: '69%',
    },
    {
      subject: 'Time Management',
      status: 'Developing',
      statusType: 'neutral',
      icon: Clock,
      note: 'Pacing improved; 4 difficult questions skipped and reviewed successfully.',
      score: 'On Track',
    },
  ];

  return (
    <section id="mock-exams" className="py-20 lg:py-28 bg-[#070c1a] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
              <span>Exam Readiness</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Authentic Simulation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-5">
              Practise Under Real Exam Pressure
            </h2>

            <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed mb-6">
              Mock exams can help students become more familiar with exam conditions, manage their time and identify areas where further preparation may be useful.
            </p>

            <div className="space-y-3.5 mb-8 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-slate-800 text-[#c5a880] mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>
                  <strong>Stamina and Focus:</strong> Experiencing the full test morning builds endurance so pupils do not fade in second papers.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-slate-800 text-[#c5a880] mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <span>
                  <strong>Realistic Pacing:</strong> Students learn how 45-minute and 50-minute exam blocks actually feel without clock anxiety.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-slate-800 text-[#c5a880] mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span>
                  <strong>Clear Diagnostic Roadmap:</strong> Immediate, actionable breakdown highlighting exact topic strengths and areas to consolidate.
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={onAskAboutMocks}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#c5a880] hover:bg-[#d6bc96] text-[#070c1a] font-semibold text-sm sm:text-base shadow-lg shadow-[#c5a880]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>Ask About Mock Exams</span>
                <ChevronRight className="w-4 h-4 text-[#070c1a]" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Mock Assessment Scorecard UI */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-[#0b142b] border border-slate-700/80 p-6 sm:p-7 shadow-2xl">
              {/* Demo Disclaimer Watermark Banner */}
              <div className="mb-4 flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#142347] flex items-center justify-center text-[#c5a880]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">
                      11+ Mock Assessment
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Standard Diagnostic Report Structure
                    </p>
                  </div>
                </div>

                {/* Clear DEMO Visualization Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300">
                  <Info className="w-3.5 h-3.5" />
                  <span>DEMO VISUALIZATION</span>
                </div>
              </div>

              {/* Scorecard Items */}
              <div className="space-y-3.5 my-4">
                {scorecardData.map((row) => {
                  const Icon = row.icon;
                  const isSuccess = row.statusType === 'success';
                  const isWarning = row.statusType === 'warning';

                  return (
                    <div
                      key={row.subject}
                      className="p-3.5 rounded-xl bg-[#0e1936] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isSuccess
                              ? 'bg-emerald-950/80 text-emerald-400'
                              : isWarning
                              ? 'bg-amber-950/80 text-amber-400'
                              : 'bg-blue-950/80 text-blue-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-white">
                            {row.subject}
                          </div>
                          <div className="text-xs text-slate-400 max-w-sm">
                            {row.note}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                            isSuccess
                              ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-800/60'
                              : isWarning
                              ? 'text-amber-300 bg-amber-950/60 border border-amber-800/60'
                              : 'text-blue-300 bg-blue-950/60 border border-blue-800/60'
                          }`}
                        >
                          {isSuccess && '✓ '}
                          {isWarning && '→ '}
                          {row.status}
                        </span>
                        <span className="text-xs font-mono font-medium text-slate-400 min-w-[42px] text-right">
                          {row.score}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanatory Footer of Card */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 text-left flex items-start gap-2 text-xs text-slate-400">
                <Info className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <p>
                  Mock assessments reveal specific patterns of marks gained and lost, allowing us to build a precise revision plan before the official examination date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
