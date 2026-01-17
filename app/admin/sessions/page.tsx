"use client";

import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";
import {
  mockSessions,
  getThreatColor,
  formatDuration,
  getThreatBgColor,
} from "@/lib/mock-data";

export default function LiveSessions() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">GhostShell</h1>
              <p className="text-xs text-gray-400">Live Sessions Monitor</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
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
      <div className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-white">Active Sessions</h2>
          <p className="text-sm text-gray-400 mt-1">
            {mockSessions.filter((s) => s.isActive).length} active honeypot
            sessions • {mockSessions.length} total sessions
          </p>
        </div>

        {/* Sessions Grid */}
        <div className="space-y-4">
          {mockSessions.map((session) => (
            <Link
              key={session.id}
              href={`/admin/sessions/${session.id}`}
              className={`block p-6 rounded-lg border transition-all hover:border-blue-500 hover:shadow-lg ${getThreatBgColor(
                session.threatLevel,
              )} border-gray-700`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Session Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">
                          {session.id}
                        </h3>
                        {session.isActive && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-900 bg-opacity-30 text-xs text-green-400">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Started{" "}
                        {new Date(session.startTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">Risk Score</p>
                      <p
                        className={`text-xl font-bold mt-1 ${getThreatColor(session.threatLevel)}`}
                      >
                        {session.riskScore}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Commands</p>
                      <p className="text-xl font-bold text-blue-400 mt-1">
                        {session.commands.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Duration</p>
                      <p className="text-xl font-bold text-white mt-1">
                        {formatDuration(
                          session.startTime,
                          session.lastActivity,
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Entry Vector</p>
                      <p className="text-lg font-bold text-gray-300 mt-1 capitalize">
                        {session.entryVector}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {session.behaviorTags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {session.behaviorTags.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-400">
                        +{session.behaviorTags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Attack Stage */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Attack Stage:</span>
                    <span className="text-xs font-semibold text-white capitalize">
                      {session.attackStage.replace("-", " ")}
                    </span>
                  </div>
                </div>

                {/* Threat Badge & Arrow */}
                <div className="flex flex-col items-end gap-4 ml-4">
                  <div
                    className={`text-right ${getThreatColor(session.threatLevel)}`}
                  >
                    <p className="text-sm font-bold capitalize">
                      {session.threatLevel}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Risk Level</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Recent Commands Preview */}
              <div className="mt-4 pt-4 border-t border-gray-600 border-opacity-50">
                <p className="text-xs text-gray-400 mb-2">Recent Commands:</p>
                <div className="flex flex-wrap gap-2">
                  {session.commands.slice(-3).map((cmd, idx) => (
                    <code
                      key={idx}
                      className="text-xs bg-gray-900 bg-opacity-50 px-2 py-1 rounded text-gray-300"
                    >
                      {cmd.command}
                    </code>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
