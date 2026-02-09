"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface HighlighterProps {
  children: React.ReactNode
  className?: string
  color?: string
  duration?: number
}

export function Highlighter({
  children,
  className,
  color = "rgba(255, 209, 220, 0.85)",
  duration = 600,
}: HighlighterProps) {
  return (
    <span
      className={cn(
        "relative inline highlight-animate",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </span>
  )
}
