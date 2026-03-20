import React from 'react'
import { Cloud, Server, Shield, Zap } from 'lucide-react'

const CloudServices = () => {
  const features = [
    { icon: Cloud, title: 'AWS Services', description: 'Amazon Web Services deployment and management' },
    { icon: Server, title: 'Azure Cloud', description: 'Microsoft Azure cloud solutions' },
    { icon: Shield, title: 'Google Cloud', description: 'Google Cloud Platform expertise' },
    { icon: Zap, title: 'DevOps', description: 'CI/CD pipelines and automation' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Cloud Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deploy and scale with AWS, Azure, and Google Cloud.
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
          <a href="/contact" className="btn-primary">Move to the Cloud</a>
        </div>
      </div>
    </div>
  )
}

export default CloudServices