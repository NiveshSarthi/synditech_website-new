// client/src/components/layout/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { SERVICES, TOOLS } from '../../utils/constants'

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-black border-t border-orange-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black font-orbitron mb-4">
              <span className="text-orange-500">SYNDI</span>
              <span className="text-white">TECH</span>
            </h3>
            <p className="text-gray-400">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-gray-400">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link 
                    to={service.path} 
                    className="hover:text-orange-500 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-bold mb-4 text-white">Tools</h4>
            <ul className="space-y-2 text-gray-400">
              {TOOLS.slice(0, 4).map((tool) => (
                <li key={tool.id}>
                  <Link 
                    to={tool.path} 
                    className="hover:text-orange-500 transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-orange-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-orange-500/30 text-center text-gray-400">
          <p>© 2026 Synditech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer