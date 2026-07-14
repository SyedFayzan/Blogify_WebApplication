const { name } = require("ejs");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    name:user.name,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });


  return token;
}

function validateToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  createTokenForUser,
  validateToken,
};