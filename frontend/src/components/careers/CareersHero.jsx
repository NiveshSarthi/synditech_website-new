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
    <section className="relative w-full h-[500px] overflow-hidden">
      <img 
        src="/assets/images/Puja_Rani_image_for_career_website_in_websirte_46cdbe2a-bf2b-4b19-96b0-a1f437226c66.jpg"
        alt="Careers Hero"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 30%' }}
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Careers
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-500 mx-auto"></div>
          </div>
          <p className="text-green-400 font-medium mb-4">
            Shape the Future with Us
          </p>
          <p className="text-white font-semibold text-lg max-w-2xl leading-relaxed mb-6">
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
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
            >
              Apply with Resume
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareersHero