"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  Grid,
  History as HistoryIcon,
  MessageSquare,
  Settings,
} from "lucide-react";
import React, { useEffect, useState } from "react";

// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Animation variants for the hamburger lines
const topLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
};

const middleLineVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const bottomLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
};

export default function AppSidebar() {
  // For toggling the sidebar on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // For highlighting the active link
  const isActive = (href: string) => pathname === href;

  const sections = [
    {
      title: "General",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: Grid },
        { name: "Chat", href: "/chat", icon: MessageSquare },
        { name: "Billing", href: "/billing", icon: CreditCard },
        { name: "History", href: "/history", icon: HistoryIcon },
      ],
    },
  ];

  //fetch user from clerk

  return (
    <div>
      {/* Floating Hamburger Button for Mobile */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="bg-[#f0edff] p-2 rounded-md shadow-xl focus:outline-none"
    aria-label="Toggle sidebar"
  >
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      initial="closed"
      animate={sidebarOpen ? "open" : "closed"}
    >
      {/* Top Line */}
      <motion.line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={topLineVariants}
        transition={{ duration: 0.3 }}
      />
      {/* Middle Line */}
      <motion.line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={middleLineVariants}
        transition={{ duration: 0.3 }}
      />
      {/* Bottom Line */}
      <motion.line
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={bottomLineVariants}
        transition={{ duration: 0.3 }}
      />
    </motion.svg>
  </button>
</div>


      {/* Overlay (only on mobile) */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        // On mobile, animate based on sidebarOpen; on desktop always show (x: 0)
        initial={{ x: "-100%" }}
        animate={{ x: isMobile ? (sidebarOpen ? 0 : "-100%") : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 z-50 w-64 h-screen bg-white border-r flex flex-col md:static md:h-screen"
      >

        <div className="flex items-center h-16 px-4 border-b">
          {/* ADD LOGO HERE. */}
          <span className="font-bold text-lg">GEN.</span>
        </div>

        {/* Nav Sections */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {section.title}
              </h2>
              <nav className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    // Do not hide the sidebar when a link is clicked
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Settings Section (above user profile) */}
        <div className="px-4 py-4 border-t">
          <Link
            href="/settings"
            className={`flex gap-2 items-center rounded-md px-2 py-2 text-sm font-medium transition-colors mb-4 ${
              isActive("/settings")
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings /> Settings
          </Link>
        </div>

        {/* User Profile at the very bottom */}
        <div className="mt-auto px-4 py-4 border-t">
          <div className="flex items-center p-2 border border-dotted-t">
            <div>R</div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Ricardo Milos</p>
              <p className="text-xs text-gray-500">ricardo@milos.com</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
