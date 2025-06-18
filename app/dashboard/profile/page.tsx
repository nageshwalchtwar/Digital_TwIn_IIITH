"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Key, Shield, Clock } from "lucide-react"
import { WelcomeHeader, mockUser } from "@/components/welcome-header"

// Extended user data with additional profile fields
const user = {
  ...mockUser,
  joinDate: "May 2023",
  department: "Computer Science",
  bio: "Admin user for the Digital Twin platform. Manages users, sensors, and system configurations."
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(user)
  
  const handleSaveProfile = () => {
    // In a real app, you would save the user data to a database or API
    setIsEditing(false)
  }
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <WelcomeHeader />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
          <AvatarImage src={userData.imageUrl} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl">
            {userData.name.split(" ").map(n => n[0]).join("").toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-4">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <User size={16} /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell size={16} /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Key size={16} /> Security
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex gap-2 items-center hidden md:flex">
            <Shield size={16} /> Permissions
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex gap-2 items-center hidden md:flex">
            <Clock size={16} /> Activity
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    disabled={!isEditing}
                    className={isEditing ? "border-blue-300" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                    className={isEditing ? "border-blue-300" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={userData.role}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={userData.department}
                    onChange={(e) => setUserData({ ...userData, department: e.target.value })}
                    disabled={!isEditing}
                    className={isEditing ? "border-blue-300" : ""}
                  />
                </div>
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={userData.bio}
                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                    disabled={!isEditing}
                    className={isEditing ? "border-blue-300" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <Input
                    id="avatar"
                    type="file"
                    disabled={!isEditing}
                    className={isEditing ? "border-blue-300" : ""}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
              {isEditing && (
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important alerts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when system errors occur
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sensor Status Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when sensors change status
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Update password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2"></div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
              >
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>
                Manage permissions and access rights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-6">
                This account has full administrator privileges
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                View your account activity history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Login from 157.45.xx.xx</p>
                    <p className="text-sm text-muted-foreground">Today at 4:20 PM</p>
                  </div>
                  <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Successful
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Profile updated</p>
                    <p className="text-sm text-muted-foreground">June 15, 2025 at 2:30 PM</p>
                  </div>
                  <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Change
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Password changed</p>
                    <p className="text-sm text-muted-foreground">June 10, 2025 at 10:15 AM</p>
                  </div>
                  <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Change
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
