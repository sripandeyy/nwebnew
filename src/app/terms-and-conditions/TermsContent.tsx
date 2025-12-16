"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  BookOpen, 
  Shield, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  XCircle,
  User,
  Layers,
  CreditCard,
  Copyright,
  Briefcase,
  AlertOctagon,
  Edit,
  Scale
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

interface HighlightBoxProps {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children, icon: Icon, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Open all sections by default on larger screens
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id={id} className={`mb-6 border-b border-gray-200 pb-6 scroll-mt-24 ${className}`}>
      <button
        className="flex w-full items-center justify-between text-left text-lg font-semibold text-gray-800 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <Icon className="h-5 w-5 text-purple-600 mr-3" />
          <span>{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 pl-8 text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
};

const HighlightBox: React.FC<HighlightBoxProps> = ({ type = 'info', children }) => {
  const bgColor = {
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
    success: 'bg-green-50 border-green-200',
  }[type];

  const icon = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
  }[type];

  return (
    <div className={`${bgColor} border-l-4 p-4 my-4 rounded-r-lg flex items-start`}>
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
};

const TermsContent = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'definitions', 'account', 'services', 'intellectual-property', 'user-content', 'payments', 'cancellation', 'disclaimer', 'limitation-liability', 'indemnification', 'governing-law', 'changes', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar />
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-800 to-indigo-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[300px] flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center">Terms and Conditions</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0 mr-12">
          <div className="sticky top-24">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 text-purple-600 mr-2" />
                Table of Contents
              </h3>
              <nav className="space-y-2">
                <div className="text-sm text-gray-500 italic p-2">
                  Scroll to navigate the content
                </div>
                {[
                  { id: 'acceptance', label: '1. Acceptance of Terms' },
                  { id: 'eligibility', label: '2. Eligibility' },
                  { id: 'user-accounts', label: '3. User Accounts' },
                  { id: 'services-courses', label: '4. Services and Courses' },
                  { id: 'payments-refunds', label: '5. Payments and Refunds' },
                  { id: 'intellectual-property', label: '6. Intellectual Property Rights' },
                  { id: 'user-conduct', label: '7. User Conduct' },
                  { id: 'placement-support', label: '8. Placement & Career Support' },
                  { id: 'limitation-liability', label: '9. Limitation of Liability' },
                  { id: 'termination', label: '10. Termination of Access' },
                  { id: 'amendments', label: '11. Amendments' },
                  { id: 'governing-law', label: '12. Governing Law & Jurisdiction' },
                  { id: 'contact', label: '13. Contact Information' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
              <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions about these Terms, please contact our support team.
              </p>
              <button
                onClick={(e) => scrollToSection('contact', e)}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Mail className="h-4 w-4 mr-2" /> Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="prose prose-purple max-w-none">
            <p className="text-gray-600 mb-8">
              Welcome to Nyeras! By accessing or using our website, platform, or services ("Services"), you ("User", "Student", or "You") agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using our Services.
            </p>

            <Section id="acceptance" title="1. Acceptance of Terms" icon={CheckCircle}>
              <p className="mb-4">
                By registering, accessing, or using Nyeras' Services, you agree to be legally bound by these Terms and Conditions, our Privacy Policy, and any additional policies notified to you. If you do not agree, please discontinue using our Services.
              </p>
              <HighlightBox type="info">
                <strong>Important:</strong> These Terms constitute a legally binding agreement between you and Nyeras Edutech Innovations Private Limited.
              </HighlightBox>
            </Section>

            <Section id="eligibility" title="2. Eligibility" icon={Shield}>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 16 years old (or the age of legal majority in your jurisdiction) to use our Services.</li>
                <li>If you are under 18, you must have parental/guardian consent to register and use our Services.</li>
                <li>Nyeras reserves the right to verify your eligibility at any time.</li>
              </ul>
            </Section>

            <Section id="user-accounts" title="3. User Accounts" icon={BookOpen}>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>Any activity under your account will be deemed as your responsibility.</li>
                <li>Nyeras is not liable for loss or damages arising from unauthorized use of your account.</li>
              </ul>
            </Section>

            <Section id="services-courses" title="4. Services and Courses" icon={FileText}>
              <ul className="list-disc pl-6 space-y-2">
                <li>All course content, study material, assignments, and resources provided by Nyeras are solely for educational and personal use.</li>
                <li>Reproduction, resale, distribution, or commercial use of our content without written permission is strictly prohibited.</li>
                <li>Course access may be time-bound (e.g., limited validity period) and is non-transferable.</li>
              </ul>
            </Section>

            <Section id="payments-refunds" title="5. Payments and Refunds" icon={CheckCircle}>
              <ul className="list-disc pl-6 space-y-2">
                <li>All fees must be paid in full as per the pricing displayed on our website or communicated by our representatives.</li>
                <li>Fees once paid are <strong>non-refundable and non-transferable</strong>, except where Nyeras cancels a program or service.</li>
                <li>Nyeras reserves the right to modify pricing at any time.</li>
              </ul>
              <HighlightBox type="warning">
                <strong>Refund Policy:</strong> Please review our refund policy carefully before making any payments as we typically do not offer refunds except in exceptional circumstances.
              </HighlightBox>
            </Section>

            <Section id="intellectual-property" title="6. Intellectual Property Rights" icon={Shield}>
              <p className="mb-4">
                All course materials, logos, designs, text, videos, and software are the intellectual property of Nyeras. Unauthorized copying, modification, distribution, or reverse engineering is strictly prohibited and may lead to legal action.
              </p>
              <HighlightBox type="info">
                <strong>Copyright Notice:</strong> All content © {new Date().getFullYear()} Nyeras Edutech Innovations Private Limited. All rights reserved.
              </HighlightBox>
            </Section>

            <Section id="user-conduct" title="7. User Conduct" icon={AlertTriangle}>
              <p className="mb-2">By using our Services, you agree <strong>NOT</strong> to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Share, sell, or misuse course materials.</li>
                <li>Engage in plagiarism, cheating, or dishonest practices in assessments.</li>
                <li>Post harmful, abusive, or unlawful content on our platform.</li>
                <li>Violate any applicable laws or third-party rights.</li>
              </ul>
              <p>Violation of this section may result in immediate suspension or termination of your account without refund.</p>
            </Section>

            <Section id="placement-support" title="8. Placement & Career Support" icon={CheckCircle}>
              <p className="mb-4">
                Nyeras may provide placement assistance, career guidance, or interview preparation, but <strong>does not guarantee employment</strong>. Success in placements depends on student performance, skills, and external opportunities.
              </p>
              <HighlightBox type="info">
                <strong>Note:</strong> While we strive to provide the best career support, job placement is not guaranteed and depends on various factors including market conditions and individual performance.
              </HighlightBox>
            </Section>

            <Section id="limitation-liability" title="9. Limitation of Liability" icon={AlertTriangle}>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nyeras is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our Services.</li>
                <li>We do not warrant that the platform will be error-free, uninterrupted, or always available.</li>
                <li>Users are responsible for ensuring compatibility of their devices and internet connectivity.</li>
              </ul>
            </Section>

            <Section id="termination" title="10. Termination of Access" icon={XCircle}>
              <p className="mb-4">
                Nyeras reserves the right to suspend or terminate your access to Services at any time without prior notice if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You breach these Terms,</li>
                <li>You misuse the platform, or</li>
                <li>You engage in any activity harmful to Nyeras' reputation or systems.</li>
              </ul>
            </Section>

            <Section id="amendments" title="11. Amendments" icon={Info}>
              <p>
                We may update or modify these Terms from time to time. Continued use of our Services after changes implies acceptance of the updated Terms.
              </p>
            </Section>

            <Section id="governing-law" title="12. Governing Law & Jurisdiction" icon={Shield}>
              <p>
                These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Bangalore.
              </p>
            </Section>

            <section id="contact" className="scroll-mt-24">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="h-6 w-6 text-purple-600 mr-2" />
                  13. Contact Information
                </h2>
                <p className="text-gray-700 mb-6">
                  For any questions or concerns about these Terms, please contact us at:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-3">Email Us</h3>
                    <a 
                      href="mailto:support@nyeras.com" 
                      className="inline-flex items-center text-purple-700 hover:text-purple-900"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      support@nyeras.com
                    </a>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-3">Call Us</h3>
                    <a 
                      href="tel:+917013586357" 
                      className="inline-flex items-center text-purple-700 hover:text-purple-900"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      +91 70135 86357
                    </a>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
                    <h3 className="font-medium text-gray-900 mb-3">Visit Us</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <address className="not-italic text-gray-700">
                        Floor No.2, 1161, AECS Layout Main Rd,<br />
                        AECS Layout - A Block, AECS Layout,<br />
                        Singasandra, Kudlu,<br />
                        Bengaluru, Karnataka 560068
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Nyeras Edutech Innovations Private Limited. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      <Footer />
    </div>
  );
};

export default TermsContent;
