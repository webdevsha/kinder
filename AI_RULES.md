# AI Rules & Tech Stack

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** Wouter (Lightweight router for React)
- **State Management:** TanStack Query (@tanstack/react-query)
- **UI Library:** shadcn/ui (based on Radix UI primitives)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend Runtime:** Node.js
- **Server Framework:** Express.js
- **Database:** PostgreSQL (via @neondatabase/serverless) with Drizzle ORM
- **AI Integration:** Google Gemini (@google/genai)

## Library & Coding Rules

1.  **UI Components:** Always prioritize using existing shadcn/ui components from `@/components/ui`. If a new component is needed, implement it using Radix UI primitives and Tailwind CSS.
2.  **Styling:** Use Tailwind CSS utility classes for all styling. Avoid creating new CSS files. Use the `cn()` utility for class merging.
3.  **Routing:** Use `wouter` for client-side routing. Do not introduce `react-router-dom`.
4.  **Data Fetching:** Use `useQuery` and `useMutation` from `@tanstack/react-query` for all API interactions.
5.  **Forms:** Use `react-hook-form` combined with `zod` for schema validation.
6.  **Backend Structure:** Keep API routes in `server/routes.ts` and business logic/storage operations in `server/storage.ts`.
7.  **Database:** Use Drizzle ORM for all database interactions. Define schemas in `shared/schema.ts`.
8.  **Type Safety:** Share types between client and server using the schemas defined in `shared/schema.ts`.
9.  **Icons:** Use `lucide-react` for all icons.
10. **Environment:** Respect `process.env.PORT` for server binding.

## Server & Scripts

- **Development:** `npm run dev` (Uses `tsx` to run the server)
- **Production:** `npm start` (Runs the built `dist/index.js`)
- **Port:** Defaults to 5000, but respects `PORT` environment variable.