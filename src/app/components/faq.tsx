'use client'
import { useState, useEffect } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
export default function Faq() {
    const faqs = [
        {
          question: "What courses does Nyeras offer?",
          answer: "Nyeras offers a wide range of courses in technology, including web development, data science, artificial intelligence, and digital marketing. Our curriculum is constantly updated to reflect the latest industry trends and demands."
        },
        {
          question: "How does the online learning platform work?",
          answer: "Our online learning platform provides video lectures, interactive coding exercises, quizzes, and projects. You can learn at your own pace, with 24/7 access to course materials. We also offer live sessions with instructors for real-time interaction and doubt-clearing."
        },
        {
          question: "Are Nyeras certificates recognized by employers?",
          answer: "Yes, Nyeras certificates are widely recognized in the tech industry. We have partnerships with leading tech companies who value our rigorous curriculum and hands-on learning approach. Many of our graduates have successfully transitioned into new tech careers."
        },
        {
          question: "What kind of support does Nyeras provide to students?",
          answer: "We offer comprehensive support including one-on-one mentoring, code reviews, career counseling, and job placement assistance. Our community forums also allow you to connect with fellow learners and alumni for networking and support."
        },
        {
          question: "How long does it take to complete a course?",
          answer: "Course duration varies depending on the complexity of the subject and your learning pace. On average, our courses take 24-26 weeks to complete if you dedicate 10-15 hours per week. However, you have the flexibility to learn at your own speed."
        },
        {
          question: "Can I switch between different courses?",
          answer: "Yes, Nyeras offers a flexible learning model. You can switch between courses or take multiple courses simultaneously. We recommend focusing on one course at a time for optimal learning, but the choice is yours."
        },
        {
          question: "What are the prerequisites for enrolling in Nyeras courses?",
          answer: "Prerequisites vary by course. While some beginner courses have no prerequisites, advanced courses may require basic programming knowledge or completion of foundational Nyeras courses. Each course page lists specific prerequisites."
        },
        {
          question: "Does Nyeras offer any Internships?",
          answer: "Yes, we offer Several internships in the year to help students gain industry specific Knowledge. These oppurtunities can be checked in Our Career Portal or can be asked to our Career Counsellor."
        },
        {
          question: "How does Nyeras ensure the quality of its courses?",
          answer: "Our courses are developed by industry experts and undergo rigorous quality checks. We continuously update our content based on industry trends and student feedback. We also monitor student progress and satisfaction to maintain high-quality standards."
        },
        {
          question: "What payment options does Nyeras offer?",
          answer: "Nyeras accepts various payment methods including credit/debit cards and PayPal. We also offer flexible payment plans and financial aid options for eligible students to make quality education accessible to all."
        }
      ]
      const [openIndex, setOpenIndex] = useState<number | null>(null)
      useEffect(() => {
        AOS.init({
          duration: 800, // Animation duration in milliseconds
          easing: 'ease-in-out', // Animation easing
          once: true, // Whether animation should happen only once
        })
      }, [])
      const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
      }
  return (
    <section className="relative w-full py-12 bg-white/40">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <h2
          className="text-3xl font-bold text-center mb-8 text-black"
          data-aos="fade-up"
        >
          Frequently Asked Questions
        </h2>
        <p
          className="text-gray-600 text-center mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Here are some common questions about Nyeras. If you have any other questions, feel free to <a href="/contact" className="text-[#6600cc] hover:underline">contact us.</a>
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <button
                className="w-full text-left p-4 focus:outline-none bg-white hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-black">{faq.question}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-black transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50">
                  <p className="text-gray-800">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
        }}
      ></div>
    </section>
  )
}

