import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, GraduationCap, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: '11+ Preparation', href: '#preparation' },
    { label: 'Mock Exams', href: '#mock-exams' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070d1e]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800/80 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1a2f5e] to-[#0c1630] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] shadow-sm group-hover:border-[#c5a880] transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-lg font-bold text-white tracking-tight leading-none group-hover:text-[#e4d4ba] transition-colors">
                  Eleven Plus Tutors
                </span>
                <span className="text-[11px] tracking-wider uppercase text-[#c5a880] font-sans font-medium mt-1">
                  Manchester · Swan Buildings
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#c5a880] decoration-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+447482640654"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3.5 py-2 rounded-lg border border-slate-700/80 hover:border-slate-500 bg-slate-900/40 backdrop-blur transition-all"
                title="Call Swan Buildings Office"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>+44 7482 640654</span>
              </a>

              <button
                onClick={onOpenEnquiry}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#090f1f] bg-[#c5a880] hover:bg-[#d6bc96] active:scale-[0.98] px-4 py-2 rounded-lg shadow-md shadow-[#c5a880]/20 transition-all cursor-pointer"
              >
                <span>Book an Enquiry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-[#091024] border-b border-slate-800 px-6 py-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-200 hover:text-[#c5a880] py-2 border-b border-slate-800/60"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href="tel:+447482640654"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-slate-700 text-slate-200 text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-[#c5a880]" />
                <span>Call Us: +44 7482 640654</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#c5a880] text-[#090f1f] text-sm font-semibold shadow-md"
              >
                <span>Book an Enquiry</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
