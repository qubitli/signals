"use client"

import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  showStatus?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ 
  className, 
  showText = true, 
  showStatus = true, 
  size = "md" 
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "w-6 h-6",
      icon: "h-3 w-3",
      status: "w-2 h-2",
      title: "text-sm",
      subtitle: "text-xs"
    },
    md: {
      container: "w-8 h-8",
      icon: "h-4 w-4",
      status: "w-3 h-3",
      title: "text-lg",
      subtitle: "text-xs"
    },
    lg: {
      container: "w-12 h-12",
      icon: "h-6 w-6",
      status: "w-4 h-4",
      title: "text-xl",
      subtitle: "text-sm"
    }
  }

  const sizes = sizeClasses[size]

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-shrink-0">
        <div className={cn(
          "rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center",
          sizes.container
        )}>
          <Sparkles className={cn("text-primary-foreground", sizes.icon)} />
        </div>
        {showStatus && (
          <div className={cn(
            "absolute -top-1 -right-1 bg-green-500 rounded-full border-2 border-sidebar animate-pulse",
            sizes.status
          )} />
        )}
      </div>
      {showText && (
        <div className="min-w-0 group-data-[collapsible=icon]:hidden">
          <h1 className={cn(
            "font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent truncate",
            sizes.title
          )}>
            Signals
          </h1>
          <p className={cn("text-muted-foreground truncate", sizes.subtitle)}>
            Trading AI
          </p>
        </div>
      )}
    </div>
  )
}
