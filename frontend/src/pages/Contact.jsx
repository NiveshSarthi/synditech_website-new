// client/src/pages/Contact.jsx
import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { contactAPI } from '../utils/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await contactAPI.submit(formData)
      if (response.data.success) {
        setSuccess(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-glass-box">
          <div className="contact-header animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Get In Touch</h1>
            <p className="text-lg text-green-600">Let's discuss your project and bring your ideas to life</p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto mt-4"></div>
          </div>

          <div className="contact-grid">
            <div className="animate-slide-in-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Send us a message</h2>
              
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-500 rounded-xl text-green-700 text-sm">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-500 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-input resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="contact-submit-btn flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-4 animate-slide-in-right">
              <div className="contact-info-card">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">contact@synditech.ai</p>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm">+91 9560037154</p>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600 text-sm break-words leading-relaxed">BH-918, 9th Floor, 81 High Street-Puri Business Hub, Sec-81, Faridabad, Haryana, 121002</p>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Business Hours</h3>
                <div className="space-y-1 text-gray-600 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="text-green-600 font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-green-600 font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-green-600 font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 text-center">Visit Our Office</h2>
          <div className="public-panel rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.8947!2d77.3087!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd7f47c7c36b!2sBH-918,%2081%20High%20Street-Puri%20Business%20Hub,%20Sec-81,%20Faridabad,%20Haryana%20121002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Synditech Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
