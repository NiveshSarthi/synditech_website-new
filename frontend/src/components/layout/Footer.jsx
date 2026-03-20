import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, Send } from 'lucide-react'
import { SERVICES, TOOLS } from '../../utils/constants'

const Footer = () => {
  const [email, setEmail] = React.useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="py-16 px-4 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Social */}
          <div className="lg:col-span-2">
            <motion.h3 
              className="text-3xl font-black font-orbitron mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-green-600">SYNDI</span>
              <span className="text-gray-900">TECH</span>
            </motion.h3>
            <p className="text-gray-600 mb-6">
              Building the future, one line of code at a time.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: '#', label: 'Email' }
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-gray-200 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-gray-900">Services</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link 
                    to={service.path} 
                    className="hover:text-green-600 transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-gray-900">Company</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link to="/about" className="hover:text-green-600 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-green-600 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-green-600 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-600 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4 text-gray-900">Stay Updated</h4>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-600 transition-colors text-sm"
                required
              />
              <motion.button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/50 transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
            <p>© 2026 Synditech. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-green-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer