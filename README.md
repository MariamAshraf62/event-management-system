# Event Management System

A full-stack web application for browsing, creating, and registering for events — built with React, Node.js, Express, and MongoDB.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Pages](#pages)
- [Bug Fixes](#bug-fixes)

---

## Features

- **JWT Authentication** — Register, login, protected routes, role-based access (user / admin)
- **Events** — Browse, create, edit, and delete events with pagination and category filtering
- **Registrations** — Register/cancel with a toggle button; re-registration after cancellation is supported
- **Dashboard** — Personal stats, created events, and active registrations
- **Categories** — Admin-only category management

---

## Project Structure

```
finalProject/
├── backend/
│   └── src/
│       ├── app.js                    # Express setup (CORS, routes, error handler)
│       ├── server.js                 # Entry point — connects DB and starts server
│       ├── config/
│       │   └── db.js                 # MongoDB connection
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── eventController.js
│       │   ├── registrationController.js
│       │   └── categoryController.js
│       ├── middleware/
│       │   ├── auth.js               # protect & restrictTo middleware
│       │   ├── errorHandler.js
│       │   └── validateRequest.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Event.js
│       │   ├── Registration.js
│       │   └── Category.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── eventRoutes.js
│       │   ├── registrationRoutes.js
│       │   └── categoryRoutes.js
│       ├── utils/
│       │   ├── asyncHandler.js
│       │   ├── apiError.js
│       │   └── pagination.js
│       └── validations/
│           ├── authValidation.js
│           ├── eventValidation.js
│           ├── registrationValidation.js
│           └── categoryValidation.js
│
└── frontend/
    └── src/
        ├── App.jsx                   # Route definitions
        ├── context/
        │   └── AuthContext.jsx       # Global auth state
        ├── hooks/
        │   └── useAuth.js
        ├── pages/
        │   ├── Home.jsx
        │   ├── Events.jsx
        │   ├── EventDetails.jsx      # Register / Cancel Registration toggle
        │   ├── Dashboard.jsx
        │   ├── CreateEvent.jsx
        │   ├── EditEvent.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── CreateCategory.jsx
        │   └── NotFound.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── EventCard.jsx
        │   ├── EventForm.jsx
        │   ├── Loader.jsx
        │   └── Pagination.jsx
        ├── services/
        │   └── api.js                # Axios instance with base URL + auth header
        └── styles/                   # Per-page and global CSS
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend

```bash
cd finalProject/backend
npm install
```

Create a `.env` file in the backend root (see [Environment Variables](#environment-variables)), then:

```bash
npm run dev     # development with nodemon
npm start       # production
```

### Frontend

```bash
cd finalProject/frontend
npm install
```

Create a `.env` file in the frontend root, then:

```bash
npm run dev
```

App will be available at **http://localhost:5173**

---

## Environment Variables

### Backend — `backend/.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/event-management` |
| `JWT_SECRET` | Secret key for signing tokens | `your_secret_here` |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |

### Frontend — `frontend/.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api/v1` |

---

## API Reference

All endpoints are prefixed with `/api/v1`

### Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login and receive a JWT token |

### Events — `/api/v1/events`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | Public | Get all events (paginated, filterable by category) |
| `GET` | `/:id` | Public | Get a single event by ID |
| `POST` | `/` | Required | Create a new event |
| `PUT` | `/:id` | Required | Update an existing event |
| `DELETE` | `/:id` | Required | Delete an event |

### Registrations — `/api/v1/registrations`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/me` | Required | Get current user's registrations |
| `POST` | `/` | Required | Register for an event (or re-activate a cancelled one) |
| `PATCH` | `/:id/cancel` | Required | Cancel a registration |

### Categories — `/api/v1/categories`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | Public | Get all categories |
| `POST` | `/` | Admin only | Create a new category |

---

## Data Models

### User

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email` | String | Required, unique, lowercase |
| `password` | String | Hashed with bcrypt, hidden from queries |
| `role` | String | `user` \| `admin` — default: `user` |

### Event

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Required |
| `description` | String | Required |
| `date` | Date | Required |
| `location` | String | Required |
| `capacity` | Number | Required, min: 1 |
| `category` | ObjectId | ref: Category |
| `createdBy` | ObjectId | ref: User |

### Registration

| Field | Type | Notes |
|-------|------|-------|
| `user` | ObjectId | ref: User |
| `event` | ObjectId | ref: Event |
| `status` | String | `confirmed` \| `pending` \| `cancelled` — default: `confirmed` |

> Unique compound index on `{ user, event }` prevents duplicate records.

### Category

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required, unique |

---

## Pages

| Route | Page | Auth |
|-------|------|------|
| `/` | Home | Public |
| `/events` | Events list (paginated) | Public |
| `/events/:id` | Event details + Register/Cancel button | Public |
| `/events/create` | Create event form | Required |
| `/events/:id/edit` | Edit event form | Required |
| `/dashboard` | Personal dashboard | Required |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/categories/create` | Create category | Admin only |

---

## Bug Fixes

### Register / Cancel Button Not Toggling Correctly

**Problem:** After cancelling, the button remained as "Cancel Registration" on reload — and re-registering after cancellation was blocked.

**Root causes and fixes:**

| # | Where | Problem | Fix |
|---|-------|---------|-----|
| 1 | Frontend | Registration lookup didn't exclude `cancelled` records | Added `reg.status !== "cancelled"` filter |
| 2 | Frontend | ID comparison used `===` without `.toString()` causing ObjectId/string mismatch | Used `.toString()` on both sides |
| 3 | Backend | Duplicate check blocked re-registration even after cancellation | Changed check to `status: { $ne: "cancelled" }` |
| 4 | Backend | `Registration.create()` failed on re-register due to unique index | Reactivate cancelled record instead of creating a new one |
