<div align="center">

# 🚀 MERN Stack — Complete Learning Path

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A comprehensive, hands-on repository documenting my complete learning journey through the **MERN Stack** — from fundamentals to full-stack projects. Each section is structured progressively with code examples, notes, and real-world mini-projects.

[Node.js](#-nodejs) · [Express.js](#-expressjs) · [MongoDB](#-mongodb) · [React.js](#-reactjs) · [Projects](#-full-stack-projects)

</div>

---

## 📖 Table of Contents

- [🚀 MERN Stack — Complete Learning Path](#-mern-stack--complete-learning-path)
  - [📖 Table of Contents](#-table-of-contents)
  - [📌 About](#-about)
  - [🛠 Tech Stack](#-tech-stack)
  - [📂 Repository Structure](#-repository-structure)
    - [📗 Node.js](#-nodejs)
    - [📘 Express.js](#-expressjs)
    - [📙 MongoDB](#-mongodb)
    - [📕 React.js](#-reactjs)
  - [🏗 Full-Stack Projects](#-full-stack-projects)
    - [1. YouTube + Twitter Backend](#1-youtube--twitter-backend)
    - [2. Todo App](#2-todo-app)
  - [🎓 College Coursework](#-college-coursework)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Individual Examples](#running-individual-examples)
  - [👤 Author](#-author)

---

## 📌 About

This repository serves as a **structured learning resource** covering the entire MERN stack ecosystem. It includes:

- Concept-by-concept code examples with visual notes
- Progressive difficulty — beginner to advanced
- Hands-on projects using individual and combined technologies
- Best practices like MVC architecture, REST APIs, and authentication

---

## 🛠 Tech Stack

| Technology | Purpose |
|:--|:--|
| **Node.js** | Server-side JavaScript runtime |
| **Express.js** | Web framework for Node.js |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM for Node.js |
| **React.js** | Frontend UI library |
| **Redux Toolkit** | State management for React |
| **Tailwind CSS** | Utility-first CSS framework |
| **EJS** | Server-side templating engine |
| **Cloudinary** | Cloud-based media management |
| **JWT & Bcrypt** | Authentication & security |

---

## 📂 Repository Structure

### 📗 Node.js

> `Node.js/`

| Topic | Description |
|:--|:--|
| **Script Basics** | Core Node.js scripting fundamentals |
| **Module Exports** | Creating and exporting custom modules |
| **Import Modules** | Importing built-in and custom modules |
| **NPM** | Package management, `package.json`, installing packages (e.g., Figlet) |

---

### 📘 Express.js

> `Express.js/`

| # | Topic | Key Concepts |
|:-:|:--|:--|
| 01 | **Getting Started** | `app.get()`, `app.use()`, path parameters, query strings |
| 02 | **EJS Templating** | Interpolation syntax, conditionals, loops, partials |
| 03 | **GET & POST Requests** | Frontend-backend communication, form handling |
| 04 | **OOP in JavaScript** | Classes, factory functions, `new` operator, inheritance, overriding |
| 05 | **REST API** | RESTful routing, CRUD operations with views |
| 06 | **Middlewares** | `app.use()`, custom middleware, authentication middleware, utility middleware |

**Projects:**
- 🌐 **myPost.com** — A post-sharing web app built with Express & EJS

**Practice:** Additional exercises and mini-projects in `Express.js/Practice/`

---

### 📙 MongoDB

> `MongoDB/`

| # | Topic | Key Concepts |
|:-:|:--|:--|
| 01 | **Getting Started** | BSON vs JSON, collections, CRUD in Mongo Shell, `find()`, `insertMany()` |
| 02 | **Operators** | Comparison, logical, array, bitwise, geospatial, projection operators |
| 03 | **More in Mongo** | Update operators, `updateOne`, `updateMany`, `replaceOne`, `deleteMany`, nested data |
| 04 | **Mongoose** | Schema definition, models, Mongoose ODM with Node.js |
| 05 | **Mongo with Express** | Integrating MongoDB into Express applications |

**Additional Topics:**
- 📐 **Data Modelling** — Arrays, timestamps, nested structures
- 📝 **MongoDB Aggregation** — Aggregation pipeline concepts
- 🔄 **Practice** — Standalone & Mongo-with-Express practice sets

---

### 📕 React.js

> `React.js/`

| # | Topic | Key Concepts |
|:-:|:--|:--|
| 01 | **Getting Started** | Create React App, Vite setup, JSX basics |
| 02 | **Props** | Passing data between components, prop drilling |
| 03 | **Events** | Event handling in React |
| 04 | **React Hooks** | `useState`, `useEffect`, state management with arrays & objects |
| 05 | **Hooks & More** | `useContext`, Context API, mini context projects |
| 07 | **Tailwind + React** | Integrating Tailwind CSS with Vite + React |
| 08 | **React Router DOM** | `BrowserRouter`, `createBrowserRouter`, client-side routing |
| 09 | **React Forms** | Controlled components, form handling |
| 10 | **Redux Toolkit** | Store, slices, reducers, global state management |

**Projects:**
| Project | Description |
|:--|:--|
| 🎨 **Background Changer** | Dynamic background color switcher |
| 🖼️ **Image Slider** | Interactive image carousel |
| 🎰 **Lottery Ticket** | Lottery simulation app (+ modified version) |
| 🌗 **Theme Changer** | Light/dark theme toggle |
| ✅ **Todo App** | Task management app |
| 💾 **Todo App (localStorage)** | Persistent todo app using browser storage |

**Practice:** Additional React exercises in `React.js/Practice-react/`

---

## 🏗 Full-Stack Projects

> `Full-Stack-Projects/`

### 1. YouTube + Twitter Backend

A production-grade backend project featuring:
- **Express 5** with modular MVC architecture
- **MongoDB + Mongoose** for data persistence
- **JWT authentication** with bcrypt password hashing
- **Cloudinary** integration for media uploads via Multer
- **Aggregation pipelines** with `mongoose-aggregate-paginate-v2`
- **Cookie-based auth** with `cookie-parser`
- Clean code standards with **Prettier**

```
backend-project/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── constants.js
│   └── index.js
├── .env
├── .prettierrc
└── package.json
```

### 2. Todo App

A full-stack Todo application built with:
- **Express 5** backend
- **Mongoose** for MongoDB integration
- RESTful API structure

---

## 🎓 College Coursework

> `College Work Full-Stack/`

Supplementary coursework covering:

| Topic | Description |
|:--|:--|
| **MVC Application** | Full MVC pattern with controllers, models, routes & views |
| **CRUD with Node.js** | Basic CRUD without frameworks |
| **CRUD with Mongo & Express** | Database-driven CRUD operations |
| **MongoDB Aggregation** | Aggregation pipeline exercises |
| **MongoDB in Node.js** | Direct MongoDB driver usage |
| **Express Apps** | Routing, error handling, URL building |
| **File Upload** | Multipart file upload implementation |
| **Node Modules** | Custom module creation |
| **HTML, CSS & JS** | Frontend fundamentals |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or Atlas)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/MERN-Stack.git

# Navigate into the project
cd MERN-Stack
```

### Running Individual Examples

```bash
# Navigate to any project folder
cd "Express.js/05.REST_API"

# Install dependencies
npm install

# Start the server
node index.js
```

> **Note:** Some projects require environment variables (`.env`). Check the project folder for `.env.example` or configuration instructions.

---

## 👤 Author

**Chandan Chaudhary**

---

<div align="center">

⭐ **Star this repo** if you find it helpful!

</div>