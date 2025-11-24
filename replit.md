# Dad Bod Reset - Lead Qualification Chatbot

## Overview

An AI-powered conversational chatbot designed to qualify gym leads 24/7 for the Dad Bod Reset fitness program. The chatbot embeds as a floating widget on WordPress websites (similar to Intercom/Drift) and guides visitors through a qualification flow covering fitness goals, timeline, budget, and trial session booking. Built with React, Express, and designed for seamless embedding via a single script tag.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool

**UI Component System**: shadcn/ui components built on Radix UI primitives
- Fully accessible, customizable component library
- Consistent design system with Tailwind CSS for styling
- Custom theme system with CSS variables for light/dark mode support

**State Management**:
- React hooks for local component state
- TanStack Query (React Query) for server state management and data fetching
- No global state management library needed due to simple data flow

**Routing**: Wouter for lightweight client-side routing
- Main routes: Home page (`/`), Admin Panel (`/admin`)
- 404 handling for undefined routes

**Chat Widget Architecture**:
- Floating button component that expands into full chat window
- Desktop: Fixed 400px × 600px window in bottom-right corner
- Mobile: Full-screen takeover experience
- Conversation flow managed through step-based state machine
- Progress indicator shows user position in qualification funnel

**Design System**:
- Typography: Inter (primary), Montserrat Bold (headings)
- Spacing: Tailwind's standardized scale (2, 3, 4, 6, 8, 12, 16)
- Dark gym aesthetic with teal/cyan accents
- Canvas confetti animation for successful bookings

### Backend Architecture

**Framework**: Express.js with TypeScript

**API Structure**:
- RESTful endpoints for lead management
- POST `/api/leads` - Create new lead
- GET `/api/leads` - Retrieve all leads
- GET `/api/leads/export` - Export leads as CSV
- Request validation using Zod schemas

**Development vs Production**:
- Dev mode (`index-dev.ts`): Vite middleware integration for HMR
- Production mode (`index-prod.ts`): Serves pre-built static files
- Express serves both API routes and frontend application

**Data Validation**:
- Zod schemas defined in shared layer for type-safe validation
- Email, phone number, and required field validation
- Shared types between frontend and backend via `@shared` alias

### Data Storage Solutions

**Current Implementation**: PostgreSQL Database via Drizzle ORM
- Using Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- DatabaseStorage class implements IStorage interface
- WebSocket connection configured for Node.js environment
- Connection pool using DATABASE_URL environment variable

**Database Schema**: 
- Schema defined in `shared/schema.ts`
- Table structure:
  - `leads` table with fields: id (varchar UUID), name, email, phone, fitness_level, main_goal, timeline, budget, wants_trial, trial_date, trial_time, created_at
- Pushed to database using `npm run db:push`
- Drizzle ORM for type-safe queries with Zod validation

**Storage Interface**: `IStorage` interface enables swapping storage implementations without changing application logic

**Migration Notes**:
- Migrated from MemStorage to DatabaseStorage on 2025-11-24
- Fixed WebSocket configuration issue for Neon serverless driver
- All API endpoints now persist to PostgreSQL database
- Data survives server restarts

### External Dependencies

**Database**: 
- Neon Serverless PostgreSQL (via `@neondatabase/serverless`)
- Drizzle ORM for type-safe database queries and migrations
- Migration management via `drizzle-kit`

**UI Component Libraries**:
- Radix UI primitives for accessible components (dialogs, dropdowns, tooltips, etc.)
- React Hook Form for form state management
- Canvas Confetti for celebration animations
- date-fns for date formatting

**Build & Development Tools**:
- Vite for fast frontend builds and HMR
- esbuild for backend bundling in production
- TypeScript for type safety across the stack
- Tailwind CSS with PostCSS for styling

**WordPress Embedding Strategy**:
- Single `<script>` tag loader design
- Widget JavaScript bundle loaded asynchronously
- Overlay positioning with z-index: 9999
- Responsive behavior (desktop widget vs mobile fullscreen)
- Files structure: Main app + embeddable widget loader (planned)

**Session Management**:
- `connect-pg-simple` for PostgreSQL-backed sessions
- Express sessions with cookie-based authentication

**Brand Integration**:
- Brand personality defined in `BRAND_BIBLE.md`
- Core philosophy: "Transformations built on small, consistent habits"
- Signature frameworks: 4 Pillars (Sleep, Steps, Strength, Smart Fuel)
- Training programs: Dad Bod Reset (12-week), Maintenance Mode, 30-Day Reboot, Garage Gym Minimalist
- Chatbot responses should reflect brand voice: direct, no-BS, dad humor, faith-integrated where appropriate

### Path Aliases

- `@/` - Client source directory (`client/src`)
- `@shared/` - Shared schema and types (`shared`)
- `@assets/` - Attached assets directory