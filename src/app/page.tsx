"use client"

import Features from './_components/Features'
import Footer from './_components/Footer'
import Hero from './_components/Hero'
import HowItWorks from './_components/HowItWorks'
import Navbar from './_components/Navbar'
import React from 'react'

const LandingPage = () => {
  return (
    <>
    <Navbar /> 
    <Hero />
    <Features />
    <HowItWorks />
    <Footer />
    </>
  )
}

export default LandingPage