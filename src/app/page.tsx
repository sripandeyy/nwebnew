import Topbar from './components/Topbar';
import Header from './components/Header';
import Hero from './components/Hero';
import HeroB from './components/HeroB';
import PlacedShowcase from './components/PlacedShowcase';
import EngineeringSandbox from './components/EngineeringSandbox';
import ServicesPremium from './components/ServicesPremium';
import SalaryCalculator from './components/SalaryCalculator';
import HeroC from './components/HeroC';
import TestimonialsGrid from './components/Testimonials';
import CertificationSection from './components/Certifications';
import MOUsSection from './components/MOUs';
import Faq from './components/faq';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CallbackFlashcard from './components/CallbackFlashcard';
import LinkedInPopup from './components/LinkedInPopup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nyeras - Affordable E-learning with Certification & Job Placement",
  description: "Nyeras is an affordable online learning platform by Nyera Educational Organisation, offering specialized training for government and MNC jobs with certification, internship, and industry-ready skills. 100% placement assistance included.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-[#070913]/50 transition-colors duration-300 relative">
      <Topbar />
      <Header />
      <main className="flex-grow relative z-10">
        <Hero />
        <HeroB />
        <PlacedShowcase />
        <EngineeringSandbox />
        <ServicesPremium />
        <SalaryCalculator />
        <HeroC />
        <TestimonialsGrid />
        <CertificationSection />
        <MOUsSection />
        <Faq />
        <Contact />
        <Location />
      </main>
      <Footer />
      <CallbackFlashcard />
      <LinkedInPopup />
    </div>
  );
}


