[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19877246&assignment_repo_type=AssignmentRepo)
# MERN Blog App 📝

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

---

## 📂 Features

- Full CRUD for blog posts
- RESTful API with Express & MongoDB
- React frontend with React Router
- Category selection for posts
- Comment system on blog posts
- Image upload for featured post images
- Delete and edit functionality
- MongoDB data modeling with Mongoose

---

## ⚙️ Technologies Used

- React.js
- Express.js
- Node.js
- MongoDB (via Mongoose)
- Tailwind CSS (for styling)
- Vite (frontend bundler)

---

## 📦 Project Structure

 mern-blog/
├── client/ # React frontend
├── server/ # Express backend


---

## 🚀 Setup Instructions

### Backend

```bash
cd server
pnpm install
cp .env.example .env
pnpm run dev

```
### Frontend

```bash
cd client
pnpm install
pnpm run dev
```

Make sure MongoDB is running locally at mongodb://localhost:27017/mern-blog

## 📸 Screenshots


## 🧪 API Endpoints

### Posts
GET /api/posts

GET /api/posts/:id

GET /api/posts/slug/:slug

POST /api/posts

PUT /api/posts/:id

DELETE /api/posts/:id

### Categories
GET /api/categories

POST /api/categories

### Comments
GET /api/comments/post/:postId

POST /api/comments


## ✅ Author

Jane Muriithi




