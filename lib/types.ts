export interface TerminalCommand {
  id: string;
  timestamp: number;
  command: string;
  output: string;
  threat:
    | "reconnaissance"
    | "credential-access"
    | "privilege-escalation"
    | "persistence"
    | "destructive"
    | "normal";
  riskIncrease: number;
}

export interface HoneypotSession {
  id: string;
  startTime: number;
  lastActivity: number;
  riskScore: number;
  entryVector: "console" | "api" | "debug" | "direct";
  attackStage:
    | "initial-access"
    | "reconnaissance"
    | "escalation"
    | "exploitation"
    | "persistence";
  isActive: boolean;
  commands: TerminalCommand[];
  threatLevel: "low" | "medium" | "high" | "critical";
  behaviorTags: string[];
  deceptionStrategies: string[];
}

export interface SessionMetrics {
  totalSessions: number;
  activeSessions: number;
  totalCommands: number;
  averageRiskScore: number;
  threatDistribution: {
    reconnaissance: number;
    credentialAccess: number;
    privilegeEscalation: number;
    persistence: number;
    destructive: number;
  };
}
