import React from 'react'
import { CheckSquare, Users, Clock, BarChart3 } from 'lucide-react'

const TaskTracker = () => {
  const features = [
    { icon: CheckSquare, title: 'Task Management', description: 'Create, assign, and track tasks with ease' },
    { icon: Users, title: 'Team Collaboration', description: 'Work together seamlessly with your team' },
    { icon: Clock, title: 'Time Tracking', description: 'Monitor time spent on tasks and projects' },
    { icon: BarChart3, title: 'Progress Analytics', description: 'Visual reports on project progress' }
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Task Tracker</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage tasks and projects efficiently with our comprehensive task tracking solution.
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
          <a href="/contact" className="btn-primary">Get Task Tracker</a>
        </div>
      </div>
    </div>
  )
}

export default TaskTracker