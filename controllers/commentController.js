const Comment = require("../models/comment");

// ===============================
// Add Comment
// ===============================

async function addComment(req, res) {
    try {
        await Comment.create({
            content: req.body.content,
            createdBy: req.user._id,
            blogId: req.params.id,
        });

        res.redirect(`/blog/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/blog/${req.params.id}`);
    }
}

module.exports = {
    addComment,
};