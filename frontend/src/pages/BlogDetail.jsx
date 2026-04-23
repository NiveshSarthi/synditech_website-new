import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, PenSquare } from 'lucide-react'
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

const renderParagraphs = (content = '') => content
  .split(/\n{2,}/)
  .map((paragraph) => paragraph.trim())
  .filter(Boolean)

const BlogDetail = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await blogsAPI.getBySlug(slug)
        setBlog(response.data?.data || null)
        setErrorMessage('')
      } catch (error) {
        console.error('Error loading blog:', error)
        setBlog(null)
        setErrorMessage('')
      } finally {
        setIsLoading(false)
      }
    }

    loadBlog()
  }, [slug])

  if (isLoading) {
    return (
      <section className="public-section min-h-screen px-10 py-16">
        <div className="mx-auto max-w-full px-6 py-16 text-center text-gray-600">
          Loading article...
        </div>
      </section>
    )
  }

  if (errorMessage || !blog) {
    return (
      <section className="public-section min-h-screen px-10 py-16">
        <div className="mx-auto max-w-full px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Article unavailable</h1>
          <p className="mt-3 text-red-700">{errorMessage || 'This blog post could not be found.'}</p>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="public-section min-h-screen bg-[linear-gradient(180deg,_rgba(247,250,247,0.82)_0%,_rgba(255,255,255,0.44)_20%,_rgba(244,249,243,0.68)_100%)] px-4 md:px-10 py-16">
      <article className="public-panel mx-auto max-w-7xl p-8 md:p-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition-transform hover:-translate-x-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="mt-8 overflow-hidden">
          {blog.coverImage && !imageError && (
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="float-right w-[40%] lg:w-[42%] ml-6 mb-4 h-auto object-contain rounded-lg"
              onError={() => setImageError(true)}
            />
          )}

          <div className="pr-6">
            <header>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
                  {blog.category || 'Insights'}
                </span>
                {(blog.tags || []).map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900" style={{ lineHeight: 1.4 }}>{blog.title}</h1>
              <p className="mt-4 text-gray-600" style={{ lineHeight: 1.6 }}>{blog.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-green-600" />
                  {formatDate(blog.publishedAt || blog.createdAt)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <PenSquare className="h-4 w-4 text-green-600" />
                  {blog.authorName || 'Synditech Team'}
                </span>
              </div>
            </header>
          </div>

          <div className="clear-right mt-8">
            <div className="space-y-6 text-base text-gray-700" style={{ lineHeight: 1.6 }}>
              {renderParagraphs(blog.content).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

export default BlogDetail
