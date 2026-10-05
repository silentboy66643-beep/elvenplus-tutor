import React, { useEffect, useState, useRef } from 'react';
import { Star, MessageSquareQuote, BookOpen, UserCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = 26;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setReviewCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  const stats = [
    {
      icon: Star,
      iconColor: 'text-amber-400',
      value: '4.8 ⭐',
      label: 'Google Rating',
      subtext: 'Consistently top-rated tuition',
    },
    {
      icon: MessageSquareQuote,
      iconColor: 'text-[#c5a880]',
      value: `${hasAnimated ? reviewCount : '26'}+`,
      label: 'Reviews',
      subtext: 'From verified Manchester parents',
    },
    {
      icon: BookOpen,
      iconColor: 'text-blue-400',
      value: '11+',
      label: 'Exam Preparation',
      subtext: 'Maths, English, Verbal Reasoning',
    },
    {
      icon: UserCheck,
      iconColor: 'text-emerald-400',
      value: '1-to-1',
      label: 'Focused Support',
      subtext: 'Tailored to each student',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative z-20 bg-[#091124] border-y border-slate-800/80 py-8 lg:py-10 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
