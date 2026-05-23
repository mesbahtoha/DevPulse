# DevPulse API

A modular backend API for managing software issues and feature requests using Node.js, Express.js, TypeScript, PostgreSQL, JWT Authentication, and Raw SQL.

---

# Live URL

https://dev-pulse-tau-teal.vercel.app/

---

# Features

- User Registration & Login
- JWT Authentication & Authorization
- Role-based Access Control
- Create, Update & Delete Issues
- Issue Filtering & Sorting
- Contributor & Maintainer Permissions
- Global Error Handling
- Raw SQL with PostgreSQL
- TypeScript Strict Mode
- Vercel Deployment Ready

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg
- bcrypt
- jsonwebtoken
- Vercel
- NeonDB

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/your-username/devpulse.git
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
PORT=5000

DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key
```

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Run Production Server

```bash
npm start
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---|---|
| POST | /api/auth/signup |
| POST | /api/auth/login |

---

## Issues

| Method | Endpoint |
|---|---|
| POST | /api/issues |
| GET | /api/issues |
| GET | /api/issues/:id |
| PATCH | /api/issues/:id |
| DELETE | /api/issues/:id |

---

# Query Parameters

## Get All Issues

```http
GET /api/issues?sort=newest
```

| Parameter | Values | Default |
|---|---|---|
| sort | newest, oldest | newest |
| type | bug, feature_request | none |
| status | open, in_progress, resolved | none |

### Example

```http
GET /api/issues?sort=newest&type=bug&status=open
```

---

# Database Schema Summary

## users Table

| Column | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR(100) |
| email | VARCHAR(150) UNIQUE |
| password | TEXT |
| role | contributor / maintainer |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## issues Table

| Column | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(150) |
| description | TEXT |
| type | bug / feature_request |
| status | open / in_progress / resolved |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# Author

Md. Mesbahul Alam
