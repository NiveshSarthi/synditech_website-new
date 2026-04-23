import React from "react"
import { Target, Eye, Lightbulb, BookOpen, Wrench, TrendingUp } from "lucide-react"

const About = () => {
  return (
    <div className="pt-16 bg-white text-gray-900">

      {/* ================= INTRO ================= */}
      <section className="mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-[48px] md:text-6xl font-bold mb-6">
            About <span className="text-green-600">Synditech</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Synditech is a technology-driven company focused on building
            scalable, secure, and future-ready digital solutions for startups,
            enterprises, and fast-growing businesses across the globe.
          </p>
        </div>
      </section>
  {/* ================= FOUNDER SECTION ================= */}
      <section className="mb-12">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
          <div className="flex items-center justify-center h-[350px] bg-gradient-to-br from-green-50 to-white overflow-hidden">
            <img
              src="/assets/images/I train startups.jpg"
              alt="Founder"
              className="w-full h-[350px] object-contain object-center"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-4">Our Founder</h2>
            <p className="text-gray-600 mb-6">
              Synditech was founded by a visionary technologist with a strong
              belief in building technology that delivers real business value.
              With hands-on experience across software development, system
              architecture, and business strategy, the founder laid the
              foundation for a company driven by quality and trust.
            </p>
            <p className="text-gray-600 mb-6">
              The leadership philosophy focuses on long-term partnerships,
              ethical growth, and empowering teams to deliver excellence.
            </p>

            <div className="text-green-600 font-semibold">
              Mr.Rahul Kushwaha - Founder Synditech
            </div>
          </div>
        </div>
      </section>
      {/* ================= OUR STORY ================= */}
      <section className="mb-12 text-gray-900 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Synditech was founded with a simple belief — technology should
              empower businesses, not complicate them. We started as a small
              group of engineers and designers passionate about solving real
              business problems through clean, efficient, and scalable code.
            </p>
            <p className="text-gray-600 mb-6">
              Over time, we evolved into a full-service technology partner,
              helping companies transform ideas into production-ready software,
              optimize operations, and unlock growth through innovation.
            </p>
            <p className="text-gray-600">
              Today, Synditech works with clients across multiple industries,
              delivering web platforms, mobile apps, SaaS products, automation
              tools, and enterprise systems.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
              alt="Team Collaboration"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="mb-12 py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Purpose</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What drives us forward and where we aim to be</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with reliable, scalable, and innovative
                technology solutions that drive efficiency, growth, and long-term
                success.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become a globally trusted technology partner known for
                engineering excellence, transparency, and business-first
                solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}
      <section className="mb-12 py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our proven approach to delivering exceptional results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 pt-12 h-full border-2 border-transparent hover:border-green-200 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <Lightbulb className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Understand</h3>
                <p className="text-gray-600 leading-relaxed">
                  We deeply understand your business goals, challenges, and users through thorough research and collaboration.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 pt-12 h-full border-2 border-transparent hover:border-green-200 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <Wrench className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Build</h3>
                <p className="text-gray-600 leading-relaxed">
                  We design and develop scalable solutions using modern tech stacks, following best practices and clean architecture.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 pt-12 h-full border-2 border-transparent hover:border-green-200 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Scale</h3>
                <p className="text-gray-600 leading-relaxed">
                  We optimize, support, and evolve your product as your business grows, ensuring long-term success and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


     

      {/* ================= CTA ================= */}
      <section className="text-center bg-gradient-to-r from-green-600 to-green-700 py-16">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Build With Synditech?
        </h2>
        <p className="text-gray-900/90 mb-10 text-lg">
          Let’s collaborate and turn your ideas into powerful digital solutions.
        </p>
        <a href="/contact" className="inline-block bg-white text-green-700 px-12 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg">
          Get In Touch
        </a>
      </section>

    </div>
  )
}

export default About
