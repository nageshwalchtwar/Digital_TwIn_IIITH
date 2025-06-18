"use client"
import { SimulationView } from "@/components/simulation-view"
import { WelcomeHeader } from "@/components/welcome-header"

export default function SimulationPage() {
  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Welcome section */}
      <WelcomeHeader />

      <div className="bg-gradient-to-tr from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg shadow-xl p-4">
        <SimulationView />
      </div>
    </div>
  )
}
