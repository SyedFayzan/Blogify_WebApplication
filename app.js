require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const {
    checkForAuthentication,
} = require("./middleware/authentication");

const pageRoutes = require("./routes/pages");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");
const profileRoutes = require("./routes/profile");

const app = express();

const PORT = process.env.PORT || 8000;

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use(checkForAuthentication);

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Routes
app.use("/", pageRoutes);
app.use("/", authRoutes);
app.use("/", blogRoutes);
app.use("/", commentRoutes);
app.use("/", profileRoutes);

// Database
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});