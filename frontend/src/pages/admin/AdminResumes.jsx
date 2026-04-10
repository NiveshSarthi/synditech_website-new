import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Trash2, 
  Eye, 
  X, 
  Loader2,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  User,
  Download,
  FileText
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ADMIN_TOKEN_KEY } from '../../utils/api'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const STATUS_CONFIG = {
  'new': { label: 'New', color: 'bg-blue-100 text-blue-700' },
  'reviewing': { label: 'Reviewing', color: 'bg-yellow-100 text-yellow-700' },
  'interview': { label: 'Interview', color: 'bg-purple-100 text-purple-700' },
  'rejected': { label: 'Rejected', color: 'bg-red-100 text-red-700' },
  'accepted': { label: 'Accepted', color: 'bg-green-100 text-green-700' },
}

const AdminResumes = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedApp, setSelectedApp] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY)
      const response = await fetch(`${API_URL}/careers/applications`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setApplications(data.data)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Cannot connect to server')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY)
      const response = await fetch(`${API_URL}/careers/applications/${appId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await response.json()
      if (data.success) {
        setApplications(prev => prev.map(a => a._id === appId ? { ...a, status: newStatus } : a))
        if (selectedApp?._id === appId) {
          setSelectedApp(prev => ({ ...prev, status: newStatus }))
        }
        showToast('Status updated')
      }
    } catch (err) {
      showToast('Failed to update status', 'error')
    }
  }

  const handleDelete = async (appId) => {
    if (!window.confirm('Delete this application?')) return
    setDeletingId(appId)
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY)
      const response = await fetch(`${API_URL}/careers/applications/${appId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setApplications(prev => prev.filter(a => a._id !== appId))
        if (selectedApp?._id === appId) {
          setShowModal(false)
          setSelectedApp(null)
        }
        showToast('Application deleted')
      }
    } catch (err) {
      showToast('Failed to delete', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const filteredApps = applications.filter(app =>
    app.name?.toLowerCase().includes(search.toLowerCase()) ||
    app.email?.toLowerCase().includes(search.toLowerCase()) ||
    app.role?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resumes</h1>
        <button
          onClick={fetchApplications}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">No applications found</td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{app.name}</p>
                            <p className="text-sm text-gray-500">{app.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{app.role}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[app.status]?.color || STATUS_CONFIG['new'].color}`}>
                          {STATUS_CONFIG[app.status]?.label || 'New'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setSelectedApp(app); setShowModal(true) }}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-green-600"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(app._id)}
                            disabled={deletingId === app._id}
                            className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600 disabled:opacity-50"
                          >
                            {deletingId === app._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredApps.length} of {applications.length} applications
      </div>

      <AnimatePresence>
        {showModal && selectedApp && (
          <ApplicationModal
            app={selectedApp}
            onClose={() => { setShowModal(false); setSelectedApp(null) }}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
            } text-white font-medium`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ApplicationModal = ({ app, onClose, onStatusChange, onDelete, deletingId }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{app.email}</span>
            </div>
            {app.phone && (
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{app.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Role</span>
            <span className="font-medium">{app.role}</span>
          </div>
          {app.resume && (
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Resume</span>
              <a 
                href={`${API_URL}/uploads/${app.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-green-600 hover:text-green-700"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          )}
          {app.coverLetter && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 block mb-2">Cover Letter</span>
              <p className="text-sm text-gray-700">{app.coverLetter}</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={app.status}
            onChange={(e) => onStatusChange(app._id, e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 outline-none"
          >
            {Object.entries(STATUS_CONFIG).map(([value, config]) => (
              <option key={value} value={value}>{config.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          Applied on {app.createdAt ? new Date(app.createdAt).toLocaleString() : 'N/A'}
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-gray-50">
        <button
          onClick={() => onDelete(app._id)}
          disabled={deletingId === app._id}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 disabled:opacity-50"
        >
          {deletingId === app._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Delete Application
        </button>
      </div>
    </motion.div>
  </motion.div>
)

export default AdminResumes
