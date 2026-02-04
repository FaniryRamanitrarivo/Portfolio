# 👨‍💻 Developer Portfolio & Back Office

![Next.js](https://img.shields.io/badge/Next.js-13.6-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3-teal)
![License](https://img.shields.io/badge/license-MIT-green)

This is a **modern portfolio website** for a freelance/fullstack developer.  
It showcases projects with detailed information and includes a **back-office API** for managing projects.

**Live Preview:** *(replace with your deployed URL)*  
[https://your-portfolio.vercel.app](https://your-portfolio.vercel.app)

---

## 🧰 Tech Stack

### Frontend
- **Framework:** Next.js 13 (App Router)
- **UI:** React, Tailwind CSS, SCSS
- **Design:** Clean, minimal, responsive (mobile-first)
- **Features:** Server Components for performance, dynamic project listing

### Backend / API
- **API:** Next.js API Routes (App Router)
- **Database:** SQLite / PostgreSQL / MySQL (via Prisma ORM)
- **ORM:** Prisma 7
- **Validation:** Zod
- **Error handling:** Centralized via `safeHandler`

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|------------|
| GET    | `/api/projects` | Fetch all projects (pagination & filters optional) |
| POST   | `/api/projects` | Create a new project |
| GET    | `/api/projects/[id]` | Fetch project by ID |
| PUT    | `/api/projects/[id]` | Update project by ID |
| DELETE | `/api/projects/[id]` | Delete project by ID |

---

# 🚀 Developer Portfolio & Back Office

### Clone the repository

```bash
git clone <the-repo-url>
cd portfolio
```

### Install dependencies

```bash
npm install
```

### Create .env file

```bash
DATABASE_URL="sqlite:./dev.db" # or your PostgreSQL/MySQL connection
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Run the development server

```bash
npm run dev
```
