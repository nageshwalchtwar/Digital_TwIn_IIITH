"use client"
import dynamic from "next/dynamic"
const MapView = dynamic(() => import("@/components/map-view").then(mod => mod.MapView), { ssr: false })
import { NodeInfo } from "@/components/node-info"
import { AlertPanel } from "@/components/alert-panel"
import { ThingSpeakPlots } from "@/components/thingspeak-plots"
import { WelcomeHeader } from "@/components/welcome-header"

export default function DashboardPage() {  
  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Welcome section */}
      <WelcomeHeader />
    
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <div className="bg-gradient-to-tr from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg shadow-lg p-2">
            <MapView />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="bg-gradient-to-tl from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg shadow-lg">
            <NodeInfo />
          </div>
        </div>
      </div>

      {/* ThingSpeak Data Plots */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Sensor Data (Last 24 Hours)</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg shadow-lg p-4">
          <ThingSpeakPlots />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg shadow-lg">
        <AlertPanel />
      </div>
    </div>
  )
}
