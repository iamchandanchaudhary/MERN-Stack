# Task Management Application

Full-stack task management app with separate user and admin portals. Users can register, log in, and manage their tasks. Admins can view registered users, inspect user details with task stats, and delete users (and their tasks).

## Features

- User registration and authentication (JWT)
- Create, update, and delete tasks
- Task status tracking (pending, in-progress, completed)
- Admin dashboard with user list, user details, and task stats
- Admin delete user (removes user tasks)

## Tech Stack

**Frontend**: React, Vite, Tailwind CSS, React Router

**Backend**: Node.js, Express, MongoDB, Mongoose, JWT

## Project Structure

```
Task-Management/
	Backend/
	Frontend/
```

## Environment Variables

Create a `.env` file in the Backend folder:

```
PORT=8080
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password
```

Create a `.env` file in the Frontend folder:

```
VITE_BACKEND_URL=http://localhost:8080
```

## Setup

### 1) Backend

```
cd Backend
npm install
npm start
```

### 2) Frontend

```
cd Frontend
npm install
npm run dev
```

The frontend runs on the Vite dev server and connects to the backend via `VITE_BACKEND_URL`.

## Scripts

### Backend

- `npm start` - start the API server

### Frontend

- `npm run dev` - start the Vite dev server
- `npm run build` - build for production
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint

## API Overview

Base URL: `http://localhost:8080`

### Auth

- `POST /api/users/register` - register user
- `POST /api/users/login` - login user
- `POST /api/admin/login` - login admin
- `GET /api/auth/me` - validate token

### Tasks (User)

- `GET /api/tasks/me` - list user tasks
- `POST /api/tasks` - create task
- `PUT /api/tasks/:id` - update task
- `PATCH /api/tasks/:id/status` - toggle status
- `DELETE /api/tasks/:id` - delete task

### Admin

- `GET /api/admin/users` - list users with task stats
- `GET /api/admin/users/:id` - user details with task stats
- `DELETE /api/admin/users/:id` - delete user and tasks

## Notes

- MongoDB is required. The backend connects to `${MONGODB_URI}/TaskManagement`.
- Admin credentials come from `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

