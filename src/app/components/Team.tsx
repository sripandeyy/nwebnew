import React from 'react'

const Team = () => {
  return (
    <section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="flex justify-center items-center mb-6">
  <div className="inline-flex rounded-full border-2 border-black  px-6 py-2 transition-transform hover:scale-105">
    <span className="text-lg font-semibold text-black">MEET OUR TEAM</span>
  </div>
</div>
    {/* Team Members Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          name: 'K Sekhar',
          role: 'President',
          image: '/',
        },
        {
          name: 'K S Pavan Sai',
          role: 'Founder and Director',
          image: '/',
        },
        {
          name: 'K S Yeswanth Sai',
          role: 'Co-Founder & Managing Director',
          image: '/',
        },
        {
          name: 'E Naveen Kumar',
          role: 'Chief Manager - Technical',
          image: '/',
        },
      ].map((member, index) => (
        <div
          key={index}
          className="text-center"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          {/* Member Image */}
          <img
            src={member.image}
            alt={member.name}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          {/* Member Name */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
          {/* Member Role */}
          <p className="text-gray-600">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}

export default Team
