const express = require("express");

const router = express.Router();

const {
    showSignInPage,
    showSignUpPage,
    signUpUser,
    signInUser,
    logoutUser,
} = require("../controllers/authController");

const {
    redirectIfAuthenticated,
} = require("../middleware/authentication");

router.get(
    "/signin",
    redirectIfAuthenticated,
    showSignInPage
);

router.get(
    "/signup",
    redirectIfAuthenticated,
    showSignUpPage
);

router.post(
    "/user/signup",
    signUpUser
);

router.post(
    "/user/signin",
    signInUser
);

router.get(
    "/logout",
    logoutUser
);

module.exports = router;