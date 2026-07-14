const bcrypt = require("bcrypt");
const User = require("../models/user");
const { createTokenForUser } = require("../middleware/auth");

function showSignInPage(req, res) {
    res.render("signin", {
        error: req.query.error,
    });
}

function showSignUpPage(req, res) {
    res.render("signup", {
        error: req.query.error,
    });
}

async function signUpUser(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.redirect("/signup?error=Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.redirect("/signin");

    } catch (err) {
        console.log(err);
        res.redirect("/signup?error=Something went wrong");
    }
}

async function signInUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.redirect("/signup");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.redirect("/signin?error=Incorrect password");
        }

        const token = createTokenForUser(user);

        res.cookie("token", token);

        res.redirect("/");

    } catch (err) {
        console.log(err);
        res.redirect("/signin?error=Something went wrong");
    }
}

function logoutUser(req, res) {
    res.clearCookie("token");
    res.redirect("/");
}

module.exports = {
    showSignInPage,
    showSignUpPage,
    signUpUser,
    signInUser,
    logoutUser,
};