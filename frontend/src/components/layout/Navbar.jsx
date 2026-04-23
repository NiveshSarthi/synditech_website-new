import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SERVICES, TOOLS } from "../../utils/constants"

const Navbar = ({ openProjectModal }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const dropdownRef = useRef(null)

  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setIsScrolled(currentScroll > 20)

      if (currentScroll > lastScrollY.current && currentScroll > 100) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }

      lastScrollY.current = currentScroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#f7f8f5]/90 backdrop-blur-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[3.8rem] items-center justify-between gap-6">

          {/* Logo — far left */}
          <Link
            to="/"
            className="flex-shrink-0 transition-transform hover:scale-105"
            aria-label="Synditech - Home"
          >
            <img
              src="/assets/images/logo.png"
              alt="Synditech Logo"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </Link>

          {/* Nav links — centered with even spacing */}
          <div ref={dropdownRef} className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
            <NavLink to="/">Home</NavLink>

            <DesktopDropdown
              label="Services"
              items={SERVICES}
              active={activeDropdown}
              setActive={setActiveDropdown}
              id="services"
            />

            <DesktopDropdown
              label="Tools"
              items={TOOLS}
              active={activeDropdown}
              setActive={setActiveDropdown}
              id="tools"
              scroll
            />

            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/careers">Careers</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </div>

          {/* Contact Us CTA — far right */}
          <div className="hidden md:flex flex-shrink-0 items-center">
            <Link
              to="/contact"
              className="btn-primary whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f7f8f5]/95 backdrop-blur-xl rounded-b-3xl">
          <div className="px-4 py-4 space-y-3">
            <MobileLink to="/" setOpen={setMobileMenuOpen}>Home</MobileLink>

            <MobileAccordion
              label="Services"
              items={SERVICES}
              open={mobileDropdown}
              setOpen={setMobileDropdown}
              setMenuOpen={setMobileMenuOpen}
              id="services"
            />

            <MobileAccordion
              label="Tools"
              items={TOOLS}
              open={mobileDropdown}
              setOpen={setMobileDropdown}
              setMenuOpen={setMobileMenuOpen}
              id="tools"
            />

            <MobileLink to="/about" setOpen={setMobileMenuOpen}>About</MobileLink>
            <MobileLink to="/blog" setOpen={setMobileMenuOpen}>Blog</MobileLink>
            <MobileLink to="/careers" setOpen={setMobileMenuOpen}>Careers</MobileLink>
            {/* <MobileLink to="/pricing" setOpen={setMobileMenuOpen}>Pricing</MobileLink> */}
            <MobileLink to="/faq" setOpen={setMobileMenuOpen}>FAQ</MobileLink>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-green-600 text-white py-2 rounded-full font-semibold px-4"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-900 font-semibold hover:text-green-600 transition-colors"
  >
    {children}
  </Link>
)

const DesktopDropdown = ({ label, items, active, setActive, id, scroll }) => {
  const closeTimeoutRef = useRef(null)

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActive(id)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActive(null)
    }, 3000)
  }

  const handleClick = () => {
    setActive(active === id ? null : id)
  }

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="flex items-center gap-1 text-gray-900 font-semibold hover:text-green-600 transition-colors"
        onClick={handleClick}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${active === id ? 'rotate-180' : ''}`} />
      </button>

      {active === id && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-full left-1/2 mt-4 w-[min(92vw,760px)] -translate-x-1/2 overflow-hidden rounded-3xl border border-green-100 bg-white/95 shadow-2xl shadow-green-900/10 backdrop-blur-xl z-50
          ${scroll ? "max-h-[72vh] overflow-y-auto" : ""}`}
        >
          <div className={`grid gap-3 p-4 ${items.length > 6 ? "lg:grid-cols-2" : "md:grid-cols-2"}`}>
            {items.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActive(null)}
                  className="group flex min-h-[104px] gap-4 rounded-2xl border border-transparent p-4 text-gray-900 transition-all duration-300 hover:border-green-100 hover:bg-green-50/80 hover:shadow-lg hover:shadow-green-900/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white group-hover:scale-105">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 transition-colors group-hover:text-green-700">
                      {item.title || item.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

const MobileAccordion = ({ label, items, open, setOpen, setMenuOpen, id }) => (
  <div>
    <button
      onClick={() => setOpen(open === id ? null : id)}
      className="flex justify-between items-center w-full text-gray-900 py-2 font-semibold"
    >
      {label}
      <ChevronDown
        className={`w-4 h-4 transition-transform ${
          open === id ? "rotate-180" : ""
        }`}
      />
    </button>

    {open === id && (
      <div className="pl-4 space-y-1">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-gray-600 hover:text-green-600 py-2 transition-colors"
          >
            {item.title || item.name}
          </Link>
        ))}
      </div>
    )}
  </div>
)

const MobileLink = ({ to, children, setOpen }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className="block text-gray-900 py-2 font-semibold hover:text-green-600"
  >
    {children}
  </Link>
)
