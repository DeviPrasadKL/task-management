# 📝 Task Management Application (MERN Stack)

A full-stack Task Management Web Application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
The project focuses on a clean UI using **Material UI (MUI)** / **ShadCN**, responsive pages, authentication, role-based access, and CRUD operations.

---

## 🚀 Features

### 🔐 Authentication
- User Sign Up & Sign In
- JWT-based authentication
- Password hashing using bcrypt
- Two User Roles:
  - **Admin**
  - **Normal User**

### 📋 Task Management
- Create, Read, Update, Delete tasks
- Pagination for large task lists
- View a **single task**
- Each task includes:
  - Title
  - Description
  - Status (Pending / Completed)
  - Created Date

### 🧑‍💼 Role Based Access Control
- Normal users: Add, Edit, View tasks
- Admin users: Full control + Delete tasks (delete button hidden for normal users)

### 🎨 Frontend Features
- Built using **React.js**
- Uses **Material UI (MUI)** or ShadCN for modern UI
- Fully responsive pages
- Dark/Light mode toggle
- Axios for API calls

---

## 📂 Project Structure

```

taskapp-mern/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── index.js
│   └── .env
│
└── frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/axios.js
│   ├── App.jsx
│   └── index.js
└── package.json

````

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, MUI/ShadCN, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JWT + bcryptjs |
| Deployment | Supports Vercel/Netlify + Render/Heroku |

---

## ⚙️ API Endpoints

### 🔑 Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |

### 📌 Task Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks (with pagination) |
| POST | `/tasks` | Create a task |
| GET | `/tasks/:id` | **Get a single task** |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task (**Admin only**) |

Example React call for single task:

```js
export const getTask = (id) => API.get(`/tasks/${id}`);
````

---

## 🚧 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/YOUR_USERNAME/taskapp-mern.git
cd taskapp-mern
```

---

### 2️⃣ Backend Setup

```sh
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
PORT=3000
```

Start backend:

```sh
npm start
```

---

### 3️⃣ Frontend Setup

```sh
cd ../frontend
npm install
npm start
```

---

## 🧪 Testing

* Use Postman or Thunder Client to test APIs.
* Ensure JWT token is included for protected routes.

---

## 🎯 Future Improvements

* Task filters and search
* Attachments / file uploads
* User profile settings
* Email verification + password reset

---

## 🏆 Author

**Prasad**
📌 Full Stack MERN Developer

---

## 🏗️ License

This project is open-source under the **MIT License**.

---

### ⭐ If you like this project, give it a star on GitHub!

```

---