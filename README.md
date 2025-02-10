# 📝 Task Management Application

A **Task Management App** built with **React, TypeScript, and Tailwind CSS** for creating, updating, and managing tasks efficiently.

## 🚀 Features
- ✅ Create, update, and delete tasks
- 🔥 Set priority and status for tasks
- 📱 Fully responsive UI with Tailwind CSS
- ⚡ Data fetching with **RTK Query** and a custom `useFetch` hook
- 🗄️ Uses **MockAPI** as a backend

---

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Hooks
- **Data Fetching**: RTK Query & Custom Hooks
- **Backend**: MockAPI (for demonstration)

---

## 💻 Installation & Running the App

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager

2️⃣ Install Dependencies
npm install
# or
yarn install

3️⃣ Start the Development Server
npm run dev
# or
yarn dev

The application should now be running on http://localhost:3000 🚀

📝 Approach & Considerations
1️⃣ Component Structure
The app follows a modular component approach, where reusable components handle different UI elements.
Key components include:

TaskList → Displays tasks
NewTask → Handles creating new tasks
UpdateTask → Allows editing an existing task
TaskDetail → Shows details of a task
2️⃣ State & Data Fetching
React Hooks manage local state
Custom Hook (useFetch) handles API calls
Optimized renders using useMemo & useCallback
3️⃣ Error Handling
Displays error messages for failed API requests
Ensures UI doesn’t break on empty or invalid data
✅ Additional Notes
The app currently uses MockAPI for backend. Replace it with a real API in production.
Add authentication for user-specific tasks.
Consider integrating Redux Toolkit for global state management if scaling.
