# RateStore Backend

Express API that powers RateStore with role-based authentication, store management, and ratings.

## Highlights

- Role-based endpoints for users, store owners, and admins.
- Image uploads to Cloudinary via Multer memory storage.
- MySQL storage with automatic table creation on startup.

## Prerequisites

- Node.js 18+
- MySQL database
- Cloudinary account

## Setup

```bash
npm install
npm start
```

The server starts on `PORT` or defaults to 8080.

## Environment Variables

Create a .env file in this folder:

```
PORT=8080
MYSQL_PUBLIC_URL=mysql://user:password@host:port/database
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong-password
```

## Database Tables

Tables are created automatically on startup:

- users
- store_owners
- stores
- store_ratings

## API Endpoints

Base URL: `http://localhost:8080`

### Users

- POST /api/users/register
- POST /api/users/login
- GET /api/users/:userId
- PUT /api/users/:userId
- PUT /api/users/:userId/password

### Store Owners

- POST /api/store-owners/register
- POST /api/store-owners/login
- GET /api/store-owners/:ownerId
- PUT /api/store-owners/:ownerId
- PUT /api/store-owners/:ownerId/password

### Admin

- POST /api/admin/login
- GET /api/admin/users
- GET /api/admin/store-owners
- DELETE /api/admin/users/:userId
- DELETE /api/admin/store-owners/:ownerId
- DELETE /api/admin/stores/:storeId

### Stores

- POST /api/stores
- GET /api/stores
- GET /api/stores/owner/:ownerId
- GET /api/stores/:storeId
- PUT /api/stores/:storeId
- DELETE /api/stores/:storeId
- POST /api/stores/:storeId/ratings

## Upload Payloads

Store create/update uses multipart form data:

- image: file
- ownerId, name, description, address, category: text fields

## Notes

- Admin login uses the email and password from environment variables.
- Authentication is sessionless; the client stores role info locally.
