"use client"

import { CheckCircle, TrendingUp, Users } from "lucide-react"

import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"

interface BentoItem {
  title: string
  description: string
  icon: React.ReactNode
  status?: string
  tags?: string[]
  meta?: string
  cta?: string
  colSpan?: number
  hasPersistentHover?: boolean
}

interface BentoGridProps {
  items: BentoItem[]
}

const itemsSample: BentoItem[] = [
  {
    title: "Questions Generation",
    meta: "AI-powered",
    description: "Automatically create engaging and varied questions based on subject and difficulty.",
    icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
    status: "Live",
    tags: ["AI", "Automation", "Education"],
    colSpan: 1,
    hasPersistentHover: true,
  },
  {
    title: "Collaborative Editing",
    meta: "Team Effort",
    description: "Work together in real time with your team to craft high-quality questions.",
    icon: <Users className="w-4 h-4 text-sky-500" />,
    status: "Coming Soon",
    tags: ["Collaboration", "Real-Time"],
  },
  {
    title: "LMS Integration",
    meta: "Seamless Sync",
    description: "Easily integrate with Learning Management Systems to streamline assignment processes.",
    icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    status: "Coming Soon",
    tags: ["Integration", "Automation"],
  },
//   {
//     title: "Logging and Analytics",
//     meta: "Store your generated questions seamlessly",
//     description: "Log all your questions and queries within the platform",
//     icon: <CheckCircle className="w-4 h-4 text-green-500" />,
//     status: "Coming Soon",
//     tags: ["Storage", "On-demand"],
//   },

]

export function BentoGrid({ items = itemsSample }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
            "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
            "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
            "hover:-translate-y-0.5 will-change-transform",
            item.colSpan ?? "col-span-1",
            item.colSpan === 2 ? "md:col-span-2" : "",
            {
              "shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5": item.hasPersistentHover,
              "dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]": item.hasPersistentHover,
            },
          )}
        >
          <div
            className={`absolute inset-0 ${
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-linear-to-br transition-all duration-300">
                {item.icon}
              </div>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-xs",
                  "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                  "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20",
                )}
              >
                {item.status ?? "Active"}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-[15px]">
                {item.title}
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                  {item.meta}
                </span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425]">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-xs transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.cta ?? "Explore →"}
              </span>
            </div>
          </div>

          <div
            className={`absolute inset-0 -z-10 rounded-xl p-px bg-linear-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  )
}


export default function Features() {
  return (
    <section className="py-16 bg-[#161179] dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Image src="/paperplanes.png" alt="Paper Planes" width={50} height={50} />
          <h2 className="text-3xl font-bold text-center text-[#FBE4D6]">
            Platform Features
          </h2>
        </div>
        <BentoGrid items={itemsSample} />
      </div>
    </section>
  )
}
