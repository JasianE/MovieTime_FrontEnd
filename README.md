# MovieTime Frontend

The frontend for the MovieTime application. Built with React, Vite, and TypeScript.  
This project communicates with the MovieTime backend (.NET Web API) to provide movie data and recommendations.

## Features
- Fast build and development with Vite
- Type-safe components with TypeScript
- Client-side routing using React Router
- Responsive UI for browsing and viewing recommendations
- API integration with a .NET backend

## Folder Structure
src/
├── Components/      # Reusable UI components (movie rows, cards, navigation, etc.)
├── Pages/           # Page-level components (Login, Signup, Dashboard, etc.)
├── Services/        # API call logic and integration
├── Types/           # TypeScript type definitions
├── assets/          # Static files (images, icons, styles)
├── App.css          # Global styles
├── App.tsx          # Root component with route definitions
├── index.css        # Base CSS
├── main.tsx         # Application entry point
└── vite-env.d.ts    # Vite TypeScript environment definitions
