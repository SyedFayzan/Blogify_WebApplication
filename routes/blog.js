const express = require("express");

const router = express.Router();

const upload = require("../middleware/multer");

const {
    restrictToLoggedInUserOnly,
} = require("../middleware/authentication");

const {
    showAddBlogPage,
    createBlog,
    getSingleBlog,
    showEditBlogPage,
    updateBlog,
    deleteBlog,
    getAllBlogs,
} = require("../controllers/blogController");

router.get(
    "/blogs",
    getAllBlogs
);

router.get(
    "/blog/add",
    restrictToLoggedInUserOnly,
    showAddBlogPage
);

router.post(
    "/blog",
    restrictToLoggedInUserOnly,
    upload.single("coverImage"),
    createBlog
);

router.get(
    "/blog/:id",
    getSingleBlog
);

router.get(
    "/blog/edit/:id",
    restrictToLoggedInUserOnly,
    showEditBlogPage
);

router.post(
    "/blog/edit/:id",
    restrictToLoggedInUserOnly,
    upload.single("coverImage"),
    updateBlog
);

router.post(
    "/blog/delete/:id",
    restrictToLoggedInUserOnly,
    deleteBlog
);

module.exports = router;