const express = require("express");

const router = express.Router();

const {
    restrictToLoggedInUserOnly,
} = require("../middleware/authentication");

const {
    profilePage,
} = require("../controllers/profileController");

router.get(
    "/profile",
    restrictToLoggedInUserOnly,
    profilePage
);

module.exports = router;