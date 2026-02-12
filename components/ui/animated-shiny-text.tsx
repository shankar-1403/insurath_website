"use client";

import { ComponentPropsWithoutRef, FC } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "mx-auto max-w-md text-black text-sm",

        // Shine effect
        "animate-shiny-text bg-clip-text bg-position-[0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

        // Shine gradient
        "bg-linear-to-r from-transparent via-black/80 via-50% to-transparent",

        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
