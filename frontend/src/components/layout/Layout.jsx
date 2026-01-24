import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatBot from '../shared/ChatBot'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default Layout