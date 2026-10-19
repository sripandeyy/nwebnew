"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  Shield, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Mail, 
  Phone, 
  FileText, 
  Lock, 
  Cookie, 
  Link as LinkIcon,
  User,
  Award,
  CreditCard,
  BarChart2,
  ShieldCheck,
  Trash2,
  BellOff,
  ExternalLink
} from 'lucide-react';
import Topbar from '../components/Topbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, icon: Icon, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
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
    <div id={id} className={`mb-8 border-b border-slate-200 dark:border-slate-800 pb-8 scroll-mt-24 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none group"
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <Icon className="h-5 w-5 text-slate-700 dark:text-slate-300 mr-3" />
          {title}
        </h2>
        <span className="ml-4 text-slate-400 group-hover:text-slate-600">
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </span>
      </button>
      
      <div className={`mt-4 text-slate-600 dark:text-slate-300 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {children}
      </div>
    </div>
  );
};

const HighlightBox: React.FC<{ type?: 'info' | 'warning' | 'success'; children: React.ReactNode }> = ({ 
  type = 'info', 
  children 
}) => {
  const bgColor = {
    info: 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700',
    warning: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800',
    success: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
  }[type];

  const textColor = {
    info: 'text-slate-800 dark:text-slate-200',
    warning: 'text-amber-800 dark:text-amber-200',
    success: 'text-emerald-800 dark:text-emerald-200'
  }[type];

  const icon = {
    info: <Info className="h-5 w-5 flex-shrink-0 text-slate-600 dark:text-slate-400" />,
    warning: <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />,
    success: <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-500" />
  }[type];

  return (
    <div className={`${bgColor} border-l-4 ${textColor} p-4 my-4 rounded-r`}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <div className="text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

const PrivacyContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction', 
        'information-collected', 
        'use-of-information',
        'sharing-information',
        'data-security',
        'data-retention',
        'your-rights',
        'cookies-policy',
        'third-party-links',
        'children-privacy',
        'policy-changes',
        'contact-us'
      ];
      
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
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <Topbar />
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 border-b border-slate-800 text-white overflow-hidden">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 min-h-[260px] flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center">Privacy Policy</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0 mr-12">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <FileText className="h-5 w-5 text-slate-700 dark:text-slate-300 mr-2" />
                Table of Contents
              </h3>
              <nav className="space-y-1">
                <div className="text-xs text-slate-400 italic p-2">
                  Scroll to navigate
                </div>
                {[
                  { id: 'introduction', label: 'Introduction' },
                  { id: 'information-collected', label: '1. Information We Collect' },
                  { id: 'use-of-information', label: '2. How We Use Your Information' },
                  { id: 'sharing-information', label: '3. Sharing of Information' },
                  { id: 'data-security', label: '4. Data Security' },
                  { id: 'data-retention', label: '5. Data Retention' },
                  { id: 'your-rights', label: '6. Your Rights' },
                  { id: 'cookies-policy', label: '7. Cookies Policy' },
                  { id: 'third-party-links', label: '8. Third-Party Links' },
                  { id: 'children-privacy', label: '9. Children\'s Privacy' },
                  { id: 'policy-changes', label: '10. Changes to Privacy Policy' },
                  { id: 'contact-us', label: '11. Contact Us' },
                ].map((item, idx) => (
                  <button
                    key={`privacy-nav-${item.id}-${idx}`}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="mt-6 p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Need Help?</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                If you have any questions about our Privacy Policy, please contact our support team.
              </p>
              <a
                href="#contact-us"
                onClick={(e) => scrollToSection('contact-us', e)}
                className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl shadow-md text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700/50 hover-lift transition-all"
              >
                <Mail className="h-4 w-4 mr-2" /> Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <Section id="introduction" title="Introduction" icon={Info}>
              <p className="mb-4">
                Nyeras EduTech Innovations Pvt Ltd (&quot;Nyeras,&quot; &quot;we,&quot; &quot;our,&quot; &quot;us&quot;) values the trust you place in us when you use our services. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you interact with our website, applications, platforms, and services (collectively, &quot;Services&quot;).
              </p>
              <p>
                By accessing or using our Services, you agree to the terms outlined in this Privacy Policy. If you do not agree, please discontinue using our Services.
              </p>
            </Section>

            <Section id="information-collected" title="1. Information We Collect" icon={FileText}>
              <p className="mb-4">We may collect the following categories of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, mailing address, payment information, government-issued ID (where required for certification or verification).</li>
                <li><strong>Educational/Professional Data:</strong> Academic history, course preferences, resumes, projects, certifications, placement-related information.</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, device identifiers, operating system, geolocation, pages visited, time spent, and interactions on our website/platform.</li>
                <li><strong>Cookies & Tracking Data:</strong> We use cookies, beacons, and similar technologies to improve user experience, marketing, and analytics.</li>
              </ul>
            </Section>

            <Section id="use-of-information" title="2. How We Use Your Information" icon={BarChart2}>
              <p className="mb-4">Your information may be used to:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Provide, maintain, and improve our Services.</li>
                <li>Register you for courses, events, training, or assessments.</li>
                <li>Communicate with you regarding updates, promotions, and support.</li>
                <li>Personalize your learning experience.</li>
                <li>Process payments and provide receipts.</li>
                <li>Conduct research, analytics, and reporting for internal business growth.</li>
                <li>Ensure compliance with legal obligations.</li>
                <li>Protect against fraud, unauthorized use, or abuse of our Services.</li>
              </ol>
            </Section>

            <Section id="sharing-information" title="3. Sharing of Information" icon={ShieldCheck}>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Trusted third parties who help us deliver courses, process payments, provide technical support, marketing, and analytics.</li>
                <li><strong>Business Partners:</strong> Companies we collaborate with for joint programs, certifications, or placement opportunities.</li>
                <li><strong>Legal/Regulatory Authorities:</strong> When required by law or to protect our rights, property, or users.</li>
                <li><strong>Corporate Transactions:</strong> In the event of a merger, acquisition, or asset sale, your information may be transferred.</li>
              </ul>
              <p className="mt-4">We do <strong>not</strong> sell or rent your personal information to third parties for commercial gain.</p>
            </Section>

            <Section id="data-security" title="4. Data Security" icon={Lock}>
              <p>
                We use industry-standard security measures such as encryption, firewalls, and secure servers to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </Section>

            <Section id="data-retention" title="5. Data Retention" icon={Trash2}>
              <p>
                We retain your information for as long as needed to fulfill the purposes outlined in this Privacy Policy or as required by law. Once the retention period expires, we securely delete or anonymize the data.
              </p>
            </Section>

            <Section id="your-rights" title="6. Your Rights" icon={Award}>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and request a copy of your personal data.</li>
                <li>Correct or update inaccurate information.</li>
                <li>Request deletion of your data, subject to legal or contractual obligations.</li>
                <li>Opt out of marketing communications at any time.</li>
              </ul>
              <p className="mt-4">To exercise your rights, please contact us at <a href="mailto:support@nyeras.com" className="text-slate-800 dark:text-slate-200 font-semibold hover:underline">support@nyeras.com</a>.</p>
            </Section>

            <Section id="cookies-policy" title="7. Cookies Policy" icon={Cookie}>
              <p className="mb-4">We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Improve site functionality and navigation.</li>
                <li>Analyze usage patterns for business insights.</li>
                <li>Deliver personalized content and ads.</li>
              </ul>
              <p className="mt-4">You can disable cookies in your browser settings, but some features of our Services may not function properly.</p>
            </Section>

            <Section id="third-party-links" title="8. Third-Party Links" icon={LinkIcon}>
              <p>
                Our website may contain links to external websites. We are not responsible for their privacy practices. Please review their policies before sharing information.
              </p>
            </Section>

            <Section id="children-privacy" title="9. Children's Privacy" icon={User}>
              <p>
                Our Services are not directed at children under the age of 13 (or relevant age under applicable law). We do not knowingly collect personal information from children. If we discover such data, we will delete it immediately.
              </p>
            </Section>

            <Section id="policy-changes" title="10. Changes to Privacy Policy" icon={AlertTriangle}>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised &quot;Last Updated&quot; date. Continued use of our Services after changes indicates acceptance.
              </p>
            </Section>

            <Section id="contact-us" title="11. Contact Us" icon={Mail}>
              <p className="mb-4">For questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Nyeras EduTech Innovations Pvt Ltd</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-2">Registered Office Address</p>
                <p className="text-slate-600 dark:text-slate-300 mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-slate-500" />
                  <a href="mailto:support@nyeras.com" className="text-slate-800 dark:text-slate-200 font-semibold hover:underline">support@nyeras.com</a>
                </p>
                <p className="text-slate-600 dark:text-slate-300 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-slate-500" />
                  <a href="tel:+917899232512" className="text-slate-800 dark:text-slate-200 font-semibold hover:underline">+91 7899232512</a>
                </p>
              </div>
            </Section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyContent;
