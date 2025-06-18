"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"

// Mock user data - in a real app, this would come from an auth context or API
export const mockUser = {
  name: "Admin User",
  email: "admin@iiit.ac.in",
  imageUrl: "/placeholder-user.jpg",
  role: "Administrator"
}

export function WelcomeHeader() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [greeting, setGreeting] = useState<string>("")

  useEffect(() => {
    // Update current time
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }))
      
      // Set greeting based on time of day
      const hour = now.getHours()
      if (hour < 12) {
        setGreeting("Good morning")
      } else if (hour < 18) {
        setGreeting("Good afternoon")
      } else {
        setGreeting("Good evening")
      }
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-xl p-6 mb-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 rounded-tr-full"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-2/3 bg-white/5 rounded-tl-full"></div>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center md:justify-between">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <Avatar className="h-20 w-20 border-4 border-white/30 shadow-glow">
            <AvatarImage src={mockUser.imageUrl} alt={mockUser.name} />
            <AvatarFallback className="bg-white/10 text-2xl font-bold">
              {mockUser.name
                .split(" ")
                .map(namePart => namePart[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl font-medium text-blue-100 mb-1">{greeting},</p>
            <h1 className="text-4xl font-bold mb-1">{mockUser.name}</h1>
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/30">
                {mockUser.role}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full text-blue-100 backdrop-blur-sm shadow-inner">
          <Clock size={18} className="text-blue-200" />
          <span className="font-medium">{currentTime}</span>
          <span className="text-xs text-blue-200"> | {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</span>
        </div>
      </div>
      
      <style jsx global>{`
        .shadow-glow {
          box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}
