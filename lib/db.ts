import fs from "fs/promises";
import path from "path";
import { HoneypotSession, TerminalCommand } from "./types";

const DB_PATH = path.join(process.cwd(), "data", "sessions.json");

// Ensure data directory exists
async function ensureDb() {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, "[]", "utf-8");
    }
}

export async function getSessions(): Promise<HoneypotSession[]> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
}

export async function saveSessions(sessions: HoneypotSession[]) {
    await ensureDb();
    await fs.writeFile(DB_PATH, JSON.stringify(sessions, null, 2), "utf-8");
}

export async function createSession(id: string): Promise<HoneypotSession> {
    const sessions = await getSessions();

    // Check if exists
    const existing = sessions.find(s => s.id === id);
    if (existing) return existing;

    const newSession: HoneypotSession = {
        id,
        startTime: Date.now(),
        lastActivity: Date.now(),
        riskScore: 0,
        entryVector: "console",
        attackStage: "initial-access",
        isActive: true,
        commands: [],
        threatLevel: "low",
        behaviorTags: ["New Connection"],
        deceptionStrategies: [],
    };

    sessions.unshift(newSession);
    await saveSessions(sessions);
    return newSession;
}

export async function addCommandToSession(id: string, command: TerminalCommand) {
    const sessions = await getSessions();
    const sessionIndex = sessions.findIndex((s) => s.id === id);

    if (sessionIndex === -1) return null;

    const session = sessions[sessionIndex];
    session.commands.push(command);
    session.lastActivity = Date.now();
    session.riskScore += command.riskIncrease;

    // Simple threat level logic based on score
    if (session.riskScore > 100) session.threatLevel = "critical";
    else if (session.riskScore > 50) session.threatLevel = "high";
    else if (session.riskScore > 20) session.threatLevel = "medium";

    // Add tags based on commands
    if (command.threat === "destructive" && !session.behaviorTags.includes("Destructive")) {
        session.behaviorTags.push("Destructive");
    }
    if (command.threat === "persistence" && !session.behaviorTags.includes("Persistence")) {
        session.behaviorTags.push("Persistence");
    }

    sessions[sessionIndex] = session;
    await saveSessions(sessions);
    return session;
}

export async function terminateSession(id: string) {
    const sessions = await getSessions();
    const sessionIndex = sessions.findIndex((s) => s.id === id);

    if (sessionIndex === -1) return null;

    sessions[sessionIndex].isActive = false;
    await saveSessions(sessions);
    return sessions[sessionIndex];
}
