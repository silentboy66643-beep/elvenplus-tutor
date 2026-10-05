import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: ReviewItem[] = [
    {
      id: 'rev-1',
      author: 'Annie Fong',
      schoolOutcome: 'Offered Place at Altrincham Grammar School',
      quote:
        'A parent described the tutors as very helpful during their child’s 11+ preparation and highlighted that the focused support contributed directly to their child being offered a place at Altrincham Grammar School.',
      rating: 5,
      date: 'Google Review',
      verified: true,
    },
    {
      id: 'rev-2',
      author: 'Melanie Misselbrook',
      schoolOutcome: 'Improved Confidence & Successful Admission',
      quote:
        'A parent praised the tutor’s rapport with children, steady encouragement and attentive support, noting marked improvement in confidence and achieving a successful grammar school outcome.',
      rating: 5,
      date: 'Google Review',
      verified: true,
    },
    {
      id: 'rev-3',
      author: 'Sonja Bellamy',
      schoolOutcome: 'Consolidated Maths & English Knowledge',
      quote:
        'A parent explained that the tutoring helped their son systematically consolidate essential maths and English knowledge and successfully fill important subject gaps before sitting the 11+ exam.',
      rating: 5,
      date: 'Google Review',
      verified: true,
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#091024] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 text-left gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[#c5a880] tracking-wider uppercase mb-3">
              <span>Parent Testimonials</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Authentic Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-3">
              Trusted by Manchester Families
            </h2>
            <p className="text-slate-400 text-base sm:text-lg font-sans">
              Concise summaries of verified Google reviews from parents who prepared with our tutors.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0c1630] border border-slate-800 shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-serif font-bold text-white">4.8</span>
                <span className="text-xs text-slate-400 font-sans">Google Rating</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-serif font-bold text-[#c5a880]">26</span>
              <span className="text-xs text-slate-400">Total Reviews</span>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-7 rounded-2xl bg-[#0c1630] border border-slate-800 hover:border-slate-700 flex flex-col justify-between text-left transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {rev.date}
                    </span>
                  </div>

                  {rev.schoolOutcome && (
                    <div className="text-xs font-semibold text-[#c5a880] mb-3">
                      {rev.schoolOutcome}
                    </div>
                  )}

                  <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed italic mb-6">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1a2f5e] text-[#c5a880] font-serif font-bold text-sm flex items-center justify-center">
                      {rev.author.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {rev.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Parent</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / Tablet Carousel View */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-7 rounded-2xl bg-[#0c1630] border border-slate-800 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {reviews[currentIndex].date}
                    </span>
                  </div>

                  {reviews[currentIndex].schoolOutcome && (
                    <div className="text-xs font-semibold text-[#c5a880] mb-3">
                      {reviews[currentIndex].schoolOutcome}
                    </div>
                  )}

                  <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed italic mb-6">
                    "{reviews[currentIndex].quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1a2f5e] text-[#c5a880] font-serif font-bold text-sm flex items-center justify-center">
                      {reviews[currentIndex].author.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {reviews[currentIndex].author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Parent</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-xs text-slate-400">
                {currentIndex + 1} of {reviews.length}
              </div>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
