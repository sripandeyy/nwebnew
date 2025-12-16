'use client';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

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
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage('');
    try {
      await axios.post('/api/Contact', formData);
      setFeedbackMessage('Thank you for contacting us!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      setFeedbackMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative py-16 bg-white/40">
      <div className="relative z-10 max-w-screen-xl mx-auto sm:px-4 md:px-8">
        <div
          className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0"
          data-aos="fade-up"
        >
          <h3 className="text-[#6600CC] font-semibold">Contact</h3>
          <p className="text-black text-3xl font-semibold sm:text-4xl">
            Get in touch
          </p>
          <p className="text-gray-700">
            We&apos;d love to hear from you! Please fill out the form below.
          </p>
        </div>
        <div
          className="mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl"
          data-aos="fade-up"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-orange-500 shadow-sm rounded-lg"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-orange-500 shadow-sm rounded-lg"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="font-medium text-gray-700">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your 10-digit phone number"
                required
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-orange-500 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-orange-500 shadow-sm rounded-lg text-gray-700"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-white font-medium bg-[#6600CC] hover:bg-[#4d0099] active:bg-[#3a0073] rounded-lg duration-300 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          {feedbackMessage && (
            <p className="mt-4 text-center text-gray-700">{feedbackMessage}</p>
          )}
        </div>
      </div>
      <div
        className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
        }}
        data-aos="fade-in"
      ></div>
    </main>
  );
};

export default Contact;
