import React, { useState } from "react"

// Use provided images
const MOTOR_IMG = "/motor.png";

const outputLabels = [
    { label: "Speed", key: "speed" },
    { label: "Vibrations", key: "vibrations" },
    { label: "PT_motor_temp", key: "pt_motor_temp" },
    { label: "DT_motor_temp", key: "dt_motor_temp" },
]

type MotorOutputs = {
    speed?: string
    vibrations?: string
    pt_motor_temp?: string
    dt_motor_temp?: string
}

export function MotorVisualization(props: { outputs?: MotorOutputs }) {
    // Input states
    const [voltage, setVoltage] = useState(415)
    const [current, setCurrent] = useState(10)
    const [ambientTemp, setAmbientTemp] = useState(25)
    const [duration, setDuration] = useState(10)

    // Output values (could be calculated based on inputs)
    const { outputs = {} } = props

    return (
        <div className="flex flex-col items-center w-full h-full p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-row w-full max-w-5xl h-[400px] border rounded-lg relative bg-white items-center">
                {/* Left: Input Sliders */}
                <div className="flex flex-col justify-center w-1/4 h-full p-4 gap-6 z-10">
                    <div>
                        <label className="block font-semibold mb-1">Voltage (V)</label>
                        <input
                            type="range"
                            min={350}
                            max={450}
                            value={voltage}
                            onChange={e => setVoltage(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-sm mt-1">{voltage} V</div>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Current (A)</label>
                        <input
                            type="range"
                            min={0}
                            max={30}
                            value={current}
                            onChange={e => setCurrent(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-sm mt-1">{current} A</div>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Ambient Temperature (°C)</label>
                        <input
                            type="range"
                            min={-10}
                            max={60}
                            value={ambientTemp}
                            onChange={e => setAmbientTemp(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-sm mt-1">{ambientTemp} °C</div>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Time Duration (s)</label>
                        <input
                            type="range"
                            min={1}
                            max={120}
                            value={duration}
                            onChange={e => setDuration(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-sm mt-1">{duration} s</div>
                    </div>
                </div>
                {/* Arrow from input to motor */}
                <div className="flex items-center h-full">
                    <svg width="60" height="40" viewBox="0 0 60 40" className="mx-2">
                        <line x1="0" y1="20" x2="50" y2="20" stroke="#222" strokeWidth="3" />
                        <polygon points="50,15 60,20 50,25" fill="#222" />
                    </svg>
                </div>
                {/* Center: Motor */}
                <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                    <img src={MOTOR_IMG} alt="3 Phase Induction Motor" className="h-64 object-contain" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-lg font-semibold">3 Phase Induction Motor</div>
                </div>
                {/* Arrow from motor to output */}
                <div className="flex items-center h-full">
                    <svg width="60" height="40" viewBox="0 0 60 40" className="mx-2">
                        <line x1="10" y1="20" x2="60" y2="20" stroke="#222" strokeWidth="3" />
                        <polygon points="60,20 50,15 50,25" fill="#222" />
                    </svg>
                </div>
                {/* Right: Outputs */}
                <div className="flex flex-col justify-center w-1/4 h-full bg-slate-100 rounded-r-lg p-4 border-l z-10">
                    <div className="text-xl font-bold text-center mb-4">OUTPUTS</div>
                    <div className="flex flex-col gap-4">
                        {outputLabels.map((out, idx) => (
                            <div key={out.key} className="flex items-center gap-2">
                                <div className="w-4 text-right text-xs font-bold">{idx + 1}</div>
                                <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-[14px] border-r-black mr-2" />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={outputs[out.key as keyof MotorOutputs] ?? ""}
                                        readOnly
                                        className="w-full border rounded px-2 py-1 text-center bg-white"
                                        placeholder={out.label}
                                    />
                                    <div className="text-xs font-semibold text-slate-700 mt-1">{out.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MotorVisualization 