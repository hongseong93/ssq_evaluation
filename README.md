# Shinsegae Square Media Art Awards Review System

Online review system MVP for Shinsegae Square Media Art Awards.

## What is included

- One Next.js server for both admin and judge pages
- Unified login at `/login`
- Role-based redirect after login
  - Admin -> `/admin/dashboard`
  - Judge -> `/judge/evaluation`
- Local backend API routes
- Local JSON database seed at `data/db.json`
- Judge account list/create/update APIs
- Password hashing with SHA-256 for MVP use

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@shinsegaeawards.kr | password |
| Judge | hong@jury.kr | password |

## Main URLs

- Unified login: `/login`
- Admin dashboard: `/admin/dashboard`
- Judge evaluation page: `/judge/evaluation`
- Admin login shortcut: `/admin/login`
- Judge login shortcut: `/judge/login`

## Backend API

- `POST /api/auth/login`
- `GET /api/admin/judges`
- `POST /api/admin/judges`
- `PUT /api/admin/judges/:id`

The current MVP uses `data/db.json` as a local database. For production, replace `lib/server/db.ts` with Supabase, PostgreSQL, Prisma, or another persistent database adapter.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/login`.

## Production build

```bash
npm run build
npm start
```

Because this project now includes backend API routes, do not use static-only export hosting. Deploy it to a Next.js-capable host such as Vercel, Render, Railway, Fly.io, or a Node server.
