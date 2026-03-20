// client/src/pages/Pricing.jsx
import React from "react"
import { Link } from "react-router-dom"
import { CheckCircle, Zap, ShieldCheck } from "lucide-react"

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block px-6 py-3 bg-green-600/20 border border-green-600/50 rounded-full text-green-600 font-semibold mb-6">
            Build • Scale • Automate
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Pricing That Grows With You
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From SaaS & app development to internal business tools like HRMS, CRM,
            and task trackers — choose what you need, scale when you're ready.
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto mt-6"></div>
        </div>

        {/* ================= FREE TRIAL ================= */}
        <div className="card mb-24 border-green-600/60 shadow-2xl shadow-green-600/20 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Start With a Free Trial
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Experience our workflow, tools, and development quality before you commit.
                Perfect for startups and founders who want to test fast.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "7 Days Free Access to Tools",
                  "Project Consultation Call",
                  "Demo of HRMS, Task Tracker & CRM",
                  "No Credit Card Required"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="inline-block px-10 py-4 rounded-full font-bold bg-gradient-to-r from-green-600 to-green-700 text-gray-900 hover:scale-105 transition"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full"></div>
              {/* Removed Rocket Icon */}
            </div>
          </div>
        </div>

        {/* ================= SERVICE PLANS ================= */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Development Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
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
                className={`relative card hover:scale-105 transition ${
                  plan.popular
                    ? "border-green-600 shadow-2xl shadow-green-600/30"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-gray-900 rounded-full text-sm font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    MOST CHOSEN
                  </div>
                )}

                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {plan.title}
                </h3>
                <p className="text-gray-600 mb-4">{plan.desc}</p>

                <div className="text-4xl font-black text-gradient mb-6">
                  {plan.price}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="block text-center py-4 rounded-full font-bold border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-gray-900 transition"
                >
                  Talk to Us
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TOOLS ================= */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Business Tools Access
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Task Tracker",
                features: ["Team Tasks", "Sprint Boards", "Productivity Reports"]
              },
              {
                title: "HRMS",
                features: ["Attendance", "Payroll", "Leave Management"]
              },
              {
                title: "CRM",
                features: ["Lead Management", "Sales Pipeline", "Client Follow-ups"]
              }
            ].map((tool, idx) => (
              <div key={idx} className="card">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {tool.title}
                </h3>
                <ul className="space-y-3">
                  {tool.features.map((f, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="card text-center max-w-4xl mx-auto">
          <ShieldCheck className="w-14 h-14 text-green-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book a free consultation and we’ll design the right solution for your business.
          </p>
          <Link to="/contact" className="btn-primary">
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Pricing
