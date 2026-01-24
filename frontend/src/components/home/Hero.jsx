import React from 'react'
import { Link } from 'react-router-dom'
import { Play, ArrowRight } from 'lucide-react'

const Hero = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* GridScan Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover"
      >
        <source src="/assets/12716-241674181_small.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback and overlay backgrounds */}
      <div className="absolute inset-0 bg-black/50" style={{ zIndex: 1 }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-blue-900/20" style={{ zIndex: 1 }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" style={{ zIndex: 1 }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 2 }}>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in">
          <span className="text-gradient">Innovate</span> with Code
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto slide-in-left">
          Transform your ideas into powerful software solutions. We build SaaS platforms,
          mobile apps, and enterprise systems that drive business growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/contact" className="btn-primary text-lg px-8 py-4">
            Start Your Project
            <ArrowRight className="ml-2" size={20} />
          </Link>
          <button className="btn-outline text-lg px-8 py-4 flex items-center">
            <Play className="mr-2" size={20} />
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="slide-in-right">
            <div className="text-3xl font-bold text-gradient">500+</div>
            <div className="text-gray-400">Projects Completed</div>
          </div>
          <div className="slide-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-gradient">98%</div>
            <div className="text-gray-400">Client Satisfaction</div>
          </div>
          <div className="slide-in-right" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl font-bold text-gradient">50+</div>
            <div className="text-gray-400">Team Members</div>
          </div>
          <div className="slide-in-right" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl font-bold text-gradient">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero