// import Image from "next/image"

import Link from "next/link"
import Header from "../components/Header"
import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

export default function AboutPage() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-white/60">
      <Topbar />
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 sm:pt-36 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center bg-white/40">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About Nyeras Edutech
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Empowering learners through innovative educational technology solutions.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-[#6600CC] mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700">
            At Nyeras, we&apos;re on a mission to revolutionize education through innovative technology. Our platform empowers learners and educators by providing personalized, engaging, and accessible learning experiences. Whether you&apos;re a student striving to reach your goals or an educator looking to enhance your teaching methods, we&apos;re here to support your journey. 
            Join us as we transform the way knowledge is shared and inspire a lifelong love of learning. Explore our resources, connect with a vibrant community, and discover how we can help you achieve your educational aspirations. Together, let&apos;s shape the future of learning!.
            </p>
          </div>
        </section>

        {/* YouTube Video Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/40">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#6600CC] mb-6 text-center">Founder&apos;s Journey</h2>
            <div className="relative w-full aspect-video">
              <iframe 
                loading="lazy" 
                title="Nyeras Edutech Introduction" 
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/Z8e-65cMXJs?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/40">
          <h2 className="text-3xl font-semibold text-[#6600CC] mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25", title: "Interactive Learning", description: "Engaging content that makes learning fun and effective." },
              { icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", title: "Collaborative Platform", description: "Connect with peers and educators from around the world." },
              { icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", title: "Adaptive Learning", description: "Personalized learning paths tailored to individual needs." }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-purple-200 p-6 flex flex-col items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-[#6600CC] mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>
                <h3 className="text-xl font-semibold mb-2 text-[#6600CC]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-white/40">
          <h2 className="text-3xl font-semibold mb-6">Ready to Transform Education?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in our mission to make learning accessible, engaging, and effective for everyone.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#6600CC] bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6600CC] transition duration-150 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Get in Touch
          </Link>
        </section>
      </main>

      <Footer />
    </div>
    </>
  )
}

