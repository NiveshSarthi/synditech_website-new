import React, {useState} from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, Layers, Shield, Rocket } from "lucide-react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import { SERVICES } from "../utils/constants"
import FreeTrialModal from "../components/shared/FreeTrialModal"
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations"

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.5, triggerOnce: true })

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        >
          <source src="/assets/12716-241674181_small.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 to-blue-900/30 z-[1]" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-6 px-6 py-3 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-500 font-semibold"
          >
            🚀 Innovation Meets Excellence
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 font-orbitron text-shadow-lg"
          >
            SYNDITECH
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl mb-6 text-orange-500 font-semibold"
          >
            Building Tomorrow's Technology, Today
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            We help startups, enterprises, and fast-growing businesses transform ideas into
            scalable digital products through modern software engineering, cloud solutions,
            and intelligent automation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6"
          >
            <Link
              to="/contact"
              className="btn-primary shadow-lg shadow-orange-500/50"
            >
              Start Your Project
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-outline"
            >
              Free Trial
            </button>
          </motion.div>
        </motion.div>
      </section>
      
      {/* ================= STATS SECTION ================= */}
      <section ref={statsRef} className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {[
              { end: 500, label: "Projects Completed", suffix: "+" },
              { end: 98, label: "Client Satisfaction", suffix: "%" },
              { end: 50, label: "Team Members", suffix: "+" },
              { end: 24, label: "Hour Support", suffix: "/7" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="text-center p-6 card hover-lift"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {statsInView && (
                    <CountUp
                      end={stat.end}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* ================= VIDEO ================= */}
      <section className="py-28 px-4 bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">A Glimpse of Synditech</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Watch how we empower businesses with technology-driven innovation
            and real-world digital solutions.
          </p>

          <iframe
            src="https://www.youtube.com/embed/dK-cxTXoaEY"
            title="Synditech Overview"
            allowFullScreen
            className="mx-auto w-full max-w-4xl aspect-video rounded-2xl shadow-2xl shadow-orange-500/20"
          />
        </div>
      </section>
      {/* ================= SERVICES ================= */}
      <section ref={ref} className="py-28 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Services</h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
              From idea validation to enterprise-grade deployment, Synditech delivers
              end-to-end digital solutions that scale with your business.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6" />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {SERVICES.map((service, idx) => {
              const Icon = service.icon
              return (
                <motion.div key={service.id} variants={staggerItem}>
                  <Link
                    to={service.path}
                    className="block card hover-lift group h-full"
                  >
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 mb-4 text-sm md:text-base">
                      {service.description} Our approach ensures performance,
                      security, and long-term maintainability.
                    </p>

                    <span className="text-orange-500 font-semibold flex items-center group-hover:gap-3 gap-2 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-28 px-4 bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">How We Work</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              A transparent, agile, and results-driven process designed to deliver
              maximum business impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Layers,
                title: "Discovery & Planning",
                desc: "We analyze your goals, users, and competitors to craft a clear execution roadmap."
              },
              {
                icon: Rocket,
                title: "Build & Launch",
                desc: "Our engineers build scalable systems using modern tech stacks and best practices."
              },
              {
                icon: Shield,
                title: "Optimize & Scale",
                desc: "Post-launch optimization, monitoring, and continuous improvements for growth."
              }
            ].map((step, idx) => {
              const Icon = step.icon
              return (
                <div
                  key={idx}
                  className="card text-center animate-fade-in"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <Icon className="w-14 h-14 text-orange-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-28 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">Why Choose Synditech?</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              We’re not just developers — we’re long-term technology partners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Enterprise-grade architecture & security",
              "Agile, transparent, and milestone-based delivery",
              "Dedicated project managers & tech leads",
              "Cloud-ready & scalable solutions",
              "Post-launch support & optimization",
              "Business-first engineering mindset"
            ].map((item, idx) => (
              <div
                key={idx}
                className="card animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CheckCircle className="w-10 h-10 text-orange-500 mb-4" />
                <p className="text-gray-300 text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* ================= CTA ================= */}
      <section className="py-28 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Build Something Powerful?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let’s turn your idea into a scalable, secure, and future-ready product.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-5 bg-white text-orange-600 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      <FreeTrialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  )
}

export default Home
