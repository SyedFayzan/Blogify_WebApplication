const Blog = require("../models/blog");

// ===============================
// Home Page
// ===============================

async function homePage(req, res) {
    try {
        const blogs = await Blog.find()
            .populate("createdBy");

        res.render("home", {
            blogs,
        });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

// ===============================
// About Page
// ===============================

function aboutPage(req, res) {
    res.render("about");
}

module.exports = {
    homePage,
    aboutPage,
};