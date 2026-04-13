import React, { useState, useEffect } from 'react'
import { Trash2, Mail, RefreshCw, Users } from 'lucide-react'

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const fetchSubscribers = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/newsletter/subscribers')
      const data = await res.json()
      if (data.success) {
        setSubscribers(data.data)
      } else {
        setError(data.message || 'Failed to load subscribers.')
      }
    } catch {
      setError('Unable to connect to server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSubscribers() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this subscriber?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`http://localhost:5000/api/newsletter/subscribers/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setSubscribers(prev => prev.filter(s => s._id !== id))
      } else {
        alert(data.message || 'Failed to delete.')
      }
    } catch {
      alert('Connection error.')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
          <p className="text-gray-500 text-sm mt-1">All emails subscribed via the website footer.</p>
        </div>
        <button
          onClick={fetchSubscribers}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Subscribers</p>
            <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Latest Subscriber</p>
            <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
              {subscribers[0]?.email || '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" /> Loading...
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No subscribers yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">#</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Email</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Subscribed On</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscribers.map((sub, idx) => (
                  <tr key={sub._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(sub.subscribedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(sub._id)}
                        disabled={deletingId === sub._id}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                        title="Remove subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSubscribers
