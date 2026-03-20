import React from 'react'
import { Link } from 'react-router-dom'

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Let's discuss your vision and turn it into reality. Our team of experts
          is ready to help you build something amazing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn-primary text-lg px-8 py-4">
            Get Free Consultation
          </Link>
          <Link to="/pricing" className="btn-outline text-lg px-8 py-4">
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection