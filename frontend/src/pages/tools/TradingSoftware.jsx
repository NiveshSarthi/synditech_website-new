import React from 'react'
import { TrendingUp, BarChart3, Zap, Shield } from 'lucide-react'

const TradingSoftware = () => {
  const features = [
    { icon: TrendingUp, title: 'Real-time Data', description: 'Live market data and updates' },
    { icon: BarChart3, title: 'Analytics', description: 'Advanced trading analytics' },
    { icon: Zap, title: 'Automated Trading', description: 'Algorithmic trading capabilities' },
    { icon: Shield, title: 'Secure Platform', description: 'Bank-level security for trading' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Trading Software</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced trading platform for professional traders.
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
          <a href="/contact" className="btn-primary">Get Trading Software</a>
        </div>
      </div>
    </div>
  )
}

export default TradingSoftware