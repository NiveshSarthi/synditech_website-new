import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, Layers, Shield, Hexagon, Circle, Triangle, Rocket, MessageSquare, Search, Globe, Settings, TrendingUp, Activity, Star, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import { SERVICES } from "../utils/constants"
import FreeTrialModal from "../components/shared/FreeTrialModal"
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations"
import Particles from "../components/shared/Particles"

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  const carouselRef = useRef(null);

  const TESTIMONIALS = [
    {
      quote: "ROI 10X played a crucial role in bringing our first app to life. Their team combined tech expertise with a deep understanding of our vision. The execution was seamless, timely, and far beyond our expectations.",
      name: "Rahul Desai",
      title: "CEO, TechNova Solutions",
      image: "https://i.pravatar.cc/150?u=rahul"
    },
    {
      quote: "Working with Synditech transformed our digital presence. They didn't just build a website; they built a growth engine that increased our online sales by 150% in just three months.",
      name: "Priya Sharma",
      title: "Director of Marketing, GreenLeaf India",
      image: "https://i.pravatar.cc/150?u=priya"
    },
    {
      quote: "The level of professionalism and technical skill is unmatched. They handled our complex backend infrastructure migration with zero downtime. Highly recommended.",
      name: "Amit Patel",
      title: "Founder, Patel E-commerce",
      image: "https://i.pravatar.cc/150?u=amit"
    }
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    let intervalId;
    const scrollCarousel = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: 344, behavior: "smooth" });
        }
      }
    };
    
    intervalId = setInterval(scrollCarousel, 3000);
    return () => clearInterval(intervalId);
  }, []);
  const [statsRef, statsInView] = useInView({ threshold: 0.5, triggerOnce: true })

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Particles
            particleColors={["#00ff33"]}
            particleCount={2000}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
          />
        </div>

        {/* Abstract Floating Graphic Vectors */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 text-green-300/30"
          >
            <Hexagon size={120} strokeWidth={1} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 30, 0], x: [0, 20, 0], rotate: [0, -90, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 right-1/4 text-green-400/20"
          >
            <Triangle size={150} strokeWidth={1} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/3 text-green-500/20"
          >
            <Circle size={90} strokeWidth={1} />
          </motion.div>
        </div>


        <div className="relative z-10 px-4 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6 px-4 py-2 bg-green-600/10 border border-green-600/30 rounded-full text-green-600 font-semibold text-sm tracking-wide shadow-sm"
            >
              Innovation Meets Excellence
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-gray-900 drop-shadow-sm leading-tight"
            >
              Accelerate Your Digital Growth.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 text-green-600 font-semibold"
            >
              Building Tomorrow's Technology, Today.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg"
            >
              We help startups, enterprises, and fast-growing businesses transform ideas into
              scalable digital products through modern software engineering, cloud solutions,
              and intelligent automation.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="btn-primary shadow-lg shadow-green-600/30 text-center"
              >
                Start Your Project
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-outline text-center"
              >
                Free Trial
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Glassmorphic Floating Cards & Vectors */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative hidden md:block h-[500px]"
          >
            {/* Background glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400/20 blur-3xl rounded-full pointer-events-none" />
            
            {/* Primary Glass Card */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-72 bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-2xl shadow-green-900/10 z-20"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-green-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Growth</p>
                    <p className="font-bold text-gray-900 leading-none">Scalable Tech</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-50 rounded-full text-green-600 text-xs font-bold">+340%</div>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[85%]" />
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 w-[60%]" />
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-300 w-[45%]" />
                </div>
              </div>
            </motion.div>

            {/* Secondary Glass Card */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-0 w-64 bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-5 shadow-xl shadow-gray-200/50 z-30"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                    <Activity className="text-white w-6 h-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">System Uptime</p>
                  <p className="text-sm text-green-600 font-semibold">99.99% Guaranteed</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Vectors mapped from background to wrap the cards */}
            <motion.div
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-10 text-green-200 pointer-events-none z-10"
            >
              <Hexagon size={80} strokeWidth={1} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 10, 0], rotate: [0, -90, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 right-0 text-green-100 pointer-events-none z-10"
            >
              <Triangle size={100} strokeWidth={1} />
            </motion.div>

          </motion.div>
        </div>
      </section>
      
      {/* ================= NEW SERVICES GRID SECTION ================= */}
      <section className="py-24 px-4 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-2 leading-tight">
              Everything You Need To Sell More
              <br />
              <span className="font-bold text-gray-500 text-lg md:text-2xl mt-2 inline-block tracking-tight">(Without Selling Your Soul)</span>
            </h2>
          </div>

          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {SERVICES.map((service, idx) => {
              const Icon = service.icon || ArrowRight;
              const formattedId = (idx + 1).toString().padStart(2, '0');
              return (
                <div 
                  key={idx} 
                  className="group shrink-0 w-[85vw] md:w-[320px] flex flex-col justify-between p-8 rounded-[2rem] border bg-white border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gray-50 hover:border-gray-200 snap-center md:snap-start relative overflow-hidden"
                  style={{ minHeight: '380px' }}
                >
                  {/* Icon Area */}
                  <div className="flex justify-center mb-10 pt-4">
                    <Icon className="w-24 h-24 text-green-500 drop-shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:text-green-600" strokeWidth={1.5} />
                  </div>

                  {/* Text Container */}
                  <div className="mt-auto relative z-10">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="flex items-center gap-1 mt-1 shrink-0">
                        <span className="text-xs font-medium text-gray-400 border border-gray-200 rounded-full w-7 h-7 flex items-center justify-center transition-colors duration-300 group-hover:border-green-200 group-hover:text-green-600">{formattedId}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 leading-snug">
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Bottom Action Area with Hover Animation */}
                    <div className="flex items-center mt-2 pl-10 h-6 relative overflow-hidden">
                      <div className="absolute left-10 top-0 transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:-translate-y-4">
                        <ArrowRight className="w-5 h-5 text-gray-300" />
                      </div>
                      <Link to={service.path || "/services"} className="absolute left-10 top-0 font-bold text-sm text-gray-900 flex items-center transition-all duration-300 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-green-600 hover:before:w-full before:transition-all before:duration-300">
                        Read More <ArrowRight className="w-4 h-4 ml-1 text-green-600" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Simple Decorative Carousel Dots mimicking user image */}
          <div className="flex justify-center items-center gap-3 mt-12">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full border border-gray-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          </div>

        </div>
      </section>
      
      {/* ================= STATS SECTION ================= */}
      <section ref={statsRef} className="py-20 px-4 bg-white">
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
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* ================= VIDEO ================= */}
      <section className="py-28 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">A Glimpse of Synditech</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Watch how we empower businesses with technology-driven innovation
            and real-world digital solutions.
          </p>

          <iframe
            src="https://www.youtube.com/embed/dK-cxTXoaEY"
            title="Synditech Overview"
            allowFullScreen
            className="mx-auto w-full max-w-4xl aspect-video rounded-2xl shadow-2xl shadow-green-600/20"
          />
        </div>
      </section>
      {/* ================= SERVICES ================= */}
      <section ref={ref} className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
              From idea validation to enterprise-grade deployment, Synditech delivers
              end-to-end digital solutions that scale with your business.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto mt-6" />
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
                      className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                      {service.description} Our approach ensures performance,
                      security, and long-term maintainability.
                    </p>

                    <span className="text-green-600 font-semibold flex items-center group-hover:gap-3 gap-2 transition-all">
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
      <section className="py-28 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">How We Work</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
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
                  <Icon className="w-14 h-14 text-green-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">Why Choose Synditech?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
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
                <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
                <p className="text-gray-600 text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* ================= TESTIMONIALS ================= */}
      <section className="relative py-32 px-4 bg-white overflow-hidden">
        {/* Giant Outlined Text Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
          <span 
            className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold text-transparent bg-clip-text"
            style={{ WebkitTextStroke: '2px rgba(0,0,0,0.04)', color: 'transparent', lineHeight: 0.8 }}
          >
            Testimonials
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          {/* Pill Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white mb-8">
            <Star className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-bold tracking-wider text-gray-800">WHAT CLIENT SAYS?</span>
            <ArrowRight className="w-4 h-4 text-gray-300" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
            Proof That We Don't Just Talk
          </h2>

          {/* Swiper Content */}
          <div className="flex items-center justify-between w-full gap-8">
            <button 
              onClick={prevTestimonial}
              className="p-4 hover:bg-gray-50 rounded-full transition-colors hidden md:block"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>

            <motion.div 
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center flex-1 max-w-3xl"
            >
              <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12">
                "{TESTIMONIALS[activeTestimonial].quote}"
              </p>

              {/* Divider */}
              <div className="w-48 mx-auto h-px bg-gray-200 mb-8" />

              {/* Author Info */}
              <div className="flex flex-col items-center gap-3">
                <img 
                  src={TESTIMONIALS[activeTestimonial].image} 
                  alt={TESTIMONIALS[activeTestimonial].name}
                  className="w-14 h-14 rounded-full object-cover shadow-sm bg-gray-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{TESTIMONIALS[activeTestimonial].name}</h4>
                  <p className="text-gray-500 text-sm">{TESTIMONIALS[activeTestimonial].title}</p>
                </div>
              </div>
            </motion.div>

            <button 
              onClick={nextTestimonial}
              className="p-4 hover:bg-gray-50 rounded-full transition-colors hidden md:block"
            >
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Mobile Arrows */}
          <div className="flex items-center gap-4 mt-12 md:hidden">
            <button onClick={prevTestimonial} className="p-3 border border-gray-200 rounded-full bg-white"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
            <button onClick={nextTestimonial} className="p-3 border border-gray-200 rounded-full bg-white"><ArrowRight className="w-5 h-5 text-gray-600" /></button>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 px-4 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Ready to Build Something Powerful?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let’s turn your idea into a scalable, secure, and future-ready product.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-5 bg-white text-green-700 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg"
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
