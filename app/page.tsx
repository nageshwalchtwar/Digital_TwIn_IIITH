"use client"

import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Digital Twin for Ankit Paper, IIIT-H</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to your admin account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
