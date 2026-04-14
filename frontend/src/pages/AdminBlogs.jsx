import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, FilePlus2, LogOut, PencilLine } from 'lucide-react'
import { adminBlogsAPI } from '../utils/api'

const ADMIN_TOKEN_KEY = 'synditech_admin_token'

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  authorName: 'Synditech Team',
  category: 'Insights',
  tags: '',
  isPublished: true
}

const slugify = (value = '') => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '')

const formatDate = (value) => {
  if (!value) {
    return 'Draft'
  }

  try {
    return new Date(value).toLocaleString()
  } catch (error) {
    return value
  }
}

const AdminBlogs = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const token = localStorage.getItem(ADMIN_TOKEN_KEY)

  const loadBlogs = async (activeToken) => {
    try {
      const response = await adminBlogsAPI.getAll(activeToken)
      setBlogs(response.data?.data || [])
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem(ADMIN_TOKEN_KEY)
        navigate('/admin/login', { replace: true })
        return
      }

      setErrorMessage(error.response?.data?.message || 'Failed to load blog posts.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    loadBlogs(token)
  }, [navigate, token])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((current) => {
      const nextValue = type === 'checkbox' ? checked : value
      const nextState = {
        ...current,
        [name]: nextValue
      }

      if (name === 'title' && (!current.slug || current.slug === slugify(current.title))) {
        nextState.slug = slugify(value)
      }

      return nextState
    })
  }

  const resetForm = ({ clearMessages = true } = {}) => {
    setFormData(emptyForm)
    setEditingId('')
    if (clearMessages) {
      setErrorMessage('')
      setSuccessMessage('')
    }
  }

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      coverImage: blog.coverImage || '',
      authorName: blog.authorName || 'Synditech Team',
      category: blog.category || 'Insights',
      tags: (blog.tags || []).join(', '),
      isPublished: Boolean(blog.isPublished)
    })
    setEditingId(blog._id)
    setErrorMessage('')
    setSuccessMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    setIsSaving(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const payload = {
        ...formData,
        slug: slugify(formData.slug || formData.title)
      }

      const response = editingId
        ? await adminBlogsAPI.update(token, editingId, payload)
        : await adminBlogsAPI.create(token, payload)

      setSuccessMessage(response.data?.message || 'Blog post saved successfully.')
      setErrorMessage('')
      resetForm({ clearMessages: false })
      await loadBlogs(token)
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem(ADMIN_TOKEN_KEY)
        navigate('/admin/login', { replace: true })
        return
      }

      setErrorMessage(error.response?.data?.message || 'Failed to save blog post.')
    } finally {
      setIsSaving(false)
    }
  }

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
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Blog Manager</h1>
            <p className="mt-2 text-gray-600">Create, publish, and edit blog posts that appear on the website.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/applications"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-green-300 hover:text-green-700"
            >
              View Applications
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

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card border border-gray-200 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <FilePlus2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Edit Blog Post' : 'Create Blog Post'}
                </h2>
                <p className="text-gray-600">Draft the article content and choose whether it should be published immediately.</p>
              </div>
            </div>

            {successMessage && (
              <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-900">Title</span>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-900">Slug</span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-900">Excerpt</span>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-900">Content</span>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="14"
                  className="w-full rounded-[1.75rem] border border-gray-200 px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-900">Cover Image URL</span>
                  <input
                    type="url"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="https://example.com/blog-cover.jpg"
                  />
                  {formData.coverImage && (
                    <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
                      <img 
                        src={formData.coverImage} 
                        alt="Cover Preview" 
                        className="h-32 w-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                        onLoad={(e) => {
                          e.target.style.display = 'block';
                        }}
                      />
                    </div>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-900">Author</span>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-900">Category</span>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-900">Tags</span>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="AI, Automation, Product"
                  />
                </label>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Publish this post immediately
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-green-300 hover:text-green-700"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="card border border-gray-200 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Existing Posts</h2>
              <p className="mt-2 text-gray-600">Review published articles and drafts, then reopen one for editing.</p>
            </div>

            {isLoading ? (
              <div className="text-gray-600">Loading blog posts...</div>
            ) : blogs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center text-gray-600">
                No blog posts yet. Your first article will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog._id} className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                        {blog.category || 'Insights'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{blog.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{blog.excerpt}</p>
                    <p className="mt-3 text-xs text-gray-500">
                      {blog.authorName || 'Synditech Team'} • {formatDate(blog.publishedAt || blog.updatedAt)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(blog)}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-green-300 hover:text-green-700"
                      >
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </button>
                      {blog.isPublished && (
                        <Link
                          to={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-green-300 hover:text-green-700"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminBlogs
