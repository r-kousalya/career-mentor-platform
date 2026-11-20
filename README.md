# Career Mentor Platform

A portfolio project for planning career growth, tracking applications and practising interviews. Built with **Angular 20**, **TypeScript**, **Spring Boot 3**, and **PostgreSQL**.

## Features

### Angular frontend
- Responsive dashboard with application and learning summaries
- Job application tracker with search, status filters, add, update and remove actions
- Learning roadmap with editable progress
- Interview question library with answer frameworks
- AI mentor concept screen with clear coming-soon state
- Browser localStorage persistence for demo applications and goals

### Spring Boot API
- REST endpoints for job applications and learning goals
- Interview question endpoint
- Health check endpoint
- PostgreSQL persistence using Spring Data JPA
- Request validation and local CORS configuration

> The Angular app currently runs in local demo mode. It is not yet wired to the Spring Boot API. The AI mentor is a UI placeholder; no live model is called. Authentication and production deployment are not included yet.

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

Open http://localhost:4200. Demo job and learning data is stored in browser localStorage.

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

API base URL: http://localhost:8080

See [backend/README.md](backend/README.md) for API details.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET/POST | `/api/jobs` | List and create applications |
| PUT/DELETE | `/api/jobs/{id}` | Update or delete an application |
| GET/POST | `/api/goals` | List and create learning goals |
| PUT/DELETE | `/api/goals/{id}` | Update or delete a goal |
| GET | `/api/questions` | Interview question bank |
| GET | `/api/health` | Health check |

## Roadmap

1. Connect Angular services to the REST API.
2. Add authentication and per-user authorization.
3. Add integration tests and database migrations.
4. Add a secure server-side AI provider integration.
5. Add CI, hosting, monitoring and backups.

Never commit passwords, API keys, or personal tokens.
