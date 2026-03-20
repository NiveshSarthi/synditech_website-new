// client/src/pages/services/SaasDevelopment.jsx
// This is a template - create similar files for all services

import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Cloud } from 'lucide-react'

const SaasDevelopment = () => {
  const features = [
    'Multi-tenant Architecture',
    'Scalable Cloud Infrastructure',
    'API-First Development',
    'Real-time Data Sync',
    'Advanced Security',
    'Auto-scaling Capabilities'
  ]

  const benefits = [
    {
      title: 'Scalability',
      desc: 'Built to grow with your business from day one'
    },
    {
      title: 'Cost-Effective',
      desc: 'Pay only for what you use with cloud infrastructure'
    },
    {
      title: 'Security',
      desc: 'Enterprise-grade security and data protection'
    },
    {
      title: 'Performance',
      desc: 'Lightning-fast performance and reliability'
    }
  ]

  const techStack = [
    'React / Vue / Angular',
    'Node.js / Python / Go',
    'PostgreSQL / MongoDB',
    'AWS / Azure / GCP',
    'Docker / Kubernetes',
    'Redis / RabbitMQ'
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-6">
            <Cloud className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            SaaS Development
          </h1>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Build scalable, cloud-based software solutions that grow with your business
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto mt-4"></div>
        </div>

        {/* Overview */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="animate-slide-in-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our SaaS development services help businesses create powerful, scalable cloud applications. 
              We handle everything from architecture design to deployment and ongoing maintenance.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              With expertise in modern cloud technologies and best practices, we build solutions that 
              are secure, performant, and ready to scale with your growing user base.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
            <ul className="space-y-3">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Process</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Discovery', desc: 'Understanding your requirements and goals' },
                  { step: '2', title: 'Design', desc: 'Creating architecture and UI/UX' },
                  { step: '3', title: 'Development', desc: 'Building your application' },
                  { step: '4', title: 'Testing', desc: 'Rigorous quality assurance' },
                  { step: '5', title: 'Deployment', desc: 'Launching to production' },
                  { step: '6', title: 'Support', desc: 'Ongoing maintenance and updates' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="card text-center animate-fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="card mb-20 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Technologies We Use</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, idx) => (
              <div key={idx} className="bg-white/5 border border-green-600/20 rounded-xl p-4 text-center hover:border-green-600 transition-colors">
                <span className="text-gray-900 font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study / Example */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="card animate-slide-in-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Success Story</h3>
            <p className="text-gray-600 mb-4">
              We helped a startup build a SaaS platform that now serves over 10,000 users. 
              The platform handles millions of transactions monthly with 99.9% uptime.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>50% reduction in infrastructure costs</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>3x faster page load times</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Auto-scaling to handle traffic spikes</span>
              </li>
            </ul>
          </div>

          <div className="card animate-slide-in-right bg-gradient-to-br from-green-600/10 to-green-700/5">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build?</h3>
            <p className="text-gray-600 mb-6">
              Let's discuss your SaaS project and create a solution that exceeds your expectations.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center">
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center card bg-gradient-to-r from-green-600/20 to-green-700/10 border-green-600/30 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Transform Your Idea Into Reality
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our SaaS development experts
          </p>
          <Link to="/contact" className="btn-primary shadow-lg shadow-green-600/50">
            Get Free Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SaasDevelopment

// NOTE: Create similar files for other services:
// - EcommerceSolutions.jsx
// - MobileAppDevelopment.jsx
// - WebDevelopment.jsx
// - APIIntegration.jsx
// - CloudServices.jsx
// 
// Just change the icon, title, content, and features accordingly