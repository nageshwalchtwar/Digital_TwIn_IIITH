"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download, Save, BarChart2, Settings2, Timer, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MotorVisualization from "@/components/motor-visualization"

// Network Node Icons
function BorewellIcon({ className }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <div className="w-16 h-16 border-2 border-slate-300 bg-amber-50 rounded-lg flex items-center justify-center">
        <div className="w-12 h-12 flex flex-col">
          <div className="flex-1 border-2 border-slate-400 bg-amber-200" />
          <div className="h-2 border-t-2 border-slate-400 bg-amber-100" />
        </div>
      </div>
    </div>
  )
}

function PumpHouseIcon({ className }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <div className="w-16 h-16 border-2 border-slate-300 bg-blue-50 rounded-lg flex items-center justify-center">
        <div className="w-12 h-12">
          <div className="h-8 border-2 border-blue-400 bg-blue-100 rounded-t-lg" />
          <div className="h-4 border-2 border-t-0 border-blue-400 bg-blue-200" />
        </div>
      </div>
    </div>
  )
}

function SumpTankIcon({ className, level }: { className?: string; level: number }) {
  return (
    <div className={`${className} relative`}>
      <div className="w-20 h-20 border-2 border-slate-300 bg-white rounded-lg flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-blue-400 rounded-lg overflow-hidden">
          <div
            className="w-full bg-blue-400 transition-all duration-300"
            style={{ height: `${level}%`, opacity: 0.7 }}
          />
        </div>
      </div>
    </div>
  )
}

function ROPlantIcon({ className }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <div className="w-24 h-24 border-2 border-slate-300 bg-white rounded-lg flex items-center justify-center">
        <div className="w-20 h-20 grid grid-cols-2 gap-1 p-1">
          <div className="border-2 border-slate-400 rounded" />
          <div className="border-2 border-slate-400 rounded" />
          <div className="border-2 border-slate-400 rounded" />
          <div className="border-2 border-slate-400 rounded" />
        </div>
      </div>
    </div>
  )
}

function MotorIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-12 h-12 relative">
      <div className={`w-full h-full rounded-full border-4 border-dashed ${isActive ? 'border-blue-500 animate-spin' : 'border-slate-300'
        }`} />
    </div>
  )
}

function FlowMeterIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-10 h-10">
      <div className={`w-full h-full rounded-full border-4 ${isActive ? 'border-blue-500 animate-pulse' : 'border-slate-300'
        }`} />
    </div>
  )
}

