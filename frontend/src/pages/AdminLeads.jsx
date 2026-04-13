import React, { useState, useEffect } from 'react'
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Eye, 
  X, 
  Loader2,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  PhoneCall,
  User,
  RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { leadAPI } from '../utils/api'

const STATUS_CONFIG = {
  'new': { label: 'New', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  'contacted': { label: 'Contacted', color: 'bg-yellow-100 text-yellow-700', icon: PhoneCall },
  'in_progress': { label: 'In Progress', color: 'bg-purple-100 text-purple-700', icon: RefreshCw },
  'closed': { label: 'Closed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
}

const AdminLeads = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedLead, setSelectedLead] = useState(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await leadAPI.getAll()
      const data = response.data
      if (data.success) {
        setLeads(data.data)
      } else {
        setError(data.message || 'Failed to fetch leads')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Cannot connect to server. Please check your backend connection.')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleDelete = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return
    
    setDeletingId(leadId)
    try {
      const response = await leadAPI.delete(leadId)
      const data = response.data
      if (data.success) {
        setLeads(prev => prev.filter(lead => lead._id !== leadId))
        if (selectedLead?._id === leadId) {
          setShowLeadModal(false)
          setSelectedLead(null)
        }
        showToast('Lead deleted successfully')
      } else {
        showToast('Failed to delete lead', 'error')
      }
    } catch (err) {
      console.error('Delete error:', err)
      showToast('Failed to delete lead', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const filteredLeads = leads
    .filter(lead => {
      const matchesSearch = 
        (lead.name && lead.name.toLowerCase().includes(search.toLowerCase())) ||
        (lead.email && lead.email.toLowerCase().includes(search.toLowerCase()))
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

  const getStatusBadge = (status) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['new']
    const Icon = config.icon
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leads Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage and track all project inquiries</p>
          </div>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 outline-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>

                <button
                  onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  {sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchLeads}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Timeline</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{lead.name}</p>
                              <p className="text-sm text-gray-500">{lead.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {lead.service || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {lead.budget || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {lead.timeline || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(lead.status)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedLead(lead)
                                setShowLeadModal(true)
                              }}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-green-600"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(lead._id)}
                              disabled={deletingId === lead._id}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600 disabled:opacity-50"
                            >
                              {deletingId === lead._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
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
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
      </div>

      <AnimatePresence>
        {showLeadModal && selectedLead && (
          <LeadDetailModal
            lead={selectedLead}
            onClose={() => {
              setShowLeadModal(false)
              setSelectedLead(null)
            }}
            onDelete={handleDelete}
            deletingId={deletingId}
            getStatusBadge={getStatusBadge}
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

const LeadDetailModal = ({ 
  lead, 
  onClose, 
  onDelete, 
  deletingId,
  getStatusBadge 
}) => {
  return (
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{lead.name}</h3>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{lead.email}</span>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{lead.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Project Information</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Service</span>
                <span className="font-medium text-gray-900">{lead.service || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Timeline</span>
                <span className="font-medium text-gray-900">{lead.timeline || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Budget</span>
                <span className="font-medium text-gray-900">{lead.budget || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Status</h4>
            {getStatusBadge(lead.status)}
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Submitted on {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : 'N/A'}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => onDelete(lead._id)}
            disabled={deletingId === lead._id}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            {deletingId === lead._id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete Lead
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdminLeads
