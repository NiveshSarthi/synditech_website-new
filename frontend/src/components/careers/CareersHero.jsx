import React from 'react'
import { ArrowRight } from 'lucide-react'

const CareersHero = () => {
  const scrollToOpenings = () => {
    const element = document.getElementById('openings')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToApplication = () => {
    const element = document.querySelector('section[data-application]')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="pt-24 pb-16 px-6 md:px-16 max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <span className="text-sm uppercase tracking-widest text-green-600 font-semibold mb-4">
          JOIN OUR TEAM
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-4">
          CAREERS
        </h1>
        <p className="text-green-600 font-medium mb-4">
          Shape the Future with Us
        </p>
        <p className="text-gray-500 max-w-2xl leading-relaxed mb-6">
          Be part of a team that's revolutionizing technology. We offer exciting challenges,
          continuous learning, and the opportunity to work on projects that make a difference.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={scrollToOpenings}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
          >
            View Openings
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          <a
            href="mailto:ranipuja11223344@gmail.com?subject=Job Application&body=Hi,%0D%0A%0D%0AI am interested in applying for a position at Synditech.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0AThank you!"
            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-green-600 hover:text-green-600 transition-colors"
          >
            Apply with Resume
          </a>
        </div>
      </div>
    </section>
  )
}

export default CareersHero