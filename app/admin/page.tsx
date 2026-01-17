"use client";

import Link from "next/link";
import { getSessionMetrics } from "@/lib/mock-data";
import { Shield, Activity, AlertTriangle, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const metrics = getSessionMetrics();

const riskData = [
  { name: "Low", value: 15, color: "#22c55e" },
  { name: "Medium", value: 35, color: "#eab308" },
  { name: "High", value: 35, color: "#f97316" },
  { name: "Critical", value: 15, color: "#dc2626" },
];

const timeSeriesData = [
  { time: "00:00", attacks: 2 },
  { time: "04:00", attacks: 5 },
  { time: "08:00", attacks: 8 },
  { time: "12:00", attacks: 12 },
  { time: "16:00", attacks: 18 },
  { time: "20:00", attacks: 24 },
  { time: "23:59", attacks: 28 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">GhostShell</h1>
              <p className="text-xs text-gray-400">
                Honeypot Intelligence Platform
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/sessions"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              Sessions
            </Link>
            <Link
              href="/"
              className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Attackers */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Attackers</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {metrics.totalSessions}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-400 opacity-20" />
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Sessions</p>
                <p className="text-3xl font-bold text-green-400 mt-2">
                  {metrics.activeSessions}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-400 opacity-20" />
            </div>
          </div>

          {/* Total Commands */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Commands Tracked</p>
                <p className="text-3xl font-bold text-blue-400 mt-2">
                  {metrics.totalCommands}
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-400 opacity-20" />
            </div>
          </div>

          {/* Avg Risk Score */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Risk Score</p>
                <p className="text-3xl font-bold text-red-400 mt-2">
                  {metrics.averageRiskScore}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400 opacity-20" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Distribution */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">
              Risk Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {riskData.map((item) => (
                <div key={item.name} className="text-center text-xs">
                  <div
                    className="w-3 h-3 mx-auto mb-1"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <p className="text-gray-400">{item.name}</p>
                  <p className="font-semibold text-white">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Attack Timeline */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">
              Attack Timeline (24h)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="time"
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attacks"
                  stroke="#3b82f6"
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Classification */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">
            Threat Classification
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 rounded bg-gray-700">
              <p className="text-2xl font-bold text-blue-400">
                {metrics.threatDistribution.reconnaissance}
              </p>
              <p className="text-xs text-gray-400 mt-2">Reconnaissance</p>
            </div>
            <div className="text-center p-4 rounded bg-gray-700">
              <p className="text-2xl font-bold text-yellow-400">
                {metrics.threatDistribution.credentialAccess}
              </p>
              <p className="text-xs text-gray-400 mt-2">Credential Access</p>
            </div>
            <div className="text-center p-4 rounded bg-gray-700">
              <p className="text-2xl font-bold text-orange-400">
                {metrics.threatDistribution.privilegeEscalation}
              </p>
              <p className="text-xs text-gray-400 mt-2">Privilege Escalation</p>
            </div>
            <div className="text-center p-4 rounded bg-gray-700">
              <p className="text-2xl font-bold text-red-400">
                {metrics.threatDistribution.persistence}
              </p>
              <p className="text-xs text-gray-400 mt-2">Persistence</p>
            </div>
            <div className="text-center p-4 rounded bg-gray-700">
              <p className="text-2xl font-bold text-red-600">
                {metrics.threatDistribution.destructive}
              </p>
              <p className="text-xs text-gray-400 mt-2">Destructive</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/sessions"
              className="p-4 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-center"
            >
              <p className="font-semibold text-white">View Live Sessions</p>
              <p className="text-xs text-gray-400 mt-1">
                Monitor active attacks in real-time
              </p>
            </Link>
            <div className="p-4 bg-gray-700 rounded text-center cursor-not-allowed opacity-50">
              <p className="font-semibold text-white">Export Report</p>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </div>
            <div className="p-4 bg-gray-700 rounded text-center cursor-not-allowed opacity-50">
              <p className="font-semibold text-white">AI Analysis</p>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
