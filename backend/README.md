# Career Mentor API
Spring Boot 3 REST API for the Career Mentor Platform.

## Requirements
- Java 17+
- Maven 3.9+
- PostgreSQL

## Start
Create a PostgreSQL database named `career_mentor`, then set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` if your local credentials differ from the defaults.

```bash
mvn spring-boot:run
```

The API starts at `http://localhost:8080`.

## Endpoints
- `GET /api/health`
- `GET, POST /api/jobs`
- `PUT, DELETE /api/jobs/{id}`
- `GET, POST /api/goals`
- `PUT, DELETE /api/goals/{id}`
- `GET /api/questions`

This starter API is intended for local development. Authentication, per-user authorization, production database migrations, and deployment hardening are future work. Do not expose it publicly with the demo configuration.
