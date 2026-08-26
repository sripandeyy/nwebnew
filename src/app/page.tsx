
import Topbar from './components/Topbar';
import Header from './components/Header'
import Hero from './components/Hero';
import Location from './components/Location';
import App from './components/App';
import Footer from './components/Footer';
import HeroB from './components/HeroB';
import Faq from './components/faq';
// import WhatsAppButton from './components/BacktoTop';
import TestimonialsGrid from './components/Testimonials';
import ServicesPremium from './components/ServicesPremium';
import Marquee from './components/Marquee';
import CounsellorForm from './components/Form';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Connect from './components/Connect';
import HeroC from './components/HeroC';
import HeroBC from './components/HeroBC';
import HeroAB from './components/HeroAB';
import CertificationSection from './components/Certifications';
import MOUsSection from './components/MOUs';
import { Metadata } from 'next';
import ServicesB from './components/ServicesB';
import PlacedShowcase from './components/PlacedShowcase';
export const metadata: Metadata = {
  title: {
    absolute: "Nyeras - Affordable E-learning with Certification & Job Placement",
  },
  description: "Nyeras is an affordable online learning platform by Nyera Educational Trust, offering specialized training for government and MNC jobs with certification, internship, and industry-ready skills. 100% placement assistance and LinkedIn profile optimization included. Trusted by 2000+ students with high placement success.",
};

export default function LandingPage() {

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white/60">
        <Topbar />
        <Header />
        <main className="flex-grow">
          <Hero />
          <PlacedShowcase />
          <HeroB />
          <HeroAB />
          <HeroBC />
          <HeroC />
          <Connect />
          <ServicesPremium />
          <TestimonialsGrid />
          <Marquee />
          <CertificationSection />
          <MOUsSection />
          <ServicesB />
          <Faq />
          <CounsellorForm />
          <Contact />
          <Location />
          <App />
          <Newsletter />
        </main>
        {/* <WhatsAppButton /> */}
        <Footer />
      </div>
    </>
  )
}
