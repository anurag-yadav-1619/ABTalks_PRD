# ABTalks Backend API

This is the production-ready backend for the **ABTalks 60-Day Coding Challenge**. 
Built with Node.js, Fastify, TypeScript, Prisma, and PostgreSQL.

## Prerequisites

- Node.js (v20+)
- PostgreSQL (Local or Docker)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Copy `.env.example` to `.env` and adjust the values as needed.
   Ensure your `DATABASE_URL` is pointing to a running PostgreSQL instance.

3. Database Migrations & Prisma:
   ```bash
   # Run migrations (assuming Postgres is running)
   npx prisma migrate dev --name init
   
   # Or simply push the schema if not tracking migrations yet
   npx prisma db push
   
   # Generate types
   npx prisma generate
   ```

4. Seed the Database:
   ```bash
   npm run db:seed
   ```
   *This seeds a test user (Aryan Verma), a full 60-day challenge, and 11 days of mock submissions so the dashboard renders beautifully.*

## Running the Server

**Development Mode (Hot Reloading)**:
```bash
npm run dev
```

**Production Build**:
```bash
npm run build
npm start
```

## Testing

Run unit tests using Vitest:
```bash
npm test
```

## API Endpoints

- `GET /api/v1/health` - Server healthcheck
- `GET /api/v1/me/dashboard` - Unified dashboard API, returns student state, streaks, today's task, cohort pulse, etc.
- `POST /api/v1/submissions` - Submit a daily task (Requires `githubUrl`, `linkedinUrl`).

*Note: For the current development phase, an authentication middleware intercepts requests and injects a mock student ID (`mock-student-id-123`) which matches the seed data.*

## Project Structure

- `src/app.ts` - Fastify configuration and middleware.
- `src/server.ts` - Server entry point.
- `src/routes.ts` - API Route definitions.
- `src/services/` - Business logic (Streak Engine, Submissions).
- `src/utils/` - Validation, Timezone helpers (`Asia/Kolkata`).
- `prisma/schema.prisma` - Normalized database schema.
