import React from 'react'
import { Users, Target, Mail, TrendingUp } from 'lucide-react'

const LeadManagement = () => {
  const features = [
    { icon: Users, title: 'Lead Tracking', description: 'Track and manage leads throughout the pipeline' },
    { icon: Target, title: 'Lead Scoring', description: 'Automatically score leads based on behavior' },
    { icon: Mail, title: 'Automated Follow-ups', description: 'Send automated emails and reminders' },
    { icon: TrendingUp, title: 'Conversion Analytics', description: 'Analyze and improve conversion rates' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Lead Management System</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track and convert leads effectively with our comprehensive lead management solution.
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
          <a href="/contact" className="btn-primary">Get Lead Management</a>
        </div>
      </div>
    </div>
  )
}

export default LeadManagement