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
import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";

import Image from "next/image";
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
  // For toggling the sidebar on mobile.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // For highlighting the active link.
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

  // Fetch user from Clerk.
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div>
      {/* Floating Hamburger Button for Mobile */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-md bg-[#f0edff] p-2 shadow-xl focus:outline-none"
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
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
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
        initial={{ x: "-100%" }}
        animate={{ x: isMobile ? (sidebarOpen ? 0 : "-100%") : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r bg-white md:static md:h-screen"
      >
        <div className="flex h-16 items-center border-b px-4">
          {/* ADD LOGO HERE. */}
          <span className="text-lg font-bold">GEN.</span>
        </div>

        {/* Nav Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <h2 className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                {section.title}
              </h2>
              <nav className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Settings Section (above user profile) */}
        <div className="border-t px-4 py-4">
          <Link
            href="/settings"
            className={`mb-4 flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors ${
              isActive("/settings")
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings /> Settings
          </Link>
        </div>

        {/* User Profile with horizontal dropdown menu */}
        <div className="relative mt-auto border-t px-4 py-4">
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
          >
            <Image
              src={user?.imageUrl ?? "/paperplanes.png"}
              alt={user?.fullName ?? "User"}
              width={40}
              height={40}
              className="rounded-full border border-gray-200 object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.fullName ?? "Guest"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.emailAddresses?.[0]?.emailAddress ?? "Not Signed In"}
              </p>
            </div>
          </div>
          <AnimatePresence>
            {profileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 left-full z-10 ml-2 w-48 -translate-y-1/2 transform rounded border border-gray-200 bg-white shadow-lg dark:bg-gray-800"
              >
                <SignOutButton>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Logout
                  </button>
                </SignOutButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </div>
  );
}
