import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import { motion, AnimatePresence } from "framer-motion"
import { SERVICES, TOOLS } from "../../utils/constants"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const lastScrollY = useRef(0)

  /* Scroll behavior */
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
    fixed top-4 left-4 right-4 z-50
    rounded-3xl
    bg-black/40
    backdrop-blur-2xl
    border border-white/10
    shadow shadow-white/10
    transition-colors duration-300
  "
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl sm:text-3xl font-black font-orbitron transition-transform hover:scale-105"
            aria-label="Synditech - Home"
          >
            <motion.span 
              className="text-orange-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              SYNDI
            </motion.span>
            <span className="text-white">TECH</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>

            {/* Services */}
            <DesktopDropdown
              label="Services"
              items={SERVICES}
              active={activeDropdown}
              setActive={setActiveDropdown}
              id="services"
            />

            {/* Tools */}
            <DesktopDropdown
              label="Tools"
              items={TOOLS}
              active={activeDropdown}
              setActive={setActiveDropdown}
              id="tools"
              scroll
            />

            <NavLink to="/about">About</NavLink>
            <NavLink to="/careers">Careers</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>

            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>

            <DarkModeSwitch
              checked={isDarkMode}
              onChange={setIsDarkMode}
              size={24}
              sunColor="#f97316"
              moonColor="#f97316"
            />
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-orange-500/30 rounded-b-3xl">
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
            <MobileLink to="/careers" setOpen={setMobileMenuOpen}>Careers</MobileLink>
            <MobileLink to="/pricing" setOpen={setMobileMenuOpen}>Pricing</MobileLink>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-orange-500 text-white py-2 rounded-full"
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

/* ---------------- Components ---------------- */

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white font-semibold hover:text-orange-500 transition-colors"
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
    <button className="flex items-center gap-1 text-white font-semibold hover:text-orange-500">
      {label}
      <ChevronDown className="w-4 h-4" />
    </button>

    {active === id && (
      <div
        className={`absolute top-full left-0 mt-0 w-80 bg-black/95 rounded-xl border border-orange-500/30 shadow-xl
        ${scroll ? "max-h-96 overflow-y-auto" : ""}`}
      >
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex gap-3 px-4 py-3 text-white hover:bg-orange-500/10"
            >
              <Icon className="w-5 h-5 mt-1" />
              <div>
                <p className="font-medium">{item.title || item.name}</p>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
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
      className="flex justify-between items-center w-full text-white py-2"
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
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="block text-sm text-gray-300 hover:text-orange-500"
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
    className="block text-white py-2 hover:text-orange-500"
  >
    {children}
  </Link>
)
