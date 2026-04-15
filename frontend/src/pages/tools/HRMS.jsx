import React from 'react'
import { Users, Calendar, DollarSign, FileText, ExternalLink, Shield, Clock, BarChart3, CheckCircle, Settings, Bell, UserPlus } from 'lucide-react'

const HRMS = () => {
  const features = [
    { icon: Users, title: 'Employee Database', description: 'Complete employee information management with easy access to records' },
    { icon: Calendar, title: 'Leave Management', description: 'Track and manage employee leave requests and approvals' },
    { icon: DollarSign, title: 'Payroll', description: 'Automated payroll processing with tax calculations' },
    { icon: FileText, title: 'Reports', description: 'Generate comprehensive HR reports and analytics' },
    { icon: Shield, title: 'Data Security', description: 'Enterprise-grade security for sensitive employee data' },
    { icon: Clock, title: 'Attendance Tracking', description: 'Real-time attendance monitoring and overtime management' },
    { icon: BarChart3, title: 'Performance Analytics', description: 'Track employee performance and productivity metrics' },
    { icon: Settings, title: 'Custom Workflows', description: 'Configure workflows tailored to your company policies' },
    { icon: Bell, title: 'Notifications', description: 'Automated alerts for birthdays, anniversaries, and deadlines' },
    { icon: UserPlus, title: 'Onboarding', description: 'Streamlined employee onboarding process' }
  ]

  const benefits = [
    'Reduce HR administrative work by 60%',
    'Eliminate manual data entry and errors',
    'Centralize all employee information',
    'Real-time attendance and leave tracking',
    'Automated payroll calculations',
    'Compliance with labor regulations',
    'Mobile-friendly access anywhere',
    '24/7 support and regular updates'
  ]

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <CheckCircle className="w-4 h-4" />
            Trusted by 500+ Businesses
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Human Resource Management System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Streamline your HR operations with our comprehensive, cloud-based HRMS solution. 
            Manage employees, payroll, attendance, and more — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://hrms.synditech.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
            >
              Visit HRMS
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="/contact" className="btn-primary">Get Started</a>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Powerful Features</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Everything you need to manage your workforce efficiently
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card hover:border-green-300 transition-all duration-300">
                <feature.icon className="text-green-500 mb-4" size={36} />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Our HRMS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="text-4xl font-bold text-green-600 mb-2">60%</div>
            <div className="text-gray-600">Time Saved</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your HR Operations?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Get started with our HRMS today and experience seamless workforce management.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://hrms.synditech.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
            >
              Try HRMS Free
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="/contact" className="btn-primary">Contact Sales</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HRMS