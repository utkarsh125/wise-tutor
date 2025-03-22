"use client"

import { AnimatePresence, motion } from 'framer-motion'

import { Button } from 'src/components/ui/button' // shadCN Button component
import React from 'react'
import { navItems } from 'src/utils/Navdata'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  // Animation variants for the mobile menu dropdown
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  }

  return (
    <nav className="bg-purple-300 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side: Logo & Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-gray-900">GEN.</div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right side: Sign In Button & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Button variant="outline">Sign In</Button>
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.2 }}
          >
            <ul className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
