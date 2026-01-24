import React from "react"

const About = () => {
  return (
    <div className="pt-28 pb-24 bg-black text-white">

      {/* ================= INTRO ================= */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-orange-500">Synditech</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Synditech is a technology-driven company focused on building
            scalable, secure, and future-ready digital solutions for startups,
            enterprises, and fast-growing businesses across the globe.
          </p>
        </div>
      </section>
 {/* ================= FOUNDER SECTION ================= */}
      <section className="mb-28">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-dashed border-orange-500/40 rounded-2xl" />
            <img
  src="assets\images\I train startups.jpg"
  alt="Founder"
  className="relative rounded-2xl shadow-2xl"
/>

          </div>

          <div>
            <h2 className="text-4xl font-bold mb-4">Our Founder</h2>
            <p className="text-gray-300 mb-6">
              Synditech was founded by a visionary technologist with a strong
              belief in building technology that delivers real business value.
              With hands-on experience across software development, system
              architecture, and business strategy, the founder laid the
              foundation for a company driven by quality and trust.
            </p>
            <p className="text-gray-400 mb-6">
              The leadership philosophy focuses on long-term partnerships,
              ethical growth, and empowering teams to deliver excellence.
            </p>

            <div className="text-orange-500 font-semibold">
              Mr.Rahul Kushwaha - Founder Synditech
            </div>
          </div>
        </div>
      </section>
      {/* ================= OUR STORY ================= */}
      <section className="mb-28">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-300 mb-6">
              Synditech was founded with a simple belief — technology should
              empower businesses, not complicate them. We started as a small
              group of engineers and designers passionate about solving real
              business problems through clean, efficient, and scalable code.
            </p>
            <p className="text-gray-300 mb-6">
              Over time, we evolved into a full-service technology partner,
              helping companies transform ideas into production-ready software,
              optimize operations, and unlock growth through innovation.
            </p>
            <p className="text-gray-400">
              Today, Synditech works with clients across multiple industries,
              delivering web platforms, mobile apps, SaaS products, automation
              tools, and enterprise systems.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-dashed border-orange-500/40 rounded-2xl" />
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
              alt="Team Collaboration"
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="mb-28 bg-gradient-to-r from-black to-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div className="card">
            <h3 className="text-3xl font-bold mb-4 text-orange-500">Our Mission</h3>
            <p className="text-gray-300">
              To empower businesses with reliable, scalable, and innovative
              technology solutions that drive efficiency, growth, and long-term
              success.
            </p>
          </div>

          <div className="card">
            <h3 className="text-3xl font-bold mb-4 text-orange-500">Our Vision</h3>
            <p className="text-gray-300">
              To become a globally trusted technology partner known for
              engineering excellence, transparency, and business-first
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW WE WORK (DOTTED FLOW) ================= */}
      <section className="mb-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">How We Work</h2>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              {
                title: "Understand",
                desc: "We deeply understand your business goals, challenges, and users."
              },
              {
                title: "Build",
                desc: "We design and develop scalable solutions using modern tech stacks."
              },
              {
                title: "Scale",
                desc: "We optimize, support, and evolve your product as your business grows."
              }
            ].map((step, idx) => (
              <div key={idx} className="relative card">
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>

                {/* Dotted Arrow */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-[-60px] w-12 border-t-2 border-dashed border-orange-500/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VIDEO SECTION ================= */}
      <section className="mb-28 bg-gradient-to-r from-black to-gray-900 py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Learn More About Synditech
          </h2>
          <p className="text-gray-300 mb-12 max-w-3xl mx-auto">
            Watch this short video to understand how Synditech partners with
            businesses to build high-impact digital products and scalable
            technology solutions.
          </p>

          <iframe
            className="w-full max-w-4xl mx-auto aspect-video rounded-2xl shadow-2xl shadow-orange-500/20"
            src="https://www.youtube.com/embed/dK-cxTXoaEY"
            title="About Synditech"
            allowFullScreen
          />
        </div>
      </section>

     

      {/* ================= CTA ================= */}
      <section className="text-center bg-gradient-to-r from-orange-500 to-orange-600 py-24">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Build With Synditech?
        </h2>
        <p className="text-white/90 mb-10 text-lg">
          Let’s collaborate and turn your ideas into powerful digital solutions.
        </p>
        <a href="/contact" className="inline-block bg-white text-orange-600 px-12 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg">
          Get In Touch
        </a>
      </section>

    </div>
  )
}

export default About
