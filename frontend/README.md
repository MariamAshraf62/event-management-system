# Event Management System Frontend

React frontend for the Event Management System API.

## Tech Stack

- React + Vite
- React Router DOM
- Axios
- Tailwind CSS
- Context API (authentication)

## Folder Structure

```text
src/
  components/
  pages/
  services/
  context/
  hooks/
  layouts/
  utils/
  styles/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Environment Variable

- `VITE_API_URL` (default: `http://localhost:5000/api/v1`)

## Main Pages

- `/` Home
- `/login` Login
- `/register` Register
- `/events` Events list with pagination and category filter
- `/events/:id` Event details
- `/events/create` Create event (protected)
- `/events/:id/edit` Edit event (protected)
- `/dashboard` User dashboard (protected)

## Notes

- JWT token and user data are stored in `localStorage`.
- Axios automatically sends `Authorization: Bearer <token>` when token exists.
- The frontend expects backend routes under `/api/v1`.
