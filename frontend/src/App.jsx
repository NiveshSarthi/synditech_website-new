import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import AdminLogin from './pages/AdminLogin'
import BlogList from './pages/BlogList'
import BlogDetail from './pages/BlogDetail'

// Admin Components
import AdminDashboardLayout from './components/admin/AdminDashboardLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminLeads from './pages/admin/AdminLeads'
import AdminResumes from './pages/admin/AdminResumes'
import AdminBlogs from './pages/admin/AdminBlogs'

// Service Pages
import SaasDevelopment from './pages/services/SaasDevelopment'
import EcommerceSolutions from './pages/services/EcommerceSolutions'
import MobileAppDevelopment from './pages/services/MobileAppDevelopment'
import WebDevelopment from './pages/services/WebDevelopment'
import APIIntegration from './pages/services/APIIntegration'
import CloudServices from './pages/services/CloudServices'

// Tool Pages
import TaskTracker from './pages/tools/TaskTracker'
import LeadManagement from './pages/tools/LeadManagement'
import InventoryManagement from './pages/tools/InventoryManagement'
import HRMS from './pages/tools/HRMS'
import AccountManagement from './pages/tools/AccountManagement'
import IVRSoftware from './pages/tools/IVRSoftware'
import TradingSoftware from './pages/tools/TradingSoftware'

function App() {
  return (
    <Routes>
        {/* Main Website Routes - With Layout (Header + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          {/* <Route path="/pricing" element={<Pricing />} /> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          
          {/* Service Routes */}
          <Route path="/services/saas-development" element={<SaasDevelopment />} />
          <Route path="/services/ecommerce-solutions" element={<EcommerceSolutions />} />
          <Route path="/services/mobile-app-development" element={<MobileAppDevelopment />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/api-integration" element={<APIIntegration />} />
          <Route path="/services/cloud-services" element={<CloudServices />} />
          
          {/* Tool Routes */}
          <Route path="/tools/task-tracker" element={<TaskTracker />} />
          <Route path="/tools/lead-management" element={<LeadManagement />} />
          <Route path="/tools/inventory-management" element={<InventoryManagement />} />
          <Route path="/tools/hrms" element={<HRMS />} />
          <Route path="/tools/account-management" element={<AccountManagement />} />
          <Route path="/tools/ivr-software" element={<IVRSoftware />} />
          <Route path="/tools/trading-software" element={<TradingSoftware />} />
        </Route>

        {/* Admin Routes - Without Layout (No Header + Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="resumes" element={<AdminResumes />} />
          <Route path="blogs" element={<AdminBlogs />} />
        </Route>
      </Routes>
  )
}

export default App
