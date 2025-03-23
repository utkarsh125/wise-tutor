"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "src/components/ui/button";
import React from "react";
import { navItems } from "src/utils/Navdata";

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
      {" "}
      {/* Using #161179 for navbar background */}
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
          <div className="hidden md:block">
            {/* Outline button with custom border/text color from the palette */}
            <Button
              variant="outline"
              className="border-[#FBE4D6] text-[#FBE4D6] hover:bg-[#261FB3] hover:text-[#FBE4D6]"
            >
              Sign In
            </Button>
          </div>
          <button
            className="focus:outline-none md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6 text-[#FBE4D6]"
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
                <Button
                  variant="outline"
                  className="border-[#FBE4D6] text-[#FBE4D6] hover:bg-[#261FB3] hover:text-[#FBE4D6]"
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
