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
  MessageSquare,
  CheckCircle,
  Circle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = '/api'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedContact, setSelectedContact] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/contact`)
      const data = await response.json()
      if (data.success) {
        setContacts(data.data)
      } else {
        setError(data.message || 'Failed to load contacts')
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

  const handleDelete = async (contactId) => {
    if (!window.confirm('Delete this contact submission? This cannot be undone.')) return
    setDeletingId(contactId)
    try {
      const response = await fetch(`${API_URL}/contact/${contactId}`, { method: 'DELETE' })
      const data = await response.json()
      if (data.success) {
        setContacts(prev => prev.filter(c => c._id !== contactId))
        if (selectedContact?._id === contactId) {
          setShowModal(false)
          setSelectedContact(null)
        }
        showToast('Contact deleted')
      } else {
        showToast('Failed to delete', 'error')
      }
    } catch (err) {
      showToast('Failed to delete', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleStatus = async (contact) => {
    const newStatus = contact.status === 'read' ? 'unread' : 'read'
    setUpdatingId(contact._id)
    try {
      const response = await fetch(`${API_URL}/contact/${contact._id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await response.json()
      if (data.success) {
        setContacts(prev =>
          prev.map(c => c._id === contact._id ? { ...c, status: newStatus } : c)
        )
        if (selectedContact?._id === contact._id) {
          setSelectedContact(prev => ({ ...prev, status: newStatus }))
        }
        showToast(`Marked as ${newStatus}`)
      } else {
        showToast('Failed to update status', 'error')
      }
    } catch (err) {
      showToast('Failed to update status', 'error')
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredContacts = contacts.filter(c =>
    (c.name?.toLowerCase().includes(search.toLowerCase())) ||
    (c.email?.toLowerCase().includes(search.toLowerCase())) ||
    (c.phone?.toLowerCase().includes(search.toLowerCase()))
  )

  const unreadCount = contacts.filter(c => c.status === 'unread').length

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-green-600 mt-1">{unreadCount} unread message{unreadCount > 1 ? 's' : ''}</p>
          )}
        </div>
        <button
          onClick={fetchContacts}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
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
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No contact submissions found
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr
                      key={contact._id}
                      className={`hover:bg-gray-50 transition-colors ${contact.status === 'unread' ? 'bg-green-50/30' : ''}`}
                    >
                      {/* Name + Email */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            contact.status === 'unread' ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <User className={`w-5 h-5 ${contact.status === 'unread' ? 'text-green-600' : 'text-gray-500'}`} />
                          </div>
                          <div>
                            <p className={`font-medium ${contact.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                              {contact.name}
                            </p>
                            <p className="text-sm text-gray-500">{contact.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {contact.phone || <span className="text-gray-400">—</span>}
                      </td>

                      {/* Message preview */}
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-[220px]">
                        <span className="line-clamp-2 leading-snug">
                          {contact.message}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {contact.createdAt
                          ? new Date(contact.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit', month: 'short', year: 'numeric'
                            })
                          : 'N/A'}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          contact.status === 'unread'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {contact.status === 'unread'
                            ? <Circle className="w-3 h-3 fill-green-500 text-green-500" />
                            : <CheckCircle className="w-3 h-3" />
                          }
                          {contact.status === 'unread' ? 'Unread' : 'Read'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* View */}
                          <button
                            onClick={() => { setSelectedContact(contact); setShowModal(true) }}
                            title="View"
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-green-600 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Toggle Read/Unread */}
                          <button
                            onClick={() => handleToggleStatus(contact)}
                            disabled={updatingId === contact._id}
                            title={contact.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                            className="p-2 hover:bg-green-50 rounded-lg text-gray-500 hover:text-green-600 disabled:opacity-50 transition-colors"
                          >
                            {updatingId === contact._id
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : contact.status === 'unread'
                                ? <CheckCircle className="w-4 h-4" />
                                : <Circle className="w-4 h-4" />
                            }
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(contact._id)}
                            disabled={deletingId === contact._id}
                            title="Delete"
                            className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 disabled:opacity-50 transition-colors"
                          >
                            {deletingId === contact._id
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <Trash2 className="w-4 h-4" />
                            }
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
        Showing {filteredContacts.length} of {contacts.length} submissions
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && selectedContact && (
          <ContactModal
            contact={selectedContact}
            onClose={() => { setShowModal(false); setSelectedContact(null) }}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            deletingId={deletingId}
            updatingId={updatingId}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
            } text-white font-medium z-[9999]`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const ContactModal = ({ contact, onClose, onDelete, onToggleStatus, deletingId, updatingId }) => (
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
      {/* Modal Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-6 overflow-y-auto max-h-[60vh] space-y-5">
        {/* Identity */}
        <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{contact.email}</span>
            </div>
            {contact.phone && (
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{contact.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Message</span>
          </div>
          <p className="text-gray-700 bg-gray-50 rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap">
            {contact.message}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {contact.createdAt
              ? new Date(contact.createdAt).toLocaleString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })
              : 'N/A'}
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            contact.status === 'unread' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {contact.status === 'unread' ? 'Unread' : 'Read'}
          </span>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
        <button
          onClick={() => onToggleStatus(contact)}
          disabled={updatingId === contact._id}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-50 text-green-700 font-medium hover:bg-green-100 disabled:opacity-50 transition-colors"
        >
          {updatingId === contact._id
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : contact.status === 'unread'
              ? <CheckCircle className="w-4 h-4" />
              : <Circle className="w-4 h-4" />
          }
          {contact.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
        </button>
        <button
          onClick={() => onDelete(contact._id)}
          disabled={deletingId === contact._id}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 disabled:opacity-50 transition-colors"
        >
          {deletingId === contact._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Delete
        </button>
      </div>
    </motion.div>
  </motion.div>
)

export default AdminContacts
