import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const ToolCard = ({ tool }) => {
  const Icon = tool.icon

  return (
    <div className="card group">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-green-600/10 rounded-lg mr-4">
          <Icon className="text-green-500" size={24} />
        </div>
        <h3 className="text-xl font-semibold">{tool.name}</h3>
      </div>
      
      <p className="text-gray-600 mb-6">{tool.description}</p>
      
      <ul className="space-y-2 mb-6">
        {tool.benefits.map((benefit, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            {benefit}
          </li>
        ))}
      </ul>
      
      <Link to={tool.path} className="flex items-center text-green-500 hover:text-orange-300 transition-colors group-hover:translate-x-1">
        Explore Tool
        <ArrowRight size={16} className="ml-2" />
      </Link>
    </div>
  )
}

export default ToolCard