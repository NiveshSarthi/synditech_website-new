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
  TrendingUp,
  Users
} from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQSection = () => {
  const [activeId, setActiveId] = useState(null)

  const faqData = [
    {
      category: "General & About",
      icon: Brain,
      items: [
        {
          question: "What is Synditech.ai?",
          answer: "Synditech.ai is a technology-driven SaaS and automation company that provides AI-powered solutions for businesses, including CRM systems, WhatsApp automation, workflow automation, and custom software development. It helps businesses streamline operations, improve customer engagement, and scale efficiently."
        },
        {
          question: "What makes Synditech.ai different from other SaaS platforms?",
          answer: "Synditech.ai offers a unique combination of AI automation, official WhatsApp integration, advanced CRM capabilities, and custom development services all under one unified platform."
        },
        {
          question: "How can I get started with Synditech.ai?",
          answer: "You can get started immediately by booking a personalized demo through our official website to see how our automation solutions fit your business needs."
        },
        {
          question: "Does Synditech.ai provide support and onboarding?",
          answer: "Yes, Synditech.ai offers complete onboarding support, including setup assistance, technical training, and ongoing dedicated support to ensure your success."
        },
        {
          question: "Where is Synditech.ai available?",
          answer: "Synditech.ai provides its cutting-edge AI and automation services globally, supporting businesses across different time zones and regions."
        }
      ]
    },
    {
      category: "Services & Features",
      icon: Monitor,
      items: [
        {
          question: "What services does Synditech.ai offer?",
          answer: "Synditech.ai offers a range of services including WhatsApp Business API automation, AI chatbot development, CRM solutions, marketing automation, SaaS product development, and custom enterprise software tailored to business needs."
        },
        {
          question: "What is WhatsApp automation by Synditech.ai?",
          answer: "Synditech.ai provides WhatsApp automation using official APIs that allow businesses to send notifications, automate replies, create workflows, and manage customer conversations at scale."
        },
        {
          question: "Does Synditech.ai provide custom software development?",
          answer: "Yes, Synditech.ai specializes in building custom SaaS platforms, CRM systems, automation tools, and enterprise-grade applications based on specific business requirements."
        },
        {
          question: "What is the advantage of using AI chatbots from Synditech.ai?",
          answer: "AI chatbots from Synditech.ai provide instant responses, 24/7 availability, intelligent lead qualification, and automated workflows, significantly improving customer experience while reducing manual workload."
        },
        {
          question: "How does Synditech.ai support marketing automation?",
          answer: "Synditech.ai enables automated multi-channel campaigns through WhatsApp, email, and CRM workflows, helping businesses engage customers effectively and consistently across their journey."
        },
        {
          question: "Does Synditech.ai offer CRM solutions?",
          answer: "Yes, Synditech.ai provides advanced CRM systems that help manage leads, track sales pipelines, automate follow-ups, and improve overall team productivity."
        },
        {
          question: "Can Synditech.ai automate customer support?",
          answer: "Yes, Synditech.ai automates customer support using intelligent AI chatbots and defined workflows to handle common queries and routing."
        }
      ]
    },
    {
      category: "Target Audience & Industries",
      icon: Users,
      items: [
        {
          question: "Who should use Synditech.ai?",
          answer: "Synditech.ai is designed for startups, SMEs, real estate companies, healthcare providers, eCommerce brands, financial services, and enterprises looking to automate processes, manage leads, and improve customer communication."
        },
        {
          question: "What industries can benefit from Synditech.ai solutions?",
          answer: "Industries such as real estate, healthcare, education, finance, retail, eCommerce, and service-based businesses can benefit significantly from Synditech.ai automation solutions."
        },
        {
          question: "Is Synditech.ai suitable for small businesses?",
          answer: "Yes, Synditech.ai provides highly scalable solutions that are suitable for small businesses as well as large enterprises, allowing your automation to grow alongside your business without changing platforms."
        }
      ]
    },
    {
      category: "Business Growth & Leads",
      icon: TrendingUp,
      items: [
        {
          question: "How does Synditech.ai help businesses grow?",
          answer: "Synditech.ai enables rapid growth by automating lead generation, improving response time with AI chatbots, optimizing customer journeys, and providing powerful tools for better data management and decision-making."
        },
        {
          question: "Can Synditech.ai help in lead generation?",
          answer: "Yes, Synditech.ai offers specialized tools and integrations that help capture, manage, and nurture leads through automation, directly improving conversion rates and sales efficiency."
        }
      ]
    },
    {
      category: "Integration & Security",
      icon: ShieldCheck,
      items: [
        {
          question: "Can Synditech.ai integrate with existing systems?",
          answer: "Yes, Synditech.ai can seamlessly integrate with existing CRM systems, websites, landing pages, payment gateways, and third-party tools through robust APIs and custom integrations."
        },
        {
          question: "Is Synditech.ai compliant with WhatsApp Business API policies?",
          answer: "Yes, Synditech.ai exclusively uses official WhatsApp Business API integrations and strictly follows all compliance guidelines set by Meta to ensure secure, reliable, and verified communication."
        },
        {
          question: "How secure is Synditech.ai?",
          answer: "Synditech.ai follows industry-standard security practices including advanced data encryption, secure APIs, and full compliance with global data protection standards to ensure your business data is always safe."
        }
      ]
    }
  ]

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id)
  }

  return (
    <section className="pt-6 pb-24 px-4 bg-white overflow-hidden">
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
