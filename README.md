# Dekho Bharat (Voyage Wise) 🇮🇳✈️

**Dekho Bharat** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) travel discovery platform that uniquely integrates core **Data Structures and Algorithms (DSA)** for highly optimized performance and navigation.

## 🚀 Features & Architecture

### Core Tech Stack
*   **Frontend:** React, Vite, Tailwind CSS / Framer Motion
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose)

### Data Structures & Algorithms Integration
Instead of relying solely on heavy database queries, this project implements advanced data structures directly into the backend logic:
*   **N-ary Tree & DFS:** Travel categories (Style -> Region -> Destination) are modeled as an N-ary tree. The application uses Depth-First Search (DFS) to traverse nodes instantly, generating dynamic breadcrumbs and handling navigation.
*   **Trie (Prefix Tree):** A specialized Trie structure indexes all city names on server start. This allows the search bar to fetch auto-complete suggestions in **O(L) time complexity** (where L is the query length), providing lightning-fast search capabilities.

## 🛠️ DevOps & Deployment

This project heavily utilizes modern DevOps practices for containerization, orchestration, and continuous deployment.

### Containerization (Docker)
The application uses Docker to eliminate the "it works on my machine" problem, ensuring consistency across development and production environments.
*   **Backend:** Containerized using a lightweight Node.js image (`Dockerfile.backend`).
*   **Frontend (Multi-Stage Build):** The `Dockerfile.frontend` utilizes a highly optimized multi-stage build:
    1.  **Build Stage:** Uses a Node image to compile the React/Vite source code.
    2.  **Serve Stage:** Uses a tiny **Nginx** image to serve the compiled static files, discarding the heavy `node_modules` directory for a secure, minimal production footprint.

### Orchestration (Docker Compose)
`docker-compose.yml` is used to orchestrate the multi-container environment. A single command (`docker-compose up -d`) spins up both the Nginx frontend and Node.js backend, automatically handling their internal networking and startup order.

### Cloud Hosting: AWS EC2 vs. Vercel
While Vercel is excellent for serverless frontends, this project is designed for **AWS EC2 (IaaS)**. 
*   **Why EC2?** Our Express backend and MongoDB connections require a persistent, always-on server environment. Serverless platforms can suffer from "cold starts" and strict timeouts which disrupt persistent APIs and WebSocket connections. EC2 provides full control over our virtual machine, allowing us to run Docker containers continuously and configure our networking stack precisely.

### CI/CD
*   The `.github/workflows` directory contains GitHub Actions configurations to automate testing, building, and deployment processes directly from the repository.

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd "pep project"
   ```

2. **Run with Docker (Recommended):**
   ```bash
   docker-compose up --build
   ```
   *Frontend will be available on port 80, Backend on port 4000.*

3. **Run manually:**
   ```bash
   npm install
   npm run dev:full # Runs both Vite dev server and Node backend concurrently
   ```
