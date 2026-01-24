import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

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
  getAll: () => api.get('/leads')
}

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter', { email })
}

export default api