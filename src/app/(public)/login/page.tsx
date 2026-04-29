"use client";

import AuthButton from "@/src/components/ui/auth-button";


export default function LoginPage() {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden
      bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 py-40 sm:pt-40 lg:pt-50">
      
      {/* Background glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-200/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent-300/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent-600 tracking-wide">Welcome back</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Sign in to access your admin dashboard
          </p>
        </div>

        {/* Auth buttons */}
        <AuthButton />

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Secure authentication powered by NextAuth
        </p>
      </div>
    </div>
  );
}