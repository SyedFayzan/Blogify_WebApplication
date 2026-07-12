const { validateToken } = require("./auth");

function checkForAuthentication(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    const userPayload = validateToken(token);

    req.user = userPayload;
  } catch (error) {
    console.log("Invalid Token");
  }

  next();
}
function restrictToLoggedInUserOnly(req, res, next) {

    if (!req.user) {
        return res.redirect("/signin");
    }

    next();
}
function redirectIfAuthenticated(req, res, next) {
    if (req.user) {
        return res.redirect("/");
    }

    next();
}

module.exports = {
    checkForAuthentication,
    restrictToLoggedInUserOnly,
    redirectIfAuthenticated,
};
