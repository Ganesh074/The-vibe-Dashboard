# 🚀 The Vibe Dashboard

A modern, full-stack application built for the **Ravulapati Techub PVT LTD** technical bridge task. This project connects a polished **Next.js** frontend to a robust **Node.js/Express** backend with **MongoDB Atlas** persistence.

## ✨ Features

- **Polished UI**: Sleek glassmorphism design with backdrop blur effects and smooth transitions.
- **Real-time Search**: Search functionality across item names and descriptions with debouncing.
- **Full CRUD**: Add, Edit, and Delete items directly from the dashboard.
- **Production-Style Architecture**: 
  - **Backend**: Separated into Routes, Services (Business Logic), and Models.
  - **Frontend**: Modular components and a dedicated API client library.
- **Database Persistence**: Fully integrated with MongoDB Atlas (Cloud Database).
- **Responsive Design**: Mobile-first approach, fully responsive from 320px to 4K displays.
- **Error Handling**: Graceful error states and loading indicators.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose ODM).
- **Icons/Styles**: Tailwind CSS, Glassmorphism utilities.

---

## 🚀 Quick Start (Local Setup)

Follow these steps to run the project on your machine.

### 1. Prerequisites
- **Node.js**: v18 or higher.
- **MongoDB Atlas**: The `.env` file is pre-configured with a live cluster URI for your convenience.

### 2. Backend Setup
```bash
cd backend
npm install
# Seed the database with 10 sample items
npm run seed
# Start the server
npm start
```
*Backend runs on: `http://localhost:5000`*

### 3. Frontend Setup
```bash
# In a new terminal
cd frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:3000`*

---

## 📁 Project Structure

```
.
├── backend/
│   ├── models/          # Mongoose Schemas (Item.js)
│   ├── routes/          # Express Routes (items.js)
│   ├── services/        # Business Logic Layer (itemService.js)
│   ├── scripts/         # Seed/Clear DB scripts
│   └── index.js         # Entry point
├── frontend/
│   ├── app/             # Next.js Pages & Layouts
│   ├── components/      # Reusable UI (ItemCard, SearchBar, ItemModal)
│   ├── lib/             # API Client (api.ts)
│   └── tailwind.config.js
└── README.md            # You are here
```

---

## 🌐 API Documentation

### `GET /api/items?search=value`
Fetches items. Supports optional search filtering on `name` and `description`.