import React from 'react'
import { Smartphone, Apple, Code, Zap } from 'lucide-react'

const MobileAppDevelopment = () => {
  const features = [
    { icon: Smartphone, title: 'Cross-Platform', description: 'iOS and Android apps from single codebase' },
    { icon: Apple, title: 'iOS Development', description: 'Native iOS apps with Swift/Objective-C' },
    { icon: Smartphone, title: 'Android Development', description: 'Native Android apps with Kotlin/Java' },
    { icon: Code, title: 'Modern Frameworks', description: 'React Native, Flutter, and native technologies' },
    { icon: Zap, title: 'Performance Optimized', description: 'Fast, responsive, and battery-efficient apps' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Mobile App Development</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create engaging mobile experiences that connect with your users wherever they are.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <feature.icon className="text-orange-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="/contact" className="btn-primary">Build Your Mobile App</a>
        </div>
      </div>
    </div>
  )
}

export default MobileAppDevelopment