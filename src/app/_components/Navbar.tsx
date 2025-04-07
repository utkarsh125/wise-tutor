"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "src/components/ui/button";
import React from "react";
import { SignInButton } from "@clerk/nextjs";
import { navItems } from "src/utils/Navdata";
import { redirect } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Animation variants for the mobile menu dropdown
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <nav className="bg-[#161179]">
      {/* Navbar container */}
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Left side: Logo & Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-[#FBE4D6]">GEN.</div>
          <div className="hidden space-x-6 md:flex">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-sm font-medium text-[#FBE4D6] transition-colors hover:text-[#261FB3]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right side: Sign In Button & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Desktop "Sign In" button */}
          <div className="hidden md:block">
            <SignInButton>
              <Button
                variant="outline"
                className="border-[#FBE4D6] text-[#261FB3] hover:bg-[#261FB3] hover:text-[#FBE4D6]"
              >
              Sign In
            </Button>
              </SignInButton>
          </div>
          {/* Hamburger/Cross Toggle for Mobile */}
          <button
            className="focus:outline-none md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.svg
              className="h-6 w-6 text-[#FBE4D6]"
              viewBox="0 0 24 24"
              initial="closed"
              animate={menuOpen ? "open" : "closed"}
            >
              {/* Top line */}
              <motion.line
                x1="2"
                y1="6"
                x2="22"
                y2="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                  closed: {
                    rotate: 0,
                    translateX: 0,
                    translateY: 0,
                  },
                  open: {
                    rotate: 45,
                    translateY: 6, // moves from y=6 to y=12
                    translateX: 0,
                  },
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                transition={{ duration: 0.3 }}
              />
              {/* Middle line */}
              <motion.line
                x1="2"
                y1="12"
                x2="22"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              {/* Bottom line */}
              <motion.line
                x1="2"
                y1="18"
                x2="22"
                y2="18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                  closed: {
                    rotate: 0,
                    translateX: 0,
                    translateY: 0,
                  },
                  open: {
                    rotate: -45,
                    translateY: -6, // moves from y=18 to y=12
                    translateX: 0,
                  },
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="border-t border-[#261FB3] bg-[#161179] md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.2 }}
          >
            <ul className="space-y-2 px-4 py-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="block text-sm font-medium text-[#FBE4D6] transition-colors hover:text-[#261FB3]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Button onClick={() => redirect('/sign-in')}
                  variant="outline"
                  className="border-[#FBE4D6] text-[#261FB3] hover:bg-[#261FB3] hover:text-[#FBE4D6]"
                  >
                  Sign In
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
