# 🚀 The Vibe Dashboard

A modern, full-stack application built for the Ravulapati Techub PVT LTD technical bridge task. This project demonstrates "Vibe Coding"—the ability to build clean, functional, and aesthetically pleasing products at pace. It connects a polished Next.js frontend to a robust Node.js/Express backend with MongoDB Atlas persistence.

---

## ✨ Features

- **Polished UI**: Sleek glassmorphism design with backdrop blur effects and smooth transitions.
- **Real-time Search**: Search functionality across item names and descriptions with optimized fetching.
- **Full CRUD**: Ability to Add, Edit, and Delete items directly from the dashboard.
- **Production Architecture**:
  - Backend: Separated into Routes, Services (Business Logic), and Models.
  - Frontend: Modular components with a dedicated API client library.
  - Database: Fully integrated with MongoDB Atlas for cloud data persistence.
- **Responsive Design**: Mobile-first approach, fully responsive for all screen sizes.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose ODM).
- **AI Tools**: Developed using GitHub Copilot for intelligent code completion and Zen Browser for a focused development environment.

---

## 🚀 Quick Start (Local Setup)

Follow these steps to run the project on your machine:

### 1. Prerequisites

- **Node.js**: v18 or higher.
- **MongoDB**: The backend is pre-configured to connect to a live MongoDB Atlas cluster.

### 2. Backend Setup

```bash
cd backend
npm install
# Seed the database with sample items
npm run seed
# Start the server
npm start
```

The API will be live at: [http://localhost:5000](http://localhost:5000)

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The dashboard will be live at: [http://localhost:3000](http://localhost:3000)

---

## 🧠 AI Workflow & Steering

In this project, I used GitHub Copilot to rapidly scaffold API routes and generate boilerplate for the Next.js components.

A key moment of "steering" occurred during the MongoDB Atlas integration. The AI suggested an older connection method, but I manually intervened to implement a modern singleton pattern for the database connection. This prevents the application from exhausting connection pools, ensuring the backend stays stable even with frequent code refreshes during development.

---

## 🌐 API Documentation

### Endpoints

- **GET** `/api/items?search=value`
  - Fetches items from the database. Supports optional search filtering on name and description.

- **POST** `/api/items`
  - Creates a new item in the database.

- **PUT** `/api/items/:id`
  - Updates an existing item's details.

- **DELETE** `/api/items/:id`
  - Removes an item from the database.

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🙌 Acknowledgments

- Ravulapati Techub PVT LTD for the opportunity to work on this technical bridge task.
- GitHub Copilot for accelerating development.
- MongoDB Atlas for providing a reliable cloud database solution.

---

## 📧 Contact

For any inquiries, please reach out to [ganeshnakkina2004@gmail.com](mailto:ganeshnakkina2004@gnail.com).