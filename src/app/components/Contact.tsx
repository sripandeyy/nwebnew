'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    try {
      await axios.post('/api/Contact', formData);
      setFeedback({ type: 'success', message: 'Thank you! Your message has been received. Our team will get back to you shortly.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      setFeedback({ type: 'error', message: 'Something went wrong while sending your message. Please try again or call our support.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold mb-3 backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Have Questions? We’re Here to Help
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
            Reach out to our admissions team for course advice, fee details, or placement insights.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 glossy-black-card p-6 sm:p-10 shadow-xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl skeuo-input text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl skeuo-input text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl skeuo-input text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                How Can We Help You?
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl skeuo-input text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                  placeholder="Tell us about the domain or placement program you're interested in..."
                />
              </div>
            </div>

            {/* Feedback Alert */}
            {feedback && (
              <div
                className={`flex items-center gap-2.5 p-4 rounded-xl text-sm font-medium ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl skeuo-btn-primary text-white font-extrabold text-sm sm:text-base disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message to Admissions</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
