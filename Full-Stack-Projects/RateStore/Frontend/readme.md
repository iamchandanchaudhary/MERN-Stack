# RateStore Frontend

React + Vite client for RateStore with role-based flows and protected routes.

## Highlights

- Role selection landing page with tailored login flows.
- User, store owner, and admin dashboards.
- Rating and store discovery experience.

## Setup

```bash
npm install
npm run dev
```

## Environment

Update [Frontend/.env](Frontend/.env) to point at the backend API:

```
VITE_BACKEND_URL="http://localhost:8080"
```

## Routes

- /: role selection
- /login/user
- /login/store-owner
- /login/admin
- /user-dashboard
- /stores/:storeId
- /store-owner
- /profile/user
- /profile/store-owner
- /admin
- /admin/users
- /admin/store-owners
- /admin/stores

## Scripts

- npm run dev
- npm run build
- npm run preview
- npm run lint

## Notes

- Authentication state is stored in local storage under `rateStoreAuth`.
- Protected routes check the current role before rendering.
