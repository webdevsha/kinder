# Kinder - Adaptive Dynamic Textbooks Platform

## Overview

Kinder is a family-first adaptive reading platform designed for Malaysian students (Year 5 and above, ages 11+). The platform transforms any digital text—such as complex news articles from Berita Harian or public reports—into adaptive educational experiences with multiple reading levels, comprehension quizzes, and writing prompts aligned to KSSM/KSSR curriculum standards.

**Core Purpose:** Enable personalized learning by adapting content complexity to match individual student reading levels while maintaining educational rigor through AI-powered content transformation.

**Target Users:**
- Students (Year 5+, ages 11+)
- Teachers
- Parents

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript, using Vite as the build tool

**Routing:** Wouter for client-side routing
- Home page (`/`) - Landing page with feature showcase
- Library page (`/library`) - Article collection and search
- Article view (`/:id`) - Reading experience with level switching, quizzes, and prompts

**UI Component System:**
- **Design Framework:** shadcn/ui components based on Radix UI primitives
- **Styling:** Tailwind CSS with custom design tokens following Material Design + Notion influences
- **Typography:** 
  - Inter font for UI elements (navigation, buttons, labels)
  - Lora/Literata for reading content (optimized for screen reading)
- **Theme System:** Light/dark mode support via CSS variables
- **Layout Patterns:**
  - Reading view: max-w-3xl centered (65-75 character optimal line length)
  - Dashboard/Library: max-w-7xl with grid layouts
  - Consistent spacing using Tailwind primitives (2, 3, 4, 6, 8, 12, 16)

**State Management:**
- TanStack Query (React Query) for server state management
- React hooks for local component state
- Query client configured with infinite stale time and disabled refetching

**Key Design Principles:**
- Clean, distraction-free reading experience
- Professional interface respecting young learners' maturity
- Clear visual hierarchy for multi-level content
- Comfortable long-form reading typography (1.6 line height for body text)

### Backend Architecture

**Server Framework:** Express.js running on Node.js

**API Structure:** RESTful endpoints
- `POST /api/articles/process` - Process new articles/text content
- `GET /api/articles` - Retrieve all articles
- `GET /api/articles/:id` - Get specific article
- `GET /api/articles/:id/levels` - Get reading levels for article
- `GET /api/articles/:id/quiz` - Get quiz for article
- `GET /api/articles/:id/prompts` - Get writing prompts for article

**Content Processing Pipeline:**
1. Text validation (minimum 100 characters)
2. AI extraction of title and topic
3. Generation of 5 reading levels (Level 1: struggling Year 5 → Level 5: enriched original)
4. Quiz generation with 5 comprehension questions
5. Writing prompt generation (3 prompts)
6. Storage of processed content

**Storage Layer:**
- **Current:** In-memory storage (MemStorage class) for development
- **Production Ready:** Drizzle ORM configured for PostgreSQL with Neon serverless driver
- **Schema Design:**
  - `articles` - Original text, metadata (title, topic, word count, source URL)
  - `readingLevels` - 5 levels per article with adapted content and bylines
  - `quizzes` - JSONB storage of question arrays
  - `writePrompts` - JSONB storage of prompt arrays
  - Cascade deletion: removing article deletes all related levels, quizzes, and prompts

**Error Handling:**
- Request validation using Zod schemas
- Standardized error responses with status codes
- AI response validation and JSON parsing with fallback error messages

### AI Service Integration

**Provider:** Google Gemini AI (gemini-2.0-flash-exp model)

**Capabilities:**
1. **Content Leveling:** Transforms original text into 5 reading levels suitable for Malaysian KSSM/KSSR curriculum
2. **Title & Topic Extraction:** Automatically identifies article title and categorizes topic
3. **Quiz Generation:** Creates 5 multiple-choice comprehension questions
4. **Writing Prompt Generation:** Creates 3 contextually relevant writing prompts

**Response Format:** JSON-structured outputs with markdown wrapper removal
- Configured with `responseMimeType: "application/json"` for structured responses
- Custom parser handles both clean JSON and markdown-wrapped responses

**Rationale:** Gemini 2.0 Flash chosen for cost efficiency and speed while maintaining quality for educational content transformation

### Data Flow

1. **Content Ingestion:**
   - User pastes text (URL ingestion not implemented)
   - Frontend validates minimum length (100 characters)
   - POST to `/api/articles/process`

2. **AI Processing:**
   - Extract title/topic via Gemini
   - Generate 5 reading levels in parallel
   - Generate quiz questions
   - Generate writing prompts
   - Count words in original text

3. **Storage & Response:**
   - Create article record
   - Create related reading levels, quiz, and prompts
   - Return article ID to frontend
   - Redirect to article view

4. **Reading Experience:**
   - Fetch article and all related content
   - Display default level 3
   - Allow level switching (1-5)
   - Provide interactive quiz with immediate feedback
   - Enable writing responses to prompts

## External Dependencies

### Core Infrastructure
- **Database:** PostgreSQL via Neon serverless (@neondatabase/serverless)
- **ORM:** Drizzle ORM for type-safe database queries
- **Session Management:** connect-pg-simple for PostgreSQL-backed sessions

### AI Services
- **Google Gemini AI:** Content transformation, leveling, quiz/prompt generation
  - API Key required: `GOOGLE_API_KEY` environment variable
  - Model: gemini-2.0-flash-exp

### Frontend Libraries
- **React Query (@tanstack/react-query):** Server state management
- **Wouter:** Lightweight client-side routing
- **date-fns:** Date formatting and manipulation
- **Radix UI:** Accessible component primitives (accordion, dialog, dropdown, etc.)
- **shadcn/ui:** Pre-built component library on top of Radix
- **Tailwind CSS:** Utility-first styling
- **Lucide React:** Icon system

### Development Tools
- **Vite:** Build tool and dev server
- **TypeScript:** Type safety across frontend and backend
- **tsx:** TypeScript execution for Node.js
- **esbuild:** Production bundling for server code
- **Drizzle Kit:** Database migrations and schema management

### Validation & Forms
- **Zod:** Schema validation for API requests and database operations
- **React Hook Form:** Form state management
- **@hookform/resolvers:** Zod resolver for form validation

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string (Neon or other PostgreSQL provider)
- `GOOGLE_API_KEY` - Google Gemini API key for AI features
- `NODE_ENV` - Environment mode (development/production)

### Build & Deployment
- Scripts configured for development (`npm run dev`), production build (`npm run build`), and production server (`npm start`)
- Database schema push via `npm run db:push` (Drizzle Kit)