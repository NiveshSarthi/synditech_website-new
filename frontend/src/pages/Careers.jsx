import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Code, Zap, Heart, Mail, MapPin, Clock } from 'lucide-react'

const Careers = () => {
  const jobs = [
    {
      title: 'Senior React Developer',
      type: 'Full-time',
      location: 'Remote',
      description: 'Build cutting-edge web applications using React, Next.js, and modern frontend technologies.',
      requirements: ['5+ years React experience', 'TypeScript expertise', 'Team leadership']
    },
    {
      title: 'Backend Engineer (Node.js)',
      type: 'Full-time',
      location: 'Remote',
      description: 'Develop scalable APIs and microservices using Node.js, Express, and cloud technologies.',
      requirements: ['4+ years Node.js experience', 'Database design', 'AWS/Azure knowledge']
    },
    {
      title: 'UI/UX Designer',
      type: 'Full-time',
      location: 'Remote',
      description: 'Create beautiful and intuitive user experiences for web and mobile applications.',
      requirements: ['3+ years design experience', 'Figma/Sketch proficiency', 'User research skills']
    },
    {
      title: 'DevOps Engineer',
      type: 'Full-time',
      location: 'Remote',
      description: 'Manage cloud infrastructure, CI/CD pipelines, and ensure system reliability.',
      requirements: ['3+ years DevOps experience', 'Docker/Kubernetes', 'AWS/Azure']
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20"></div>
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
          <div className="mb-6">
            <span className="px-6 py-3 bg-green-600/20 border border-green-600/50 rounded-full text-green-600 font-semibold">
              🌟 Join Our Team
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-gray-900 font-orbitron">
            CAREERS
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-green-600 font-semibold">
            Shape the Future with Us
          </p>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Be part of a team that's revolutionizing technology. We offer exciting challenges,
            continuous learning, and the opportunity to work on projects that make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#openings" className="btn-primary shadow-lg shadow-green-600/50">
              View Openings
            </a>
            <Link to="/contact" className="btn-outline">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Join Synditech?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: 'Innovation', desc: 'Work with cutting-edge technologies' },
              { icon: Users, title: 'Team Spirit', desc: 'Collaborative and supportive environment' },
              { icon: Zap, title: 'Growth', desc: 'Continuous learning and development' },
              { icon: Heart, title: 'Impact', desc: 'Projects that make a real difference' }
            ].map((item, idx) => (
              <div key={idx} className="card animate-fade-in text-center" style={{animationDelay: `${idx * 0.1}s`}}>
                <item.icon className="w-12 h-12 text-green-600 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="py-24 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {jobs.map((job, idx) => (
              <div key={idx} className="card animate-fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="mb-6">
                  <h4 className="text-gray-900 font-semibold mb-2">Requirements:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {job.requirements.map((req, i) => (
                      <li key={i}>• {req}</li>
                    ))}
                  </ul>
                </div>
                <Link to="/contact" className="btn-primary w-full text-center">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Culture</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation First',
                desc: 'We encourage creative thinking and embrace new ideas. Every team member has a voice in shaping our future.'
              },
              {
                title: 'Work-Life Balance',
                desc: 'We believe in sustainable work practices. Flexible hours, remote work options, and mental health support.'
              },
              {
                title: 'Continuous Learning',
                desc: 'Stay ahead with our learning budget, conferences, and internal knowledge-sharing sessions.'
              }
            ].map((item, idx) => (
              <div key={idx} className="card animate-fade-in text-center" style={{animationDelay: `${idx * 0.1}s`}}>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Ready to Join Our Team?</h2>
          <p className="text-xl text-gray-900/90 mb-10">
            Don't see a position that matches your skills? We're always looking for talented individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="inline-block px-12 py-5 bg-white text-green-700 hover:bg-gray-100 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg">
              Send Us Your Resume
            </Link>
            <a href="mailto:careers@synditech.com" className="inline-block px-12 py-5 border-2 border-white text-gray-900 hover:bg-white hover:text-green-700 rounded-full font-bold text-lg transition-all hover:scale-105">
              <Mail className="w-5 h-5 inline mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Careers