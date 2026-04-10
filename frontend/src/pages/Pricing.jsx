// client/src/pages/Pricing.jsx
import React from "react"
import { Link } from "react-router-dom"
import { CheckCircle, Zap, ShieldCheck } from "lucide-react"

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24 pb-12 md:pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12 md:mb-20 animate-fade-in">
          <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-green-600/20 border border-green-600/50 rounded-full text-green-600 font-semibold mb-4 md:mb-6 text-sm md:text-base">
            Build • Scale • Automate
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Pricing That Grows With You
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            From SaaS & app development to internal business tools like HRMS, CRM,
            and task trackers — choose what you need, scale when you're ready.
          </p>

          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto mt-4 md:mt-6"></div>
        </div>

        {/* ================= FREE TRIAL ================= */}
        <div className="card mb-12 md:mb-24 border-green-600/60 shadow-2xl shadow-green-600/20 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Start With a Free Trial
              </h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4 md:mb-6">
                Experience our workflow, tools, and development quality before you commit.
                Perfect for startups and founders who want to test fast.
              </p>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  "7 Days Free Access to Tools",
                  "Project Consultation Call",
                  "Demo of HRMS, Task Tracker & CRM",
                  "No Credit Card Required"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-600 text-sm md:text-base">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2 md:mr-3" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="inline-block px-6 md:px-10 py-3 md:py-4 rounded-full font-bold bg-gradient-to-r from-green-600 to-green-700 text-gray-900 hover:scale-105 transition text-sm md:text-base"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>

        {/* ================= SERVICE PLANS ================= */}
        <div className="mb-12 md:mb-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            Development Services
          </h2>

          <div className="pricing-grid-responsive">
            {[
              {
                title: "Startup Build",
                price: "Starting ₹49,999",
                desc: "For early-stage startups & founders",
                features: [
                  "SaaS / Web App Development",
                  "MVP Architecture",
                  "Admin Panel",
                  "Deployment Support",
                  "Basic Tool Access"
                ],
                popular: false
              },
              {
                title: "Growth Scale",
                price: "Starting ₹1,49,999",
                desc: "For scaling businesses & funded startups",
                features: [
                  "SaaS / E-commerce / Mobile App",
                  "Advanced Backend & APIs",
                  "Role-Based Access",
                  "HRMS + Task Tracker",
                  "Priority Support"
                ],
                popular: true
              },
              {
                title: "Enterprise",
                price: "Custom Pricing",
                desc: "For large teams & enterprises",
                features: [
                  "Custom Architecture",
                  "Microservices",
                  "Dedicated Team",
                  "All Internal Tools",
                  "Security & Compliance"
                ],
                popular: false
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`pricing-card-responsive ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Zap className="w-3 h-3 md:w-4 md:h-4" />
                    MOST CHOSEN
                  </div>
                )}

                <div className="card-content">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">{plan.desc}</p>

                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-gradient mb-4 md:mb-6">
                    {plan.price}
                  </div>

                  <ul className="space-y-2 md:space-y-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center text-gray-600 text-sm md:text-base">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2 md:mr-3" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="pricing-btn"
                >
                  Talk to Us
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TOOLS ================= */}
        <div className="mb-12 md:mb-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            Business Tools Access
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Task Tracker",
                features: ["Team Tasks", "Sprint Boards", "Productivity Reports"],
                link: null
              },
              {
                title: "HRMS",
                features: ["Attendance", "Payroll", "Leave Management"],
                link: "https://hrms.niveshsarthi.com/"
              },
              {
                title: "CRM",
                features: ["Lead Management", "Sales Pipeline", "Client Follow-ups"],
                link: null
              }
            ].map((tool, idx) => (
              <div key={idx} className="card flex flex-col">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  {tool.title}
                </h3>
                <ul className="space-y-2 md:space-y-3 flex-grow">
                  {tool.features.map((f, i) => (
                    <li key={i} className="flex items-center text-gray-600 text-sm md:text-base">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2 md:mr-3"></div>
                      {f}
                    </li>
                  ))}
                </ul>
                {tool.link && (
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block text-center py-2 md:py-3 px-4 md:px-6 rounded-full font-bold border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition text-sm md:text-base"
                  >
                    Access Now
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="card text-center max-w-4xl mx-auto px-4 md:px-6">
          <ShieldCheck className="w-12 h-12 md:w-14 md:h-14 text-green-600 mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
            Book a free consultation and we'll design the right solution for your business.
          </p>
          <Link to="/contact" className="btn-primary text-sm md:text-base">
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Pricing
