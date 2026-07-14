const express = require("express");

const router = express.Router();

const {
    restrictToLoggedInUserOnly,
} = require("../middleware/authentication");

const {
    addComment,
} = require("../controllers/commentController");

router.post(
    "/blog/:id/comment",
    restrictToLoggedInUserOnly,
    addComment
);

module.exports = router;