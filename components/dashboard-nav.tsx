"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart2, LogOut, PlayCircle, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  const handleLogout = () => {
    // In a real app, you would clear auth tokens/cookies here
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Digital Twin
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          <Link href="/dashboard" passHref>
            <Button 
              variant={pathname === "/dashboard" ? "default" : "ghost"} 
              className={`gap-2 ${pathname === "/dashboard" ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md" : ""}`}
            >
              <BarChart2 size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>

          <Link href="/dashboard/simulation" passHref>
            <Button 
              variant={pathname === "/dashboard/simulation" ? "default" : "ghost"}
              className={`gap-2 ${pathname === "/dashboard/simulation" ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md" : ""}`}
            >
              <PlayCircle size={18} />
              <span className="hidden md:inline">Simulation</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-9 h-9"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button
            variant="ghost"
            className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
