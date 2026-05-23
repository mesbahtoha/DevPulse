# DevPulse API

A professional backend API for reporting and managing software issues and feature requests.

Built with:

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication
- Raw SQL
- Role Based Authorization

---

# Live API

🔗 https://dev-pulse-tau-teal.vercel.app/

---

# Project Overview

DevPulse is an issue tracking backend system where users can:

- Register and login
- Create software issues
- View all issues
- View single issue details
- Update issues
- Delete issues (Maintainer only)

The system also supports:

- JWT Authentication
- Role based authorization
- Contributor & Maintainer permissions
- Validation
- Error handling
- PostgreSQL database
- Raw SQL queries
- TypeScript strict mode

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
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validation.ts
│   │   │
│   │   └── issues/
│   │       ├── issue.controller.ts
│   │       ├── issue.route.ts
│   │       ├── issue.service.ts
│   │       └── issue.validation.ts
│   │
│   ├── types/
│   │   └── express/
│   │       └── index.d.ts
│   │
│   └── utils/
│       ├── catchAsync.ts
│       ├── sendResponse.ts
│       └── verifyToken.ts
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── vercel.json
├── README.md
│
└── dist/