import React from 'react'
import FAQSection from '../components/shared/FAQSection'
import { motion } from 'framer-motion'

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero-like header for the FAQ page */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center rounded-full border border-green-400 bg-green-100 px-6 py-2 text-sm font-semibold text-green-700 shadow-sm mb-6">
              Support Center
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            How can we <span className="text-green-600">help you?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Find answers to common questions about our platform, tools, and services. 
            If you need more help, our support team is just a click away.
          </motion.p>
        </div>
      </section>

      {/* Reusable FAQ Section */}
      <FAQSection />
    </div>
  )
}

export default FAQ
