const User = require("../models/user");
const Blog = require("../models/blog");

// ===============================
// Profile Page
// ===============================

async function profilePage(req, res) {
    try {
        const user = await User.findById(req.user._id);

        const blogs = await Blog.find({
            createdBy: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.render("profile", {
            user,
            blogs,
        });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

module.exports = {
    profilePage,
};