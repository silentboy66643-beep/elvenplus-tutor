import React, { useState } from 'react';
import { OpeningAnimation } from './components/OpeningAnimation';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ParentPainPoints } from './components/ParentPainPoints';
import { AboutSection } from './components/AboutSection';
import { PreparationSection } from './components/PreparationSection';
import { MockExamFeature } from './components/MockExamFeature';
import { HowItWorks } from './components/HowItWorks';
import { ResultsSuccess } from './components/ResultsSuccess';
import { ReviewsSection } from './components/ReviewsSection';
import { FeaturedSocialProof } from './components/FeaturedSocialProof';
import { SubjectGrid } from './components/SubjectGrid';
import { WhyParentsChooseUs } from './components/WhyParentsChooseUs';
import { ParentCTA } from './components/ParentCTA';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { AIAssistant } from './components/AIAssistant';
import { Footer } from './components/Footer';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('Maths Preparation');

  const scrollToEnquiry = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForEnquiry = (serviceName: string) => {
    setSelectedSubject(serviceName);
    scrollToEnquiry();
  };

  return (
    <div className="min-h-screen bg-[#070c1a] text-slate-100 flex flex-col font-sans selection:bg-[#c5a880]/30 selection:text-white">
      {/* Opening Cinematic Page Animation */}
      {!introCompleted && (
        <OpeningAnimation onComplete={() => setIntroCompleted(true)} />
      )}

      {/* Sticky Navigation */}
      <Navbar onOpenEnquiry={scrollToEnquiry} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenEnquiry={scrollToEnquiry} />

        {/* Trust Strip */}
        <TrustStrip />

        {/* Parent Pain Points */}
        <ParentPainPoints />

        {/* About Section */}
        <AboutSection />

        {/* 11+ Preparation Section */}
        <PreparationSection
          onSelectServiceForEnquiry={handleSelectServiceForEnquiry}
        />

        {/* Mock Exam Feature with Scorecard Visualization */}
        <MockExamFeature onAskAboutMocks={scrollToEnquiry} />

        {/* How It Works Timeline */}
        <HowItWorks />

        {/* Results / Success Section */}
        <ResultsSuccess />

        {/* Reviews Section with Carousel */}
        <ReviewsSection />

        {/* Featured Social Proof Large Quote */}
        <FeaturedSocialProof />

        {/* Specialised Subject Grid */}
        <SubjectGrid onSelectSubject={handleSelectServiceForEnquiry} />

        {/* Why Parents Choose Us */}
        <WhyParentsChooseUs />

        {/* High Conversion Parent CTA */}
        <ParentCTA onOpenEnquiry={scrollToEnquiry} />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Contact & Enquiry Form */}
        <ContactSection initialSubject={selectedSubject} />
      </main>

      {/* REAL Gemini-Powered 11+ Tutor Assistant */}
      <AIAssistant
        onPreFillEnquiry={({ subject }) => {
          if (subject) setSelectedSubject(subject);
          scrollToEnquiry();
        }}
      />

      {/* Academic Footer */}
      <Footer />
    </div>
  );
}
