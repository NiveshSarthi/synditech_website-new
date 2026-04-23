import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle, Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  { id: 'general', label: 'General & About' },
  { id: 'pricing', label: 'Pricing & Billing' },
  { id: 'features', label: 'Features' },
  { id: 'support', label: 'Support' },
]

const FAQ_DATA = {
  general: [
    { q: "What is Synditech.ai?", a: "Synditech.ai is a technology-driven SaaS and automation company providing AI-powered solutions for businesses, including CRM systems, WhatsApp automation, workflow automation, and custom software development." },
    { q: "What makes Synditech different?", a: "Synditech.ai combines AI automation, official WhatsApp integration, advanced CRM capabilities, and custom development services all in one platform." },
    { q: "How can I get started?", a: "Get started by booking a personalized demo through our official website." },
    { q: "Do you provide support?", a: "Yes, we offer complete onboarding support including setup assistance, technical training, and ongoing dedicated support." },
    { q: "Where are you available?", a: "We provide services globally across different time zones and regions." },
  ],
  pricing: [
    { q: "How does pricing work?", a: "We offer flexible pricing plans based on your business needs. Contact our sales team for a customized quote." },
    { q: "Any hidden charges?", a: "No, we believe in transparent pricing. All features and costs are clearly mentioned in our plans." },
    { q: "Do you offer a free trial?", a: "Yes, we offer a 14-day free trial for all new users to explore our features." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, UPI, bank transfers, and enterprise invoicing." },
    { q: "Can I change my plan later?", a: "Yes, you can upgrade or downgrade your plan at any time." },
  ],
  features: [
    { q: "What services do you offer?", a: "WhatsApp automation, AI chatbots, CRM solutions, marketing automation, SaaS development, and custom software." },
    { q: "What is WhatsApp automation?", a: "Official WhatsApp API automation for notifications, automated replies, and workflows at scale." },
    { q: "Do you provide custom development?", a: "Yes, we build custom SaaS platforms, CRM systems, and enterprise-grade applications." },
    { q: "What are AI chatbot advantages?", a: "Instant responses, 24/7 availability, lead qualification, and automated workflows." },
    { q: "Do you support marketing automation?", a: "Yes, automated multi-channel campaigns through WhatsApp, email, and CRM workflows." },
    { q: "Do you offer CRM solutions?", a: "Yes, advanced CRM systems for lead management, sales pipelines, and follow-ups." },
    { q: "Can you automate customer support?", a: "Yes, AI chatbots and workflows handle common queries and routing." },
  ],
  support: [
    { q: "How can I contact support?", a: "Email us at support@synditech.ai, WhatsApp chat, or through our in-app chat feature." },
    { q: "What are your support hours?", a: "Standard support is available 24/7 for all plans." },
    { q: "Do you offer technical training?", a: "Yes, comprehensive training for all new customers as part of onboarding." },
    { q: "What if I encounter technical issues?", a: "Our team typically responds within 2 hours." },
    { q: "Is documentation available?", a: "Yes, extensive docs, video tutorials, and knowledge base articles in our help center." },
  ],
}

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('general')
  const [openIndex, setOpenIndex] = useState(null)

  const searchAllCategories = () => {
    if (!searchQuery.trim()) return null
    const results = {}
    Object.keys(FAQ_DATA).forEach(catId => {
      const matches = FAQ_DATA[catId].filter(f =>
        f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (matches.length > 0) {
        results[catId] = matches
      }
    })
    return Object.keys(results).length > 0 ? results : null
  }

  const searchResults = searchAllCategories()
  const isSearching = searchQuery.trim()
  const currentFaqs = FAQ_DATA[activeCategory]

  const toggleQuestion = (uniqueId) => {
    setOpenIndex(openIndex === uniqueId ? null : uniqueId)
  }

  const renderFaqItem = (item, index, categoryId = activeCategory) => {
    const uniqueId = `${categoryId}-${index}`
    const isOpen = openIndex === uniqueId
    return (
      <div
        key={uniqueId}
        className={`rounded-xl border transition-all ${
          isOpen ? 'border-green-600/30 bg-green-50/30' : 'border-gray-200 hover:border-green-600/30'
        }`}
      >
        <button
          onClick={() => toggleQuestion(uniqueId)}
          className="w-full flex items-center justify-between px-6 py-5 text-left"
        >
          <span className={`font-medium pr-4 ${isOpen ? 'text-green-700' : 'text-gray-800'}`}>
            {item.q}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                {item.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <section className="pt-10 md:pt-14 pb-24 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                if (e.target.value.trim()) {
                  setOpenIndex('0')
                } else {
                  setOpenIndex(null)
                }
              }}
              className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setOpenIndex(null) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {!isSearching ? (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {CATEGORIES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => { setActiveCategory(id); setOpenIndex(null) }}
                  className={`text-sm font-medium px-[18px] py-2 rounded-md border transition-all ${
                    activeCategory === id
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-transparent text-gray-500 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {currentFaqs.map((item, i) => renderFaqItem(item, i))}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {searchResults && Object.keys(searchResults).map((catId) => {
              const cat = CATEGORIES.find(c => c.id === catId)
              const items = searchResults[catId]
              return (
                <div key={catId}>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{cat.label}</h3>
                  <div className="space-y-3">
                    {items.map((item, i) => renderFaqItem(item, i, catId))}
                  </div>
                </div>
              )
            })}
            {!searchResults && (
              <p className="text-center text-gray-500 py-12">No results found for "{searchQuery}"</p>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-10 rounded-[2rem] bg-green-50 border border-green-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Let's chat with our experts!</p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

export default FAQSection
