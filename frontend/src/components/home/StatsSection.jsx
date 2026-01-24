import React from 'react'

const StatsSection = () => {
  const stats = [
    { number: '500+', label: 'Projects Completed', icon: '🚀' },
    { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { number: '50+', label: 'Team Members', icon: '👥' },
    { number: '24/7', label: 'Support Available', icon: '🕐' },
    { number: '3+', label: 'Years Experience', icon: '📈' },
    { number: '100%', label: 'On-time Delivery', icon: '⏰' }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500/5 to-orange-600/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection