const Blog = require("../models/blog");
const Comment = require("../models/comment");

// ===============================
// Show Add Blog Page
// ===============================

function showAddBlogPage(req, res) {
    res.render("addBlog");
}

// ===============================
// Create Blog
// ===============================

async function createBlog(req, res) {
    try {
        const { title, body, category } = req.body;

        await Blog.create({
            title,
            body,
            category,
            coverImageURL: `/images/${req.file.filename}`,
            createdBy: req.user._id,
        });

        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.redirect("/blog/add");
    }
}

// ===============================
// Get Single Blog
// ===============================

async function getSingleBlog(req, res) {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate("createdBy");

        if (!blog) {
            return res.redirect("/");
        }

        const comments = await Comment.find({
            blogId: req.params.id,
        }).populate("createdBy");

        res.render("blog", {
            blog,
            comments,
        });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

// ===============================
// Get All Blogs
// ===============================

async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find()
            .populate("createdBy")
            .sort({ createdAt: -1 });

        res.render("blogs", {
            blogs,
        });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

// ===============================
// Show Edit Blog Page
// ===============================

async function showEditBlogPage(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.redirect("/");
        }

        if (blog.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("Access Denied");
        }

        res.render("editBlog", {
            blog,
        });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

// ===============================
// Update Blog
// ===============================

async function updateBlog(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.redirect("/");
        }

        if (blog.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("Access Denied");
        }

        blog.title = req.body.title;
        blog.body = req.body.body;
        blog.category = req.body.category;

        if (req.file) {
            blog.coverImageURL = `/images/${req.file.filename}`;
        }

        await blog.save();

        res.redirect(`/blog/${blog._id}`);

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

// ===============================
// Delete Blog
// ===============================

async function deleteBlog(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.redirect("/");
        }

        if (blog.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("Access Denied");
        }

        await Comment.deleteMany({
            blogId: blog._id,
        });

        await Blog.findByIdAndDelete(blog._id);

        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

module.exports = {
    showAddBlogPage,
    createBlog,
    getSingleBlog,
    getAllBlogs,
    showEditBlogPage,
    updateBlog,
    deleteBlog,
};