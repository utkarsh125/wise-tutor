"use client"

import React from 'react'
import { motion } from 'framer-motion'

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#0C0950] text-[#FBE4D6] py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Brand Logo */}
        <motion.div className="mb-4 md:mb-0" variants={itemVariants}>
          <h1 className="text-2xl font-bold">GEN.</h1>
        </motion.div>

        {/* Center: Navigation Buttons */}
        <motion.div className="flex space-x-6 mb-4 md:mb-0" variants={itemVariants}>
          <motion.a
            href="/about"
            className="hover:underline"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            About
          </motion.a>
          <motion.a
            href="/pricing"
            className="hover:underline"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Pricing
          </motion.a>
          <motion.a
            href="/contact"
            className="hover:underline"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Contact
          </motion.a>
        </motion.div>

        {/* Right: Contact Info & Query Button */}
        <motion.div className="flex flex-col items-center md:items-end" variants={itemVariants}>
          <motion.p className="text-sm" whileHover={{ scale: 1.05 }}>
            123 Example Street, City, Country
          </motion.p>
          <motion.p className="text-sm mb-2" whileHover={{ scale: 1.05 }}>
            Phone: (123) 456-7890
          </motion.p>
          <motion.button
            className="bg-[#FBE4D6] text-[#2D336B] py-2 px-4 rounded"
            whileHover={{ scale: 1.05, backgroundColor: "#e6dedf" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ask Query
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
