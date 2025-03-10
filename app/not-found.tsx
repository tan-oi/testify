"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4 w-full min-w-full">
     
      <div className="absolute inset-0 overflow-hidden">
   
        <div className="absolute -left-20 top-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-[25rem] w-[25rem] rounded-full bg-primary/10 blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--primary)/30%) 1px, transparent 1px), 
                                linear-gradient(to bottom, hsl(var(--primary)/30%) 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
          }}
        />

        {/* Accent lines */}
        <div className="absolute left-0 right-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Main content */}
      <div
        className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl transition-all duration-1000 ${mounted ? "opacity-100" : "opacity-0 translate-y-8"}`}
      >
        {/* Left side - 404 display */}
        <div className="flex flex-col items-center justify-center md:items-end">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -left-6 -top-6 h-16 w-16 rounded-full border border-primary/30" />
            <div className="absolute -bottom-8 -right-8 h-20 w-20 rounded-full border-2 border-primary/20" />

            {/* 404 number with creative styling */}
            <div className="relative">
              <div className="text-[10rem] font-bold leading-none tracking-tighter text-primary/10 md:text-[14rem]">
                404
              </div>
              <div className="absolute inset-0 text-[10rem] font-bold leading-none tracking-tighter text-transparent md:text-[14rem] bg-clip-text bg-gradient-to-b from-primary to-primary/70">
                404
              </div>
              <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-primary/80" />
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col items-center justify-center text-left md:items-start">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <span className="text-primary">Lost</span> in digital space
          </h2>

          <p className="mb-8 max-w-md text-muted-foreground">
            The coordinates you are  looking for do not match any known destination in our system.
          </p>

          <Button
            asChild
            className="group relative overflow-hidden border-primary bg-background px-6 py-6 text-primary hover:bg-primary/5"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Navigate home</span>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </Button>

          {/* Decorative coordinates */}
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-2 text-xs text-muted-foreground/70">
            <div>LAT: 40.7128° N</div>
            <div>LONG: 74.0060° W</div>
            <div>STATUS: MISSING</div>
            <div>ERROR: 404</div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
          <div className="h-2 w-2 rounded-full bg-primary/50 animate-pulse" />
          <span>SYSTEM STATUS: OPERATIONAL</span>
        </div>
      </div>

      <div className="absolute right-8 top-8 hidden md:block">
        <div className="h-[1px] w-16 bg-primary/30" />
      </div>
    </div>
  )
}

