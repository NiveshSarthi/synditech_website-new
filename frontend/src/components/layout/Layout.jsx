import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatBot from '../shared/ChatBot'
import ScrollProgressBar from '../shared/ScrollProgressBar'
import BackToTop from '../shared/BackToTop'
import { pageTransition } from '../../utils/animations'

const Layout = ({ children }) => {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <ScrollProgressBar />
      
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-green-600 focus:text-gray-900 focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar />
      
      <AnimatePresence mode='wait'>
        <motion.main
          key={location.pathname}
          id="main-content"
          className="flex-grow"
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <ChatBot />
      <BackToTop />
    </div>
  )
}

export default Layout