import React from 'react'
import { Package, BarChart3, Truck, AlertTriangle } from 'lucide-react'

const InventoryManagement = () => {
  const features = [
    { icon: Package, title: 'Stock Tracking', description: 'Real-time inventory monitoring' },
    { icon: BarChart3, title: 'Analytics', description: 'Detailed inventory reports' },
    { icon: Truck, title: 'Order Management', description: 'Streamline order processing' },
    { icon: AlertTriangle, title: 'Low Stock Alerts', description: 'Automatic notifications' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Inventory Management System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track stock levels and orders with our comprehensive inventory management solution.
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
          <a href="/contact" className="btn-primary">Get Inventory Management</a>
        </div>
      </div>
    </div>
  )
}

export default InventoryManagement