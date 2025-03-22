"use client"

import { SiFramer, SiNextdotjs, SiTailwindcss } from 'react-icons/si'

import { Button } from 'src/components/ui/button'
import React from 'react'
import { motion } from 'framer-motion'

type Props = [
    {
        children: React.ReactNode
        delay?: number
    }
]

const FloatingIcon: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      className="flex justify-center items-center"
    >
      {children}
    </motion.div>
  )
}

const Hero = () => {
  return (
    <section className="bg-slate-50 h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
        Welcome to GEN.
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        Your modern platform for building amazing digital experiences.
      </p>
      <Button variant="default" className="mb-12">
        Get Started
      </Button>
      
      {/* Floating icons */}
      <div className="flex space-x-8">
        <FloatingIcon delay={0}>
          <SiNextdotjs size={48} className="text-gray-800" />
        </FloatingIcon>
        <FloatingIcon delay={0.5}>
          <SiTailwindcss size={48} className="text-gray-800" />
        </FloatingIcon>
        <FloatingIcon delay={1}>
          <SiFramer size={48} className="text-gray-800" />
        </FloatingIcon>
      </div>
    </section>
  )
}

export default Hero
