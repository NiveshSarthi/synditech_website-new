import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Code, Zap, Heart, Mail, MapPin, Clock, Upload, FileText, CheckCircle2 } from 'lucide-react'
import { careersAPI, jobsAPI } from '../utils/api'
import CareersHero from '../components/careers/CareersHero'

const Careers = () => {
  const [jobs, setJobs] = useState([])
  const [isLoadingJobs, setIsLoadingJobs] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsAPI.getAll()
        if (response.data?.success) {
          setJobs(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setIsLoadingJobs(false)
      }
    }
    fetchJobs()
  }, [])

  const applicationSectionRef = useRef(null)
  const [selectedFileName, setSelectedFileName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    coverLetter: '',
    resume: null
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value
    }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null
    setFormData((current) => ({
      ...current,
      resume: file
    }))
    setSelectedFileName(file ? file.name : '')
  }

  const handleSelectRole = (role) => {
    setFormData((current) => ({
      ...current,
      role
    }))

    applicationSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const payload = new FormData()
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('phone', formData.phone)
      payload.append('role', formData.role)
      payload.append('coverLetter', formData.coverLetter)

      if (formData.resume) {
        payload.append('resume', formData.resume)
      }

      const response = await careersAPI.submitApplication(payload)

      setSubmitMessage({
        type: 'success',
        text: response.data?.message || 'Application submitted successfully.'
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: jobs[0]?.title || '',
        coverLetter: '',
        resume: null
      })
      setSelectedFileName('')
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit your application. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <CareersHero />

      {/* Why Join Us */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join Synditech?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: 'Innovation', desc: 'Work with cutting-edge technologies' },
              { icon: Users, title: 'Team Spirit', desc: 'Collaborative and supportive environment' },
              { icon: Zap, title: 'Growth', desc: 'Continuous learning and development' },
              { icon: Heart, title: 'Impact', desc: 'Projects that make a real difference' }
            ].map((item, idx) => (
              <div key={idx} className="card animate-fade-in text-center" style={{ animationDelay: `${idx * 0.1}s` }}>
                <item.icon className="w-12 h-12 text-green-600 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="py-14 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {isLoadingJobs ? (
              <div className="col-span-2 text-center py-10 text-gray-600">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="col-span-2 text-center py-10 text-gray-600">No job openings at the moment. Check back soon!</div>
            ) : (
            jobs.map((job, idx) => (
              <div key={job._id} className="card animate-fade-in flex flex-col" style={{ animationDelay: `${idx * 0.1}s` }}>
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
                <button
                  type="button"
                  onClick={() => handleSelectRole(job.title)}
                  className="btn-primary w-full text-center mt-auto"
                >
                  Apply Now
                </button>
              </div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={applicationSectionRef} data-application className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Apply with Your Resume</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Submit your application directly from this page and our super admin team will review it from the admin dashboard.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="card">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What to include</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  Updated resume in PDF, DOC, or DOCX format
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  Role selection matching the opening you are applying for
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  Optional cover letter or brief introduction
                </li>
              </ul>
              <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-5">
                <p className="text-sm font-semibold text-green-700 mb-2">Selected Role</p>
                {formData.role ? (
                  <p className="text-lg font-bold text-gray-900">{formData.role}</p>
                ) : (
                  <button
                    type="button"
                    onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-green-700 font-semibold hover:underline text-left"
                  >
                    ← Select a role from openings
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="card space-y-6">
              {submitMessage.text && (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    submitMessage.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    {jobs.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Resume</label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-green-300 bg-green-50/50 px-6 py-8 text-center transition-colors hover:bg-green-50">
                  <Upload className="w-8 h-8 text-green-600 mb-3" />
                  <span className="text-base font-semibold text-gray-900">Upload Resume</span>
                  <span className="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX up to 5MB</span>
                  {selectedFileName && (
                    <span className="mt-3 text-sm font-medium text-green-700">{selectedFileName}</span>
                  )}
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tell us a little about your background and why this role is a fit."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Culture</h2>
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
              <div key={idx} className="card animate-fade-in text-center" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 px-4 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Join Our Team?</h2>
          <p className="text-xl text-gray-900/90 mb-10">
            Don&apos;t see a position that matches your skills? We&apos;re always looking for talented individuals.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button
              type="button"
              onClick={() => applicationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="w-full sm:w-auto px-8 py-4 bg-white text-green-700 hover:bg-gray-100 rounded-full font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-lg"
            >
              Send Us Your Resume
            </button>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@synditech.ai"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 flex items-center justify-center bg-white text-green-700 hover:bg-gray-100 rounded-full font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-lg cursor-pointer"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Careers
