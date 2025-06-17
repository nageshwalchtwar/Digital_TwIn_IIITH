import { MapView } from "@/components/map-view"
import { NodeInfo } from "@/components/node-info"
import { AlertPanel } from "@/components/alert-panel"
import { ThingSpeakPlots } from "@/components/thingspeak-plots"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <MapView />
        </div>
        <div className="w-full lg:w-1/2">
          <NodeInfo />
        </div>
      </div>

      {/* ThingSpeak Data Plots */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Sensor Data (Last 24 Hours)</h2>
        <ThingSpeakPlots />
      </div>

      <AlertPanel />
    </div>
  )
}
