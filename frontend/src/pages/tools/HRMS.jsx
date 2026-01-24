import React from 'react'
import { Users, Calendar, DollarSign, FileText } from 'lucide-react'

const HRMS = () => {
  const features = [
    { icon: Users, title: 'Employee Database', description: 'Complete employee information management' },
    { icon: Calendar, title: 'Leave Management', description: 'Track and manage employee leave' },
    { icon: DollarSign, title: 'Payroll', description: 'Automated payroll processing' },
    { icon: FileText, title: 'Reports', description: 'Generate HR reports and analytics' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">HRMS</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete HR management solution for modern businesses.
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
          <a href="/contact" className="btn-primary">Get HRMS</a>
        </div>
      </div>
    </div>
  )
}

export default HRMS