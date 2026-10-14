"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Topbar from '../components/Topbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactContent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <Topbar />
      <Header />

      {/* Hero Section */}
      <div className="relative bg-slate-900 border-b border-slate-800 text-white overflow-hidden">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We&apos;d love to hear from you. Fill the form or reach us directly.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Get in touch</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8">Our team typically responds within 24 hours.</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Email</h3>
                    <a 
                      href="mailto:support@nyeras.com" 
                      className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium hover:underline"
                    >
                      support@nyeras.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Phone</h3>
                    <a 
                      href="tel:+917899232512" 
                      className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium hover:underline"
                    >
                      +91 7899232512
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Address</h3>
                    <address className="not-italic text-slate-600 dark:text-slate-300">
                      Floor No.2, 1161, AECS Layout Main Rd,<br />
                      AECS Layout - A Block, AECS Layout,<br />
                      Singasandra, Kudlu,<br />
                      Bengaluru, Karnataka 560068
                    </address>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Business Hours</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Tuesday - Sunday: 11:00 AM - 8:00 PM
                    </p>
                    
                    <p className="text-slate-600 dark:text-slate-300">
                      Monday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Prefer email?</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Write to{' '}
                  <a 
                    href="mailto:support@nyeras.com" 
                    className="text-slate-800 dark:text-slate-200 font-semibold hover:underline"
                  >
                    support@nyeras.com
                  </a>{' '}
                  and we&apos;ll contact you directly.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h2>
            
            {isSubmitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-xl p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Thank you for your message! We&apos;ll get back to you soon.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-3.5 rounded-xl shadow-md text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700/50 hover-lift focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Alternative Contact */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Alternatively, mail us at{' '}
            <a 
              href="mailto:support@nyeras.com" 
              className="text-slate-800 dark:text-slate-200 hover:underline font-semibold"
            >
              support@nyeras.com
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactContent;
