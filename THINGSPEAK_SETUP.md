# ThingSpeak Integration Setup

This guide will help you set up the ThingSpeak integration for the Digital Twin dashboard plots.

## Prerequisites

1. A ThingSpeak account (free at [thingspeak.com](https://thingspeak.com))
2. A ThingSpeak channel with the following fields configured:
   - Field 1: Temperature sensor
   - Field 2: Ambient temperature
   - Field 3: Motor current
   - Field 4: Vibration X-axis
   - Field 5: Vibration Y-axis
   - Field 6: Vibration Z-axis

## Setup Instructions

### 1. Get Your ThingSpeak Credentials

1. Log in to your ThingSpeak account
2. Go to your channel or create a new one
3. Note down your **Channel ID** (found in the channel URL)
4. Go to the "API Keys" tab and copy your **Read API Key**

### 2. Configure Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```env
NEXT_PUBLIC_THINGSPEAK_CHANNEL_ID=your_channel_id_here
NEXT_PUBLIC_THINGSPEAK_API_KEY=your_read_api_key_here
```

**Example:**
```env
NEXT_PUBLIC_THINGSPEAK_CHANNEL_ID=1234567
NEXT_PUBLIC_THINGSPEAK_API_KEY=ABC123DEF456GHI789
```

### 3. Alternative: Direct Configuration

If you prefer not to use environment variables, you can directly edit the configuration file:

1. Open `lib/thingspeak-config.ts`
2. Replace the placeholder values:
   ```typescript
   CHANNEL_ID: "your_channel_id_here",
   API_KEY: "your_read_api_key_here",
   ```

### 4. Field Mapping

The system expects the following field mapping in your ThingSpeak channel:

| Field | Purpose | Description |
|-------|---------|-------------|
| Field 1 | Temperature | Main temperature sensor reading |
| Field 2 | Ambient Temperature | Ambient/environmental temperature |
| Field 3 | Motor Current | Motor current consumption in Amperes |
| Field 4 | Vibration X | X-axis vibration sensor reading |
| Field 5 | Vibration Y | Y-axis vibration sensor reading |
| Field 6 | Vibration Z | Z-axis vibration sensor reading |

### 5. Data Format

Ensure your ThingSpeak channel is receiving data in the correct format:

- **Temperature fields**: Numeric values in Celsius
- **Motor Current**: Numeric values in Amperes
- **Vibration fields**: Numeric values (raw sensor readings)

The vibration amplitude is automatically calculated using the formula: `√(x² + y² + z²)`

## Testing the Integration

1. Start your development server: `npm run dev`
2. Navigate to the dashboard page
3. The plots should display your ThingSpeak data
4. If no data is available, mock data will be shown for demonstration

## Troubleshooting

### No Data Displayed
- Check your Channel ID and API Key are correct
- Verify your ThingSpeak channel has data in the last 24 hours
- Check the browser console for any error messages

### CORS Issues
- ThingSpeak API supports CORS, but if you encounter issues, you may need to proxy the requests through your backend

### Rate Limiting
- Free ThingSpeak accounts have rate limits
- The system fetches data every 5 minutes by default
- You can adjust the update interval in `lib/thingspeak-config.ts`

## Features

- **Real-time Data**: Fetches data from ThingSpeak every 5 minutes
- **24-hour Range**: Shows the last 24 hours of data by default
- **Auto-refresh**: Automatically updates the plots
- **Manual Refresh**: Click the refresh button to update immediately
- **Error Handling**: Gracefully handles API errors and shows mock data
- **Responsive Design**: Plots adapt to different screen sizes

## Customization

You can customize the plots by modifying:

- **Update interval**: Change `UPDATE_INTERVAL` in the config
- **Data range**: Modify the time range in the `fetchData` function
- **Field mappings**: Update the field names in the config
- **Plot styling**: Modify the chart components in `components/thingspeak-plots.tsx` 