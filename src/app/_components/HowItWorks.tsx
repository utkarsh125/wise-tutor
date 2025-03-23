"use client"

import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  "Open Dashboard",
  "Select Grade",
  "Select number of marks according to the question",
  "Generate"
]

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const HowItWorks = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        backgroundColor: "#2D336B",
        backgroundImage: "radial-gradient(#3E5879 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        style={{ color: "#FBE4D6" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h2>
      <div className="space-y-6 w-full max-w-3xl">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center p-6 border border-[#FBE4D6] rounded-lg shadow-lg hover:scale-105 transition-transform"
            style={{ color: "#FBE4D6" }}
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-[#FBE4D6] flex items-center justify-center text-lg font-bold">
                {index + 1}
              </div>
            </div>
            <div className="ml-4 text-lg">
              {step}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks
