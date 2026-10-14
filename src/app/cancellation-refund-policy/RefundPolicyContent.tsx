"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Mail, 
  Phone, 
  FileText, 
  Calendar,
  Clock,
  CreditCard,
  ShieldCheck,
  AlertCircle
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
    <div id={id} className={`mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 scroll-mt-24 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none group"
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <Icon className="h-5 w-5 text-slate-700 dark:text-slate-300 mr-3 transition-transform group-hover:scale-110" />
          {title}
        </h2>
        <span className="ml-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
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

      <div className={`mt-4 text-slate-700 dark:text-slate-300 ${isOpen ? 'block' : 'hidden lg:block'}`}>
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
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50',
    warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50',
    success: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50'
  }[type];

  const textColor = {
    info: 'text-blue-800 dark:text-blue-300',
    warning: 'text-amber-800 dark:text-amber-300',
    success: 'text-emerald-800 dark:text-emerald-300'
  }[type];

  const icon = {
    info: <Info className="h-5 w-5 flex-shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 flex-shrink-0" />,
    success: <CheckCircle className="h-5 w-5 flex-shrink-0" />
  }[type];

  return (
    <div className={`${bgColor} border-l-4 ${textColor} p-4 my-4 rounded-r shadow-xs`}>
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

const RefundPolicyContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'course-enrollment',
        'refund-eligibility',
        'special-circumstances',
        'refund-process',
        'non-refundable',
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Topbar />
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 text-white overflow-hidden py-16 border-b border-slate-800">
        <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Official Policy</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-center tracking-tight">Cancellation & Refund Policy</h1>
          <p className="mt-3 text-slate-400 text-center max-w-xl text-sm md:text-base">
            Clear, transparent terms governing enrollments, cancellations, and refund procedures at Nyeras EduTech.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0 mr-12">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Quick Links</h3>
              <nav className="space-y-1">
                {[
                  { id: 'introduction', label: 'Introduction' },
                  { id: 'course-enrollment', label: '1. Course Enrollment' },
                  { id: 'refund-eligibility', label: '2. Refund Eligibility' },
                  { id: 'special-circumstances', label: '3. Special Circumstances' },
                  { id: 'refund-process', label: '4. Refund Process' },
                  { id: 'non-refundable', label: '5. Non-Refundable Items' },
                  { id: 'contact-us', label: '6. Contact Us' }
                ].map((item, idx) => (
                  <button
                    key={`refund-nav-${item.id}-${idx}`}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                      activeSection === item.id
                        ? 'bg-slate-900 dark:bg-slate-800 text-white font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <Section id="introduction" title="Introduction" icon={FileText}>
              <p>
                At <strong>Nyeras EduTech Innovations Pvt Ltd</strong> (&quot;Nyeras,&quot; &quot;we,&quot; &quot;our,&quot; &quot;us&quot;), we are committed to delivering high-quality learning programs and services. This Cancellation &amp; Refund Policy outlines the terms under which cancellations and refunds may be requested by users. By enrolling in our courses or using our Services, you agree to this policy.
              </p>
            </Section>

            <Section id="course-enrollment" title="1. Course Enrollment & Cancellation" icon={Calendar}>
              <ul className="list-disc pl-6 space-y-2">
                <li>Once you enroll in a course/program and payment is confirmed, your seat is reserved.</li>
                <li>Cancellations must be requested in writing via <a href="mailto:support@nyeras.com" className="text-slate-900 dark:text-slate-200 font-semibold underline underline-offset-2 hover:text-slate-700">support@nyeras.com</a> within the specified timeframe (see Section 2).</li>
                <li>After the cancellation window expires, no cancellation or refund requests will be entertained.</li>
              </ul>
            </Section>

            <Section id="refund-eligibility" title="2. Refund Eligibility" icon={ShieldCheck}>
              <p className="font-semibold mb-2">Refunds are available only in limited circumstances to ensure fairness for all parties.</p>

              <div className="mt-4">
                <h4 className="text-lg font-medium text-slate-900 dark:text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  General Refund Terms:
                </h4>
                <ul className="list-disc pl-10 mt-2 space-y-1">
                  <li>Once registration is complete and payment is processed, funds are <strong>non-refundable</strong>, as this confirms your commitment to our services.</li>
                  <li>We will gladly process a <strong>full refund</strong> if, despite our best efforts, we are unable to deliver the services as promised and outlined in our agreement.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-slate-900 dark:text-white flex items-center">
                  <XCircle className="h-5 w-5 text-rose-500 mr-2" />
                  Workshops/Short-Term Programs:
                </h4>
                <p className="mt-2 pl-8">Fees for one-day or short-term workshops/events are <strong>non-refundable</strong> once registration is confirmed.</p>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-slate-900 dark:text-white flex items-center">
                  <XCircle className="h-5 w-5 text-rose-500 mr-2" />
                  Subscription/Online Content:
                </h4>
                <p className="mt-2 pl-8">Payments made for self-paced learning modules, digital resources, or subscriptions are <strong>non-refundable</strong> due to instant access being granted.</p>
              </div>
            </Section>

            <Section id="special-circumstances" title="3. Special Circumstances" icon={AlertCircle}>
              <p>Refunds may be considered on a <strong>case-by-case basis</strong> for:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Duplicate payments (will be refunded 100%).</li>
                <li>Technical/payment failures at the time of transaction.</li>
                <li>Program cancellation or Non-Delivery initiated by <strong>Nyeras</strong> (100% refund or course rescheduling option will be offered).</li>
              </ul>
            </Section>

            <Section id="refund-process" title="4. Refund Process" icon={Clock}>
              <ul className="list-disc pl-6 space-y-2">
                <li>Approved refunds will be processed within <strong>10-15 working days</strong> from the date of approval.</li>
                <li>Refunds will be credited to the original mode of payment only.</li>
                <li>Learners must provide accurate bank/payment details. Nyeras is not responsible for delays caused by third-party payment gateways or banks.</li>
              </ul>
            </Section>

            <Section id="non-refundable" title="5. Non-Refundable Components" icon={XCircle}>
              <p>The following are strictly <strong>non-refundable</strong>:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Registration fees or admission charges (if applicable).</li>
                <li>Taxes, convenience fees, or transaction charges.</li>
                <li>Fees paid for completed portions of training or certifications already issued.</li>
              </ul>
            </Section>

            <Section id="contact-us" title="6. Contact Us" icon={Mail}>
              <p className="mb-4">For any queries regarding cancellations or refunds, please reach out to us at:</p>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3">Nyeras EduTech Innovations Pvt Ltd</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-2">Registered Office Address</p>
                <p className="text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-slate-500 dark:text-slate-400" />
                  <a href="mailto:support@nyeras.com" className="text-slate-900 dark:text-slate-200 font-medium hover:underline">support@nyeras.com</a>
                </p>
                <p className="text-slate-700 dark:text-slate-300 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-slate-500 dark:text-slate-400" />
                  <a href="tel:+917899232512" className="text-slate-900 dark:text-slate-200 font-medium hover:underline">+91 7899232512</a>
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

export default RefundPolicyContent;
