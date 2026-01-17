"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Shield, ChevronLeft, AlertTriangle } from "lucide-react";
import {
  getSessionById,
  getThreatColor,
  formatDuration,
  formatTime,
} from "@/lib/mock-data";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function SessionDetail() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const session = getSessionById(sessionId);

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Session Not Found
          </h1>
          <Link
            href="/admin/sessions"
            className="text-blue-400 hover:text-blue-300"
          >
            Back to Sessions
          </Link>
        </div>
      </div>
    );
  }

  // Generate risk progression data
  const riskData = session.commands.map((cmd, idx) => ({
    command: idx + 1,
    risk: session.commands
      .slice(0, idx + 1)
      .reduce((sum, c) => sum + c.riskIncrease, 0),
  }));

  const threatColors: Record<string, string> = {
    normal: "text-gray-400",
    reconnaissance: "text-blue-400",
    "credential-access": "text-yellow-400",
    "privilege-escalation": "text-orange-400",
    persistence: "text-red-400",
    destructive: "text-red-600",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="px-6 py-4">
          <Link
            href="/admin/sessions"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Sessions
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">{session.id}</h1>
                <p
                  className={`text-xs mt-1 ${getThreatColor(session.threatLevel)}`}
                >
                  {session.threatLevel.toUpperCase()} THREAT LEVEL
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Risk Score</p>
              <p
                className={`text-3xl font-bold ${getThreatColor(session.threatLevel)}`}
              >
                {session.riskScore}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Session Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Duration
            </p>
            <p className="text-2xl font-bold text-white mt-2">
              {formatDuration(session.startTime, session.lastActivity)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Commands Executed
            </p>
            <p className="text-2xl font-bold text-blue-400 mt-2">
              {session.commands.length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Entry Vector
            </p>
            <p className="text-xl font-bold text-white mt-2 capitalize">
              {session.entryVector}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Attack Stage
            </p>
            <p className="text-lg font-bold text-white mt-2 capitalize">
              {session.attackStage.replace("-", " ")}
            </p>
          </div>
        </div>

        {/* Risk Progression Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">
            Risk Score Progression
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="command"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
                label={{ value: "Command #", position: "bottom", offset: 10 }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
                label={{
                  value: "Risk Score",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                }}
              />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#ef4444"
                dot={{ fill: "#ef4444", r: 5 }}
                activeDot={{ r: 7 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Behavior & Deception Strategies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Behavior Tags */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">
              Behavior Classification
            </h2>
            <div className="space-y-2">
              {session.behaviorTags.map((tag, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-700 rounded"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-200">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deception Strategies */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">
              Deception Strategies Used
            </h2>
            <div className="space-y-2">
              {session.deceptionStrategies.map((strategy, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-700 rounded"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm text-gray-200">{strategy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Command Transcript */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">
            Command Transcript
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {session.commands.map((cmd, idx) => (
              <div
                key={cmd.id}
                className="p-4 bg-gray-900 rounded border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500"># {idx + 1}</span>
                    <code className="font-mono text-sm text-green-400">
                      {cmd.command}
                    </code>
                    <span
                      className={`text-xs px-2 py-1 rounded capitalize font-medium ${
                        cmd.threat === "normal"
                          ? "bg-gray-700 text-gray-300"
                          : "bg-opacity-20 " + threatColors[cmd.threat]
                      }`}
                    >
                      {cmd.threat.replace("-", " ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-bold ${cmd.riskIncrease > 0 ? "text-red-400" : "text-gray-400"}`}
                    >
                      +{cmd.riskIncrease}
                    </span>
                    <p className="text-xs text-gray-500">
                      {formatTime(cmd.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-gray-800 rounded font-mono text-xs text-gray-300 whitespace-pre-wrap break-words">
                  {cmd.output}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Timeline */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">
            Session Timeline
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-1.5"></div>
                <div className="w-0.5 h-12 bg-gray-700"></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Session Started
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(session.startTime).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-orange-400 rounded-full mt-1.5"></div>
                <div className="w-0.5 h-12 bg-gray-700"></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {session.commands.length} Commands Executed
                </p>
                <p className="text-xs text-gray-400">
                  Attack progression detected
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${session.isActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                ></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {session.isActive ? "Session Active" : "Session Ended"}
                </p>
                <p className="text-xs text-gray-400">
                  Last activity:{" "}
                  {new Date(session.lastActivity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
