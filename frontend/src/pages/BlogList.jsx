import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react'
import { blogsAPI } from '../utils/api'

const ZAVYO_IMAGE = '/assets/images/zavyo.jpeg'

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
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f7faf7_100%)] px-4 md:px-10 py-8 md:py-16">
      <div className="mx-auto max-w-full">
        <div className="header-section px-4 md:px-6 py-8 md:py-12">
          <div className="header-content">
            <div className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-green-700">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              Synditech Journal
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-gray-900">
              Ideas, product thinking, and practical AI execution.
            </h1>
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
                <div className="blog-image-container bg-gradient-to-br from-green-100 via-white to-emerald-50">
                  {index === 1 ? (
                    <img src={ZAVYO_IMAGE} alt={blog.title} className="blog-image" />
                  ) : blog.coverImage ? (
                    <img src={blog.coverImage} alt={blog.title} className="blog-image" />
                  ) : (
                    <div className="flex h-full items-end p-4 md:p-6">
                      <span className="rounded-full bg-white px-2 md:px-3 py-1 md:py-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-700 shadow-sm">
                        {blog.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className="blog-card-content p-4 md:p-6">
                  <div className="mb-2 md:mb-3 flex flex-wrap gap-2 md:gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                    <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    <span>{estimateReadTime(blog.content)} min read</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2 md:mb-4" style={{ lineHeight: 1.6 }}>{blog.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base leading-6 md:leading-7 text-gray-600" style={{ lineHeight: 1.6 }}>{blog.excerpt}</p>
                  <Link to={`/blog/${blog.slug}`} className="mt-3 md:mt-4 inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-green-700 transition-transform hover:translate-x-1">
                    Explore post
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                  </Link>
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
