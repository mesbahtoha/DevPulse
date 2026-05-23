# DevPulse API

A professional backend API for reporting and managing software issues and feature requests.

---

# Live URL

🔗 https://dev-pulse-tau-teal.vercel.app/

---

# Features

- User Registration & Login
- JWT Authentication
- Role Based Authorization
- Create Issue
- Get All Issues
- Get Single Issue
- Update Issue
- Delete Issue (Maintainer Only)
- Contributor & Maintainer Permission System
- Validation & Error Handling
- PostgreSQL Database Integration
- Raw SQL Queries
- TypeScript Strict Mode
- Professional Modular Architecture

---

# Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Backend Runtime |
| Express.js | Server Framework |
| TypeScript | Type Safety |
| PostgreSQL | Database |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Raw SQL | Database Query |
| Vercel | Deployment |

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/devpulse.git
```

---

## 2. Move Into Project Directory

```bash
cd devpulse
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DATABASE_URL=YOUR_DATABASE_URL

JWT_SECRET=devpulse_secret_key
```

---

## 5. Run Development Server

```bash
npm run dev
```

---

## 6. Build Project

```bash
npm run build
```

---

## 7. Start Production Server

```bash
npm start
```

---

# API Endpoint List

## Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register New User |
| POST | `/api/auth/login` | Login User |

---

## Issue Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/issues` | Create Issue |
| GET | `/api/issues` | Get All Issues |
| GET | `/api/issues/:id` | Get Single Issue |
| PATCH | `/api/issues/:id` | Update Issue |
| DELETE | `/api/issues/:id` | Delete Issue |

---

# Database Schema Summary

## users Table

| Column | Type |
|---|---|
| id | SERIAL |
| name | VARCHAR(100) |
| email | VARCHAR(150) |
| password | TEXT |
| role | VARCHAR(20) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## issues Table

| Column | Type |
|---|---|
| id | SERIAL |
| title | VARCHAR(150) |
| description | TEXT |
| type | VARCHAR(30) |
| status | VARCHAR(30) |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# Project Structure

```txt
devpulse/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── config/
│   │   ├── db.ts
│   │   └── env.ts
│   │
│   ├── interfaces/
│   │   └── index.ts
│   │
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── checkRole.ts
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   └── issues/
│   │
│   ├── types/
│   │   └── express/
│   │
│   └── utils/
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── vercel.json
├── README.md
│
└── dist/
```

---

# Authorization Rules

## Contributor Can

- Create issue
- View issue
- Update own issue
- Update only when status is `open`

---

## Contributor Cannot

- Delete issue
- Change issue status
- Update other users' issues

---

## Maintainer Can

- Update any issue
- Delete any issue
- Change issue status

---

# Error Handling

Project includes:

- Global Error Handler
- Invalid Route Handler
- Validation Errors
- Unauthorized Errors
- Forbidden Errors

---

# Deployment

Project deployed on Vercel.

---

# Author

## Md. Mesbahul Alam
