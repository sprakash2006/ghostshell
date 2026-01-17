# GhostShell - Agentic AI Honeypot System Demo

A Next.js-based security intelligence platform demonstrating how honeypots detect, engage, and analyze attacker behavior.

## 🎯 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
# http://localhost:3000
```

## 📍 Navigation

- **Home** (`/`) - Authentication interface with console access option
- **Fake Terminal** (`/terminal`) - Simulated honeypot environment for attackers
- **Admin Dashboard** (`/admin`) - Security team's real-time monitoring interface
- **Live Sessions** (`/admin/sessions`) - List of all honeypot sessions
- **Session Details** (`/admin/sessions/[sessionId]`) - Deep dive analysis of specific attacks

## 🎬 Demo Walkthrough

### Step 1: Try the Attacker View
1. Go to `http://localhost:3000`
2. Click "Console Access" tab
3. Try any command (e.g., `whoami`, `sudo -l`, etc.)
4. Submit and you'll be taken to a fake terminal

### Step 2: Explore the Admin Dashboard
1. From the terminal, click "Admin Panel" or go to `/admin`
2. See real-time metrics:
   - Total attackers detected
   - Active honeypot sessions
   - Commands executed
   - Risk distribution pie chart
   - 24-hour attack timeline

### Step 3: Monitor Live Sessions
1. Click "Live Sessions" in the dashboard
2. See 4 sample sessions with different threat levels
3. Notice color coding: Green (Low) → Yellow (Medium) → Orange (High) → Red (Critical)
4. Click any session card to see details

### Step 4: Analyze Attack Details
1. Click on a session (try session-003 - the "Critical" one)
2. See:
   - Risk score progression graph
   - Complete command transcript with threat classifications
   - Behavior tags (e.g., "Advanced Attacker", "Multi-Stage Attack")
   - Deception strategies deployed
   - Session timeline

## 📊 Key Metrics

**Dashboard shows:**
- Total Sessions: 4
- Active Sessions: 3
- Commands Tracked: 19
- Average Risk Score: 70.5
- Threat Distribution: 35% High, 35% Medium, 15% Critical, 15% Low

**Threat Categories:**
- Reconnaissance: 5 commands
- Credential Access: 3 commands
- Privilege Escalation: 3 commands
- Persistence: 2 commands
- Destructive: 2 commands

## 💡 Key Features

✅ **Realistic Terminal Emulation** - Linux-like shell with command history
✅ **Threat Intelligence** - Each command is classified by threat type
✅ **Risk Scoring** - Commands increase risk score based on severity
✅ **Behavioral Analysis** - Sessions tagged with attacker profiles
✅ **Deception Strategies** - Shows which tactics were used
✅ **Rich Visualizations** - Charts, graphs, and data analysis
✅ **Responsive Design** - Works on desktop and mobile

## 🏗️ Architecture

```
┌─────────────────────────────┐
│   Attacker Entry Point      │
│   (Login/Console Interface) │
└──────────────┬──────────────┘
               │
        Bypass Detection
               │
┌──────────────▼──────────────┐
│   Honeypot Redirection      │
│   (Session Creation)        │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│   Fake Terminal Interface   │
│   (Simulated Environment)   │
└──────────────┬──────────────┘
               │
        Agent Analysis
               │
┌──────────────▼──────────────┐
│   Logging & Analytics       │
│   Risk Scoring              │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│   Admin Dashboard           │
│   Security Intelligence     │
└─────────────────────────────┘
```

## 🧪 Sample Attacker Sessions

| Session | Risk | Status | Attack Stage | Commands |
|---------|------|--------|--------------|----------|
| session-001 | 85 | 🟢 Active | Privilege Escalation | 6 |
| session-002 | 45 | 🟢 Active | Reconnaissance | 4 |
| session-003 | 120 | ⚫ Ended | Persistence/Destruction | 5 |
| session-004 | 32 | 🟢 Active | Initial Access | 2 |

## 🔒 What's NOT Real

- ❌ No actual command execution
- ❌ No real authentication bypass
- ❌ No actual system compromise
- ❌ No real attacker data
- ❌ All data is simulated/mocked

## 🔧 Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI component library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Icon library

## 📱 Responsive Design

Works seamlessly on:
- 💻 Desktop (1920x1080 and up)
- 📱 Tablet (768px)
- 📲 Mobile (375px+)

## 🚀 Production Deployment

Ready to deploy to:
- [Vercel](https://vercel.com) - Recommended
- AWS Amplify
- Heroku  
- Docker
- Any Node.js host

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📚 Documentation

See [DEMO_GUIDE.md](./DEMO_GUIDE.md) for comprehensive technical documentation.

## 🎓 Educational Use

Perfect for:
- Security training demonstrations
- Honeypot architecture education
- Threat intelligence concepts
- Risk analysis visualization
- Attack pattern recognition
- Incident response workflows

## ⚙️ Customization

You can easily customize:
- Add more sample sessions in `lib/mock-data.ts`
- Modify command responses in the terminal
- Change theme colors in Tailwind CSS
- Add new threat categories
- Create custom risk scoring

## 🐛 Known Limitations

- No persistent storage (data resets on page refresh)
- No real WebSocket updates
- Mock data only (no live sessions)
- No database integration
- No user authentication

## 📝 License

Educational/Research Project - Use Responsibly

---

**Start Exploring:** `npm run dev` then visit `http://localhost:3000`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
