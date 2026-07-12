const multer = require("multer");
const path = require("path");

// Where to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/images"));
  },

  filename: function (req, file, cb) {
    const fileName =
      Date.now() + path.extname(file.originalname);

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;


