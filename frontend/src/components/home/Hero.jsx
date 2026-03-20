import React from 'react'
import { Link } from 'react-router-dom'
import { Play, ArrowRight } from 'lucide-react'
import Particles from '../shared/Particles'

const Hero = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-green-700">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
        />
      </div>

      {/* Fallback and overlay backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 to-green-600/40" style={{ zIndex: 1 }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 2 }}>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in text-gray-900">
          <span className="text-green-300">Innovate</span> with Code
        </h1>
        <p className="text-xl md:text-2xl text-green-50 mb-8 max-w-3xl mx-auto slide-in-left">
          Transform your ideas into powerful software solutions. We build SaaS platforms,
          mobile apps, and enterprise systems that drive business growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/contact" className="btn-primary bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-4">
            Start Your Project
            <ArrowRight className="ml-2" size={20} />
          </Link>
          <button className="btn-outline border-white text-gray-900 hover:bg-white hover:text-green-700 text-lg px-8 py-4 flex items-center">
            <Play className="mr-2" size={20} />
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="slide-in-right">
            <div className="text-3xl font-bold text-gray-900">500+</div>
            <div className="text-green-100">Projects Completed</div>
          </div>
          <div className="slide-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-gray-900">98%</div>
            <div className="text-green-100">Client Satisfaction</div>
          </div>
          <div className="slide-in-right" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl font-bold text-gray-900">50+</div>
            <div className="text-green-100">Team Members</div>
          </div>
          <div className="slide-in-right" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl font-bold text-gray-900">24/7</div>
            <div className="text-green-100">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero