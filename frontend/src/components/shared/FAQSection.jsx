import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  MessageCircle, 
  Brain, 
  Monitor, 
  Rocket, 
  DollarSign, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQSection = () => {
  const [activeId, setActiveId] = useState(null)

  const faqData = [
    {
      category: "General FAQs",
      icon: Brain,
      items: [
        {
          question: "What does your company do?",
          answer: "We provide end-to-end technology solutions including product development, web & mobile applications, and digital transformation services tailored to businesses of all sizes."
        },
        {
          question: "Who are your services for?",
          answer: "Our services are designed for startups, SMEs, and enterprises looking to build, scale, or optimize their digital products."
        },
        {
          question: "What industries do you specialize in?",
          answer: "We work across multiple industries including SaaS, e-commerce, fintech, healthcare, and education."
        },
        {
          question: "Do you offer custom solutions?",
          answer: "Yes, all our solutions are customized based on your business goals and requirements."
        }
      ]
    },
    {
      category: "Product & Services FAQs",
      icon: Monitor,
      items: [
        {
          question: "What services do you offer?",
          answer: "We offer web development, mobile app development, UI/UX design, cloud solutions, API integration, and ongoing maintenance."
        },
        {
          question: "Do you build both websites and mobile apps?",
          answer: "Yes, we develop responsive websites and cross-platform mobile applications."
        },
        {
          question: "Can you redesign or improve an existing product?",
          answer: "Absolutely! We specialize in redesigning, optimizing performance, and enhancing user experience."
        },
        {
          question: "What technologies do you use?",
          answer: "We use modern technologies like React, Node.js, Python, Flutter, and cloud platforms such as AWS and Google Cloud."
        }
      ]
    },
    {
      category: "Project Process FAQs",
      icon: Rocket,
      items: [
        {
          question: "What is your development process?",
          answer: "Our process includes discovery, planning, design, development, testing, and deployment, followed by support."
        },
        {
          question: "How long does it take to complete a project?",
          answer: "Project timelines vary depending on complexity, but most projects range from a few weeks to a few months."
        },
        {
          question: "Will I be involved during development?",
          answer: "Yes, we maintain regular communication and provide updates at every stage."
        },
        {
          question: "Do you provide post-launch support?",
          answer: "Yes, we offer ongoing maintenance, updates, and technical support."
        }
      ]
    },
    {
      category: "Pricing FAQs",
      icon: DollarSign,
      items: [
        {
          question: "How much do your services cost?",
          answer: "Pricing depends on the project scope, features, and complexity. We provide a custom quote after understanding your requirements."
        },
        {
          question: "Do you offer fixed pricing or hourly billing?",
          answer: "We offer both fixed-price and flexible hourly models."
        },
        {
          question: "Is there a free consultation?",
          answer: "Yes, we offer an initial consultation to understand your needs and suggest the best approach."
        }
      ]
    },
    {
      category: "Security & Support FAQs",
      icon: ShieldCheck,
      items: [
        {
          question: "How do you ensure data security?",
          answer: "We follow industry best practices including encryption, secure coding standards, and regular security audits."
        },
        {
          question: "What kind of support do you provide?",
          answer: "We provide technical support, bug fixes, updates, and performance monitoring."
        },
        {
          question: "Can you sign an NDA?",
          answer: "Yes, we are happy to sign an NDA to protect your idea and data."
        }
      ]
    },
    {
      category: "Business & Scaling FAQs",
      icon: TrendingUp,
      items: [
        {
          question: "Can you help scale my product?",
          answer: "Yes, we design scalable architectures and optimize systems for growth."
        },
        {
          question: "Do you work with startups?",
          answer: "Yes, we love working with startups—from idea validation to full product launch."
        },
        {
          question: "Can you integrate third-party tools?",
          answer: "Yes, we can integrate payment gateways, CRMs, analytics tools, and more."
        }
      ]
    }
  ]

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id)
  }

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* ================= HEADER ================= */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Everything you need to know about our platform
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto mt-6 rounded-full" />
        </div>

        {/* ================= GROUPED ACCORDION ================= */}
        <div className="space-y-12">
          {faqData.map((group, groupIdx) => {
            const CategoryIcon = group.icon
            return (
              <div key={groupIdx} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {group.items.map((item, itemIdx) => {
                    const uniqueId = `${groupIdx}-${itemIdx}`
                    const isActive = activeId === uniqueId

                    return (
                      <motion.div 
                        key={uniqueId}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: itemIdx * 0.05 }}
                        className={`rounded-2xl border transition-all duration-300 ${
                          isActive 
                            ? 'border-green-600/30 bg-green-50/40 shadow-lg shadow-green-600/10' 
                            : 'border-gray-100 bg-white hover:border-green-600/20 hover:shadow-md'
                        }`}
                      >
                        <button
                          onClick={() => toggleFAQ(uniqueId)}
                          className="w-full text-left px-6 py-5 flex items-center justify-between group focus:outline-none"
                        >
                          <span className={`text-lg font-bold transition-colors ${
                            isActive ? 'text-green-700' : 'text-gray-900 group-hover:text-green-600'
                          }`}>
                            {item.question}
                          </span>
                          <div className={`p-2 rounded-full transition-all duration-300 ${
                            isActive ? 'bg-green-600 text-white rotate-180 scale-110' : 'bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600'
                          }`}>
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-gray-600 leading-relaxed text-base border-t border-green-600/5 pt-4">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* ================= CTA ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center p-12 rounded-[2.5rem] bg-gradient-to-br from-green-50/80 to-white border border-green-100 shadow-xl shadow-green-600/5"
        >
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-2xl text-green-600 mb-6 font-bold shadow-inner">
            <MessageCircle className="w-6 h-6 mr-2" />
            Support Helpdesk
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg">
            Our experts are ready to help you find the right solution for your business. Let's chat!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl hover:shadow-[0_20px_50px_rgba(22,_163,_74,_0.3)] hover:-translate-y-1 transition-all active:scale-95"
          >
            Contact Us
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

export default FAQSection
