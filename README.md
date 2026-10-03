# BijliGuard — Vehari Load Shedding Optimizer

WarriorHacks 2.0 community infrastructure project for Vehari, Punjab.

## Windows setup

Requirements:
- Windows 10/11
- Node 18.17.0
- npm
- VS Code
- Edge

Open **Command Prompt** or PowerShell in this folder:

```bat
node -v
npm -v
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bat
npm install --legacy-peer-deps
npm run build
npm start
```

## Firebase

Create a Firebase project and enable:
1. Authentication → Google
2. Realtime Database
3. Firestore

Copy `.env.local.example` to `.env.local` and fill the Firebase web-app values.

Realtime Database stores live reports under:
`/reports/{id}`

Firestore collections:
- `dailySummaries`
- `userStats`
- `predictions`

The application also works without Firebase credentials in local demo mode, using 200 generated reports.

## Vercel

Push the folder to GitHub, import it into Vercel, and add the same `NEXT_PUBLIC_FIREBASE_*` environment variables. `vercel.json` forces:

`npm install --legacy-peer-deps`

The project is pinned to Node 18.x through both `package.json` and `.nvmrc`.

## Firebase Realtime Database rules

For a hackathon prototype, use authenticated writes and reads:

```json
{
  "rules": {
    "reports": {
      ".read": true,
      "$report": {
        ".write": "auth != null || newData.child('uid').val() == 'anonymous'"
      }
    }
  }
}
```

For a public production deployment, tighten this further with Firebase App Check and per-user rate limits.

## Demo

Go to `/admin`, password:

`vehari123`

Then click **Load 200 Demo Reports**.

## Important data note

The 78% BijliGuard / 38% MEPCO values are the hackathon benchmark supplied for this prototype. They should be replaced by measured historical evaluation before being presented as a verified real-world accuracy result.
