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
  <nav
  className="
    sticky top-0 z-50
    w-full
    bg-white/90
    backdrop-blur-2xl
    transition-colors duration-300
  "
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link 
            to="/" 
            className="transition-transform hover:scale-105"
            aria-label="Synditech - Home"
          >
            <img 
              src="/assets/images/logo.png" 
              alt="Synditech Logo" 
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
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
            {/* <NavLink to="/pricing">Pricing</NavLink> */}
            <NavLink to="/faq">FAQ</NavLink>

            <Link 
              to="/contact"
              className="btn-primary"
            >
              Contact Us
            </Link>
          </div>

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
    <button className="flex items-center gap-1 text-gray-900 font-semibold hover:text-green-600">
      {label}
      <ChevronDown className="w-4 h-4" />
    </button>

    {active === id && (
      <div
        className={`absolute top-full left-0 mt-0 w-80 bg-white rounded-xl border border-gray-200 shadow-xl
        ${scroll ? "max-h-96 overflow-y-auto" : ""}`}
      >
        {items.map((item) => {
          const Icon = item.icon
          const content = (
            <>
              <Icon className="w-5 h-5 mt-1" />
              <div>
                <p className="font-medium">{item.title || item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </>
          )

          return item.external ? (
            <a
              key={item.id}
              href={item.path}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 px-4 py-3 text-gray-900 hover:bg-green-50"
            >
              {content}
            </a>
          ) : (
            <Link
              key={item.id}
              to={item.path}
              className="flex gap-3 px-4 py-3 text-gray-900 hover:bg-green-50"
            >
              {content}
            </Link>
          )
        })}
      </div>
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
      <div className="pl-4 space-y-2">
        {items.map((item) =>
          item.external ? (
            <a
              key={item.id}
              href={item.path}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-gray-600 hover:text-green-600"
            >
              {item.title || item.name}
            </a>
          ) : (
            <Link
              key={item.id}
              to={item.path}
              className="block text-sm text-gray-600 hover:text-green-600"
            >
              {item.title || item.name}
            </Link>
          )
        )}
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
