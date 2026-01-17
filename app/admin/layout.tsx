"use client";

import React, { useEffect, useRef } from "react";
import { useSessions } from "@/lib/session-context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HoneypotSession } from "@/lib/types";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { sessions } = useSessions();
    const prevSessionsRef = useRef<HoneypotSession[]>([]);
    const notifiedHighRiskRef = useRef<Set<string>>(new Set());
    const isInitialMount = useRef(true);

    // Monitor for changes and trigger toasts
    useEffect(() => {
        if (isInitialMount.current) {
            if (sessions.length > 0) {
                prevSessionsRef.current = sessions;
                // Pre-fill set so we don't toast for old high-risk on fresh load
                sessions.forEach(s => {
                    if (s.riskScore >= 50) notifiedHighRiskRef.current.add(s.id);
                });
                isInitialMount.current = false;
            }
            return;
        }

        const prevSessions = prevSessionsRef.current;

        sessions.forEach(session => {
            // 1. Check for NEW sessions
            const isNew = !prevSessions.some(prev => prev.id === session.id);
            if (isNew) {
                toast.info(`🛡️ New Session Started: ${session.id}`, {
                    icon: "🔍",
                    theme: "dark"
                });
            }

            // 2. Check for Risk Score > 50 reaching
            if (session.riskScore >= 50 && !notifiedHighRiskRef.current.has(session.id)) {
                toast.error(`⚠️ HIGH RISK DETECTED: ${session.id} (Score: ${session.riskScore})`, {
                    autoClose: 10000,
                    icon: "🚨",
                    theme: "dark"
                });
                notifiedHighRiskRef.current.add(session.id);
            }
        });

        prevSessionsRef.current = sessions;
    }, [sessions]);

    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}
