import React from 'react'
import { Code, Smartphone, Zap, Shield } from 'lucide-react'

const WebDevelopment = () => {
  const features = [
    { icon: Code, title: 'Modern Frameworks', description: 'React, Vue, Angular, and more' },
    { icon: Smartphone, title: 'Responsive Design', description: 'Perfect on all devices and screen sizes' },
    { icon: Zap, title: 'Performance Optimized', description: 'Fast loading and smooth user experience' },
    { icon: Shield, title: 'Security First', description: 'Built with security best practices' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Web Development</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Build modern, responsive websites that engage your audience and drive results.
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
          <a href="/contact" className="btn-primary">Start Web Development</a>
        </div>
      </div>
    </div>
  )
}

export default WebDevelopment