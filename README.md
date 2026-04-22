# Event Management System API

RESTful backend API built with Node.js, Express.js, MongoDB, and Mongoose using JWT authentication.

## Features

- User registration and login with hashed passwords (`bcryptjs`)
- JWT-based authentication and protected routes
- Role-based authorization (`user` / `admin`)
- Event creation and listing
- Event-category relationship
- Event registration with capacity checks
- Pagination and category filtering for events
- Input validation using `express-validator`
- Centralized error handling middleware
- Modular MVC project structure

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)

## Project Structure

```text
src/
  config/
  models/
  controllers/
  routes/
  middleware/
  validations/
  utils/
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Copy environment template:

```bash
cp .env.example .env
```

3. Update `.env` values (especially `MONGO_URI` and `JWT_SECRET`).

4. Start the server:

```bash
npm run dev
```

## API Base URL

`http://localhost:5000/api/v1`

## Main Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Categories

- `GET /categories`
- `POST /categories` (admin only)

### Events

- `GET /events?page=1&limit=10&category=<categoryId>`
- `GET /events/:id`
- `POST /events` (authenticated users)

### Registrations

- `GET /registrations/me` (authenticated user)
- `POST /registrations` (authenticated user)
- `PATCH /registrations/:id/cancel` (owner or admin)

## Postman

Import the collection from:

`postman/Event-Management-System-API.postman_collection.json`

## Notes

- Ensure MongoDB is running before starting the API.
- Registration capacity is enforced by comparing event capacity against active registrations.
