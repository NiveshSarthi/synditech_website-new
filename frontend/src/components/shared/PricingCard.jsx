import React from 'react'

const PricingCard = ({ plan }) => {
  return (
    <div className={`card ${plan.popular ? 'ring-2 ring-orange-500' : ''} relative`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <div className="text-4xl font-bold text-gradient mb-1">{plan.price}</div>
        <p className="text-gray-400">{plan.period}</p>
      </div>
      
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all ${
        plan.popular
          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-105'
          : 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
      }`}>
        Get Started
      </button>
    </div>
  )
}

export default PricingCard