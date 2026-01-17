"use client";

import Link from "next/link";
import {
    User,
    Settings,
    LogOut,
    LayoutDashboard,
    Cloud,
    ShieldCheck,
    Activity,
    HardDrive,
    Bell,
    Search,
    Plus
} from "lucide-react";
import { useState, useEffect } from "react";

export default function UserDashboard() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <LayoutDashboard className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">GhostShell</h2>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-lg transition-all">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Overview</span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-all">
                        <HardDrive className="w-5 h-5" />
                        <span className="font-medium">Files</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-all">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="font-medium">Security</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-all">
                        <Cloud className="w-5 h-5" />
                        <span className="font-medium">Cloud Storage</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-all">
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-all">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-full max-w-md hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search files, tasks, or security reports..."
                                className="w-full bg-gray-900 border border-gray-700 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-white relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-gray-800"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-700"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">Prakash</p>
                                <p className="text-xs text-gray-500">System Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center border-2 border-gray-700">
                                <User className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-8 bg-gray-900/50 backdrop-blur-sm">
                    {/* Welcome Section */}
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Welcome back, Prakash</h1>
                            <p className="text-gray-400 mt-1">Here's what's happening with your system today.</p>
                        </div>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg active:scale-95">
                            <Plus className="w-5 h-5" />
                            New Project
                        </button>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Health Card */}
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-6 h-6 text-green-500" />
                                </div>
                                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Secure</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-medium">Security Status</h3>
                            <p className="text-2xl font-bold text-white mt-1">All Systems OK</p>
                            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                <Activity className="w-3 h-3 text-green-500" />
                                <span>Last scan: 42m ago</span>
                            </div>
                        </div>

                        {/* Storage Card */}
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                    <Cloud className="w-6 h-6 text-blue-500" />
                                </div>
                                <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">85% Used</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-medium">Cloud Storage</h3>
                            <p className="text-2xl font-bold text-white mt-1">42.8 GB / 50 GB</p>
                            <div className="mt-4 w-full bg-gray-700 rounded-full h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>

                        {/* Performance Card */}
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                    <Activity className="w-6 h-6 text-purple-500" />
                                </div>
                                <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded-full">Optimal</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-medium">System CPU</h3>
                            <p className="text-2xl font-bold text-white mt-1">12.5% Load</p>
                            <div className="mt-4 flex gap-1 items-end h-8">
                                {[40, 60, 45, 70, 50, 80, 55, 65].map((h, i) => (
                                    <div key={i} className="flex-1 bg-purple-500/30 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                        </div>

                        {/* Activity Card */}
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-orange-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                    <HardDrive className="w-6 h-6 text-orange-500" />
                                </div>
                                <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">High</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-medium">Disk Health</h3>
                            <p className="text-2xl font-bold text-white mt-1">98% Efficient</p>
                            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                <ShieldCheck className="w-3 h-3 text-orange-500" />
                                <span>Zero partitions at risk</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Files Table */}
                        <div className="lg:col-span-2 bg-gray-800 rounded-3xl border border-gray-700 shadow-xl overflow-hidden">
                            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                                <h3 className="font-bold text-xl text-white">Recent Files</h3>
                                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                                            <th className="px-6 py-4 font-semibold">Name</th>
                                            <th className="px-6 py-4 font-semibold">Type</th>
                                            <th className="px-6 py-4 font-semibold">Size</th>
                                            <th className="px-6 py-4 font-semibold">Modified</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {[
                                            { name: "Project_Proposal.pdf", type: "PDF Document", size: "2.4 MB", date: "2 mins ago" },
                                            { name: "Financial_Report_Q4.xlsx", type: "Spreadsheet", size: "1.8 MB", date: "1 hour ago" },
                                            { name: "System_Backup.zip", type: "Archive", size: "512 MB", date: "3 hours ago" },
                                            { name: "Company_Logo.svg", type: "Vector Graphics", size: "340 KB", date: "Yesterday" },
                                            { name: "Notes_Internal.txt", type: "Text File", size: "12 KB", date: "Yesterday" }
                                        ].map((f, i) => (
                                            <tr key={i} className="hover:bg-gray-700/30 transition-colors group">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-gray-900 flex items-center justify-center text-gray-500 group-hover:text-blue-400 transition-colors">
                                                            <HardDrive className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm font-medium text-white">{f.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{f.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{f.size}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{f.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Side Cards */}
                        <div className="space-y-6">
                            {/* Profile Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-xl border border-blue-500/20 relative overflow-hidden group">
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-4">Complete Your Profile</h3>
                                    <p className="text-blue-100/80 text-sm mb-6 leading-relaxed">Boost your security by 40% by completing your profile details.</p>
                                    <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg active:scale-95">
                                        Start Setup
                                    </button>
                                </div>
                            </div>

                            {/* Announcements */}
                            <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl">
                                <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-yellow-500" />
                                    System Notifications
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { title: "Weekly maintenance scheduled", time: "Oct 24, 02:00 AM" },
                                        { title: "New security patch v4.2 available", time: "Today, 10:15 AM" }
                                    ].map((n, i) => (
                                        <div key={i} className="p-4 bg-gray-900 border border-gray-700 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer">
                                            <p className="text-sm font-medium text-white line-clamp-1">{n.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
