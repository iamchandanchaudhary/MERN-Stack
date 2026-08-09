<h1 align="center">RateStore</h1>

<p align="center">
  <strong>RateStore is a full-stack platform for discovering, rating, and managing stores. It supports three roles: users, store owners, and system administrators.</strong>
</p>

<p align="center">
  <a href="https://ratestore.onrender.com/">Live Website</a>
</p>

---

## Roles

- Users browse stores, leave ratings, and manage personal profiles.
- Store owners create and maintain store listings with images.
- Administrators oversee users, store owners, and store listings.

## Key Features

- Role-based dashboards and protected routes.
- Store listings with rating averages and review counts.
- Image uploads for store listings via Cloudinary.
- Admin management for users, store owners, and stores.
- MySQL-backed data model with automatic table creation.

## Architecture

```mermaid
flowchart LR
  FE[React + Vite] -->|REST /api| BE[Express API]
  BE --> DB[(MySQL)]
  BE --> CDN[Cloudinary]
```

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express, MySQL2, Cloudinary, Multer
- Other: bcryptjs, dotenv, cors

## Data Model

- users: registered users and profile details
- store_owners: store owner accounts
- stores: store listings, images, and metadata
- store_ratings: user ratings per store with aggregates

## Prerequisites

- Node.js 18+
- MySQL instance (local or hosted)
- Cloudinary account (for image uploads)

## Quick Start

1. Install dependencies in both folders.
2. Configure environment variables for backend and frontend.
3. Start the backend API.
4. Start the frontend dev server.

### Install

```bash
cd Backend
npm install
cd ../Frontend
npm install
```

### Run

```bash
cd Backend
npm start
cd ../Frontend
npm run dev
```

## Environment Variables

Create a .env file in the backend folder with the following keys:

```
PORT=8080
MYSQL_PUBLIC_URL=mysql://user:password@host:port/database
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong-password
```

Frontend uses [Frontend/.env](Frontend/.env):

```
VITE_BACKEND_URL="http://localhost:8080"
```

## API Overview

- Auth: /api/users/*, /api/store-owners/*, /api/admin/login
- Stores: /api/stores, /api/stores/:storeId, /api/stores/:storeId/ratings
- Admin: /api/admin/users, /api/admin/store-owners, /api/admin/stores/:storeId

See [Backend/readme.md](Backend/readme.md) for complete endpoint details.

## Project Structure

- [Backend/](Backend/): Express API, models, controllers, routes
- [Frontend/](Frontend/): React app with role-based UI

## Notes

- Authentication is role-based in the client using local storage; the API does not issue tokens.
- CORS is enabled for all origins in development.
