
'use client';
import { useEffect, useState } from "react";
import { UserPlus, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert, { AlertProvider } from '../utils/Alert';
export default function CounsellorForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showForm) {
        setShowForm(true);
      }
    }, 1000*60*5);

    return () => clearInterval(interval);
  }, [showForm]);

  const handleClose = () => {
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, phone } = formData;

    if (!name || !email || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (name.trim() === "") {
      toast.error("Please enter your name.");
      return;
    }
    if (email.indexOf("@") === -1) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (phone.length !== 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/counsellation", { name, email, phone });
      if (response.status === 200) {
      
        setFormData({ name: "", email: "", phone: "" });
        Alert("Successfully submitted! Our counsellor will reach out to you.");
        handleClose();
        
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

  if (!showForm) return null;

  return (
    <>
    <AlertProvider>
      <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm p-4 z-50">
        <div className="bg-[#f0e6ff] p-8 rounded-lg shadow-lg max-w-md w-full relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-3xl font-bold mb-6 text-center text-[#4b2e83]">
            Connect with an Education Counsellor
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#4b2e83] mb-1"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter Your Name"
                className="block w-full rounded-md border-[#4b2e83] border-opacity-30 shadow-sm focus:border-[#4b2e83] focus:ring focus:ring-[#4b2e83] focus:ring-opacity-50 py-2 px-3 bg-white/90"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#4b2e83] mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Your Email Address"
                className="block w-full rounded-md border-[#4b2e83] border-opacity-30 shadow-sm focus:border-[#4b2e83] focus:ring focus:ring-[#4b2e83] focus:ring-opacity-50 py-2 px-3 bg-white/90"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#4b2e83] mb-1"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 1234567890"
                className="block w-full rounded-md border-[#4b2e83] border-opacity-30 shadow-sm focus:border-[#4b2e83] focus:ring focus:ring-[#4b2e83] focus:ring-opacity-50 py-2 px-3 bg-white/90"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4b2e83] text-white py-3 px-4 rounded-md hover:bg-[#3a2468] focus:outline-none focus:ring-2 focus:ring-[#4b2e83] focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center justify-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Connect with Counsellor</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      </AlertProvider>
    </>
  );
}
