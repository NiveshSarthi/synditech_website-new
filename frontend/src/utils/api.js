import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
export const ADMIN_TOKEN_KEY = 'synditech_admin_token'

const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact')
}

export const leadAPI = {
  create: (data) => api.post('/leads', data),
  getAll: (params) => api.get('/leads', { params }),
  getById: (id) => api.get(`/leads/${id}`),
  updateStatus: (id, status) => api.put(`/leads/${id}/status`, { status }),
  delete: (id) => api.delete(`/leads/${id}`)
}

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter', { email })
}

export const careersAPI = {
  submitApplication: (formData) =>
    api.post('/careers/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export const jobsAPI = {
  getAll: () => api.get('/jobs')
}

export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  verify: (token) => api.post('/admin/verify', {}, getAuthConfig(token)),
  getApplications: (token) => api.get('/careers/applications', getAuthConfig(token))
}

export const blogsAPI = {
  getAll: () => api.get('/blogs'),
  getBySlug: (slug) => api.get(`/blogs/${slug}`)
}

export const adminBlogsAPI = {
  getAll: (token) => api.get('/admin/blogs', getAuthConfig(token)),
  create: (token, data) => api.post('/admin/blogs', data, getAuthConfig(token)),
  update: (token, id, data) => api.put(`/admin/blogs/${id}`, data, getAuthConfig(token)),
  delete: (token, id) => api.delete(`/admin/blogs/${id}`, getAuthConfig(token))
}

export default api
