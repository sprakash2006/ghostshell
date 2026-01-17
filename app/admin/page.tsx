"use client";

import Link from "next/link";
import { useSessions } from "@/lib/session-context";
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

export default function AdminDashboard() {
  const { sessions } = useSessions();

  // Calculate real metrics
  const activeSessions = sessions.filter(s => s.isActive).length;
  const totalCommands = sessions.reduce((acc, s) => acc + s.commands.length, 0);
  const averageRiskScore = sessions.length > 0
    ? Math.round(sessions.reduce((acc, s) => acc + s.riskScore, 0) / sessions.length)
    : 0;

  // Real Risk Distribution Data
  const riskCounts = { low: 0, medium: 0, high: 0, critical: 0 };
  sessions.forEach(s => riskCounts[s.threatLevel]++);

  const totalSesh = sessions.length || 1;
  const riskData = [
    { name: "Low", value: Math.round((riskCounts.low / totalSesh) * 100), color: "#22c55e" },
    { name: "Medium", value: Math.round((riskCounts.medium / totalSesh) * 100), color: "#eab308" },
    { name: "High", value: Math.round((riskCounts.high / totalSesh) * 100), color: "#f97316" },
    { name: "Critical", value: Math.round((riskCounts.critical / totalSesh) * 100), color: "#dc2626" },
  ];

  // Real Attack Timeline Data (Simple bucket by hour for last 24h)
  const now = Date.now();
  const timeSeriesData = Array.from({ length: 7 }, (_, i) => {
    const hour = new Date(now - (6 - i) * 4 * 3600000);
    const timeLabel = `${hour.getHours().toString().padStart(2, '0')}:00`;
    const count = sessions.filter(s =>
      s.startTime > now - (7 - i) * 4 * 3600000 &&
      s.startTime <= now - (6 - i) * 4 * 3600000
    ).length;
    return { time: timeLabel, attacks: count };
  });

  const threatDistribution = {
    reconnaissance: 0,
    credentialAccess: 0,
    privilegeEscalation: 0,
    persistence: 0,
    destructive: 0
  };

  sessions.flatMap(s => s.commands).forEach(c => {
    if (c.threat === "reconnaissance") threatDistribution.reconnaissance++;
    else if (c.threat === "credential-access") threatDistribution.credentialAccess++;
    else if (c.threat === "privilege-escalation") threatDistribution.privilegeEscalation++;
    else if (c.threat === "persistence") threatDistribution.persistence++;
    else if (c.threat === "destructive") threatDistribution.destructive++;
  });

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
                  {sessions.length}
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
                  {activeSessions}
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
                  {totalCommands}
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
                  {averageRiskScore}
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
                {threatDistribution.reconnaissance}
              </p>
              <p className="text-xs text-gray-400 mt-2">Reconnaissance</p>
            </div>
            <div className="text-center p-4 rounded bg-gray-700">
              <p className="text-2xl font-bold text-yellow-400">
                {threatDistribution.credentialAccess}
              </p>
              <p className="text-xs text-gray-400 mt-2">Credential Access</p>
            </div>
            <div className="text-center p-4 rounded bg-gray-700">
              <p className="text-2xl font-bold text-orange-400">
                {threatDistribution.privilegeEscalation}
              </p>
              <p className="text-xs text-gray-400 mt-2">Privilege Escalation</p>
            </div>
            <div className="text-center p-4 rounded bg-gray-700">
              <p className="text-2xl font-bold text-red-400">
                {threatDistribution.persistence}
              </p>
              <p className="text-xs text-gray-400 mt-2">Persistence</p>
            </div>
            <div className="text-center p-4 rounded bg-gray-700">
              <p className="text-2xl font-bold text-red-600">
                {threatDistribution.destructive}
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
