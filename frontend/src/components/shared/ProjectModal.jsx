import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Check, Loader2, Globe, ShoppingCart, Cloud, Briefcase, Smartphone, Code, Zap } from 'lucide-react'
import { leadAPI } from '../../utils/api'

const PROJECT_TYPES = [
  { id: 'business-website', label: 'Business Website', icon: Briefcase },
  { id: 'ecommerce-website', label: 'E-commerce Website', icon: ShoppingCart },
  { id: 'saas-platform', label: 'SaaS Platform', icon: Cloud },
  { id: 'portfolio-website', label: 'Portfolio Website', icon: Globe },
  { id: 'custom-web-app', label: 'Custom Web Application', icon: Code },
  { id: 'mobile-app-ios', label: 'Mobile App (iOS)', icon: Smartphone },
  { id: 'mobile-app-android', label: 'Mobile App (Android)', icon: Smartphone },
  { id: 'cross-platform-app', label: 'Cross-platform App', icon: Zap },
]

const TIMELINE_OPTIONS = [
  { id: 'immediately', label: 'Immediately' },
  { id: 'within-1-month', label: 'Within 1 month' },
  { id: '1-3-months', label: '1–3 months' },
  { id: 'exploring', label: 'Just exploring' },
]

const BUDGET_OPTIONS = [
  { id: 'below-50k', label: '< ₹50K' },
  { id: '50k-2l', label: '₹50K – ₹2L' },
  { id: '2l-5l', label: '₹2L – ₹5L' },
  { id: 'above-5l', label: '₹5L+' },
]

const CONTACT_TIMES = [
  { id: 'morning', label: 'Morning (9AM - 12PM)' },
  { id: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
  { id: 'evening', label: 'Evening (5PM - 8PM)' },
]

const STEPS = [
  { id: 1, title: 'Service Type' },
  { id: 2, title: 'Project Details' },
  { id: 3, title: 'Contact Info' },
]

const ProjectModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    serviceType: '',
    projectType: '',
    timeline: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    contactTime: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setTimeout(() => {
        setCurrentStep(1)
        setIsSuccess(false)
        setFormData({
          serviceType: '',
          projectType: '',
          timeline: '',
          budget: '',
          name: '',
          email: '',
          phone: '',
          contactTime: '',
        })
        setErrors({})
      }, 300)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.projectType) {
        newErrors.projectType = 'Please select a project type'
      }
    }
    
    if (step === 2) {
      if (!formData.timeline) {
        newErrors.timeline = 'Please select a timeline'
      }
      if (!formData.budget) {
        newErrors.budget = 'Please select a budget range'
      }
    }
    
    if (step === 3) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return
    
    setIsSubmitting(true)
    setErrors({ submit: '' })
    
    const payload = {
      service: formData.projectType,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      budget: formData.budget,
      timeline: formData.timeline
    }
    
    console.log('=== SUBMITTING LEAD ===')
    console.log('URL: http://localhost:5000/api/leads')
    console.log('Payload:', payload)
    
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
      if (response.ok && data.success) {
        console.log('Lead submitted successfully!')
        setIsSuccess(true)
      } else {
        console.log('Submission failed:', data.message)
        setErrors({ submit: data.message || 'Failed to submit. Please try again.' })
      }
    } catch (error) {
      console.error('Network error:', error)
      setErrors({ submit: 'Cannot connect to server. Is backend running on port 5000?' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {isSuccess ? (
            <SuccessView onClose={onClose} />
          ) : (
            <>
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Start Your Project</h2>
                    <span className="text-sm text-gray-500">
                      Step {currentStep} of {STEPS.length}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 -mt-1 -mr-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="flex gap-2 mt-4">
                  {STEPS.map((step) => (
                    <div
                      key={step.id}
                      className={`flex-1 h-2 rounded-full transition-colors ${
                        step.id <= currentStep ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <StepOne
                      key="step1"
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep === 2 && (
                    <StepTwo
                      key="step2"
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {currentStep === 3 && (
                    <StepThree
                      key="step3"
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={errors}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-end gap-3">
                  {currentStep > 1 && (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
                {errors.submit && (
                  <p className="mt-2 text-sm text-red-500 text-center">{errors.submit}</p>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const StepOne = ({ formData, updateFormData, errors }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-2">What do you want to build?</h3>
    <p className="text-gray-500 mb-6">Select the type of project you're interested in</p>
    
    <div className="grid grid-cols-2 gap-3">
      {PROJECT_TYPES.map((type) => {
        const Icon = type.icon
        const isSelected = formData.projectType === type.id
        return (
          <button
            key={type.id}
            onClick={() => updateFormData('projectType', type.id)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              isSelected
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${isSelected ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-sm font-medium ${isSelected ? 'text-green-700' : 'text-gray-700'}`}>
              {type.label}
            </span>
          </button>
        )
      })}
    </div>
    {errors.projectType && (
      <p className="mt-3 text-sm text-red-500">{errors.projectType}</p>
    )}
  </motion.div>
)

const StepTwo = ({ formData, updateFormData, errors }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-2">Project Details</h3>
    <p className="text-gray-500 mb-6">Help us understand your timeline and budget</p>
    
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">When do you want to start?</label>
        <div className="grid grid-cols-2 gap-3">
          {TIMELINE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => updateFormData('timeline', option.id)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                formData.timeline === option.id
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {errors.timeline && (
          <p className="mt-2 text-sm text-red-500">{errors.timeline}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Estimated Budget?</label>
        <div className="grid grid-cols-2 gap-3">
          {BUDGET_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => updateFormData('budget', option.id)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                formData.budget === option.id
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {errors.budget && (
          <p className="mt-2 text-sm text-red-500">{errors.budget}</p>
        )}
      </div>
    </div>
  </motion.div>
)

const StepThree = ({ formData, updateFormData, errors }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Information</h3>
    <p className="text-gray-500 mb-6">How can we reach you?</p>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          placeholder="John Doe"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-green-500 ${
            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="john@company.com"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-green-500 ${
            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          placeholder="+91 98765 43210"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-colors focus:outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Contact Time</label>
        <div className="grid grid-cols-3 gap-3">
          {CONTACT_TIMES.map((time) => (
            <button
              key={time.id}
              onClick={() => updateFormData('contactTime', time.id)}
              className={`p-3 rounded-xl border-2 text-xs font-medium transition-all ${
                formData.contactTime === time.id
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

const SuccessView = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-8 text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
    >
      <Check className="w-10 h-10 text-green-600" />
    </motion.div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
    <p className="text-gray-600 mb-6 max-w-sm mx-auto">
      Our team will contact you soon to discuss your project requirements.
    </p>
    <button
      onClick={onClose}
      className="px-8 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
    >
      Got it!
    </button>
  </motion.div>
)

export default ProjectModal
