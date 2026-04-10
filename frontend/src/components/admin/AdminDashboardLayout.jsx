import React, { useState, useEffect } from 'react'
import { useNavigate, Outlet, NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  MessageSquare,
  Bell
} from 'lucide-react'
import { ADMIN_TOKEN_KEY, adminAPI } from '../../utils/api'

const AdminDashboardLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY)
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    adminAPI.verify(token).catch(() => {
      localStorage.removeItem(ADMIN_TOKEN_KEY)
      navigate('/admin/login', { replace: true })
    })
  }, [navigate])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    navigate('/admin/login', { replace: true })
  }

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/dashboard/leads', icon: Users, label: 'Leads' },
    { to: '/admin/dashboard/contacts', icon: MessageSquare, label: 'Contacts' },
    { to: '/admin/dashboard/resumes', icon: FileText, label: 'Resumes' },
    { to: '/admin/dashboard/blogs', icon: FileText, label: 'Blogs' },
    { to: '/admin/dashboard/subscribers', icon: Bell, label: 'Subscribers' },
  ]

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0`}>
      <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
        <h1 className="text-xl font-bold text-white">Synditech Admin</h1>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="mt-6 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin/dashboard'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mt-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar />

      <div className="md:ml-64">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Admin Panel</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboardLayout
