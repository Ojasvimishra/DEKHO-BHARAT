
# Dekho Bharat – DSA-Powered Travel Discovery Platform

**Dekho Bharat** is a full-stack, production-grade demo project that showcases core Data Structures & Algorithms (DSA) concepts in a real-world travel discovery and booking application. It features:

- An interactive React frontend (with Vite)
- A Node.js/Express backend with MongoDB
- A DSA engine (N-ary Tree, Trie, DFS, and more) powering the travel logic

---

## 🚀 Features

- **N-ary Tree** for hierarchical travel categories and destinations
- **Trie (Prefix Tree)** for fast city search and autocomplete
- **DFS Traversal** for navigation, breadcrumbs, and pathfinding
- **Booking system** with MongoDB (activities, guides, vouchers)
- **User authentication** (signup/login)
- **Algorithm visualization** (tree navigation, logs)
- **Modern UI** with dark/light themes and responsive design

---

## 🗺️ Project Structure

- `src/dekhoindia.js`: DSA logic (N-ary tree, Trie, DFS, helpers)
- `src/App.jsx`: Main React app (UI, navigation, state)
- `src/components/DsaDashboard.jsx`: Tree/algorithm visualization
- `src/components/LoginPage.jsx`: User authentication UI
- `server.js`: Express backend (API, MongoDB, DSA integration)
- `public/`, `src/assets/`: Static assets and images
- `reference/`: Java reference implementations for DSA core

---

## 🏗️ Setup & Installation

1. **Clone the repo:**
	 ```bash
	 git clone https://github.com/Ojasvimishra/DEKHO-BHARAT.git
	 cd DEKHO-BHARAT
	 ```
2. **Install dependencies:**
	 ```bash
	 npm install
	 ```
3. **Start MongoDB** (local, default port 27017)
4. **Run both frontend & backend:**
	 ```bash
	 npm run dev:full
	 ```
	 - Frontend: [http://localhost:5173](http://localhost:5173)
	 - Backend: [http://localhost:4000/api/health](http://localhost:4000/api/health)

---

## 🔌 API Endpoints

| Endpoint                | Method | Description                                 |
|------------------------|--------|---------------------------------------------|
| `/api/tree`            | GET    | Get the full travel decision tree           |
| `/api/node/:id`        | GET    | Find a node by ID (DFS)                     |
| `/api/path/:id`        | GET    | Get breadcrumb path to a node               |
| `/api/search?q=...`    | GET    | Trie-based prefix search for cities         |
| `/api/signup`          | POST   | User signup                                 |
| `/api/login`           | POST   | User login                                  |
| `/api/book`            | POST   | Book an activity (with user details)        |

---

## 🧠 DSA/Algorithmic Core

- **N-ary Tree:**
	- Models the travel hierarchy: *Root → Category → City*
	- Used for navigation, recommendations, and pathfinding
- **DFS (Depth-First Search):**
	- Finds nodes, builds breadcrumbs, and traverses the tree
- **Trie (Prefix Tree):**
	- Indexes all cities for O(L) prefix search (autocomplete)
- **MongoDB:**
	- Stores bookings and user accounts
- **Java Reference:**
	- See `reference/` for academic/DSA Java implementations

---

## 🖥️ Technologies Used

- **Frontend:** React, Vite, Framer Motion, Lucide Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **DSA:** Custom N-ary Tree, Trie, DFS (JavaScript & Java)
- **Dev Tools:** ESLint, Concurrently, Modern CSS

---

## 📜 Scripts

- `npm run dev` – Start frontend (Vite)
- `npm run server` – Start backend (Express)
- `npm run dev:full` – Run both frontend & backend concurrently
- `npm run build` – Build frontend for production
- `npm run lint` – Lint codebase

---

## 📚 Reference & Credits

- **Project Author:** Ojasvi Mishra
- **DSA/Java Reference:** See `reference/` folder
- **Inspired by:** Indian travel, DSA pedagogy, and open-source learning

---

## 🏁 License

This project is for educational/demo purposes. Feel free to fork, adapt, and learn!
