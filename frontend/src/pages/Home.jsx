// client/src/pages/Home.jsx
import React, { useState, useRef, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { ArrowRight, CheckCircle, Layers, Shield, Rocket, Star, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import { SERVICES } from "../utils/constants"
import FreeTrialModal from "../components/shared/FreeTrialModal"
import { useProjectModal } from "../components/layout/Layout"
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations"

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const { openProjectModal } = useProjectModal()

  useEffect(() => {
    if (searchParams.get('tool') === 'zavyo') {
      setIsModalOpen(true)
    }
  }, [searchParams])

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
    <div className="min-h-screen bg-[#f5f7f4] text-gray-900">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/images/background.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl px-8 lg:px-16 text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white"
            >
              Accelerate Your
              <br />
              <span className="font-bold text-green-400">Digital Growth.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed"
            >
              Building Tomorrow&apos;s Technology, Today. High-precision infrastructure for global enterprises and ambitious startups.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={openProjectModal}
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-4 text-center text-base font-semibold text-white shadow-[0_24px_50px_-22px_rgba(22,163,74,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Start Your Project
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-14"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                Trusted by Industry Leaders
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Professional Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:block relative w-full max-w-xl pr-8"
          >
            {/* Glow blob */}
            <div className="absolute inset-x-10 top-12 h-[70%] rounded-[2.5rem] bg-gradient-to-br from-green-400/30 via-emerald-400/20 to-transparent blur-3xl" />

            {/* Main dashboard card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative ml-auto w-[84%]"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1a14] shadow-[0_40px_85px_-20px_rgba(0,0,0,0.8)] p-6">
                {/* Terminal header bar */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-3 w-3 rounded-full bg-red-400/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <div className="h-3 w-3 rounded-full bg-green-400/70" />
                  <span className="ml-3 text-xs text-gray-500 font-mono">synditech.dashboard</span>
                </div>

                {/* Live metric row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Uptime", value: "99.99%", color: "text-green-400" },
                    { label: "Latency", value: "12ms", color: "text-emerald-300" },
                    { label: "Requests", value: "4.2M", color: "text-green-400" },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/8">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{m.label}</p>
                      <p className={`text-lg font-black ${m.color}`}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Animated bar chart */}
                <div className="bg-white/5 rounded-xl border border-white/8 p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 font-semibold">Revenue Growth</span>
                    <span className="text-xs font-bold text-green-400">+340% YoY</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-14">
                    {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100, 88, 110].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-sm bg-gradient-to-t from-green-700 to-green-400"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.6 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                        style={{ height: `${h}%`, transformOrigin: "bottom" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "MongoDB", "Docker", "AWS"].map((tech) => (
                    <span key={tech} className="text-[10px] font-semibold text-green-300 bg-green-900/50 border border-green-700/40 rounded-full px-2.5 py-0.5">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Subtle scan line overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_3px,rgba(255,255,255,0.015)_4px)]" />
              </div>
            </motion.div>

            {/* Floating stat card — System Uptime */}
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [-4, -2, -4] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-8 w-[44%] rounded-[1.55rem] border border-white/15 bg-[#0d1a14]/90 p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20 text-green-400 border border-green-500/30">
                  <Rocket className="h-4 w-4" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-green-400">REAL-TIME</span>
              </div>
              <p className="text-xs font-semibold text-gray-400">System Uptime</p>
              <p className="mt-1 text-3xl font-black tracking-tight text-white">99.99%</p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
                <motion.div
                  className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Floating stat card — Growth */}
            <motion.div
              animate={{ y: [0, 12, 0], rotate: [4, 2, 4] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
              className="absolute -bottom-10 right-0 w-[46%] rounded-[1.55rem] border border-white/15 bg-[#0d1a14]/90 p-5 shadow-[0_30px_62px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-[0_8px_24px_-8px_rgba(22,163,74,0.7)]">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    GROWTH SCALABLE TECH
                  </p>
                  <p className="mt-1.5 text-3xl font-black tracking-tight text-green-400">+340%</p>
                </div>
              </div>
              <div className="mt-4 flex items-end gap-1.5">
                {[20, 35, 55, 40, 70].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-green-800 to-green-500"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.2 + i * 0.08, duration: 0.4, ease: "easeOut" }}
                    style={{ height: `${h}%`, maxHeight: 40, transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            </motion.div>

            <div className="absolute -bottom-16 left-[-8%] h-40 w-[82%] rounded-tr-[2rem] bg-black/10" />
          </motion.div>
        </div>
      </section>
      
      {/* ================= NEW SERVICES GRID SECTION ================= */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50 border-t border-green-100">
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
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:pb-0 md:items-stretch md:justify-items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {SERVICES.map((service, idx) => {
              const Icon = service.icon || ArrowRight;
              return (
                <div 
                  key={idx} 
                  className="group shrink-0 w-[85vw] md:w-full md:max-w-[320px] flex flex-col justify-between rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_22px_60px_-36px_rgba(15,23,42,0.55)] ring-1 ring-green-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:bg-white hover:shadow-[0_30px_80px_-35px_rgba(22,163,74,0.5)] snap-center md:snap-start relative overflow-hidden"
                  style={{ minHeight: '390px' }}
                >
                  <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-green-100/80 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent" />
                  {/* Icon Area */}
                  <div className="relative z-10 mb-8 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-600/20 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                      <Icon className="w-8 h-8" strokeWidth={1.7} />
                    </div>
                    <div className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                      Service
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">
                      {service.title}
                    </h3>
                    <p className="mt-4 min-h-[72px] text-sm leading-6 text-gray-600">
                      {service.description} Built with scalable architecture, clean UX, and performance-first delivery.
                    </p>
                    
                    {/* Bottom Action Area with Hover Animation */}
                    <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                        Learn more
                      </span>
                      <Link to={service.path || "/services"} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg shadow-gray-900/15 transition-all duration-300 group-hover:bg-green-600 group-hover:shadow-green-600/25">
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* ================= STATS SECTION ================= */}
      <section ref={statsRef} className="py-12 px-4 bg-[#f5f7f4]">
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
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-green-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-green-300 via-green-400 to-emerald-600 p-[2px] shadow-[0_0_40px_-5px_rgba(34,197,94,0.3)]">
            <div className="flex flex-col lg:flex-row items-center gap-14 bg-white/95 backdrop-blur-md rounded-[2.4rem] p-8 md:p-12 lg:p-14">

            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 max-w-xl"
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-6">
                See Us In Action
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                A Glimpse of{" "}
                <span className="text-green-600">Synditech</span>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                Watch how we empower businesses with technology-driven innovation
                and real-world digital solutions that scale.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Enterprise-grade infrastructure, built to scale",
                  "Delivered on time with zero compromise on quality",
                  "Trusted by 500+ businesses worldwide",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Portrait Video — no black bars */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="flex-shrink-0 w-full max-w-[300px] lg:max-w-[340px]"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(22,163,74,0.25)] border border-green-100">
                {/* Decorative glow ring */}
                <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br from-green-400/20 to-emerald-600/20 blur-sm -z-10" />
                <video
                  src="/assets/images/WhatsApp Video 2026-04-06 at 17.02.06.mp4"
                  controls
                  playsInline
                  className="w-full h-auto block rounded-[2rem]"
                  style={{ aspectRatio: "9/16", objectFit: "cover" }}
                />
              </div>
            </motion.div>

            </div>
          </div>
        </div>
      </section>
      {/* ================= SERVICES ================= */}
      <section ref={ref} className="py-16 px-4 bg-[#f5f7f4]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
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
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 via-[#f5f7f4] to-green-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">How We Work</h2>
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
      <section className="py-16 px-4 bg-[#f5f7f4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Why Choose Synditech?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're not just developers — we're long-term technology partners.
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
      <section className="hidden relative py-16 px-4 bg-gradient-to-br from-[#f5f7f4] via-slate-50 to-green-50/40 overflow-hidden">

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          {/* Label */}
          <p className="text-sm font-bold tracking-wider text-gray-800 uppercase mb-8">What Clients Say</p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
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
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Ready to Build Something Powerful?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let's turn your idea into a scalable, secure, and future-ready product.
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
