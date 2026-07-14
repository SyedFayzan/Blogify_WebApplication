# Blogify - Full Stack Blog Web Application

![Blogify Banner](https://img.shields.io/badge/Project-Full%20Stack%20Blog%20Application-yellow)

## 🚀 Live Demo

🔗 **Live Website:** https://blogify-mthj.onrender.com

🔗 **GitHub Repository:** https://github.com/SyedFayzan/Blogify_WebApplication


## 📌 About The Project

Blogify is a full-stack blogging platform where users can create, manage, and interact with technical blog articles.

The application allows users to register, securely login, create blogs, upload images, edit and delete their own posts, and interact with other developers through comments.

The project was built to gain practical experience in backend development, database management, authentication systems, and deploying a production-ready web application.


## ✨ Features

### 🔐 User Authentication
- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes for authenticated users
- Cookie-based session management


### 📝 Blog Management
- Create new blog posts
- Upload blog cover images
- Edit existing blogs
- Delete blogs
- View all published blogs
- View individual blog details


### 💬 Comment System
- Add comments on blog posts
- Display comments with user information
- Delete comments when deleting related blogs


### 👤 User Profile
- View user profile
- View blogs created by a user


### 🛡️ Authorization
- Only blog owners can edit or delete their blogs
- Protected routes using authentication middleware


## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS Templates
- Bootstrap 5

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose ODM

### Authentication & Security
- JSON Web Token (JWT)
- bcrypt
- Cookie Parser

### File Upload
- Multer


## 📂 Project Structure

```
Blogify/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── blogController.js
│
├── middleware/
│   ├── authentication.js
│   ├── auth.js
│   └── multer.js
│
├── models/
│   ├── user.js
│   ├── blog.js
│   └── comment.js
│
├── routes/
│   ├── auth.js
│   └── blog.js
│
├── services/
│   └── seedBlogs.js
│
├── public/
│   ├── css/
│   └── images/
│
├── views/
│   ├── partials/
│   ├── home.ejs
│   ├── blogs.ejs
│   └── blog.ejs
│
├── app.js
├── package.json
└── README.md
```


## ⚙️ Installation and Setup

### Clone Repository

```bash
git clone https://github.com/SyedFayzan/Blogify_WebApplication.git
```

### Navigate to Project

```bash
cd Blogify_WebApplication
```


### Install Dependencies

```bash
npm install
```


### Create Environment Variables

Create a `.env` file:

```env
PORT=8000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key

ADMIN_EMAIL=admin@blogify.com

ADMIN_PASSWORD=your_password
```


### Run Application

Development:

```bash
npm start
```

Application runs on:

```
http://localhost:8000
```


## 🗄️ Database Collections

MongoDB contains:

- Users
- Blogs
- Comments


## 📸 Screenshots

(Add your screenshots here)

Example:

```
screenshots/
 ├── home.png
 ├── login.png
 ├── blog-page.png
 └── profile.png
```


## 🚀 Deployment

The application is deployed using:

- Render (Backend Hosting)
- MongoDB Atlas (Database)


## 🔮 Future Improvements

- Rich text editor for blogs
- Cloudinary image storage
- Search functionality
- Blog categories filtering
- Like and bookmark system
- User profile pictures
- Admin dashboard
- Pagination


## 👨‍💻 Developer

**Syed Fayzan**

Computer Science Engineering Student

Interested in:
- Full Stack Development
- Backend Engineering
- Building scalable web applications


## ⭐ Acknowledgements

Thanks to the open-source community and documentation resources that helped in building this project.
