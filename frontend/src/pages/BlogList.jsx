import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react'
import { blogsAPI } from '../utils/api'

const formatDate = (value) => {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return value
  }
}

const estimateReadTime = (content = '') => {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 180))
}

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await blogsAPI.getAll()
        setBlogs(response.data?.data || [])
        setErrorMessage('')
      } catch (error) {
        console.error('Error loading blogs:', error)
        setErrorMessage('')
        setBlogs([])
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogs()
  }, [])

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.16),_transparent_28%),linear-gradient(180deg,_#f5f7f4_0%,_#edf1ed_100%)] px-4 md:px-10 py-4 md:py-8">
      <div className="mx-auto max-w-full">
        <div className="header-section px-4 md:px-6 py-4 md:py-6">
          <div className="header-content">
            <div className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-green-700">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              INSIGHTS
            </div>
            <h1 className="text-5xl font-black text-gray-900">
              Ideas, Product Thinking, and Practical AI Execution.
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto mt-6" />
            <p className="mt-4 md:mt-6 max-w-2xl text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-600">
              Explore articles from the Synditech team on automation, digital products, engineering workflows, and scalable growth.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 px-4 md:px-6 py-12 md:py-16 text-center text-gray-600">
            Loading blog posts...
          </div>
        ) : errorMessage ? (
          <div className="mt-10 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        ) : blogs.length === 0 ? (
          <div className="mt-10 px-4 md:px-6 py-12 md:py-16 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">No posts published yet</h2>
            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600">New stories will appear here once they are published from the admin panel.</p>
          </div>
        ) : (
          <div className="blog-grid-responsive mt-8 md:mt-10">
            {blogs.map((blog, index) => (
              <article key={blog._id} className="blog-card overflow-hidden transition-transform hover:-translate-y-1">
                <div className="overflow-hidden p-4 md:p-6 flex flex-col h-full">
                  {blog.coverImage && !imageErrors[blog._id] ? (
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="float-right w-[40%] ml-4 mb-3 h-[180px] object-cover rounded-lg"
                      onError={() => setImageErrors(prev => ({ ...prev, [blog._id]: true }))}
                    />
                  ) : null}
                  <div className="flex-grow pr-4">
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
                      {blog.category}
                    </span>
                    <h3 className="mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900" style={{ lineHeight: 1.4 }}>{blog.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3" style={{ lineHeight: 1.6 }}>{blog.excerpt}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                      <span>{estimateReadTime(blog.content)} min read</span>
                    </div>
                  </div>
                  <div className="clear-right mt-4">
                    <Link 
                      to={`/blog/${blog.slug}`} 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-xs font-semibold hover:bg-green-700 transition-colors"
                    >
                      Explore post
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogList
