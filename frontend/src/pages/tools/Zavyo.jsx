import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Zap, MessageCircle, BarChart3, Shield, Clock, Database, Lock, Award } from 'lucide-react'

const Zavyo = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Automation',
      description: 'Automate customer conversations with AI-powered responses and workflow triggers.'
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      description: 'Send real-time alerts and updates to your customers via WhatsApp.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track message delivery, open rates, and customer engagement metrics.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Built on official WhatsApp Business API with end-to-end encryption.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'AI chatbot handles queries round the clock without human intervention.'
    },
    {
      icon: MessageCircle,
      title: 'Multi-agent Support',
      description: 'Route conversations to specific team members based on keywords or departments.'
    }
  ]

  const securityFeatures = [
    {
      icon: Database,
      title: 'Single-Tenant Database',
      description: 'Dedicated database infrastructure for enhanced security and performance.'
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All messages are securely encrypted ensuring complete data privacy.'
    },
    {
      icon: Award,
      title: 'SOC2 Type II Certified',
      description: 'Certified infrastructure meeting enterprise security standards.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center mb-6">
              <img 
                src="/assets/images/zavyo-icon.svg" 
                alt="Zavyo Icon" 
                className="w-20 h-20" 
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-green-600">Zavyo's</span> Conversations, Leads, Campaigns & Performance
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              All in one place. Track user interactions, monitor AI responses, and manage your entire WhatsApp automation system without switching tools.
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Real-Time Control, One View
            </p>
            <p className="text-base text-green-600 font-medium mb-8">
              Everything you need to capture, engage, and convert — powered by WhatsApp + AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://zavyo.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Visit Zavyo
                <ExternalLink className="w-5 h-5" />
              </a>
              <a 
                href="https://zavyo.io/book-demo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:border-green-600 hover:text-green-600 transition-colors"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to automate WhatsApp marketing and engage customers effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your data security is our top priority with industry-leading infrastructure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your WhatsApp Marketing?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Get started with Zavyo today and automate your customer communications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/free-trial?tool=zavyo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-700 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Free Trial
              <ExternalLink className="w-4 h-4" />
            </Link>
            <a 
              href="https://zavyo.io/book-demo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-700 transition-colors"
            >
              Book a Demo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Zavyo
