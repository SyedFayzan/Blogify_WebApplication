const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    body:{
        type:String,
        required:true
    },

    coverImageURL:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }

},
{
    timestamps:true
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;