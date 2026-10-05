import React from 'react';
import { Star, GraduationCap } from 'lucide-react';

export const FeaturedSocialProof: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#060a17] text-white relative overflow-hidden border-y border-slate-800">
      {/* Subtle academic background watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <GraduationCap className="w-[600px] h-[600px] text-white" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Rating pill indicator */}
        <div className="inline-flex items-center gap-2 mb-8 text-xs font-medium text-slate-300">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="font-semibold text-white">4.8 Google Rating</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-[#c5a880]">26 Manchester Parent Reviews</span>
        </div>

        {/* Large Quote Heading */}
        <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-8 tracking-tight">
          “Helping Students Walk Into the Exam With Greater Confidence.”
        </blockquote>

        <p className="text-slate-400 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
          Through thoughtful diagnostic guidance, calm reinforcement, and realistic mock practice, we turn natural potential into steady academic accomplishment.
        </p>
      </div>
    </section>
  );
};
