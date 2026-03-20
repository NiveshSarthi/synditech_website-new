import React from 'react'
import { Layers, Zap, Shield, Code } from 'lucide-react'

const APIIntegration = () => {
  const features = [
    { icon: Layers, title: 'RESTful APIs', description: 'Modern REST API design and implementation' },
    { icon: Zap, title: 'GraphQL', description: 'Flexible and efficient data fetching' },
    { icon: Shield, title: 'Secure Integration', description: 'OAuth, JWT, and enterprise security' },
    { icon: Code, title: 'Third-party APIs', description: 'Integration with popular services and platforms' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">API Integration</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect your systems seamlessly with powerful API solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <feature.icon className="text-green-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="/contact" className="btn-primary">Integrate Your Systems</a>
        </div>
      </div>
    </div>
  )
}

export default APIIntegration