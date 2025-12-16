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
    <div id={id} className={`mb-8 border-b border-gray-100 pb-8 scroll-mt-24 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none group"
      >
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Icon className="h-5 w-5 text-purple-600 mr-3" />
          {title}
        </h2>
        <span className="ml-4 text-gray-400 group-hover:text-gray-600">
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

      <div className={`mt-4 text-gray-700 ${isOpen ? 'block' : 'hidden lg:block'}`}>
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
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
    success: 'bg-green-50 border-green-200'
  }[type];

  const textColor = {
    info: 'text-blue-800',
    warning: 'text-yellow-800',
    success: 'text-green-800'
  }[type];

  const icon = {
    info: <Info className="h-5 w-5 flex-shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 flex-shrink-0" />,
    success: <CheckCircle className="h-5 w-5 flex-shrink-0" />
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
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar />
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-800 to-indigo-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[300px] flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center">Cancellation & Refund Policy</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0 mr-12">
          <div className="sticky top-24">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <nav className="space-y-2">
                <div className="text-sm text-gray-500 italic p-2">
                  Scroll to navigate the content
                </div>
                {[
                  { id: 'introduction', label: 'Introduction' },
                  { id: 'course-enrollment', label: '1. Course Enrollment & Cancellation' },
                  { id: 'refund-eligibility', label: '2. Refund Eligibility' },
                  { id: 'special-circumstances', label: '3. Special Circumstances' },
                  { id: 'refund-process', label: '4. Refund Process' },
                  { id: 'non-refundable', label: '5. Non-Refundable Components' },
                  { id: 'contact-us', label: '6. Contact Us' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-50 text-purple-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
          <div className="prose prose-indigo max-w-none">
            <Section id="introduction" title="Introduction" icon={FileText}>
              <p>
                At <strong>Nyeras EduTech Innovations Pvt Ltd</strong> ("Nyeras," "we," "our," "us"), we are committed to delivering high-quality learning programs and services. This Cancellation & Refund Policy outlines the terms under which cancellations and refunds may be requested by users. By enrolling in our courses or using our Services, you agree to this policy.
              </p>
            </Section>

            <Section id="course-enrollment" title="1. Course Enrollment & Cancellation" icon={Calendar}>
              <ul className="list-disc pl-6 space-y-2">
                <li>Once you enroll in a course/program and payment is confirmed, your seat is reserved.</li>
                <li>Cancellations must be requested in writing via <a href="mailto:support@nyeras.com" className="text-purple-600 hover:underline">support@nyeras.com</a> within the specified timeframe (see Section 2).</li>
                <li>After the cancellation window expires, no cancellation or refund requests will be entertained.</li>
              </ul>
            </Section>

            <Section id="refund-eligibility" title="2. Refund Eligibility" icon={ShieldCheck}>
              <p className="font-semibold mb-2">Refunds are applicable only under the following conditions:</p>
              
              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-900 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Before Course Start:
                </h4>
                <ul className="list-disc pl-10 mt-2 space-y-1">
                  <li>If cancellation is requested <strong>at least 7 days before the course start date</strong>, a <strong>90% refund</strong> of the fee will be issued (10% deducted as administrative charges).</li>
                  <li>If requested <strong>within 7 days of the course start date but before commencement</strong>, a <strong>50% refund</strong> will be issued.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  After Course Commencement:
                </h4>
                <ul className="list-disc pl-10 mt-2 space-y-1">
                  <li>Once a course/program has started, <strong>no refunds</strong> will be provided.</li>
                  <li>However, learners may request <strong>course rescheduling or credit transfer</strong> to another batch (subject to availability and management approval).</li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  Workshops/Short-Term Programs:
                </h4>
                <p className="mt-2 pl-8">Fees for one-day or short-term workshops/events are <strong>non-refundable</strong> once registration is confirmed.</p>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
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
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Nyeras EduTech Innovations Pvt Ltd</h4>
                <p className="text-gray-700 mb-2">Registered Office Address</p>
                <p className="text-gray-700 mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-purple-600" />
                  <a href="mailto:support@nyeras.com" className="text-purple-600 hover:underline">support@nyeras.com</a>
                </p>
                <p className="text-gray-700 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-purple-600" />
                  <a href="tel:+917013586357" className="text-purple-600 hover:underline">+91 70135 86357</a>
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
