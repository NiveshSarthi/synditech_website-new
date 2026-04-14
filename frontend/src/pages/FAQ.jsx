import React from 'react'
import FAQSection from '../components/shared/FAQSection'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero-like header for the FAQ page */}
      <section className="pt-6 pb-8 px-4 bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reusable FAQ Section */}
      <FAQSection />

      {/* FAQ Schema JSON-LD for SEO & AEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Synditech.ai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Synditech.ai is a technology-driven SaaS and automation company that provides AI-powered solutions for businesses, including CRM systems, WhatsApp automation, workflow automation, and custom software development."
              }
            },
            {
              "@type": "Question",
              "name": "What services does Synditech.ai offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Synditech.ai offers a range of services including WhatsApp Business API automation, AI chatbot development, CRM solutions, marketing automation, SaaS product development, and custom enterprise software tailored to business needs."
              }
            },
            {
              "@type": "Question",
              "name": "Who should use Synditech.ai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Synditech.ai is designed for startups, SMEs, real estate companies, healthcare providers, eCommerce brands, financial services, and enterprises looking to automate processes."
              }
            },
            {
              "@type": "Question",
              "name": "How does Synditech.ai help businesses grow?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Synditech.ai enables growth by automating lead generation, improving response time with AI chatbots, optimizing customer journeys, and providing tools for better data management."
              }
            },
            {
              "@type": "Question",
              "name": "What is WhatsApp automation by Synditech.ai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Synditech.ai provides WhatsApp automation using official APIs that allow businesses to send notifications, automate replies, create workflows, and manage conversations at scale."
              }
            },
            {
              "@type": "Question",
              "name": "Is Synditech.ai compliant with WhatsApp Business API policies?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Synditech.ai uses official WhatsApp Business API integrations and follows all compliance guidelines set by Meta."
              }
            },
            {
              "@type": "Question",
              "name": "Can Synditech.ai integrate with existing systems?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Synditech.ai can integrate with existing CRM systems, websites, landing pages, payment gateways, and third-party tools through APIs."
              }
            },
            {
              "@type": "Question",
              "name": "What industries can benefit from Synditech.ai solutions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Industries such as real estate, healthcare, education, finance, retail, eCommerce, and service-based businesses can benefit significantly."
              }
            },
            {
              "@type": "Question",
              "name": "Does Synditech.ai provide custom software development?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Synditech.ai specializes in building custom SaaS platforms, CRM systems, automation tools, and enterprise-grade applications."
              }
            },
            {
              "@type": "Question",
              "name": "How secure is Synditech.ai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Synditech.ai follows industry-standard security practices including data encryption, secure APIs, and compliance with global data protection standards."
              }
            },
            {
              "@type": "Question",
              "name": "What is the advantage of using AI chatbots from Synditech.ai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI chatbots provide instant responses, 24/7 availability, lead qualification, and automated workflows, improving customer experience."
              }
            },
            {
              "@type": "Question",
              "name": "Can Synditech.ai help in lead generation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Synditech.ai offers tools and integrations that help capture, manage, and nurture leads through automation."
              }
            },
            {
              "@type": "Question",
              "name": "Is Synditech.ai suitable for small businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Synditech.ai provides scalable solutions suitable for small businesses as well as large enterprises."
              }
            },
            {
              "@type": "Question",
              "name": "How does Synditech.ai support marketing automation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Synditech.ai enables automated campaigns through WhatsApp, email, and CRM workflows, helping businesses engage customers effectively."
              }
            },
            {
              "@type": "Question",
              "name": "Does Synditech.ai offer CRM solutions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Synditech.ai provides advanced CRM systems that help manage leads, track sales pipelines, and automate follow-ups."
              }
            },
            {
              "@type": "Question",
              "name": "How can I get started with Synditech.ai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can get started by booking a demo through the official website."
              }
            },
            {
              "@type": "Question",
              "name": "What makes Synditech.ai different from other SaaS platforms?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Synditech.ai offers AI automation, WhatsApp integration, CRM capabilities, and custom development under one platform."
              }
            },
            {
              "@type": "Question",
              "name": "Does Synditech.ai provide support and onboarding?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Synditech.ai offers complete onboarding support, including setup assistance and training."
              }
            },
            {
              "@type": "Question",
              "name": "Can Synditech.ai automate customer support?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Synditech.ai automates customer support using AI chatbots and workflows."
              }
            },
            {
              "@type": "Question",
              "name": "Where is Synditech.ai available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Synditech.ai provides services globally."
              }
            }
          ]
        })}
      </script>
    </div>
  )
}

export default FAQ
