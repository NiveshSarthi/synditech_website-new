import React, { useEffect, createContext, useContext, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatBot from '../shared/ChatBot'
import ScrollProgressBar from '../shared/ScrollProgressBar'
import ProjectModal from '../shared/ProjectModal'
import { pageTransition } from '../../utils/animations'

export const ProjectModalContext = createContext()

export const useProjectModal = () => useContext(ProjectModalContext)

const Layout = () => {
  const location = useLocation()
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  const openProjectModal = () => setIsProjectModalOpen(true)
  const closeProjectModal = () => setIsProjectModalOpen(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <ProjectModalContext.Provider value={{ openProjectModal, closeProjectModal }}>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar openProjectModal={openProjectModal} />
        <ScrollProgressBar />
        
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-green-600 focus:text-gray-900 focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        
        <AnimatePresence mode='wait'>
          <motion.main
            key={location.pathname}
            id="main-content"
            className="flex-grow pt-4"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />
        <ChatBot />
        <ProjectModal isOpen={isProjectModalOpen} onClose={closeProjectModal} />
      </div>
    </ProjectModalContext.Provider>
  )
}

export default Layout
