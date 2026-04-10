import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExternalLink, FileText, LogOut, Mail, Phone, UserRound } from 'lucide-react'
import { adminAPI } from '../utils/api'

const ADMIN_TOKEN_KEY = 'synditech_admin_token'

const formatDate = (value) => {
  try {
    return new Date(value).toLocaleString()
  } catch (error) {
    return value
  }
}

const AdminApplications = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY)

    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    const loadApplications = async () => {
      try {
        const response = await adminAPI.getApplications(token)
        setApplications(response.data?.data || [])
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem(ADMIN_TOKEN_KEY)
          navigate('/admin/login', { replace: true })
          return
        }

        setErrorMessage(error.response?.data?.message || 'Failed to load applications.')
      } finally {
        setIsLoading(false)
      }
    }

    loadApplications()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    navigate('/admin/login', { replace: true })
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Super Admin</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Career Applications</h1>
            <p className="mt-2 text-gray-600">Review every submitted resume and open files directly from this dashboard.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/blogs"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-green-300 hover:text-green-700"
            >
              Manage Blogs
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-green-300 hover:text-green-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="card text-center text-gray-600">Loading applications...</div>
        ) : errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        ) : applications.length === 0 ? (
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-gray-900">No applications yet</h2>
            <p className="mt-3 text-gray-600">Resume submissions from the careers page will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div key={application._id} className="card border border-gray-200 shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-900">{application.name}</h2>
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
                        {application.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="inline-flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-green-600" />
                        {application.role}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Mail className="h-4 w-4 text-green-600" />
                        {application.email}
                      </span>
                      {application.phone && (
                        <span className="inline-flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          {application.phone}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Submitted on {formatDate(application.createdAt)}</p>
                    {application.coverLetter && (
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="mb-2 text-sm font-semibold text-gray-900">Cover Letter</p>
                        <p className="text-sm leading-7 text-gray-600">{application.coverLetter}</p>
                      </div>
                    )}
                  </div>

                  <div className="min-w-[240px] rounded-[1.5rem] border border-gray-200 bg-gray-50 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{application.resumeOriginalName}</p>
                        <p className="text-sm text-gray-500">
                          {(application.resumeSize / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary w-full text-center"
                      >
                        View Resume
                      </a>
                      <a
                        href={application.resumeUrl}
                        download={application.resumeOriginalName}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-green-300 hover:text-green-700"
                      >
                        Download
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminApplications
