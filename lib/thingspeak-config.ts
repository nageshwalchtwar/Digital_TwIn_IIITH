// ThingSpeak Configuration
// Replace these values with your actual ThingSpeak channel details

export const THINGSPEAK_CONFIG = {
    // Your ThingSpeak Channel ID
    CHANNEL_ID: process.env.NEXT_PUBLIC_THINGSPEAK_CHANNEL_ID || "YOUR_CHANNEL_ID",

    // Your ThingSpeak Read API Key
    API_KEY: process.env.NEXT_PUBLIC_THINGSPEAK_API_KEY || "YOUR_API_KEY",

    // Field mappings for your ThingSpeak channel
    FIELDS: {
        TEMPERATURE: "field1",      // Temperature sensor
        AMBIENT_TEMP: "field2",     // Ambient temperature
        MOTOR_CURRENT: "field3",    // Motor current
        VIBRATION_X: "field4",      // Vibration X-axis
        VIBRATION_Y: "field5",      // Vibration Y-axis
        VIBRATION_Z: "field6",      // Vibration Z-axis
    },

    // Update interval in milliseconds (5 minutes)
    UPDATE_INTERVAL: 5 * 60 * 1000,

    // Number of data points to fetch (max 8000 for free accounts)
    MAX_RESULTS: 100
}

// Helper function to get ThingSpeak API URL
export function getThingSpeakUrl(startDate?: Date, endDate?: Date) {
    const { CHANNEL_ID, API_KEY, MAX_RESULTS } = THINGSPEAK_CONFIG

    let url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}&results=${MAX_RESULTS}`

    if (startDate) {
        url += `&start=${startDate.toISOString()}`
    }

    if (endDate) {
        url += `&end=${endDate.toISOString()}`
    }

    return url
} 