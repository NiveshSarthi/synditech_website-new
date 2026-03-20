import React from 'react'
import { DollarSign, FileText, TrendingUp, Calculator } from 'lucide-react'

const AccountManagement = () => {
  const features = [
    { icon: DollarSign, title: 'Financial Tracking', description: 'Monitor income and expenses' },
    { icon: FileText, title: 'Invoicing', description: 'Generate professional invoices' },
    { icon: TrendingUp, title: 'Reports', description: 'Financial reports and analytics' },
    { icon: Calculator, title: 'Tax Management', description: 'Tax calculation and reporting' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Account Management System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage finances and accounts with our comprehensive accounting solution.
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
          <a href="/contact" className="btn-primary">Get Account Management</a>
        </div>
      </div>
    </div>
  )
}

export default AccountManagement