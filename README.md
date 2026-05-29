# 🏋️ Gym Management System

A full-stack gym management application for admin-side athlete management. Built with Node.js + Express on the backend and React + Vite on the frontend.

---

## 📁 Project Structure

```
gym-management-system/
├── backend/                # Express API server
│   ├── app.js              # Entry point & routes
│   ├── config/             # Database config
│   ├── controller/         # Request handlers
│   ├── database/           # Migration scripts
│   ├── entities/           # Domain models (Admin, Athlete)
│   ├── middleware/         # JWT auth & role check
│   ├── repository/         # Data access layer
│   └── usecases/           # Business logic
├── frontend/               # React admin panel
│   └── src/
│       ├── components/     # Layout, ProtectedRoute
│       ├── context/        # AuthContext (JWT)
│       ├── pages/          # Login, Dashboard
│       └── services/       # Axios API client
└── deployment/             # Docker deployment configs
    └── postgresql/
        └── docker-compose.yml
```

---

## 🚀 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js    | Runtime |
| Express 5  | Web framework |
| PostgreSQL | Database |
| JWT        | Authentication |
| bcrypt     | Password hashing |

### Frontend
| Technology   | Purpose |
|--------------|---------|
| React 19     | UI framework |
| Vite 8       | Build tool |
| TailwindCSS 4| Utility CSS |
| DaisyUI 5    | UI component library |
| React Router | Client-side routing |
| Axios        | HTTP client |

---

## ✨ Features

- **Admin authentication** — JWT-based login with role-protected routes
- **Athlete management** — Register, list, search, renew subscription, update phone number
- **Subscription tracking** — 30-day membership with auto-expiry and renewal
- **Persian RTL UI** — Fully localized Persian interface
- **Responsive design** — Works on desktop and mobile

---

## 🛠️ Installation

### Prerequisites
- Node.js >= 18
- Docker & Docker Compose

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/BrilliantTreasure1/Gym-Management-System.git
cd gym-management-system

# Install backend deps
cd backend && npm install

# Install frontend deps
cd ../frontend && npm install
```

### 2. Database Setup (Docker)

```bash
cd deployment/postgresql
docker compose up -d
```

This starts a PostgreSQL 16 container on port `5432` with:
- **Database:** `gym_api`
- **User:** `postgres`
- **Password:** `postgres`

### 3. Run Migrations

```bash
cd backend
node database/migrate.js
```

This creates the `athlete` and `admin` tables and inserts a default admin account.

### 4. Run

```bash
# Terminal 1 — Backend (port 3000)
cd backend && node app.js

# Terminal 2 — Frontend (port 5173)
cd frontend && npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔌 API Reference

All endpoints except `/auth/login` require a `Bearer <token>` in the `Authorization` header.

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | Admin login | ❌ |
| POST | `/register/admin` | Register new admin | ✅ Admin |
| POST | `/register/athlete` | Register new athlete | ✅ Admin |
| GET | `/athletes` | List all athletes | ✅ Admin |
| GET | `/athlete/fullname` | Search athlete by name | ✅ Admin |
| PATCH | `/athlete/:id/renew` | Extend subscription (+30d) | ✅ Admin |
| PATCH | `/athlete/:id/update/phonenumber` | Update athlete phone | ✅ Admin |

### Default Admin Account

```
Phone:    09392078042
Password: (pre-hashed in migration — stored as bcrypt hash)
```

---

## 🧪 Database Schema

### `athlete`
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Auto-increment ID |
| name | TEXT | First name |
| last_name | TEXT | Last name |
| phone_number | TEXT UNIQUE | Phone number |
| password | TEXT | bcrypt hash |
| created_at | TIMESTAMP | Registration date |
| expire_date | TIMESTAMP | Membership expiry |

### `admin`
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Auto-increment ID |
| name | TEXT | First name |
| last_name | TEXT | Last name |
| phone_number | TEXT UNIQUE | Phone number |
| password | TEXT | bcrypt hash |
| created_at | TIMESTAMP | Registration date |

---

## 📄 License

MIT
