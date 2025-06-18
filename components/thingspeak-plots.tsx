"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Thermometer, Zap, Activity, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { THINGSPEAK_CONFIG, getThingSpeakUrl } from "@/lib/thingspeak-config"

interface ThingSpeakData {
    created_at: string
    field1?: number // Temperature
    field2?: number // Ambient Temperature
    field3?: number // Motor Current
    field4?: number // Vibration X
    field5?: number // Vibration Y
    field6?: number // Vibration Z
}

interface ProcessedData {
    time: string
    temperature: number
    ambientTemperature: number
    motorCurrent: number
    vibrationAmplitude: number
}

export function ThingSpeakPlots() {
    const [data, setData] = useState<ProcessedData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Calculate time range for last 24 hours
            const endDate = new Date()
            const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000)

            const url = getThingSpeakUrl(startDate, endDate)

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`)
            }

            const result = await response.json()

            if (!result.feeds || result.feeds.length === 0) {
                throw new Error('No data available from ThingSpeak')
            }

            // Process the data
            const processedData: ProcessedData[] = result.feeds.map((feed: ThingSpeakData) => {
                const x = feed.field4 || 0
                const y = feed.field5 || 0
                const z = feed.field6 || 0
                const vibrationAmplitude = Math.sqrt(x * x + y * y + z * z)

                return {
                    time: new Date(feed.created_at).toISOString().substring(11, 16), // HH:mm
                    temperature: feed.field1 || 0,
                    ambientTemperature: feed.field2 || 0,
                    motorCurrent: feed.field3 || 0,
                    vibrationAmplitude
                }
            })

            // Downsample data for cleaner plots (e.g., show at most 48 points, every 30 minutes)
            let downsampledData = processedData
            const maxPoints = 48
            if (processedData.length > maxPoints) {
                const step = Math.ceil(processedData.length / maxPoints)
                downsampledData = processedData.filter((_, idx) => idx % step === 0)
            }
            setData(downsampledData)
            setLastUpdated(new Date())
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            // For demo purposes, create mock data
            createMockData()
        } finally {
            setLoading(false)
        }
    }

    const createMockData = () => {
        const mockData: ProcessedData[] = []
        const now = new Date()

        for (let i = 23; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60 * 1000)
            mockData.push({
                time: time.toLocaleTimeString(),
                temperature: 25 + Math.random() * 10 + Math.sin(i * 0.5) * 3,
                ambientTemperature: 22 + Math.random() * 5 + Math.sin(i * 0.3) * 2,
                motorCurrent: 2.5 + Math.random() * 1.5 + Math.sin(i * 0.7) * 0.5,
                vibrationAmplitude: 0.5 + Math.random() * 2 + Math.sin(i * 0.4) * 1
            })
        }

        setData(mockData)
        setLastUpdated(new Date())
    }

    useEffect(() => {
        fetchData()

        // Set up auto-refresh every 5 minutes
        const interval = setInterval(fetchData, THINGSPEAK_CONFIG.UPDATE_INTERVAL)

        return () => clearInterval(interval)
    }, [])

    const handleRefresh = () => {
        fetchData()
    }

    if (loading && data.length === 0) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Header with refresh button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {error && (
                        <div className="text-sm text-red-500">
                            Error: {error} - Using mock data
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {lastUpdated && (
                        <span className="text-sm text-gray-500">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={loading}
                        className="gap-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Plots Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Temperature Plot */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Thermometer className="h-5 w-5" />
                            Temperature (°C)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="time"
                                    tick={{ fontSize: 12 }}
                                    interval="preserveStartEnd"
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="temperature"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    name="Temperature"
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="ambientTemperature"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    name="Ambient Temp"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Motor Current Plot */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Motor Current (A)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="time"
                                    tick={{ fontSize: 12 }}
                                    interval="preserveStartEnd"
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="motorCurrent"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    name="Motor Current"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Motor Vibration Plot */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Vibration Amplitude
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="time"
                                    tick={{ fontSize: 12 }}
                                    interval="preserveStartEnd"
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="vibrationAmplitude"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    name="Vibration"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}