// Add new animated water flow component
function AnimatedWaterFlow({ active, direction = 'horizontal' }: { active: boolean; direction?: 'horizontal' | 'vertical' }) {
  if (!active) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${direction === 'vertical' ? 'h-full w-1' : 'w-full h-1'}`}>
      <div
        className={`
          absolute bg-blue-400 opacity-70
          ${direction === 'vertical'
            ? 'h-[200%] w-full animate-flowUp'
            : 'w-[200%] h-full animate-flowRight'}
        `}
      />
    </div>
  );
}

// Water Network System Component
function WaterNetworkSystem({ isRunning }: { isRunning: boolean }) {
  const [networkState, setNetworkState] = useState({
    sumpLevel: 85,
    roTankLevel: 60,
    pumpStatus: "Active",
    flowRate: "10.5 L/s",
    pressure: "2.4 bar",
    alerts: [] as string[],
    motorTemp: 45,
    powerConsumption: 2.5
  })

  // Simulate real-time updates
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setNetworkState(prev => {
        const sumpDelta = Math.random() * 2 - 1; // -1 to 1
        const roDelta = Math.random() * 2 - 1;
        const newSumpLevel = Math.max(0, Math.min(100, prev.sumpLevel - sumpDelta));
        const newRoLevel = Math.max(0, Math.min(100, prev.roTankLevel + roDelta));
        const newTemp = prev.motorTemp + (Math.random() * 0.4 - 0.2);
        const newPower = prev.powerConsumption + (Math.random() * 0.2 - 0.1);

        // Generate alerts
        const newAlerts = [...prev.alerts];
        if (newSumpLevel < 20 && !prev.alerts.includes('Low Sump Level')) {
          newAlerts.push('Low Sump Level');
        }
        if (newTemp > 50 && !prev.alerts.includes('High Motor Temperature')) {
          newAlerts.push('High Motor Temperature');
        }

        return {
          ...prev,
          sumpLevel: Number(newSumpLevel.toFixed(1)),
          roTankLevel: Number(newRoLevel.toFixed(1)),
          flowRate: `${(10 + Math.random()).toFixed(1)} L/s`,
          pressure: `${(2.4 + Math.random() * 0.2).toFixed(1)} bar`,
          motorTemp: Number(newTemp.toFixed(1)),
          powerConsumption: Number(newPower.toFixed(2)),
          alerts: newAlerts
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="relative w-full h-[600px] bg-slate-50 rounded-lg p-8">
      {/* Status Bar */}
      <div className="absolute top-4 left-4 right-4 bg-white rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="text-sm font-medium">System Status</div>
            <div className={`text-xs ${networkState.alerts.length > 0 ? 'text-amber-500' : 'text-green-500'}`}>
              {networkState.alerts.length > 0 ? 'Warning' : 'Normal Operation'}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Total Flow Rate</div>
            <div className="text-xs text-slate-500">{networkState.flowRate}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Network Pressure</div>
            <div className="text-xs text-slate-500">{networkState.pressure}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Sump Level</div>
            <div className={`text-xs ${networkState.sumpLevel < 20 ? 'text-red-500' : 'text-slate-500'}`}>
              {networkState.sumpLevel}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Network Layout */}
      <div className="mt-20 relative">
        {/* Left Section */}
        <div className="absolute left-10 top-10">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center group">
              <BorewellIcon />
              <div className="mt-2">
                <div className="text-sm font-medium">Borewell</div>
                <div className="text-xs text-slate-500">Active</div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-40 bg-white p-2 rounded shadow-lg text-xs">
                <div>Depth: 100m</div>
                <div>Water Level: 45m</div>
              </div>
            </div>

            <div className="text-center group">
              <PumpHouseIcon />
              <div className="mt-2">
                <div className="text-sm font-medium">Pump House</div>
                <div className="text-xs text-slate-500">{networkState.pumpStatus}</div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-40 bg-white p-2 rounded shadow-lg text-xs">
                <div>Motor Temp: {networkState.motorTemp}°C</div>
                <div>Power: {networkState.powerConsumption} kW</div>
              </div>
            </div>

            <div className="text-center group">
              <SumpTankIcon level={networkState.sumpLevel} />
              <div className="mt-2">
                <div className="text-sm font-medium">SUMP</div>
                <div className="text-xs text-slate-500">60000.00L</div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-40 bg-white p-2 rounded shadow-lg text-xs">
                <div>Capacity: 60000L</div>
                <div>Current: {(networkState.sumpLevel * 600).toFixed(2)}L</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-20">
            <div className="text-center group">
              <MotorIcon isActive={isRunning} />
              <div className="mt-2">
                <div className="text-xs text-slate-500">Motor Pumping Rate</div>
                <div className="text-sm font-medium">{networkState.flowRate}</div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-20 bg-white p-2 rounded shadow-lg text-xs">
                <div>Temperature: {networkState.motorTemp}°C</div>
                <div>Power Draw: {networkState.powerConsumption} kW</div>
                <div>Efficiency: {(95 - networkState.motorTemp / 2).toFixed(1)}%</div>
              </div>
            </div>
            <div className="text-center">
              <FlowMeterIcon isActive={isRunning} />
              <div className="mt-2">
                <div className="text-xs text-slate-500">Flow Rate</div>
                <div className="text-sm font-medium">{networkState.flowRate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="absolute right-10 top-10">
          <div className="text-center group">
            <ROPlantIcon />
            <div className="mt-2">
              <div className="text-sm font-medium">RO Plant</div>
              <div className="text-xs text-slate-500">{networkState.roTankLevel.toFixed(1)}%</div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-40 bg-white p-2 rounded shadow-lg text-xs">
              <div>Capacity: 1000L</div>
              <div>Current: {(networkState.roTankLevel * 10).toFixed(1)}L</div>
              <div>Efficiency: 95%</div>
            </div>
          </div>

          {/* RO Units */}
          <div className="mt-8 grid grid-cols-3 gap-8">
            {[1, 2, 3].map((unit) => (
              <div key={unit} className="text-center group">
                <div className={`w-12 h-12 border-2 ${unit === 2 ? 'border-slate-300' : 'border-green-300'} rounded-lg flex items-center justify-center transition-colors`}>
                  <div className="text-sm font-medium">RO {unit}</div>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {unit === 2 ? 'Standby' : 'Active'}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-40 bg-white p-2 rounded shadow-lg text-xs">
                  <div>Flow Rate: {unit === 2 ? '0.0' : '5.2'} L/s</div>
                  <div>Pressure: {unit === 2 ? '0.0' : '2.4'} bar</div>
                  <div>Runtime: {unit === 2 ? '0' : '124'} hrs</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Flow Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          {/* Borewell to Pump House */}
          <line x1="80" y1="100" x2="80" y2="180"
            className={`stroke-2 ${isRunning ? 'stroke-blue-400' : 'stroke-slate-300'}`} />
          <AnimatedWaterFlow active={isRunning} direction="vertical" />

          {/* Pump House to Sump */}
          <line x1="80" y1="220" x2="80" y2="300"
            className={`stroke-2 ${isRunning ? 'stroke-blue-400' : 'stroke-slate-300'}`} />
          <AnimatedWaterFlow active={isRunning} direction="vertical" />

          {/* Sump to Motor */}
          <line x1="120" y1="350" x2="400" y2="350"
            className={`stroke-2 ${isRunning ? 'stroke-blue-400' : 'stroke-slate-300'}`} />
          <AnimatedWaterFlow active={isRunning} />

          {/* Motor to RO Plant */}
          <line x1="500" y1="350" x2="800" y2="350"
            className={`stroke-2 ${isRunning ? 'stroke-blue-400' : 'stroke-slate-300'}`} />
          <AnimatedWaterFlow active={isRunning} />

          {/* RO Plant Distribution Lines */}
          <line x1="800" y1="350" x2="800" y2="400"
            className={`stroke-2 ${isRunning ? 'stroke-blue-400' : 'stroke-slate-300'}`} />
          <line x1="700" y1="400" x2="900" y2="400"
            className={`stroke-2 ${isRunning ? 'stroke-blue-400' : 'stroke-slate-300'}`} />
        </svg>

        {/* Alerts Panel */}
        {networkState.alerts.length > 0 && (
          <div className="absolute bottom-4 right-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <div className="text-sm font-medium">System Alerts</div>
            </div>
            <div className="mt-2 space-y-1">
              {networkState.alerts.map((alert, index) => (
                <div key={index} className="text-xs text-amber-600 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-500" />
                  {alert}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function SimulationView() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [simulationTime, setSimulationTime] = useState(0)

  const runSimulation = () => {
    setIsSimulating(true)
    setSimulationProgress(0)
    setSimulationTime(0)
  }

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSimulationTime(prev => {
        const newTime = prev + 0.1;
        if (newTime >= 10) {
          setIsSimulating(false);
          return 10;
        }
        setSimulationProgress(newTime * 10);
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <Card className="h-[800px]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div />
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Timer className="h-4 w-4" />
              Time: {simulationTime.toFixed(1)}s
            </Button>
            <Button onClick={runSimulation} disabled={isSimulating} className="gap-2">
              <Play className="h-4 w-4" />
              {isSimulating ? "Simulating..." : "Start Simulation"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="network" className="h-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="network">Network View</TabsTrigger>
            <TabsTrigger value="motor">Motor View</TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="h-[600px]">
            <WaterNetworkSystem isRunning={isSimulating} />
          </TabsContent>

          <TabsContent value="motor" className="h-[600px]">
            <MotorVisualization />
          </TabsContent>
        </Tabs>

        {isSimulating && (
          <div className="mt-4">
            <Progress value={simulationProgress} className="w-full" />
            <p className="text-xs text-center mt-1 text-slate-500">
              Simulation Progress: {Math.round(simulationProgress)}%
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Add new CSS animations
const style = document.createElement('style')
style.textContent = `
  @keyframes flowRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  @keyframes flowUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
`
document.head.appendChild(style)