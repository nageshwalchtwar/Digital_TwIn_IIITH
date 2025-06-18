"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Laptop, Moon, Sun, Globe, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WelcomeHeader } from "@/components/welcome-header"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState("en")
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <WelcomeHeader />
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage application settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="appearance" className="flex gap-2 items-center">
            <Palette size={16} /> Appearance
          </TabsTrigger>
          <TabsTrigger value="language" className="flex gap-2 items-center">
            <Globe size={16} /> Language
          </TabsTrigger>
          <TabsTrigger value="device" className="flex gap-2 items-center">
            <Laptop size={16} /> Device
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex gap-2 items-center">
            Advanced
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the appearance of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <div className="flex items-center space-x-4">
                  <Button 
                    variant={theme === "light" ? "default" : "outline"}
                    className={`flex gap-2 items-center w-full justify-center ${theme === "light" ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md" : ""}`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun size={16} />
                    Light
                  </Button>
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"}
                    className={`flex gap-2 items-center w-full justify-center ${theme === "dark" ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md" : ""}`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon size={16} />
                    Dark
                  </Button>
                  <Button 
                    variant={theme === "system" ? "default" : "outline"}
                    className={`flex gap-2 items-center w-full justify-center ${theme === "system" ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md" : ""}`}
                    onClick={() => setTheme("system")}
                  >
                    <Laptop size={16} />
                    System
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable animations</p>
                    <p className="text-sm text-muted-foreground">
                      Animations and transitions in the UI
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">High contrast mode</p>
                    <p className="text-sm text-muted-foreground">
                      Increases contrast for better readability
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Glassmorphism effects</p>
                    <p className="text-sm text-muted-foreground">
                      Enable blur and transparency effects
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
              <CardDescription>
                Choose your preferred language and region
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Application Language</Label>
                  <Select defaultValue={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="en-gb">English (UK)</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="Asia/Kolkata">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">India (GMT+5:30)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (GMT-5)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (GMT-8)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
                Apply Language Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="device">
          <Card>
            <CardHeader>
              <CardTitle>Device Settings</CardTitle>
              <CardDescription>
                Manage device-specific settings for the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Allow browser notifications for alerts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Remember session</p>
                    <p className="text-sm text-muted-foreground">
                      Stay logged in between sessions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-refresh data</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically refresh dashboard data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced application options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Developer mode</p>
                    <p className="text-sm text-muted-foreground">
                      Show developer tools and options
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable experimental features</p>
                    <p className="text-sm text-muted-foreground">
                      Access beta and experimental features
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      type="password"
                      value="••••••••••••••••••••••••"
                      disabled
                    />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive">
                Reset All Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
