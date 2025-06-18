"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart2, PlayCircle, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { UserAccountNav } from "@/components/user-account-nav"
import { mockUser } from "@/components/welcome-header"

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme, theme } = useTheme()

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

          <UserAccountNav user={mockUser} />
        </nav>
      </div>
    </header>
  )
}
