"use client";

import Link from "next/link";
import { Lock, Terminal, Shield } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"login" | "console">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [consoleInput, setConsoleInput] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - redirect to terminal
    window.location.href = "/terminal";
  };

  const handleConsoleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate console access detection - redirects to honeypot
    window.location.href = "/terminal";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">CorpSecure</h1>
          </div>
          <p className="text-gray-400">Enterprise Authentication System</p>
        </div>

        {/* Auth Card */}
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === "login"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Login
            </button>
            <button
              onClick={() => setActiveTab("console")}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === "console"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <Terminal className="w-4 h-4 inline mr-2" />
              Console Access
            </button>
          </div>

          {/* Login Tab */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
            </form>
          )}

          {/* Console Tab */}
          {activeTab === "console" && (
            <form onSubmit={handleConsoleAccess} className="p-6 space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
                <p className="text-gray-400 text-sm font-mono">
                  corp-server@maintenance:~$ ssh user@corp-server -p 22
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Command
                </label>
                <input
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono text-sm"
                  placeholder="$ "
                />
              </div>
              <p className="text-xs text-gray-500">
                ⚠️ Advanced access detected. System will redirect for
                authentication.
              </p>
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Execute
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-900 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Admin Panel:</span>
              <Link href="/admin" className="text-blue-400 hover:text-blue-300">
                Dashboard →
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            🔒 This system is monitored. All access attempts are logged.
          </p>
        </div>
      </div>
    </div>
  );
}
