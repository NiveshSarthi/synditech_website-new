import React from 'react'
import { ShoppingCart, CreditCard, Truck, BarChart3, Smartphone } from 'lucide-react'

const EcommerceSolutions = () => {
  const features = [
    { icon: ShoppingCart, title: 'Custom Storefront', description: 'Beautiful, responsive online stores' },
    { icon: CreditCard, title: 'Payment Integration', description: 'Secure payment gateways and processing' },
    { icon: Truck, title: 'Inventory Management', description: 'Real-time stock tracking and orders' },
    { icon: BarChart3, title: 'Analytics & Reporting', description: 'Detailed insights into sales performance' },
    { icon: Smartphone, title: 'Mobile Commerce', description: 'Optimized for mobile shopping experience' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">E-commerce Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create powerful online stores that drive sales and provide exceptional
            shopping experiences for your customers.
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
          <a href="/contact" className="btn-primary">Start Your E-commerce Project</a>
        </div>
      </div>
    </div>
  )
}

export default EcommerceSolutions