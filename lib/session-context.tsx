"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { HoneypotSession } from "@/lib/types";

interface SessionContextType {
    sessions: HoneypotSession[];
    terminateSession: (id: string) => void;
    // In a real app we'd have addSession, updateSession etc.
    // For this demo, we can also add a function to register a new session from the terminal
    registerSession: (id: string) => void;
    addCommand: (id: string, command: any) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [sessions, setSessions] = useState<HoneypotSession[]>([]);

    // Fetch sessions from API
    const fetchSessions = async () => {
        try {
            const res = await fetch("/api/sessions");
            if (res.ok) {
                const data = await res.json();
                setSessions(data);
            }
        } catch (error) {
            console.error("Failed to fetch sessions:", error);
        }
    };

    // Poll for updates every 2 seconds
    useEffect(() => {
        fetchSessions();
        const interval = setInterval(fetchSessions, 2000);
        return () => clearInterval(interval);
    }, []);

    const terminateSession = async (id: string) => {
        // Optimistic update
        setSessions((prev) =>
            prev.map((session) =>
                session.id === id ? { ...session, isActive: false } : session
            )
        );

        try {
            await fetch(`/api/sessions/${id}/check`, {
                method: "DELETE",
            });
            fetchSessions(); // Sync with server
        } catch (error) {
            console.error("Failed to terminate session:", error);
        }
    };

    const registerSession = async (id: string) => {
        try {
            await fetch("/api/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            fetchSessions(); // Immediate update
        } catch (error) {
            console.error("Failed to register session:", error);
        }
    };

    const addCommand = async (id: string, command: any) => {
        try {
            await fetch(`/api/sessions/${id}/check`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(command),
            });
            fetchSessions();
        } catch (error) {
            console.error("Failed to add command:", error);
        }
    };

    return (
        <SessionContext.Provider
            value={{ sessions, terminateSession, registerSession, addCommand }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export function useSessions() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSessions must be used within a SessionProvider");
    }
    return context;
}
