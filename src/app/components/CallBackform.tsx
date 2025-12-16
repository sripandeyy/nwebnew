'use client'

import { useState } from 'react'
interface CallbackFormProps {
    onClose: () => void
}

export default function CallbackForm({ onClose }: CallbackFormProps) {
    const [formData, setFormData] = useState({
        program: '',
        name: '',
        email: '',
        phone: '',
    });
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Server Response:', data);
                onClose();
               
                
               
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
        {alertMessage && (
               <div
               className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]"
               onClick={() => setAlertMessage(null)} // Optional: Close alert on clicking the background
           >
               <div
                   className="relative bg-white text-gray-800 px-6 py-4 rounded-lg shadow-2xl border-2 border-green-500"
                   onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside the alert
               >
                   <p className="text-lg font-semibold">{alertMessage}</p>
                   <button
                       onClick={() => setAlertMessage(null)}
                       className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                   >
                       ✕
                   </button>
               </div>
           </div>
           
            )}
      
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 overflow-y-auto z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl relative overflow-hidden my-8">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-black hover:text-gray-600 z-10"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="flex flex-col lg:flex-row">
                    {/* Left Section */}
                    <div className="bg-[#6600CC] p-8 lg:w-1/2 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-6">Talk to our Advisor</h2>
                            <p className="text-white/80 mb-2 uppercase text-sm tracking-wider">AND GET</p>
                            <ul className="space-y-4 text-white">
                                <li className="flex items-center">
                                    <span className="text-white mr-2">✦</span>
                                    Personalized Career Roadmap
                                </li>
                                <li className="flex items-center">
                                    <span className="text-white mr-2">✦</span>
                                    Free Career Counselling
                                </li>
                                <li className="flex items-center">
                                    <span className="text-white mr-2">✦</span>
                                    Free Access to Nyeras Events
                                </li>
                            </ul>
                            <div className="mt-8 hidden sm:block">
                                <img
                                    src="/advisor.png"
                                    alt="Professional Advisor"
                                    className="w-48 h-auto mx-auto lg:w-64"
                                />
                            </div>
                        </div>
                        {/* Curved accent */}
                        <div className="hidden sm:block absolute bottom-0 right-0 w-full h-24 overflow-hidden">
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute bottom-0 right-0 w-full h-full">
                                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                            </svg>
                        </div>
                    </div>


                    {/* Right Section */}
                    <div className="bg-white p-8 lg:w-1/2">
                        <div className="max-w-md mx-auto">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Talk to our Advisor!
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Your Topic of Interest*
                                    </label>
                                    <select
                                        required
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6600CC]"
                                        value={formData.program}
                                        onChange={(e) =>
                                            setFormData({ ...formData, program: e.target.value })
                                        }
                                    >
                                        <option value="">Select Program</option>
                                        <option value="Java FullStack Development">
                                            Java FullStack Development
                                        </option>
                                        <option value="AI & ML">AI & ML</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Data Analytics">Data Analytics</option>
                                        <option value="AWS + DevOps">AWS + DevOps</option>
                                        <option value="Automation Testing">
                                            Automation Testing
                                        </option>
                                        <option value="Very Large Scale Integration">
                                            Very Large Scale Integration
                                        </option>
                                        <option value="Cyber Security">Cyber Security</option>
                                        <option value="Digital Marketing">
                                            Digital Marketing
                                        </option>
                                        <option value="Human Resources">
                                            Human Resources
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        required
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6600CC]"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        required
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6600CC]"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2">
                                    <select className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6600CC] w-full sm:w-24 mb-2 sm:mb-0">
                                        <option value="+91">+91</option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="Enter Phone"
                                        required
                                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6600CC]"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                    />
                                </div>

                                <button
                                        type="submit"
                                        className={`w-full text-white font-medium py-2 px-4 rounded-md transition duration-300 ${
                                            loading
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-[#6600CC] hover:bg-[#4d0099]'
                                        }`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Submitting...' : 'CONTINUE'}
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {loading && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
                    <div className="loader border-t-4 border-[#6600CC] rounded-full w-12 h-12 animate-spin"></div>
                </div>
            )}
        </>  
    );
}