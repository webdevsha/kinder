# AI Rules & Development Guidelines

## Tech Stack

- **Frontend Framework:** React with TypeScript (Vite)
- **Routing:** Wouter (Client-side routing)
- **State Management:** TanStack Query (@tanstack/react-query)
- **UI & Styling:** Tailwind CSS with shadcn/ui components (Radix UI primitives)
- **Icons:** Lucide React
- **Backend:** Node.js with Express
- **Database:** PostgreSQL (via Neon serverless) with Drizzle ORM
- **AI Integration:** Google Gemini API
- **Language:** TypeScript (Full stack)

## Development Rules

### Code Output
- **ALWAYS** use `<dyad-write>` tags for code changes.
- **NEVER** use markdown code blocks (```) for code.

### File Structure
- Frontend source code goes in `client/src/`.
- Backend source code goes in `server/`.
- Shared types/schema go in `shared/`.
- Pages reside in `client/src/pages/`.
- Components reside in `client/src/components/`.

### Server & Port Handling
- The server must listen on `process.env.PORT` or default to `3000` (or `5000` based on environment).
- Bind to host `0.0.0.0`.
- Include clear startup logs indicating the URL.
- Handle `SIGTERM` signals for graceful shutdowns.

### Scripts
- **dev:** Runs the development server (frontend + backend).
- **build:** Builds the frontend and backend for production.
- **start:** Runs the production build.

### Libraries
- Use **shadcn/ui** components for UI elements.
- Use **Tailwind CSS** for layout and styling.
- Use **Drizzle ORM** for all database interactions.
- Use **TanStack Query** for data fetching.