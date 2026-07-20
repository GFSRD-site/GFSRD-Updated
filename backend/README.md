# GFSRD Backend

Node.js backend using Express + TypeScript + Prisma (PostgreSQL) with MVC routes/controllers.

## Setup

```bash
npm install
npm run prisma:dbpush
npm run seed:admin
npm run dev
```

Backend runs on `http://localhost:4000`.

## Required Environment

```env
PORT=4000
DATABASE_URL="postgresql://<db_user>:<db_password>@localhost:5432/gfsrd?schema=public"
JWT_SECRET="replace-with-strong-secret"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:5173,http://127.0.0.1:5173"
ADMIN_EMAIL="admin@gfsrd.org"
ADMIN_PASSWORD="admin12345"
```

## Vercel Deployment

This backend is configured for Vercel serverless using [vercel.json](/Users/mdkaifansari04/code/gfsrd/backend/vercel.json) and [api/index.ts](/Users/mdkaifansari04/code/gfsrd/backend/api/index.ts).

Set these variables in Vercel Project Settings -> Environment Variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

After first deploy, run `npm run seed:admin` once against your production database (or seed locally against the same DB URL) to ensure admin login exists.

## API Routes

- `GET /health` -> API + DB health check
- `POST /contact` -> public contact query submission
- `POST /newsletter/subscribe` -> public newsletter subscription
- `POST /admin/login` -> admin login and JWT token
- `POST /admin/logout` -> admin logout and token invalidation
- `GET /admin` -> dashboard summary (protected)
- `GET /admin/contacts` -> list contact queries (protected)
- `GET /admin/contacts/:id` -> single contact query detail (protected)
- `DELETE /admin/contacts/:id` -> delete contact query (protected)
- `GET /admin/newsletters` -> list subscribers (protected)
- `POST /admin/newsletters` -> add subscriber (protected)
- `DELETE /admin/newsletters/:id` -> delete subscriber (protected)
- `POST /internships` -> public internship application submission
- `GET /admin/internships` -> list internship applications (protected)
- `GET /admin/internships/:id` -> single internship application detail (protected)
- `DELETE /admin/internships/:id` -> delete internship application (protected)
