'use client';

import React from 'react'

import Topbar from '../../components/Topbar'
import Header from '../../components/Header'
import { useState } from 'react'
import { Download, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../../components/Footer'
import Form from '../../components/Form';
import Connect from '../Connect';
export default function Datascience() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const sections = [
    {
      title: "Introduction to Cyber Security",
      topics: [
        "Definition and Scope of Cyber Security",
        "Evolution of Cyber Threats",
        "Importance of Cyber Security Awareness",
        "Cyber Security Career Paths",
      ],
    },
    {
      title: "Basic Networking Concepts",
      topics: [
        "Overview of Networking Fundamentals",
        "Types of Networks (LAN, WAN, MAN)",
        "Network Protocols (TCP/IP, UDP, ICMP)",
        "Networking Devices (Router, Switch, Hub)",
        "Subnetting and IP Addressing",
      ],
    },
    {
      title: "Operating System Security",
      topics: [
        "OS Security Principles",
        "User Authentication and Authorization",
        "Security Features in Windows, Linux, and MacOS",
        "Patch Management and Software Updates",
        "Hardening Operating Systems",
      ],
    },
    {
      title: "Cryptography",
      topics: [
        "Foundations of Cryptography",
        "Encryption Algorithms (Symmetric and Asymmetric)",
        "Hash Functions and Digital Signatures",
        "Cryptographic Applications in Security",
      ],
    },
    {
      title: "Web Security",
      topics: [
        "Common Web Vulnerabilities",
        "Web Application Firewall (WAF)",
        "HTTPS and SSL/TLS",
        "Content Security Policy (CSP)",
      ],
    },
    {
      title: "Network Security",
      topics: [
        "Firewall and Intrusion Detection System (IDS)",
        "Virtual Private Networks (VPNs)",
        "Network Segmentation",
        "Incident Response in Network Security",
      ],
    },
    {
      title: "Malware and Antivirus",
      topics: [
        "Types of Malware (Viruses, Worms, Trojans)",
        "Malware Analysis Techniques",
        "Antivirus and Anti-Malware Solutions",
        "Behavioral Analysis for Malware Detection",
        "Best Practices for Malware Prevention",
      ],
    },
    {
      title: "Incident Response",
      topics: [
        "Incident Response Life-Cycle",
        "Incident Detection and Analysis",
        "Post-Incident Reporting",
      ],
    },
    {
      title: "Social Engineering and Phishing",
      topics: [
        "Social Engineering Tactics and Techniques",
        "Phishing Attacks and Prevention",
        "Social Engineering in the Digital Age",
        "User Awareness Training",
        "Incident Response to Social Engineering",
      ],
    },
    {
      title: "Endpoint Security",
      topics: [
        "Importance of Endpoint Security",
        "Endpoint Protection Solutions",
        "Host-Based Firewall and Antivirus",
        "Device Control and Data Encryption",
        "Mobile Device Security",
      ],
    },
    {
      title: "Cloud Security",
      topics: [
        "Cloud Computing Models and Deployment Models",
        "Cloud Security Challenges",
        "Encryption and Key Management in the Cloud",
        "Best Practices for Securing Cloud Environments",
      ],
    },
    {
      title: "Access Control and Authentication",
      topics: [
        "Access Control Models (RBAC, ABAC)",
        "Authentication Methods (MFA, Biometrics)",
        "Single Sign-On (SSO) Solutions",
        "Access Control Best Practices",
        "Role of Identity and Access Management (IAM)",
      ],
    },
    {
      title: "Legal and Ethical Aspects of Cyber Security",
      topics: [
        "Overview of Cyber Security Laws and Regulations",
        "Ethical Considerations in Cyber Security",
        "Privacy and Data Protection Laws",
        "International Cooperation and Information Sharing",
      ],
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleDownload = async () => {
    const { name, email, phone } = formData;

    // Validate form fields
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill all the fields.");
      return;
    }
    if (phone.length !== 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      // Send a POST request to the server
      const response = await fetch('/api/BrochureDownload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          course: "Cybersecurity",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit data.");
        return;
      }

      // Proceed to download the file
      const fileUrl = "/Brochures/Cybersecurity.pdf";

      const fileResponse = await fetch(fileUrl);
      if (!fileResponse.ok) {
        throw new Error(`Failed to fetch file. Status: ${fileResponse.status}`);
      }

      const blob = await fileResponse.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "Cybersecurity_Brochure.pdf";
      link.click();
      window.URL.revokeObjectURL(fileURL);
      setModalOpen(false);
    } catch (error) {
      console.error("Error", error);
      setError("An error occurred. Please try again later.");
    }
  };
  // const originalPrice = 14999
  // const discountedPrice = 6999

  // const calculateDiscountPercentage = (original: number, discounted: number): number => {
  //   const discount = original - discounted
  //   const percentage = (discount / original) * 100
  //   return Math.round(percentage)
  // }
  // const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice)


  return (
    <>

      <Topbar />
      <Header />
      <div className="min-h-screen  to-white pt-20">

        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start ">
            {/* Left column */}
            <div className="flex flex-col items-center space-y-4">
              {/* Course Image */}
              <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img
                  src="/courses/cybersecurity.jpg"
                  alt="Course preview"
                  // layout="fill"
                  // objectFit="cover"
                  className="w-full h-full object-center object-cover"
                />
              </div>


              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
                <button
                  type="button"
                  onClick={openModal}
                  className="group flex-1 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-orange-600 bg-white border-2 border-orange-600 rounded-lg shadow-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 ease-in-out"
                >
                  <span className="relative overflow-hidden flex items-center">
                    <Download className="w-5 h-5 mr-2 transition-transform duration-300 ease-in-out group-hover:translate-y-1" />
                    <span className="relative z-10">Download Brochure</span>
                    <span className="absolute inset-0 bg-orange-100 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                  </span>
                </button>

                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    const numbers = ["7899232512", "9182566926"];
                    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
                    window.location.href = `tel:${randomNumber}`;
                  }}
                  className="group flex-1 inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <PhoneCall className="w-5 h-5 mr-3 transition-transform duration-300 ease-in-out group-hover:rotate-12" />
                  <span className="relative">
                    Connect with a Counsellor
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                  </span>
                </button>
              </div>


            </div>


            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
                  <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-t-lg p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">Download Brochure</h2>
                      <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <form className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-medium rounded-md shadow-sm hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5 inline-block mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Right column */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-black">Cybersecurity</h1>
              <div className="mt-3">
                <h2 className="sr-only">Course information</h2>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg p-2 max-w-md w-full">
                      <p className="text-xl font-bold text-white text-center">DYNAMIC PRICING</p>
                    </div>
                    <p className="text-lg text-blue-600 font-medium ">
                      (Customized plans just for students)
                    </p>
                  </div>
                </div>

              </div>



              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className="h-5 w-5 flex-shrink-0 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="sr-only">4.5 out of 5 stars</p>
                  <p className="ml-2 text-sm text-gray-900">Based on 256 reviews</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <p className="text-base text-gray-700">
                  Protect the digital world with this in-depth Cybersecurity course designed to equip you with essential skills in safeguarding systems and networks. Learn advanced techniques in threat analysis, vulnerability assessment, and penetration testing. Gain expertise in tools like Wireshark, Metasploit, and Splunk while mastering concepts such as encryption, firewall management, and incident response. Build practical knowledge with real-world scenarios and become a proficient cybersecurity professional ready to tackle modern challenges.
                </p>

              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="ml-2 text-sm text-gray-700">6 Months of intensive training</p>
                </div>
                <div className="mt-2 flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="ml-2 text-sm text-gray-700">Certificate upon completion</p>
                </div>
                <div className="mt-2 flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="ml-2 text-sm text-gray-700">24/7 access to course materials</p>
                </div>
              </div>

              <div className="mt-10 flex sm:flex-col1">
                <Link href="https://pages.razorpay.com/nyeras-cyber-security">
                  <button
                    type="submit"
                    className="max-w-xs flex-1 bg-slate-900 dark:bg-slate-800 border border-slate-700/50 rounded-xl py-3 px-8 flex items-center justify-center text-base font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:w-full hover-lift transition-all"
                  >
                    Enroll Now
                  </button>
                </Link>

                <button
                  type="button"
                  className="ml-4 py-3 px-4 rounded-md flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 relative"
                  disabled
                >
                  <span className="mr-2">Pay in EMI</span>
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-blue-800">
                    Coming Soon
                  </span>
                </button>
              </div>

              {/* Instructor */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h3 className="text-sm font-medium text-gray-900">Instructor</h3>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/instructor.png"
                      alt="Instructor"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                    <p className="text-sm text-gray-500">Senior Web Developer, 10+ years experience</p>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h3 className="text-sm font-medium text-gray-900">Policies</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-700">No Refund Policy</p>
                  <p className="text-sm text-gray-700">Lifetime access to course updates</p>
                  <p className="text-sm text-gray-700">Certificate of completion</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-24 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Course Curriculum</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-4 px-6">
                    <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                  </div>
                  <ul className="py-4 px-6 space-y-2">
                    {section.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>

      <Connect />
      <Form />
      <Footer />
    </>
  )
}
