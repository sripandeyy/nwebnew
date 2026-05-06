
import React from 'react'
import Topbar from '../components/Topbar'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CookiePolicyPage() {
  return (
    <>
   <Topbar />
    <Header />
    <div className="container mx-auto px-4 py-8 pt-28">
      <h1 className="text-3xl font-bold mb-6 text-orange-500 text-center">Cookie Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What are cookies?</h2>
        <p className="mb-4">
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How we use cookies</h2>
        <p className="mb-4">
          We use cookies for a variety of reasons, including:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To provide essential website functionality</li>
          <li>To remember your preferences</li>
          <li>To improve website performance</li>
          <li>To analyze how our website is used</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Types of cookies we use</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Essential cookies:</strong> These are necessary for the website to function properly.</li>
          <li><strong>Preference cookies:</strong> These remember your choices and personalize your experience.</li>
          <li><strong>Analytics cookies:</strong> These help us understand how visitors interact with our website.</li>
          <li><strong>Marketing cookies:</strong> These are used to deliver relevant advertisements and track their effectiveness.</li>
        </ul>
      </section>

    </div>
    <Footer />
    </>
  )
}
