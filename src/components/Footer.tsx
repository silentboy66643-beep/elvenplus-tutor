import React from 'react';
import { GraduationCap, MapPin, Phone, Globe, Star, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050813] text-slate-400 font-sans border-t border-slate-800 text-left pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#142347] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-tight block">
                  Eleven Plus Tutors
                </span>
                <span className="text-xs text-[#c5a880] tracking-wider uppercase font-medium">
                  Manchester · Swan Buildings
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Providing focused 11+ entrance exam preparation across Mathematics, English, Verbal Reasoning, and realistic mock assessments for Manchester families.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.8 Rating</span>
              <span className="text-slate-500">·</span>
              <span>26 Verified Google Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              11+ Preparation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#preparation" className="hover:text-white transition-colors">
                  Maths Preparation
                </a>
              </li>
              <li>
                <a href="#preparation" className="hover:text-white transition-colors">
                  English Comprehension & Grammar
                </a>
              </li>
              <li>
                <a href="#preparation" className="hover:text-white transition-colors">
                  Verbal Reasoning Techniques
                </a>
              </li>
              <li>
                <a href="#mock-exams" className="hover:text-white transition-colors">
                  Mock Assessments
                </a>
              </li>
              <li>
                <a href="#preparation" className="hover:text-white transition-colors">
                  Grammar School Admissions
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Tuition Centre & Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>
                  First Floor, Swan Buildings, 20 Swan St, Manchester M4 5JW, United Kingdom
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
                <a href="tel:+447482640654" className="hover:text-white transition-colors">
                  +44 7482 640654
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#c5a880] shrink-0" />
                <a
                  href="https://11plustutorsinmanchester.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  11plustutorsinmanchester.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Eleven Plus Tutors in Manchester. Premium Educational Demo.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
