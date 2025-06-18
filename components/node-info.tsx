"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNodeStore } from "@/lib/node-store"
import { Activity, AlertTriangle, Battery, Thermometer, Zap } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ThingSpeakPlots } from "@/components/thingspeak-plots"

export function NodeInfo() {
  const { nodes, selectedNodeId, getSelectedNode } = useNodeStore()
  const selectedNode = getSelectedNode()
  const [thingSpeakData, setThingSpeakData] = useState(null)
  const [plotsOpen, setPlotsOpen] = useState(false)

  useEffect(() => {
    if (selectedNode) {
      fetchThingSpeakData(selectedNode.channelId, selectedNode.apiKey)
    }
  }, [selectedNode])

  const fetchThingSpeakData = async (channelId: string, apiKey: string) => {
    try {
      const response = await fetch(
        `https://api.thingspeak.com/channels/2293900/feeds.json?api_key=SMXU76RXPC1UV049`
      )
      const data = await response.json()
      setThingSpeakData(data.feeds[data.feeds.length - 1]) // Get the latest feed
    } catch (error) {
      console.error("Error fetching ThingSpeak data:", error)
    }
  }

  if (!selectedNode) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <CardContent className="text-center p-6">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-slate-100 p-3">
              <MapIcon className="h-6 w-6 text-slate-500" />
            </div>
          </div>
          <h3 className="text-lg font-medium">No Node Selected</h3>
          <p className="text-sm text-slate-500 mt-2">Select a node on the map to view its details</p>
        </CardContent>
      </Card>
    )
  }

  const statusColor =
    selectedNode.status === "active"
      ? "bg-green-100 text-green-800"
      : selectedNode.status === "warning"
        ? "bg-amber-100 text-amber-800"
        : "bg-red-100 text-red-800"

  // Helper to format numbers to 2 decimal places
  const format2 = (val: any) => {
    const num = Number(val)
    return isNaN(num) ? "N/A" : num.toFixed(2)
  }

  return (
    <Card className="h-[600px] overflow-auto border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-b">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-slate-800 dark:text-slate-100">{selectedNode.name}</CardTitle>
          <Badge className={`${statusColor} shadow-sm`}>
            {selectedNode.status.charAt(0).toUpperCase() + selectedNode.status.slice(1)}
          </Badge>
          <Dialog open={plotsOpen} onOpenChange={setPlotsOpen}>
            <DialogTrigger asChild>
              <button
                className="ml-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setPlotsOpen(true)}
              >
                Plots
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-full">
              <DialogTitle className="text-slate-800 dark:text-slate-100">Sensor Data Plots (Last 24 Hours)</DialogTitle>
              <ThingSpeakPlots />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="bg-white/40 dark:bg-slate-800/40">
        <Tabs defaultValue="overview" className="mt-2">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:dark:bg-slate-800 data-[state=active]:shadow-md">Overview</TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:dark:bg-slate-800 data-[state=active]:shadow-md">More Detailed</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-2 shadow-md">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Motor Temperature</p>
                    <h4 className="text-2xl font-bold">{format2(thingSpeakData?.field1)}°C</h4>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-amber-400 to-amber-600 p-2 shadow-md">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ambient Temperature</p>
                    <h4 className="text-2xl font-bold">{format2(thingSpeakData?.field2)}°C</h4>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-red-400 to-red-600 p-2 shadow-md">
                    <Thermometer className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Linear X</p>
                    <h4 className="text-2xl font-bold">{format2(thingSpeakData?.field3)} m/s²</h4>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-green-400 to-green-600 p-2 shadow-md">
                    <Battery className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Linear Y</p>
                    <h4 className="text-2xl font-bold">{format2(thingSpeakData?.field4)} m/s²</h4>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-purple-400 to-purple-600 p-2 shadow-md">
                    <Battery className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Linear Z</p>
                    <h4 className="text-2xl font-bold">{format2(Number(thingSpeakData?.field5) - 9.80)} m/s²</h4>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 shadow-md">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Motor Current</p>
                    <div className="flex items-center gap-2">
                      <h4 className="text-2xl font-bold">{format2(thingSpeakData?.field6)}A</h4>
                      {Number(thingSpeakData?.field6) > 0 ? (
                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-300 shadow-sm"> Motor ON</span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-300 shadow-sm"> Motor OFF</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-pink-100 p-2">
                    <AlertTriangle className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">RMSE</p>
                    <h4 className="text-2xl font-bold">6.58</h4>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-sm font-medium">Node List: IIIT-Hyderabad</div>
      </CardContent>
    </Card>
  )
}

function MapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  )
}