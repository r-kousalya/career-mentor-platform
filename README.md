# Career Mentor Platform

A full-stack career planning workspace built with **Angular 20**, **TypeScript**, **Spring Boot 3**, and **PostgreSQL**.

## What is included

- Career dashboard with progress overview and quick actions
- Job application tracker (Applied, Interview, Offer, Rejected)
- Skills and learning goals
- Interview practice question bank
- Responsive interface for desktop, tablet, and mobile
- Spring Boot REST API with PostgreSQL persistence
- Local demo mode in the frontend, so the UI can be explored before the API is running

> This is a portfolio/demo application. It does not include production authentication, real AI model calls, or deployment credentials. The AI mentor screen is clearly presented as a planned integration rather than pretending to return live AI results.

## Repository structure

```
frontend/   Angular 20 standalone application
backend/    Spring Boot REST API
```

## Run the frontend

Requirements: Node.js 20.19+ or 22.12+, npm.

```bash
cd frontend
npm install
npm start
```

Open http://localhost:4200.

The frontend starts in demo mode and persists changes in browser localStorage. To connect it to the API, set `apiBaseUrl` in `frontend/src/app/core/api.config.ts` to `http://localhost:8080/api` and enable the backend profile.

## Run the backend

Requirements: Java 17+, Maven, PostgreSQL.

Create a database named `career_mentor`, then configure environment variables:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/career_mentor
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
cd backend
mvn spring-boot:run
```

API base URL: http://localhost:8080/api

## Main API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET/POST | /api/jobs | List and create applications |
| PUT/DELETE | /api/jobs/{id} | Update or delete an application |
| GET/POST | /api/goals | List and create learning goals |
| PUT/DELETE | /api/goals/{id} | Update or delete a goal |
| GET | /api/questions | Interview question bank |
| GET | /api/health | Health check |

## Next production steps

1. Add authentication and per-user authorization.
2. Add validation, pagination, and integration tests.
3. Connect a server-side AI provider using environment-managed secrets.
4. Add CI, hosting, database backups, and monitoring.

Never commit passwords, API keys, or personal tokens.
