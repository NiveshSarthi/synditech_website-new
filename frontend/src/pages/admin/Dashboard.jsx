import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_URL = '/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    leads: 0,
    resumes: 0,
    blogs: 0
  })
  const [recentLeads, setRecentLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [leadsRes, resumesRes, blogsRes] = await Promise.all([
        fetch(`${API_URL}/leads`),
        fetch(`${API_URL}/careers/applications`),
        fetch(`${API_URL}/blogs/all`)
      ])

      const leadsData = await leadsRes.json()
      const resumesData = await resumesRes.json()
      const blogsData = await blogsRes.json()

      setStats({
        leads: leadsData.count || 0,
        resumes: resumesData.data?.length || 0,
        blogs: blogsData.data?.length || 0
      })

      setRecentLeads(leadsData.data?.slice(0, 5) || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { label: 'Total Leads', value: stats.leads, color: 'bg-blue-500', link: '/admin/dashboard/leads' },
    { label: 'Applications', value: stats.resumes, color: 'bg-purple-500', link: '/admin/dashboard/resumes' },
    { label: 'Blog Posts', value: stats.blogs, color: 'bg-green-500', link: '/admin/dashboard/blogs' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{loading ? '-' : stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <div className="w-6 h-6 bg-white/30 rounded" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
          <Link to="/admin/dashboard/leads" className="text-green-600 hover:text-green-700 text-sm font-medium">
            View All
          </Link>
        </div>
        
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : recentLeads.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No leads yet</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentLeads.map((lead) => (
              <div key={lead._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{lead.service || 'N/A'}</p>
                    <p className="text-xs text-gray-500">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
