# Book Library — ระบบจัดการห้องสมุดออนไลน์

ระบบ Web Application สำหรับจัดการหนังสือ ผู้แต่ง และหมวดหมู่ พร้อมระบบ Authentication ด้วย JWT

---

## Stack ที่เลือกใช้

| Layer | Technology |
|---|---|
| **Backend** | Node.js, Express.js v5, Prisma ORM v5, JSON Web Token (JWT), bcrypt |
| **Frontend** | React v19, Vite v8, React Router DOM v7, Axios, Bootstrap 5, React-Bootstrap |
| **Database** | PostgreSQL (Hosted on Neon Serverless Postgres) |

---

## วิธีติดตั้ง Dependency

**Backend:**
```bash
cd book-library-backend
npm install
```

**Frontend:**
```bash
cd book-library-frontend
npm install
```

---

## การตั้งค่า Environment Variable ที่จำเป็น

### Backend — สร้างไฟล์ `.env` ใน `book-library-backend/`

```env
# Database Connection String (จาก Neon หรือ PostgreSQL ของคุณ)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# JWT Secret Key 
JWT_SECRET="your-super-secret-jwt-key-here"

# Port ที่ Backend จะรัน (ค่า default คือ 3000)
PORT=3000
```

### Frontend — สร้างไฟล์ `.env` ใน `book-library-frontend/`

```env
# URL ของ Backend API มี ออนไลน์ เครื่องและ host
VITE_API_URL=https://book-library-backend-cjve.onrender.com/api
VITE_API_URL=http://localhost:3000/api
```

> **หมายเหตุ:** Frontend ใช้ `axiosClient.js` ชี้ไปที่ `http://localhost:3000/api` โดย default  
> หากเปลี่ยน Port ของ Backend ต้องอัปเดต `src/api/axiosClient.js` ด้วย

---

## วิธีรัน Migration

ใช้ **Prisma** สร้างตารางในฐานข้อมูล (รันครั้งแรกก่อนเริ่มใช้งาน):

```bash
cd book-library-backend

# วิธีที่ 1 — db push (เหมาะสำหรับ Development / ไม่สร้าง migration file)
npx prisma db push

# วิธีที่ 2 — migrate dev (สร้าง migration file สำหรับ Production)
npx prisma migrate dev --name init
```

จากนั้น generate Prisma Client:

```bash
npx prisma generate
```

---

## วิธีรัน Backend และ Frontend

### รัน Backend (Development Mode)

```bash
cd book-library-backend
npm run dev
```

> Server จะรันที่ `http://localhost:3000`

### รัน Frontend (Development Mode)

```bash
cd book-library-frontend
npm run dev
```

> Frontend จะรันที่ `http://localhost:5173`

---

## Username/Password สำหรับทดสอบ Login

| Field | Value |
|---|---|
| **Username** | `admin` |
| **Password** | `1234` |

> กรุณาสร้าง User ผ่าน API (POST `/api/register`) ก่อนทดสอบ หากยังไม่มีข้อมูลในฐานข้อมูล

---

## โครงสร้างโปรเจกต์

```
digixtech_exam/
├── book-library-backend/        # Express.js API Server
│   ├── docker-compose.yml       # Docker Compose Config
│   ├── Dockerfile               # Backend Dockerfile
│   ├── prisma/
│   │   └── schema.prisma        # Database Schema
│   ├── src/
│   │   ├── auth/                # Authentication
│   │   ├── books/               # Books CRUD
│   │   ├── categories/          # Categories CRUD
│   │   ├── authors/             # Authors CRUD
│   │   └── middlewares/         # Auth Middleware
│   └── server.js
│
└── book-library-frontend/       # React + Vite SPA
    ├── Dockerfile               # Frontend Multi-stage Dockerfile (Nginx)
    ├── nginx.conf               # Nginx Configuration
    ├── vercel.json              # Vercel SPA Rewrite Config
    └── src/
        ├── api/                 # Axios Client
        ├── login/               # Login Module
        ├── books/               # Books Module
        └── components/          # Shared Components
```

---

## [Bonus] Docker & Deploy

### รันด้วย Docker Compose (ทั้ง Backend + Frontend พร้อมกัน)

```bash
docker compose up --build
```

### Live Demo

| Service | URL |
|---|---|
| Frontend | https://book-library-frontend-gray.vercel.app |
| Backend API | https://book-library-backend-cjve.onrender.com |

---

*สร้างโดย: จิรวัฒน์ แสวงคำ — DigiXtech Examination*
