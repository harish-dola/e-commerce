# Ecommerce Starter App

A full-stack starter for a modern e-commerce application using React + Vite on the frontend and FastAPI + PostgreSQL on the backend.

## Stack

- Frontend: React, Vite, React Router, native `fetch`
- Backend: FastAPI, SQLAlchemy, JWT auth, bcrypt password hashing
- Database: PostgreSQL

## Project structure

```text
ecommerce-app/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── .env.example
│   ├── requirements.txt
│   └── seed_products.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Backend setup

1. Create a PostgreSQL database.

```sql
CREATE DATABASE ecommerce_app;
```

2. Create and activate a virtual environment inside `backend`.

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

3. Copy the environment file and update values.

```powershell
Copy-Item .env.example .env
```

Required backend environment variables:

- `DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/ecommerce_app`
- `SECRET_KEY=change-this-secret-key`
- `ACCESS_TOKEN_EXPIRE_MINUTES=60`
- `CORS_ORIGINS=http://localhost:5173`

4. Start the API server.

```powershell
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

### Seed sample products

Run this after the database is configured and the tables have been created at least once.

```powershell
python seed_products.py
```

## Frontend setup

1. Install dependencies.

```powershell
cd ../frontend
npm install
```

2. Copy the environment file.

```powershell
Copy-Item .env.example .env
```

3. Start the Vite dev server.

```powershell
npm run dev
```

The frontend will run at `http://localhost:5173`.

## API overview

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Products

- `GET /api/products`

### Cart

- `GET /api/cart`
- `POST /api/cart/items`
- `PUT /api/cart/items/{item_id}`
- `DELETE /api/cart/items/{item_id}`

### Orders

- `POST /api/orders`

Protected routes require the `Authorization: Bearer <token>` header.

## Features included

- JWT-based signup and login
- Password hashing with bcrypt
- Product listing
- User-specific cart management
- Quantity updates and item removal
- Order placement from cart items
- Cart clearing after successful order
- Loading states and error handling on the client
- Clean, component-based UI

## Notes for extension

- Add Alembic for schema migrations in production workflows
- Add payment processing in the checkout flow
- Add product detail, search, and admin management features
- Replace startup table creation with explicit migration management before deployment
