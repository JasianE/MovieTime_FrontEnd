# MovieTime Frontend

The frontend for the MovieTime application. Built with React, Vite, and TypeScript. This project communicates with the MovieTime backend (.NET Web API) to provide movie data and recommendations.

## Tech Stack
- React 18
- TypeScript
- Vite
- React Router

## Features
- Fast build and development with Vite
- Type-safe components with TypeScript
- Client-side routing using React Router
- Responsive UI for browsing
- Auth flow with persistent login
- Friend-only recommendations with requests/acceptance
- Movie library browsing with server paging
- Recommendation details page for rating, notes, and watched state
- API integration with a .NET backend

## Setup

```bash
npm install
npm run dev
```

Optional environment variable:

```
VITE_API_URL=http://localhost:5000
```

## Docker Compose

From the repo root:

```bash
docker compose up --build
```

Compose reads environment defaults from the repo root .env file.

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## `src/` folder

```bash
src/
├── Components/      # Reusable UI components (movie rows, cards, navigation)
├── Pages/           # Page-level components (Login, Signup, Dashboard, etc.)
├── Services/        # API call logic and integration
├── Types/           # TypeScript type definitions
├── assets/          # Static files (images, icons, styles)
├── App.css          # Global styles
├── App.tsx          # Root component with route definitions
├── index.css        # Base CSS
├── main.tsx         # Application entry point
└── vite-env.d.ts    # Vite TypeScript environment definitions
```
## Future Improvements
- Group movie recommendations
- Notifications for friend requests and new recommendations
