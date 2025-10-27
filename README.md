# 🌿 FlowBoard

A modern, responsive **task and productivity dashboard** built with **React**, **Tailwind CSS**, and **Theme Context** for dynamic light/dark mode.

---

## 🚀 Features

- ⚡ **React + Tailwind** — Fast and responsive frontend.  
- 🌓 **Theme Toggle** — Seamlessly switch between light and dark mode.  
- 🧭 **Sidebar Navigation** — Easy access to Dashboard, Calendar, Tasks, and Settings.  
- 🧩 **Modular Components** — Clean folder structure and reusable UI blocks.  
- 🎨 **Custom Colors** — Soothing soft green & dark theme accent palette.  
- 💨 **Framer Motion Animations** — Smooth transitions and subtle fade-ins.

---

## 🏗️ Project Structure

flowboard/
│
├── src/
│ ├── components/
│ │ ├── Sidebar.jsx
│ │ ├── Topbar.jsx
│ │
│ ├── context/
│ │ └── ThemeContext.jsx
│ │
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Tasks.jsx
│ │ ├── Calendar.jsx
│ │ └── Settings.jsx
│ │
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│ └── tailwind.config.js
│
├── public/
│ └── index.html
│
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/flowboard.git
   cd flowboard
   ```
Install dependencies
```
npm install
```
Run development server
```
npm run dev
```
Open your browser → http://localhost:5173

🎨 Theme Customization
The theme system is defined in src/context/ThemeContext.jsx and color palette inside tailwind.config.js.

You can easily change:

light: {
  bg: "#f5f7f4",
  surface: "#ffffff",
  text: "#1e293b",
},
accent: {
  green: "#22c55e", // Change for your brand accent
}

🧠 Tech Stack
React 18

Tailwind CSS

React Router DOM

Framer Motion

Context API (for Theme management)