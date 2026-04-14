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

  const lastScrollY = useRef(0)

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
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">

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
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
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
        <div className="md:hidden bg-white/95 backdrop-blur-xl rounded-b-3xl">
          <div className="px-4 py-4 space-y-3">
            <MobileLink to="/" setOpen={setMobileMenuOpen}>Home</MobileLink>

            <MobileAccordion
              label="Services"
              items={SERVICES}
              open={mobileDropdown}
              setOpen={setMobileDropdown}
              id="services"
            />

            <MobileAccordion
              label="Tools"
              items={TOOLS}
              open={mobileDropdown}
              setOpen={setMobileDropdown}
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

const DesktopDropdown = ({ label, items, active, setActive, id, scroll }) => (
  <div
    className="relative"
    onMouseEnter={() => setActive(id)}
    onMouseLeave={() => setActive(null)}
  >
    <button className="flex items-center gap-1 text-gray-900 font-semibold hover:text-green-600 transition-colors">
      {label}
      <ChevronDown className={`w-4 h-4 transition-transform ${active === id ? 'rotate-180' : ''}`} />
    </button>

    {active === id && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50
        ${scroll ? "max-h-96 overflow-y-auto" : ""}`}
      >
        {items.map((item) => {
          const Icon = item.icon
          const content = (
            <>
              <Icon className="w-5 h-5 mt-1 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">{item.title || item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </>
          )

          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex gap-3 px-4 py-3 text-gray-900 hover:bg-green-50 transition-colors cursor-pointer"
            >
              {content}
            </Link>
          )
        })}
      </motion.div>
    )}
  </div>
)

const MobileAccordion = ({ label, items, open, setOpen, id }) => (
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
            onClick={() => setMobileMenuOpen(false)}
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
