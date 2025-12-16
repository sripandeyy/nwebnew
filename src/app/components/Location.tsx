import React from 'react'
import{MapPin} from 'lucide-react';
const Location = () => {
  return (
    <section className="bg-white/40 pt-0 pb-12 lg:pt-2 lg:pb-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col justify-center items-center mb-6">
  <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center">
    Our Location
  </h3>
  <p className="text-center mt-2 text-gray-600">
  We are centrally located, just a few minutes away from major landmarks
  </p>
</div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        {/* Google Maps Embed */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.982316230066!2d77.64066557518507!3d12.908858016250493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158ac2a58ebb%3A0x8aeef3a21b734303!2sNyeras%20Corporate%20Office!5e0!3m2!1sen!2sin!4v1732007632082!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            aria-hidden="false"
          ></iframe>
        </div>
  
        {/* Location Details */}
        <div className="mt-10 lg:mt-0">
        <h3 className="text-3xl lg:text-5xl font-semibold text-gray-900 mb-4">NYERAS Edu-tech and Innovations Pvt. Ltd.</h3>
  
          <p className="text-xl text-gray-600 mb-6">
            We&apos;re located in the heart of the city, easily accessible by public transportation.
          </p>
          <div className="flex items-start mb-4">
            <MapPin className="h-6 w-6 text-[#6600CC] mr-2 mt-1" />
            <p className="text-gray-600">
            Floor No.2, 1161, AECS Layout Main Rd, AECS Layout - A Block, AECS Layout, Singasandra, Kudlu, Bengaluru, Karnataka 560068
            </p>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Floor%20No.2%2C%201161%2C%20AECS%20Layout%20Main%20Rd%2C%20AECS%20Layout%20-%20A%20Block%2C%20AECS%20Layout%2C%20Singasandra%2C%20Kudlu%2C%20Bengaluru%2C%20Karnataka%20560068"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6600CC] hover:underline"
          >
            <button
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6600CC] hover:bg-[#4d0099] transition-colors duration-300"
            >
              Get Directions
            </button>
          </a>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Location
