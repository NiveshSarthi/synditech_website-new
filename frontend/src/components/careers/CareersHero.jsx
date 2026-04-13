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
    <section className="pt-12 pb-10 px-6 md:px-16 max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <span className="text-green-600 font-medium mb-4">
          Join Our Team
        </span>
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Careers
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto"></div>
        </div>
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
          <button
            type="button"
            onClick={scrollToApplication}
            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-green-600 hover:text-green-600 transition-colors"
          >
            Apply with Resume
          </button>
        </div>
      </div>
    </section>
  )
}

export default CareersHero