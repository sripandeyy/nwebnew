
'use client';

import { useState } from "react";
import { UserPlus, X, CheckCircle2, ShieldCheck } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CounsellorFormProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CounsellorForm({ isOpen, onClose }: CounsellorFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;

    const { name, email, phone } = formData;

    if (!name.trim() || !email || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/counsellation", { name, email, phone });
      if (response.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "" });
        setTimeout(() => {
          handleClose();
          setSubmitted(false);
        }, 2200);
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (isOpen === false) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 z-50 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full relative border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close form"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Successfully Submitted!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Our Senior Education Counsellor will reach out to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Connect with a Counsellor
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Get individualized advice on course paths & career goals.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="c_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label
                  htmlFor="counsellor-name"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="counsellor-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>

              <div>
                <label
                  htmlFor="counsellor-email"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="counsellor-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>

              <div>
                <label
                  htmlFor="counsellor-phone"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Phone Number (+91) *
                </label>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-3 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="counsellor-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="9876543210"
                    maxLength={10}
                    className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-60 text-white font-semibold text-sm shadow-md shadow-slate-900/20 border border-slate-700/50 hover-lift transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>Connect with Counsellor</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

