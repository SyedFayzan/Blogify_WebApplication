const mongoose = require("mongoose");
const createDummyBlogs = require("../services/seedBlogs");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB Connected Successfully!!");

        await createDummyBlogs();

    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;